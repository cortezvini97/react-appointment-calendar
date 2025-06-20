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
  blockDay?: boolean
): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const firstDay = getFirstDayOfCalendar(currentDate);
  const lastDay = getLastDayOfCalendar(currentDate);

  let currentDay = new Date(firstDay);
  
  while (currentDay <= lastDay) {
    const dayAppointments = appointments.filter(appointment =>
      isSameDay(appointment.date, currentDay)
    );    const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
    const isPast = isPastDate(currentDay);
    const isSat = isSaturday(currentDay);
    const isSun = isSunday(currentDay);
    const isMaxReached = dayAppointments.length >= maxAppointmentsPerDay;
    
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
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(workingHours);
};

/**
 * Converte horário string para minutos desde meia-noite
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Verifica se o horário atual está dentro do horário de funcionamento
 */
export const isWithinWorkingHours = (workingHours: string | null): boolean => {
  if (!workingHours || typeof workingHours !== 'string') return true; // Se não há horário definido, sempre permite
  
  if (!isValidWorkingHoursFormat(workingHours)) {
    console.warn(`Formato de horário inválido: ${workingHours}. Use o formato HH:mm-HH:mm`);
    return true; // Em caso de formato inválido, permite agendamento
  }
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const currentMinutes = timeToMinutes(currentTime);
  
  const [startTime, endTime] = workingHours.split('-');
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  
  // Verifica se é horário noturno (ex: 22:00-06:00)
  if (endMinutes < startMinutes) {
    // Horário atravessa a meia-noite
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  } else {
    // Horário normal no mesmo dia
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }
};

/**
 * Obtém mensagem de horário de funcionamento para tooltip
 */
export const getWorkingHoursMessage = (workingHours: string | null): string => {
  if (!workingHours || !workingHours.includes('-')) return '';
  
  const isOpen = isWithinWorkingHours(workingHours);
  const parts = workingHours.split('-');
  
  if (parts.length !== 2) return '';
  
  const [startTime, endTime] = parts;
  
  if (isOpen) {
    return `Horário de funcionamento: ${startTime} às ${endTime} (Aberto agora)`;
  } else {
    return `Horário de funcionamento: ${startTime} às ${endTime} (Fechado agora)`;
  }
};

/**
 * Verifica se deve bloquear agendamento baseado no horário de funcionamento e configuração
 */
export const shouldBlockAppointment = (
  workingHours: string | null, 
  selectedDate: Date, 
  currentDayOnly: boolean = false
): boolean => {
  if (!workingHours) return false; // Se não há horário definido, não bloqueia
  
  if (!isValidWorkingHoursFormat(workingHours)) {
    console.warn(`Formato de horário inválido: ${workingHours}. Use o formato HH:mm-HH:mm`);
    return false; // Em caso de formato inválido, não bloqueia
  }
  
  // Se está dentro do horário de funcionamento, não bloqueia
  if (isWithinWorkingHours(workingHours)) {
    return false;
  }
  
  // Se está fora do horário de funcionamento:
  if (currentDayOnly) {
    // Bloqueia apenas se for o dia atual
    const today = new Date();
    const isToday = selectedDate.getFullYear() === today.getFullYear() &&
                   selectedDate.getMonth() === today.getMonth() &&
                   selectedDate.getDate() === today.getDate();
    return isToday;
  } else {
    // Bloqueia independente da data
    return true;
  }
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
