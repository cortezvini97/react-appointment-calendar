import { CalendarDay, Appointment, Holiday, DisabledDate } from './types';

/**
 * Cria uma data local com meses intuitivos (1-12) ao invés da indexação JavaScript (0-11)
 */
export const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day); // Subtrai 1 para converter para indexação JS
};

/**
 * Cria uma data local a partir de ano, mês e dia para evitar problemas de fuso horário
 */
export const createLocalDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day); // month - 1 porque o mês no JavaScript é 0-indexado
};

/**
 * Cria uma data local a partir de uma string no formato YYYY-MM-DD
 */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return createLocalDate(year, month, day);
};

/**
 * Obtém o primeiro dia do mês
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtém o último dia do mês
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Obtém o primeiro dia da semana para o calendário (domingo anterior se necessário)
 */
export const getFirstDayOfCalendar = (date: Date): Date => {
  const firstDay = getFirstDayOfMonth(date);
  const dayOfWeek = firstDay.getDay();
  return new Date(firstDay.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
};

/**
 * Obtém o último dia da semana para o calendário (sábado posterior se necessário)
 */
export const getLastDayOfCalendar = (date: Date): Date => {
  const lastDay = getLastDayOfMonth(date);
  const dayOfWeek = lastDay.getDay();
  const daysToAdd = 6 - dayOfWeek;
  return new Date(lastDay.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};

/**
 * Verifica se uma data é do passado
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

/**
 * Verifica se duas datas são do mesmo dia
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Verifica se a data é sábado
 */
export const isSaturday = (date: Date): boolean => {
  return date.getDay() === 6;
};

/**
 * Verifica se a data é domingo
 */
export const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};

/**
 * Verifica se a data é hoje
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * Verifica se uma data é feriado
 */
export const isHoliday = (date: Date, holidays: Holiday[] | null): { isHoliday: boolean; label?: string } => {
  if (!holidays || holidays.length === 0) {
    return { isHoliday: false };
  }

  const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  
  const holiday = holidays.find(h => h.date === dateString);
  
  return {
    isHoliday: !!holiday,
    label: holiday?.label
  };
};

/**
 * Verifica se uma data está na lista de datas desabilitadas
 */
export const isDisabledDate = (date: Date, disabledDates: DisabledDate[] | null): { isDisabled: boolean; label?: string } => {
  if (!disabledDates || disabledDates.length === 0) {
    return { isDisabled: false };
  }
  
  const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  const disabledDate = disabledDates.find(d => d.date === dateString);
  
  return {
    isDisabled: !!disabledDate,
    label: disabledDate?.label
  };
};

/**
 * Gera os dias do calendário para um mês específico
 */
export const generateCalendarDays = (
  currentDate: Date,
  appointments: Appointment[],
  maxAppointmentsPerDay: number,
  enableSaturday: boolean,
  enableSunday: boolean,
  workingHours?: string | null,
  workingHoursCurrentDayOnly?: boolean,
  holidays?: Holiday[] | null,
  allowHolidayBooking?: boolean,
  disabledDates?: DisabledDate[] | null,
  christianHolidays?: Holiday[] | null,
  allowChristianHolidayBooking?: boolean,
  blockDay?: boolean,
  hours?: string[],
  minTime?: number
): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstDay = getFirstDayOfCalendar(currentDate);
  const lastDay = getLastDayOfCalendar(currentDate);

  let currentDay = new Date(firstDay);
  
  while (currentDay <= lastDay) {
    const dayAppointments = appointments.filter(appointment =>
      isSameDay(appointment.date, currentDay)
    );    
    
    // Calcular maxAppointmentsPerDay dinamicamente quando hours é fornecido
    let effectiveMaxAppointments = maxAppointmentsPerDay;
    let isMaxReached = false;
    
    if (hours && hours.length > 0 && minTime !== undefined) {
      // Para horários específicos, verificar quantos horários ainda estão disponíveis
      const availableSlots = calculateMaxAppointmentsFromHours(hours, dayAppointments, minTime, currentDay);
      isMaxReached = availableSlots <= 0;
      effectiveMaxAppointments = hours.length; // Valor nominal para compatibilidade
    } else {
      // Lógica tradicional
      isMaxReached = dayAppointments.length >= effectiveMaxAppointments;
    }
    
    const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
    const isPast = isPastDate(currentDay);
    const isSat = isSaturday(currentDay);
    const isSun = isSunday(currentDay);
    
    // Combinar feriados regulares com feriados cristãos
    const combinedHolidays = combineHolidays(holidays, christianHolidays);
    
    // Verificar se é feriado (regular ou cristão)
    const holidayInfo = isHoliday(currentDay, combinedHolidays);
    
    // Verificar se é especificamente um feriado cristão
    const christianHolidayInfo = isHoliday(currentDay, christianHolidays || null);
    
    // Verificar se é data desabilitada
    const disabledDateInfo = isDisabledDate(currentDay, disabledDates || null);
    
    // Verificar se deve desabilitar por horário de funcionamento
    let isWorkingHoursDisabled = false;
    if (workingHours && workingHoursCurrentDayOnly && !isWithinWorkingHours(workingHours)) {
      // Se workingHoursCurrentDayOnly é true e estamos fora do horário, desabilitar apenas hoje
      const today = new Date();
      const isToday = currentDay.getFullYear() === today.getFullYear() &&
                     currentDay.getMonth() === today.getMonth() &&
                     currentDay.getDate() === today.getDate();
      isWorkingHoursDisabled = isToday;    }
    
    // Lógica de desabilitação de feriados
    let isHolidayDisabled = false;
    if (holidayInfo.isHoliday) {
      if (christianHolidayInfo.isHoliday) {
        // É um feriado cristão - usa allowChristianHolidayBooking
        isHolidayDisabled = !allowChristianHolidayBooking;
      } else {
        // É um feriado regular - usa allowHolidayBooking
        isHolidayDisabled = !allowHolidayBooking;
      }
    }
      const isDisabled = isPast || 
                      (!enableSaturday && isSat) || 
                      (!enableSunday && isSun) ||
                      (blockDay !== false && isMaxReached) ||
                      isWorkingHoursDisabled ||
                      isHolidayDisabled ||
                      disabledDateInfo.isDisabled;

    days.push({
      date: new Date(currentDay),
      isCurrentMonth,
      isPast,
      isDisabled,
      appointments: dayAppointments,
      isHoliday: holidayInfo.isHoliday,
      holidayLabel: holidayInfo.label,
      isDisabledDate: disabledDateInfo.isDisabled,
      disabledDateLabel: disabledDateInfo.label,
    });

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return days;
};

/**
 * Formata uma data para string legível
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Obtém o nome do mês em português
 */
export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', { month: 'long' });
};

