import * as React from 'react';
import { CalendarProps, CalendarDay, Appointment, ThemeColor } from './types';
import { Modal } from './Modal';
import HolidayCalculator from './HolidayCalculator';
import {
  generateCalendarDays,
  getMonthName,
  getYear,
  getPreviousMonth,
  getNextMonth,
  formatDate,
  isToday,
  isSunday,
  isWithinWorkingHours,
  getWorkingHoursMessage,
  shouldBlockAppointment,
  parseLocalDate,
  createDate,
  convertChristianHolidaysToCalendarFormat,
  calculateMaxAppointmentsFromHours,
  sortTimes,
} from './utils';
import './Calendar.css';
import './CalendarTheme.css';

export const Calendar: React.FC<CalendarProps> = ({  currentDate = new Date(),
  appointments = [],
  maxAppointmentsPerDay = 3,
  blockDay = true,
  hours,
  minTime = 0,
  holidays = null,
  allowHolidayBooking = false,
  enableChristianHolidays = true,
  allowChristianHolidayBooking = false,
  previousMonths = true,
  showDisabledPreviousButton = false,
  disabledDates = null,
  enableSaturday = false,  enableSunday = false,
  highlightEvents = true,
  highlightToday = true,
  todayCircleStyle = false,
  showAvailableSlots = true,
  showExistingEvents = true,
  workingHours = null,
  workingHoursCurrentDayOnly = false,
  onDayClick,  onSubmit,
  renderForm,
  args,
  style,
  className,
  themeColors = { color_header_top: null, color_header_bottom: null, color_font_header: null },
}) => {// Processa currentDate: converte string para Date se necessário
  // Suporta formatos como "2025-06-01" ou datas criadas com createDate()
  const processedCurrentDate = React.useMemo(() => {
    if (typeof currentDate === 'string') {
      // Verifica se é formato ISO (YYYY-MM-DD)
      const isoDateMatch = currentDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (isoDateMatch) {
        const [, year, month, day] = isoDateMatch;
        // Usa createDate para criar data de forma intuitiva (mês 1-12)
        return createDate(parseInt(year), parseInt(month), parseInt(day));
      }
      // Fallback para outros formatos
      return parseLocalDate(currentDate);
    }
    return currentDate || new Date();
  }, [currentDate]);

  const [selectedDate, setSelectedDate] = React.useState<Date>(processedCurrentDate);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalDate, setModalDate] = React.useState<Date | null>(null);
  const [modalAppointments, setModalAppointments] = React.useState<Appointment[]>([]);
  const [currentTime, setCurrentTime] = React.useState(new Date());  const [closedModalOpen, setClosedModalOpen] = React.useState(false);
  const [closedModalMessage, setClosedModalMessage] = React.useState('');
  // Verificar se deve aplicar tema customizado
  const isThemed = themeColors?.color_header_top || themeColors?.color_header_bottom || themeColors?.color_font_header;  // Funções para obter estilos inline dos elementos
  const getHeaderStyles = () => {
    if (!isThemed) return {};
    
    return {
      backgroundColor: themeColors?.color_header_top || '#7C3AED',
      color: themeColors?.color_font_header || 'white',
    };
  };

  const getWeekdaysStyles = () => {
    if (!isThemed) return {};
    
    return {
      backgroundColor: themeColors?.color_header_bottom || '#5B21B6',
    };
  };

  const getWeekdayStyles = () => {
    if (!isThemed) return {};
    
    return {
      backgroundColor: themeColors?.color_header_bottom || '#5B21B6',
      color: themeColors?.color_font_header || 'white',
    };
  };

  const getNavButtonStyles = () => {
    if (!isThemed) return {};
    
    return {
      color: themeColors?.color_font_header || 'white',
    };
  };

  const getTitleStyles = () => {
    if (!isThemed) return {};
    
    return {
      color: themeColors?.color_font_header || 'white',
    };
  };
  
  // Calcular feriados cristãos se habilitado
  const christianHolidays = React.useMemo(() => {
    if (!enableChristianHolidays) {
      return null;
    }
    
    const year = selectedDate.getFullYear();
    const movableHolidays = HolidayCalculator.calculateMovableHolidays(year, {
      includeChristianHolidays: true
    });
    
    return convertChristianHolidaysToCalendarFormat(movableHolidays);
  }, [enableChristianHolidays, selectedDate]);
  
  // Effect para atualizar o horário atual a cada 30 segundos
  React.useEffect(() => {
    if (!workingHours) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Atualiza a cada 10 segundos para ser mais responsivo durante testes

    return () => clearInterval(interval);
  }, [workingHours]);  // Memoizar o status de horário de funcionamento
  const workingHoursStatus = React.useMemo(() => {
    if (!workingHours) return null;
    
    return {
      isOpen: isWithinWorkingHours(workingHours),
      message: getWorkingHoursMessage(workingHours)
    };
  }, [workingHours, currentTime]);

  // Quando hours é fornecido, usar o maxAppointmentsPerDay original como fallback
  // O cálculo dinâmico será feito dentro de generateCalendarDays
  const effectiveMaxAppointments = maxAppointmentsPerDay;

  const calendarDays = React.useMemo(() => {
    return generateCalendarDays(
      selectedDate,
      appointments,
      effectiveMaxAppointments,
      enableSaturday,
      enableSunday,
      workingHours,
      workingHoursCurrentDayOnly,
      holidays,
      allowHolidayBooking,
      disabledDates,
      christianHolidays,
      allowChristianHolidayBooking,
      blockDay,
      hours,
      minTime
    );
  }, [selectedDate, appointments, effectiveMaxAppointments, enableSaturday, enableSunday, workingHours, workingHoursCurrentDayOnly, holidays, allowHolidayBooking, disabledDates, christianHolidays, allowChristianHolidayBooking, blockDay, hours, minTime]);const handleDayClick = (day: CalendarDay) => {
    if (day.isDisabled) return;

    // Verificar se deve bloquear agendamento baseado no horário de funcionamento
    if (shouldBlockAppointment(workingHours, day.date, workingHoursCurrentDayOnly)) {
      const [startTime, endTime] = workingHours!.split('-');
      const isCurrentDay = day.date.getFullYear() === new Date().getFullYear() &&
                          day.date.getMonth() === new Date().getMonth() &&
                          day.date.getDate() === new Date().getDate();
      
      let message = `Agendamentos só podem ser feitos durante o horário de funcionamento: ${startTime} às ${endTime}`;
      
      if (workingHoursCurrentDayOnly && isCurrentDay) {
        message += ` (Restrição aplicada apenas para hoje)`;
      }
      
      // Se workingHoursCurrentDayOnly é false, mostrar modal em vez de alert
      if (!workingHoursCurrentDayOnly) {
        setClosedModalMessage(message);
        setClosedModalOpen(true);
      } else {
        alert(message);
      }
      return;
    }

    setModalDate(day.date);
    setModalAppointments(day.appointments);
    setModalOpen(true);

    if (onDayClick) {
      onDayClick(day.date, day.appointments);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalDate(null);
    setModalAppointments([]);
  };  const handleFormSubmit = (data: any, event?: React.FormEvent) => {
    if (modalDate && onSubmit) {
      onSubmit(data, modalDate, event);
    }
    handleModalClose();
  };
  const handlePreviousMonth = () => {
    // Se previousMonths é false, verificar se o mês anterior seria no passado
    if (!previousMonths) {
      const today = new Date();
      const currentMonth = today.getFullYear() * 12 + today.getMonth();
      const selectedMonth = selectedDate.getFullYear() * 12 + selectedDate.getMonth();
      
      // Se o mês selecionado já é o mês atual ou anterior, não permitir voltar mais
      if (selectedMonth <= currentMonth) {
        return;
      }
    }
    
    setSelectedDate(getPreviousMonth(selectedDate));
  };

  const handleNextMonth = () => {
    setSelectedDate(getNextMonth(selectedDate));
  };
  // Verificar se o botão de mês anterior deve estar desabilitado
  const isPreviousMonthDisabled = () => {
    if (previousMonths) {
      return false; // Se previousMonths é true, nunca desabilitar
    }
    
    const today = new Date();
    const currentMonth = today.getFullYear() * 12 + today.getMonth();
    const selectedMonth = selectedDate.getFullYear() * 12 + selectedDate.getMonth();
    
    // Desabilitar se o mês selecionado é o mês atual ou anterior
    return selectedMonth <= currentMonth;
  };

  // Verificar se o botão de mês anterior deve ser exibido
  const shouldShowPreviousButton = () => {
    if (previousMonths) {
      return true; // Se previousMonths é true, sempre mostrar
    }
    
    // Se previousMonths é false, verificar a configuração showDisabledPreviousButton
    if (showDisabledPreviousButton) {
      return true; // Mostrar o botão desabilitado
    }
    
    // Se showDisabledPreviousButton é false, só mostrar se não estiver no mês atual
    const today = new Date();
    const currentMonth = today.getFullYear() * 12 + today.getMonth();
    const selectedMonth = selectedDate.getFullYear() * 12 + selectedDate.getMonth();
    
    return selectedMonth > currentMonth;
  };const getDayClassName = (day: CalendarDay): string => {
    const classes = ['calendar-day'];
    
    if (!day.isCurrentMonth) {
      classes.push('calendar-day-other-month');
    }
    
    if (day.isPast) {
      classes.push('calendar-day-past');
    }
    
    if (day.isDisabled) {
      classes.push('calendar-day-disabled');
    }
      // Destacar dia atual se habilitado
    if (highlightToday && isToday(day.date)) {
      if (todayCircleStyle) {
        classes.push('calendar-day-today-circle');
      } else {
        classes.push('calendar-day-today');
      }
    }
    
    // Verificar se é domingo para aplicar estilo especial
    if (isSunday(day.date)) {
      classes.push('calendar-day-sunday');
    }
    
    // Destacar eventos se habilitado
    if (highlightEvents && day.appointments.length > 0) {
      classes.push('calendar-day-has-appointments');
    }
      // Aplicar estilo vermelho para feriados (independente se permite agendamento ou não)
    if (day.isHoliday) {
      classes.push('calendar-day-holiday');
    }
    
    // Aplicar estilo roxo para datas desabilitadas
    if (day.isDisabledDate) {
      classes.push('calendar-day-disabled-date');
    }
    
    // Remover a classe calendar-day-full para maxAppointmentsPerDay
    // Agora apenas desabilita o dia sem estilo vermelho
    
    return classes.join(' ');
  };  const getTooltipText = (day: CalendarDay): string => {
    let tooltip = formatDate(day.date);
    
    if (day.isHoliday && day.holidayLabel) {
      tooltip += ` - ${day.holidayLabel}`;
    }
    
    if (day.isDisabledDate && day.disabledDateLabel) {
      tooltip += ` - ${day.disabledDateLabel}`;
    }
    
    if (showAvailableSlots && !day.isDisabled && !day.isPast) {
      let availableSlots: number;
      
      if (hours && hours.length > 0 && minTime !== undefined) {
        // Calcular vagas baseado nos horários disponíveis
        availableSlots = calculateMaxAppointmentsFromHours(hours, day.appointments, minTime, day.date);
      } else {
        // Usar lógica tradicional
        availableSlots = maxAppointmentsPerDay - day.appointments.length;
      }
      
      tooltip += ` - ${availableSlots} vagas disponíveis`;
    }
    
    if (day.isDisabled) {
      if (day.isHoliday && !allowHolidayBooking) {
        tooltip += ' - Feriado (agendamentos não permitidos)';
      } else if (day.isDisabledDate && !disabledDates) {
        tooltip += ' - Data desabilitada';
      } else {
        // Verificar se é por limite de agendamentos (dinâmico ou fixo)
        let maxForDay: number;
        if (hours && hours.length > 0 && minTime !== undefined) {
          maxForDay = calculateMaxAppointmentsFromHours(hours, [], minTime, day.date);
        } else {
          maxForDay = maxAppointmentsPerDay;
        }
        
        if (day.appointments.length >= maxForDay) {
          tooltip += ' - Limite de agendamentos atingido';
        } else {
          tooltip += ' - Não disponível';
        }
      }
    }
    
    return tooltip;
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];  return (    <div 
      className={`calendar-container ${isThemed ? 'calendar-themed' : ''} ${className || ''}`} 
      {...(style && { style })}
    >
      {/* Horário de funcionamento acima do header (apenas para tema customizado) */}
      {isThemed && workingHoursStatus && !workingHoursCurrentDayOnly && (
        <div className={`calendar-working-hours-info ${workingHoursStatus.isOpen ? '' : 'closed'}`}>
          {workingHoursStatus.message}
        </div>
      )}

      <div className="calendar-header" style={getHeaderStyles()}>
        {shouldShowPreviousButton() && (
          <button
            className="calendar-nav-button"
            onClick={handlePreviousMonth}
            aria-label="Mês anterior"
            disabled={isPreviousMonthDisabled()}
            style={getNavButtonStyles()}
          >
            ‹
          </button>
        )}
        
        <h2 className="calendar-title" style={getTitleStyles()}>
          {getMonthName(selectedDate)} {getYear(selectedDate)}
        </h2>
        
        <button
          className="calendar-nav-button"
          onClick={handleNextMonth}
          aria-label="Próximo mês"
          style={getNavButtonStyles()}
        >
          ›
        </button>
      </div>

      {/* Horário de funcionamento entre header e semanas (apenas para tema padrão) */}
      {!isThemed && workingHoursStatus && !workingHoursCurrentDayOnly && (
        <div className={`calendar-working-hours-info ${workingHoursStatus.isOpen ? '' : 'closed'}`}>
          {workingHoursStatus.message}
        </div>
      )}<div className="calendar-weekdays" style={getWeekdaysStyles()}>
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday" style={getWeekdayStyles()}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            className={getDayClassName(day)}
            onClick={() => handleDayClick(day)}
            disabled={day.isDisabled}
            title={getTooltipText(day)}
          >            <span className="calendar-day-number">
              {day.date.getDate()}
            </span>
            {highlightEvents && day.appointments.length > 0 && (
              <div className="calendar-appointments-indicator">
                <span className="calendar-appointments-count">
                  {day.appointments.length}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>      {modalOpen && modalDate && (
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          date={modalDate}
          appointments={modalAppointments}
          onSubmit={handleFormSubmit}
          renderForm={renderForm}
          showExistingEvents={showExistingEvents}
          args={args}
          hours={hours}
          minTime={minTime}
        />
      )}

      {closedModalOpen && (
        <Modal
          isOpen={closedModalOpen}
          onClose={() => setClosedModalOpen(false)}
          date={new Date()}
          appointments={[]}
          onSubmit={() => {}}
          renderForm={() => (
            <div>
              <h3>🔒 Horário de Funcionamento</h3>
              <p>{closedModalMessage}</p>
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <button 
                  onClick={() => setClosedModalOpen(false)}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Entendi
                </button>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default Calendar;
