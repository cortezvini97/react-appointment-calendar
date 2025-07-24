import React, { useState } from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment, IAResponse } from 'react-appointment-calendar';
import './IAAppointmentExample.css';

interface AppointmentData {
  title: string;
  description?: string;
  time?: string;
}

const IAAppointmentExample: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião de planejamento',
      date: new Date(), // Hoje
      time: '10:00',
      data: { description: 'Reunião de planejamento trimestral' }
    },
    {
      id: '2',
      title: 'Consulta Dr. Silva',
      date: new Date(2025, 6, 25), // 25 de julho
      time: '14:30',
      data: { description: 'Consulta médica de rotina' }
    }
  ]);

  // Horários disponíveis para agendamento
  const availableHours = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const handleSubmit = (data: AppointmentData, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      time: data.time,
      data: {
        description: data.description
      }
    };

    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento criado:', newAppointment);
  };

  const handleIAAppointmentExtracted = (iaAppointment: {
    title: string;
    date: Date;
    time?: string;
    confidence: number;
  }) => {
    console.log('IA extraiu agendamento:', iaAppointment);
    
    // Auto-criar agendamento se a confiança for alta
    if (iaAppointment.confidence > 0.8) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: iaAppointment.title,
        date: iaAppointment.date,
        time: iaAppointment.time,
        data: {
          source: 'ia-extraction',
          confidence: iaAppointment.confidence,
          auto_created: true
        }
      };

      setAppointments(prev => [...prev, newAppointment]);
      
      // Feedback visual
      alert(`✅ Agendamento criado automaticamente!\n\n${iaAppointment.title}\n${iaAppointment.date.toLocaleDateString('pt-BR')}${iaAppointment.time ? ` às ${iaAppointment.time}` : ''}\n\nConfiança: ${Math.round(iaAppointment.confidence * 100)}%`);
    }
  };

  // Callback customizado para processar prompts da IA
  const handleIACallback = (prompt: string) => {
    console.log('Processando prompt customizado:', prompt);
    
    // Exemplo 1: Detectar emergências
    if (prompt.toLowerCase().includes('emergência') || prompt.toLowerCase().includes('urgente')) {
      return {
        message: `🚨 Detectei que é uma situação urgente!\n\nPara emergências, entre em contato imediatamente:\n📞 Telefone: (11) 99999-9999\n⚡ WhatsApp: (11) 88888-8888\n\nSe não for uma emergência real, posso ajudá-lo a agendar normalmente. Me diga mais detalhes sobre o que precisa.`,
        extractedAppointment: undefined,
        suggestedActions: ['Ligar para emergência', 'Enviar WhatsApp', 'Continuar agendamento normal']
      };
    }
    
    // Exemplo 2: Detectar consultas médicas
    if (prompt.toLowerCase().includes('consulta') || prompt.toLowerCase().includes('médico') || prompt.toLowerCase().includes('doutor')) {
      return {
        message: `🏥 Identificei que você precisa de uma consulta médica.\n\nPara consultas médicas, recomendo:\n• Verificar se tem encaixe hoje\n• Preparar documentos (RG, carteirinha)\n• Chegar 15 minutos antes\n\nMe diga quando gostaria de agendar e eu verifico a disponibilidade!`,
        extractedAppointment: undefined,
        suggestedActions: ['Verificar encaixe hoje', 'Agendar consulta', 'Ver especialidades']
      };
    }
    
    // Exemplo 3: Saudações com respostas aleatórias (demonstrando randomização no callback)
    if (prompt.toLowerCase().includes('olá') || prompt.toLowerCase().includes('oi') || prompt.toLowerCase().includes('bom dia') || prompt.toLowerCase().includes('boa tarde')) {
      const saudacoes = [
        '👋 Olá! Que bom ter você aqui! Como posso ajudar com seus agendamentos?',
        '🌟 Oi! Pronto para organizar sua agenda? Me diga o que precisa!',
        '😊 Olá! Sou seu assistente pessoal de agendamentos. Vamos começar?',
        '🚀 Ei! Aqui é onde a mágica dos agendamentos acontece! O que vamos agendar hoje?'
      ];
      
      const saudacaoAleatoria = saudacoes[Math.floor(Math.random() * saudacoes.length)];
      
      return {
        message: saudacaoAleatoria + '\n\n💡 Experimente dizer algo como: "Agendar reunião amanhã às 14h"',
        extractedAppointment: undefined,
        suggestedActions: ['Agendar compromisso', 'Ver horários disponíveis', 'Explorar funcionalidades']
      };
    }
    
    // Para outros casos, usar o sistema padrão (retornar null/undefined)
    return null;
  };

  return (
    <div className="ia-example-container">
      <h2>🤖 Exemplo: Agendamento Inteligente com IA</h2>
      
      <div className="ia-info-section">
        <h3>💡 Como funciona:</h3>
        <ul>
          <li><strong>Chat Bot Inteligente:</strong> Use linguagem natural para criar agendamentos</li>
          <li><strong>Extração Automática:</strong> A IA identifica datas, horários e assuntos automaticamente</li>
          <li><strong>Validação de Conflitos:</strong> Verifica disponibilidade e sugere alternativas</li>
          <li><strong>Criação Automática:</strong> Agendamentos com alta confiança são criados automaticamente</li>
          <li><strong>Callback Customizado:</strong> Processa prompts específicos (ex: emergências) com lógica personalizada</li>
        </ul>
        
        <div className="example-prompts">
          <h4>🗣️ Exemplos de comandos que você pode usar:</h4>
          <div className="prompt-examples">
            <div className="prompt-example">
              "Quero agendar uma reunião na próxima segunda às 15h"
            </div>
            <div className="prompt-example">
              "Preciso marcar uma consulta médica para amanhã de manhã"
            </div>
            <div className="prompt-example">
              "É uma emergência! Preciso de atendimento urgente" ⚡
            </div>
            <div className="prompt-example">
              "Agendar compromisso com cliente dia 28 às 16:30"
            </div>
          </div>
        </div>
        
        <div className="callback-info">
          <h4>🎯 Callback Customizado em Ação:</h4>
          <p>Este exemplo demonstra o poder do <code>onIACallback</code>! O sistema padrão agora é direto e objetivo. Toda personalização (incluindo respostas aleatórias) fica no seu callback customizado.</p>
          <p><strong>Teste:</strong> "olá", "emergência", "consulta médica" ou agendamentos normais para ver diferentes comportamentos!</p>
        </div>
      </div>

      <Calendar
        appointments={appointments}
        hours={availableHours}
        minTime={30}
        onSubmit={handleSubmit}
        IAResource={true} // 🚀 Habilita o assistente IA
        onIAAppointmentExtracted={handleIAAppointmentExtracted}
        onIACallback={handleIACallback} // 🎯 Callback customizado para IA
        enableSaturday={true}
        enableSunday={false}
        showExistingEvents={true}
        highlightEvents={true}
        highlightToday={true}
        themeColors={{
          color_header_top: '#10b981',
          color_header_bottom: '#059669',
          color_font_header: '#ffffff'
        }}
      />

      <div className="appointments-summary">
        <h4>📋 Agendamentos criados ({appointments.length}):</h4>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado. Use o chat bot para criar alguns!</p>
        ) : (
          <div className="appointments-grid">
            {appointments.map(apt => (
              <div key={apt.id} className="appointment-card">
                <div className="appointment-header">
                  <strong>{apt.title}</strong>
                  {apt.data?.auto_created && (
                    <span className="auto-badge">🤖 Auto</span>
                  )}
                </div>
                <div className="appointment-details">
                  <div>📅 {apt.date.toLocaleDateString('pt-BR')}</div>
                  {apt.time && <div>⏰ {apt.time}</div>}
                  {apt.data?.confidence && (
                    <div>🎯 Confiança: {Math.round(apt.data.confidence * 100)}%</div>
                  )}
                </div>
                {apt.data?.description && (
                  <div className="appointment-description">
                    {apt.data.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IAAppointmentExample;