/**
 * Obtém o ano
 */
export const getYear = (date: Date): number => {
  return date.getFullYear();
};

/**
 * Navega para o mês anterior
 */
export const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

/**
 * Navega para o próximo mês
 */
export const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

/**
 * Valida se um horário está no formato correto (HH:mm-HH:mm)
 */
export const isValidWorkingHoursFormat = (workingHours: string): boolean => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(workingHours);
};

/**
 * Verifica se o horário atual está dentro do horário de funcionamento
 */
export const isWithinWorkingHours = (workingHours: string): boolean => {
  if (!workingHours || !isValidWorkingHoursFormat(workingHours)) {
    return true; // Se não há restrição ou formato inválido, considera como dentro do horário
  }

  const [startTime, endTime] = workingHours.split('-');
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

/**
 * Gera mensagem de status do horário de funcionamento
 */
export const getWorkingHoursMessage = (workingHours: string): string => {
  if (!workingHours || !isValidWorkingHoursFormat(workingHours)) {
    return 'Horário de funcionamento não definido';
  }

  const [startTime, endTime] = workingHours.split('-');
  const isOpen = isWithinWorkingHours(workingHours);
  const status = isOpen ? 'Aberto agora' : 'Fechado agora';
  
  return `Horário de funcionamento: ${startTime} às ${endTime} (${status})`;
};

// ============= FUNÇÕES DE HORÁRIOS =============

/**
 * Converte string de horário "HH:mm" para minutos desde meia-noite
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Converte minutos desde meia-noite para string "HH:mm"
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Verifica se dois horários conflitam baseado na tolerância
 */
export const timesConflict = (time1: string, time2: string, minTime: number): boolean => {
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);
  return Math.abs(minutes1 - minutes2) < minTime;
};

/**
 * Calcula horários disponíveis baseado nos agendamentos existentes e tolerância
 */
