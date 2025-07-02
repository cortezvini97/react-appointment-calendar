import * as React from 'react';
import { ModalProps } from './types';
import { getAvailableTimeSlots, sortTimes } from './utils';
import './Modal.css';

const DefaultForm: React.FC<{
  date: Date;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  hours?: string[];
  tolerance?: number;
  appointments?: any[];
}> = ({ date, onSubmit, onCancel, hours, tolerance = 0, appointments = [] }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');

  // Calcula horários disponíveis se hours estiver definido
  const timeSlotInfo = React.useMemo(() => {
    if (!hours || hours.length === 0) {
      return null;
    }
    
    const timeSlots = getAvailableTimeSlots(hours, appointments, tolerance, date);
    const availableSlots = timeSlots.filter(slot => slot.isAvailable);
    const pastSlots = timeSlots.filter(slot => slot.isPast);
    const conflictSlots = timeSlots.filter(slot => slot.conflictsWith && slot.conflictsWith.length > 0);
    
    return {
      available: sortTimes(availableSlots.map(slot => slot.time)),
      past: pastSlots.length,
      conflicts: conflictSlots.length,
      total: timeSlots.length
    };
  }, [hours, appointments, tolerance, date]);

  const availableTimeSlots = timeSlotInfo?.available || null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && (!hours || selectedTime)) {
      const submissionData = {
        title: title.trim(),
        description: description.trim(),
        date,
        ...(hours && selectedTime && { time: selectedTime })
      };
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="calendar-modal-form">
      <div className="calendar-form-group">
        <label htmlFor="title">Título do Agendamento:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="calendar-form-input"
          placeholder="Digite o título do agendamento"
        />
      </div>
      
      <div className="calendar-form-group">
        <label htmlFor="description">Descrição (opcional):</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="calendar-form-textarea"
          placeholder="Digite uma descrição"
          rows={3}
        />
      </div>

      {/* Campo de horário - só aparece se hours estiver definido */}
      {hours && hours.length > 0 && (
        <div className="calendar-form-group">
          <label htmlFor="time">Horário:</label>
          {availableTimeSlots && availableTimeSlots.length > 0 ? (
            <select
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="calendar-form-select"
            >
              <option value="">Selecione um horário</option>
              {availableTimeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          ) : (
            <div className="calendar-no-times-available">
              <p>Não há horários disponíveis para este dia.</p>
              <small>
                {timeSlotInfo && (
                  <>
                    Total de horários: {timeSlotInfo.total} | 
                    {timeSlotInfo.past > 0 && ` Já passaram: ${timeSlotInfo.past} |`}
                    {timeSlotInfo.conflicts > 0 && ` Conflitos: ${timeSlotInfo.conflicts} |`}
                    {tolerance > 0 && ` Tolerância: ${tolerance} minutos`}
                  </>
                )}
              </small>
            </div>
          )}
        </div>
      )}

      <div className="calendar-form-actions">
        <button type="button" onClick={onCancel} className="calendar-btn calendar-btn-cancel">
          Cancelar
        </button>
        <button 
          type="submit" 
          className="calendar-btn calendar-btn-primary"
          disabled={hours && hours.length > 0 && (!availableTimeSlots || availableTimeSlots.length === 0)}
        >
          Agendar
        </button>
      </div>
    </form>
  );
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  date,
  appointments,
  onSubmit,
  renderForm,
  showExistingEvents = true,
  args,
  hours,
  tolerance
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="calendar-modal-backdrop" onClick={handleBackdropClick}>
      <div className="calendar-modal">
        <div className="calendar-modal-header">
          <h2>Agendamento para {formatDate(date)}</h2>
          <button
            className="calendar-modal-close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>        <div className="calendar-modal-body">
          {showExistingEvents && appointments.length > 0 && (
            <div className="calendar-appointments-list">
              <h3>Agendamentos existentes:</h3>
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="calendar-appointment-item">
                    <strong>{appointment.title}</strong>
                    {appointment.time && <span className="appointment-time"> - {appointment.time}</span>}
                    {appointment.data?.description && (
                      <p>{appointment.data.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}          <div className="calendar-new-appointment">
            <h3>Novo Agendamento:</h3>
            {renderForm ? (
              renderForm(date, onSubmit, onClose, args)
            ) : (
              <DefaultForm 
                date={date} 
                onSubmit={onSubmit} 
                onCancel={onClose} 
                hours={hours}
                tolerance={tolerance}
                appointments={appointments}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
