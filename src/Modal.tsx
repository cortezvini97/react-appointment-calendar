import * as React from 'react';
import { ModalProps } from './types';
import './Modal.css';

const DefaultForm: React.FC<{
  date: Date;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ date, onSubmit, onCancel }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        date
      });
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

      <div className="calendar-form-actions">
        <button type="button" onClick={onCancel} className="calendar-btn calendar-btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="calendar-btn calendar-btn-primary">
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
  renderForm
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
        </div>

        <div className="calendar-modal-body">
          {appointments.length > 0 && (
            <div className="calendar-appointments-list">
              <h3>Agendamentos existentes:</h3>
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="calendar-appointment-item">
                    <strong>{appointment.title}</strong>
                    {appointment.data?.description && (
                      <p>{appointment.data.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="calendar-new-appointment">
            <h3>Novo Agendamento:</h3>
            {renderForm ? (
              renderForm(date, onSubmit, onClose)
            ) : (
              <DefaultForm date={date} onSubmit={onSubmit} onCancel={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