export const getAvailableTimeSlots = (
  allHours: string[],
  existingAppointments: Appointment[],
  minTime: number = 0,
  selectedDate?: Date
): { time: string; isAvailable: boolean; conflictsWith?: string[]; isPast?: boolean }[] => {
  const existingTimes = existingAppointments
    .map(apt => apt.time)
    .filter(time => time !== undefined) as string[];

  const now = new Date();
  const isToday = selectedDate && isSameDay(selectedDate, now);

  return allHours.map(hour => {
    const conflicts = existingTimes.filter(existingTime => 
      timesConflict(hour, existingTime, minTime)
    );
    
    // Verifica se o horário já passou (apenas para o dia atual)
    let isPast = false;
    let isTooClose = false;
    if (isToday) {
      const hourMinutes = timeToMinutes(hour);
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      // Verifica se o horário já passou
      isPast = hourMinutes <= currentMinutes;
      
      // Verifica se o horário está muito próximo do atual (considerando tolerância)
      if (minTime > 0 && !isPast) {
        isTooClose = (hourMinutes - currentMinutes) < minTime;
      }
    }
    
    return {
      time: hour,
      isAvailable: conflicts.length === 0 && !isPast && !isTooClose,
      conflictsWith: conflicts.length > 0 ? conflicts : undefined,
      isPast: isPast || isTooClose
    };
  });
};

/**
 * Calcula o número máximo de agendamentos baseado nos horários disponíveis
 */
export const calculateMaxAppointmentsFromHours = (
  hours: string[],
  existingAppointments: Appointment[],
  minTime: number = 0,
  selectedDate?: Date
): number => {
  const availableSlots = getAvailableTimeSlots(hours, existingAppointments, minTime, selectedDate);
  return availableSlots.filter(slot => slot.isAvailable).length;
};

/**
 * Valida se um horário está disponível para agendamento
 */
export const isTimeSlotAvailable = (
  requestedTime: string,
  hours: string[],
  existingAppointments: Appointment[],
  minTime: number = 0
): boolean => {
  // Verifica se o horário está na lista de horários disponíveis
  if (!hours.includes(requestedTime)) {
    return false;
  }

  // Verifica conflitos com agendamentos existentes
  const existingTimes = existingAppointments
    .map(apt => apt.time)
    .filter(time => time !== undefined) as string[];

  return !existingTimes.some(existingTime => 
    timesConflict(requestedTime, existingTime, minTime)
  );
};

/**
 * Ordena horários em ordem cronológica
 */
export const sortTimes = (times: string[]): string[] => {
  return times.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
};

/**
 * Converte feriados cristãos (formato dd/mm/yyyy) para o formato usado pelo Calendar (dd/mm)
 */
export const convertChristianHolidaysToCalendarFormat = (christianHolidays: Array<{label: string, date: string}>): Holiday[] => {
  return christianHolidays.map(holiday => ({
    label: holiday.label,
    date: holiday.date.substring(0, 5) // pega apenas DD/MM
  }));
};

/**
 * Verifica se uma data é um feriado cristão
 */
export const isChristianHoliday = (
  date: Date, 
  christianHolidays: Array<{label: string, date: string}>
): {isHoliday: boolean, label?: string} => {
  const dateStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  
  const holiday = christianHolidays.find(h => h.date === dateStr);
  
  return {
    isHoliday: !!holiday,
    label: holiday?.label
  };
};

/**
 * Combina feriados regulares com feriados cristãos
 */
export const combineHolidays = (
  regularHolidays: Holiday[] | null | undefined,
  christianHolidays: Holiday[] | null | undefined
): Holiday[] => {
  const combined: Holiday[] = [];
  
  if (regularHolidays) {
    combined.push(...regularHolidays);
  }
  
  if (christianHolidays) {
    combined.push(...christianHolidays);
  }
  
  // Remove duplicatas baseado na data
  const uniqueHolidays = combined.filter((holiday, index, self) => 
    index === self.findIndex(h => h.date === holiday.date)
  );
  
  return uniqueHolidays;
};

/**
 * Verifica se um agendamento deve ser bloqueado baseado no horário de funcionamento
 */
export const shouldBlockAppointment = (
  workingHours: string | null,
  date: Date,
  workingHoursCurrentDayOnly: boolean = false
): boolean => {
  if (!workingHours) {
    return false;
  }

  // Se workingHoursCurrentDayOnly é true, só verifica para o dia atual
  if (workingHoursCurrentDayOnly && !isToday(date)) {
    return false;
  }

  // Verifica se está fora do horário de funcionamento
  return !isWithinWorkingHours(workingHours);
};
