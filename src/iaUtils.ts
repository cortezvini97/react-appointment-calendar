import { Appointment, IAResponse } from './types';

/**
 * Extrai informações de agendamento de linguagem natural
 */
export const parseNaturalLanguageAppointment = (
  message: string,
  existingAppointments: Appointment[],
  hours?: string[]
): {
  title: string;
  date: Date;
  time?: string;
  confidence: number;
} | null => {
  const lowerMessage = message.toLowerCase();
  
  // Palavras-chave que indicam intenção de agendamento
  const appointmentKeywords = [
    'agendar', 'marcar', 'criar', 'reservar', 'compromisso', 
    'reunião', 'consulta', 'encontro', 'evento', 'appointment'
  ];
  
  const hasAppointmentIntent = appointmentKeywords.some(keyword => 
    lowerMessage.includes(keyword)
  );
  
  if (!hasAppointmentIntent) {
    return null;
  }

  let confidence = 0.3; // Confiança base por ter intenção de agendamento
  
  // Extrair título/assunto
  let title = 'Novo agendamento';
  const titlePatterns = [
    /(?:agendar|marcar|criar)\s+(?:uma?\s+)?(.*?)(?:\s+para|\s+no|\s+na|\s+em|\s+às?|\s+dia|\s+amanhã|\s+hoje|$)/i,
    /(?:reunião|consulta|encontro|evento)\s+(?:com\s+|de\s+)?(.*?)(?:\s+para|\s+no|\s+na|\s+em|\s+às?|\s+dia|\s+amanhã|\s+hoje|$)/i
  ];
  
  for (const pattern of titlePatterns) {
    const match = message.match(pattern);
    if (match && match[1] && match[1].trim()) {
      title = match[1].trim();
      confidence += 0.2;
      break;
    }
  }

  // Extrair data
  const today = new Date();
  let appointmentDate = new Date(today);
  
  // Padrões de data
  const datePatterns = [
    // Datas específicas: "dia 25", "25/12", "25 de dezembro"
    {
      pattern: /(?:dia\s+)?(\d{1,2})(?:\/(\d{1,2})(?:\/(\d{2,4}))?)?/i,
      handler: (match: RegExpMatchArray) => {
        const day = parseInt(match[1]);
        const month = match[2] ? parseInt(match[2]) - 1 : today.getMonth();
        const year = match[3] ? (match[3].length === 2 ? 2000 + parseInt(match[3]) : parseInt(match[3])) : today.getFullYear();
        
        const date = new Date(year, month, day);
        if (date > today || (date.getDate() === today.getDate() && date.getMonth() === today.getMonth())) {
          confidence += 0.3;
          return date;
        }
        return null;
      }
    },
    // Dias relativos
    {
      pattern: /\b(hoje|today)\b/i,
      handler: () => {
        confidence += 0.4;
        return new Date(today);
      }
    },
    {
      pattern: /\b(amanhã|tomorrow)\b/i,
      handler: () => {
        confidence += 0.4;
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      }
    },
    {
      pattern: /\b(?:próxima?\s+)?(segunda|terça|quarta|quinta|sexta|sábado|domingo)(?:\s*feira)?/i,
      handler: (match: RegExpMatchArray) => {
        const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
        const targetDay = days.findIndex(day => match[1].toLowerCase().includes(day.substring(0, 3)));
        
        if (targetDay !== -1) {
          confidence += 0.3;
          const daysUntilTarget = (targetDay - today.getDay() + 7) % 7;
          const targetDate = new Date(today);
          targetDate.setDate(today.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
          return targetDate;
        }
        return null;
      }
    }
  ];

  for (const { pattern, handler } of datePatterns) {
    const match = message.match(pattern);
    if (match) {
      const extractedDate = handler(match);
      if (extractedDate) {
        appointmentDate = extractedDate;
        break;
      }
    }
  }

  // Extrair horário
  let appointmentTime: string | undefined;
  const timePatterns = [
    /(?:às?\s+)?(\d{1,2}):(\d{2})/i, // 14:30, às 14:30
    /(?:às?\s+)?(\d{1,2})h(?:(\d{2}))?/i, // 14h30, às 14h
    /(?:às?\s+)?(\d{1,2})\s*(?:h|horas?)/i, // 14 horas
  ];

  for (const pattern of timePatterns) {
    const match = message.match(pattern);
    if (match) {
      const hour = parseInt(match[1]);
      const minute = match[2] ? parseInt(match[2]) : 0;
      
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        appointmentTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        confidence += 0.3;
        
        // Verificar se o horário está na lista de horários disponíveis
        if (hours && hours.includes(appointmentTime)) {
          confidence += 0.1;
        }
        break;
      }
    }
  }

  // Padrões de horário mais flexíveis
  if (!appointmentTime) {
    const flexibleTimePatterns = [
      { pattern: /\b(?:de\s+)?manhã\b/i, time: '09:00' },
      { pattern: /\b(?:de\s+)?tarde\b/i, time: '14:00' },
      { pattern: /\b(?:de\s+)?noite\b/i, time: '19:00' },
      { pattern: /\b(?:ao\s+)?meio[‌\s-]?dia\b/i, time: '12:00' },
    ];

    for (const { pattern, time } of flexibleTimePatterns) {
      if (lowerMessage.match(pattern)) {
        appointmentTime = time;
        confidence += 0.2;
        break;
      }
    }
  }

  // Verificar conflitos com agendamentos existentes
  if (appointmentTime) {
    const hasConflict = existingAppointments.some(apt => 
      apt.date.getDate() === appointmentDate.getDate() &&
      apt.date.getMonth() === appointmentDate.getMonth() &&
      apt.date.getFullYear() === appointmentDate.getFullYear() &&
      apt.time === appointmentTime
    );
    
    if (hasConflict) {
      confidence -= 0.2; // Reduzir confiança se há conflito
    }
  }

  return {
    title,
    date: appointmentDate,
    time: appointmentTime,
    confidence: Math.min(Math.max(confidence, 0), 1) // Entre 0 e 1
  };
};

