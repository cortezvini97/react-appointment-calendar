import * as React from 'react';

export interface ThemeColor {
  color_header_top?: string | null;
  color_header_bottom?: string | null;
  color_font_header?: string | null;
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  data?: any;
  time?: string; // Horário do agendamento no formato "HH:mm"
}

export interface TimeSlot {
  time: string; // Horário no formato "HH:mm"
  isAvailable: boolean;
  conflictsWith?: string[]; // Horários que conflitam devido à tolerância
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  appointment?: Appointment; // Agendamento extraído da mensagem (se houver)
}

export interface IAResponse {
  message: string;
  extractedAppointment?: {
    title: string;
    date: Date;
    time?: string;
    confidence: number; // 0-1
  };
  suggestedActions?: string[];
}

export interface Holiday {
  label: string;
  date: string; // formato: "DD/MM"
}

export interface DisabledDate {
  label: string;
  date: string; // formato: "DD/MM/YYYY"
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isPast: boolean;
  isDisabled: boolean;
  appointments: Appointment[];
  isHoliday?: boolean;
  holidayLabel?: string;
  isDisabledDate?: boolean;
  disabledDateLabel?: string;
}

export interface CalendarProps {  /**
   * Data atual do calendário (aceita Date ou string no formato "YYYY-MM-DD")
   */
  currentDate?: Date | string;
  
  /**
   * Lista de agendamentos
   */
  appointments?: Appointment[];
  
  /**
   * Máximo de agendamentos por dia
   */
  maxAppointmentsPerDay?: number;
  
  /**
   * Horários específicos disponíveis para agendamento (formato: ["08:00", "09:00", "10:00"])
   * Quando definido, substitui maxAppointmentsPerDay pelo tamanho do array
   */
  hours?: string[];
  
  /**
   * Tolerância em minutos para conflito de horários (padrão: 0)
   * Ex: minTime=30 com horário "08:00" bloqueia agendamentos de 07:30 às 08:30
   */
  minTime?: number;
  
  /**
   * Bloqueia o dia quando excede maxAppointmentsPerDay (padrão: true)
   * Se false, permite abrir o modal mesmo excedendo o limite
   */
  blockDay?: boolean;
  
  /**
   * Lista de feriados
   */
  holidays?: Holiday[] | null;
  
  /**
   * Permite agendamentos em feriados (padrão: false)
   */
  allowHolidayBooking?: boolean;
    /**
   * Habilita feriados móveis automáticos (padrão: true)
   * Quando habilitado, adiciona automaticamente feriados como Páscoa, Carnaval, etc.
   */
  enableChristianHolidays?: boolean;
  
  /**
   * Permite agendamentos em feriados móveis automáticos (padrão: false)
   * Esta opção funciona independente de allowHolidayBooking
   */
  allowChristianHolidayBooking?: boolean;
    /**
   * Permite navegação para meses anteriores (padrão: true)
   * Se false, só permite navegar do mês atual para frente
   */
  previousMonths?: boolean;
  
  /**
   * Controla a exibição do botão de mês anterior quando previousMonths é false (padrão: false)
   * - true: Mostra o botão desabilitado quando previousMonths é false
   * - false: Oculta completamente o botão quando previousMonths é false
   */
  showDisabledPreviousButton?: boolean;
  
  /**
   * Lista de datas desabilitadas
   */
  disabledDates?: DisabledDate[] | null;
  
  /**
   * Habilitar agendamentos aos sábados
   */
  enableSaturday?: boolean;
  
  /**
   * Habilitar agendamentos aos domingos
   */
  enableSunday?: boolean;
  
  /**
   * Destacar eventos (padrão: true)
   */
  highlightEvents?: boolean;
    /**
   * Destacar dia atual (padrão: true)
   */
  highlightToday?: boolean;
  
  /**
   * Estilo do destaque do dia atual (padrão: false)
   * - false: Estilo padrão com fundo amarelo
   * - true: Estilo de círculo ao redor do número
   */
  todayCircleStyle?: boolean;
    /**
   * Mostrar vagas disponíveis no tooltip (padrão: true)
   */
  showAvailableSlots?: boolean;
  
  /**
   * Exibir eventos existentes no modal (padrão: true)
   * Se false, o modal não mostrará a seção de "Agendamentos existentes"
   */
  showExistingEvents?: boolean;
    /**
   * Horário de funcionamento (formato: "HH:mm-HH:mm", ex: "08:00-18:00")
   * Quando definido, agendamentos só podem ser feitos dentro deste horário
   */
  workingHours?: string | null;
  
  /**
   * Controla o comportamento do bloqueio de horário de funcionamento
   * - false (padrão): Bloqueia agendamento em qualquer data se estiver fora do horário
   * - true: Bloqueia agendamento apenas na data atual se estiver fora do horário,
   *         permitindo agendamentos em datas futuras independente do horário atual
   */
  workingHoursCurrentDayOnly?: boolean;
    /**
   * Callback ao clicar em um dia
   */
  onDayClick?: (date: Date, appointments: Appointment[]) => void;
    /**
   * Callback ao submeter o formulário do modal
   */  
  onSubmit?: (data: any, date: Date, event?: React.FormEvent) => void;
    /**
   * Renderizar formulário customizado no modal
   */
  renderForm?: (date: Date, onSubmit: (data: any, event?: React.FormEvent) => void, onCancel: () => void, args?: any) => React.ReactNode;
  
  /**
   * Argumentos adicionais para passar ao formulário customizado
   */
  args?: any;
  
  /**
   * Estilo customizado do calendário
   */
  style?: any;
  
  /**
   * Classe CSS customizada
   */
  className?: string;
  
  /**
   * Cores do tema do calendário (padrão: tema claro)
   */
  themeColors?: ThemeColor;
  
  /**
   * Habilita o assistente de IA para agendamento inteligente (padrão: false)
   * Quando habilitado, exibe uma área de chat abaixo do calendário
   */
  IAResource?: boolean;
  
  /**
   * Callback chamado quando a IA extrai um agendamento da conversa
   */
  onIAAppointmentExtracted?: (appointment: {
    title: string;
    date: Date;
    time?: string;
    confidence: number;
  }) => void;
  
  /**
   * Callback customizado para processar prompts da IA (padrão: usa IA interna)
   * Recebe o prompt do usuário e deve retornar uma resposta da IA
   * Se não fornecido, null, undefined ou não retornar valor, usa o sistema padrão
   */
  onIACallback?: (prompt: string) => string | IAResponse | Promise<string | IAResponse> | null | undefined | void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  appointments: Appointment[];
  onSubmit: (data: any, event?: React.FormEvent) => void;
  renderForm?: (date: Date, onSubmit: (data: any, event?: React.FormEvent) => void, onCancel: () => void, args?: any) => React.ReactNode;
  showExistingEvents?: boolean;
  args?: any;
  hours?: string[];
  minTime?: number;
}