/**
 * Gera resposta da IA baseada na mensagem do usuário
 */
export const generateIAResponse = (
  userMessage: string,
  extractedAppointment: any,
  existingAppointments: Appointment[],
  hours?: string[],
  minTime: number = 0
): IAResponse => {
  if (!extractedAppointment) {
    return {
      message: '🤖 Como posso ajudá-lo com agendamentos?\n\n💬 Use linguagem natural como: "Agendar reunião amanhã às 15h"',
      suggestedActions: [
        'Diga o que quer agendar',
        'Especifique data e horário',
        'Descreva seu compromisso'
      ]
    };
  }

  let responseMessage = '';
  let suggestedActions: string[] = [];

  // Verificar qualidade da extração
  if (extractedAppointment.confidence > 0.7) {
    responseMessage = '✅ Identifiquei sua solicitação de agendamento.';
    
    // Verificar conflitos
    const hasConflict = extractedAppointment.time && existingAppointments.some(apt => 
      apt.date.getDate() === extractedAppointment.date.getDate() &&
      apt.date.getMonth() === extractedAppointment.date.getMonth() &&
      apt.date.getFullYear() === extractedAppointment.date.getFullYear() &&
      apt.time === extractedAppointment.time
    );

    if (hasConflict) {
      responseMessage += '\n\n⚠️ Detectei um possível conflito de horário. Posso sugerir horários alternativos.';
      
      suggestedActions = [
        'Escolher outro horário',
        'Ver horários disponíveis',
        'Confirmar mesmo assim'
      ];
    } else {
      responseMessage += '\n\n📋 **Detalhes do agendamento:**';
      responseMessage += `\n• **Título:** ${extractedAppointment.title}`;
      responseMessage += `\n• **Data:** ${extractedAppointment.date.toLocaleDateString('pt-BR')}`;
      if (extractedAppointment.time) {
        responseMessage += `\n• **Horário:** ${extractedAppointment.time}`;
      }
      responseMessage += `\n• **Confiança:** ${Math.round(extractedAppointment.confidence * 100)}%`;
      
      if (extractedAppointment.confidence > 0.8) {
        responseMessage += '\n\n✨ Agendamento criado automaticamente!';
      } else {
        responseMessage += '\n\n🔄 Confirma essas informações?';
        suggestedActions = ['Confirmar agendamento', 'Fazer ajustes', 'Cancelar'];
      }
    }
  } else {
    responseMessage = '🤔 Entendi parte da sua solicitação, mas preciso de mais detalhes.';
    
    responseMessage += '\n\n📝 **O que consegui identificar:**';
    if (extractedAppointment.title && extractedAppointment.title !== 'Novo agendamento') {
      responseMessage += `\n• Assunto: ${extractedAppointment.title}`;
    }
    responseMessage += `\n• Data: ${extractedAppointment.date.toLocaleDateString('pt-BR')}`;
    if (extractedAppointment.time) {
      responseMessage += `\n• Horário: ${extractedAppointment.time}`;
    }
    
    responseMessage += '\n\n❓ **O que posso melhorar:**';
    if (!extractedAppointment.time) {
      responseMessage += '\n• Especificar o horário';
    }
    if (extractedAppointment.title === 'Novo agendamento') {
      responseMessage += '\n• Detalhar o assunto do compromisso';
    }
    
    suggestedActions = [
      'Fornecer mais detalhes',
      'Especificar horário',
      'Reformular pedido'
    ];
  }

  return {
    message: responseMessage,
    extractedAppointment,
    suggestedActions
  };
};
