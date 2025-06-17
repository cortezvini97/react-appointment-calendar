import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment, Holiday } from 'react-appointment-calendar';
import './HolidayBookingTest.css';

export const HolidayBookingTestExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta médica',
      date: new Date(2025, 5, 16), // 16 de junho
      data: { description: 'Consulta de rotina' }
    }
  ]);

  // Estado para controlar allowHolidayBooking
  const [allowHolidayBooking, setAllowHolidayBooking] = React.useState<boolean>(false);
  const [maxAppointments, setMaxAppointments] = React.useState<number>(3);

  // Lista de feriados com algumas datas próximas para testar
  const holidays: Holiday[] = [
    {
      label: "Independência do Brasil",
      date: "07/09"
    },
    {
      label: "Dia das Crianças",
      date: "12/10"
    },
    {
      label: "Natal",
      date: "25/12"
    },
    {
      label: "Ano Novo",
      date: "01/01"
    },
    // Adicionando uma data próxima para facilitar o teste
    {
      label: "Dia de Teste",
      date: "20/06"  // 20 de junho de 2025
    }
  ];

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', dayAppointments);
    console.log('allowHolidayBooking atual:', allowHolidayBooking);
  };

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title || 'Novo agendamento',
      date,
      data
    };

    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento criado:', newAppointment);
  };

  const renderForm = (date: Date, onSubmit: (data: any) => void, onCancel: () => void) => (
    <div className="form-container">
      <h3>Novo Agendamento - {date.toLocaleDateString('pt-BR')}</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
          title: formData.get('title'),
          description: formData.get('description'),
        };
        onSubmit(data);
      }}>
        <div className="form-field">
          <label>
            Título:
            <input name="title" type="text" required />
          </label>
        </div>
        <div className="form-field">
          <label>
            Descrição:
            <textarea name="description" rows={3} />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancelar</button>
          <button type="submit">Agendar</button>
        </div>
      </form>
    </div>
  );

  // Função para resetar agendamentos
  const resetAppointments = () => {
    setAppointments([
      {
        id: '1',
        title: 'Consulta médica',
        date: new Date(2025, 5, 16),
        data: { description: 'Consulta de rotina' }
      }
    ]);
  };

  return (
    <div className="test-container">
      <h1>🧪 Teste de allowHolidayBooking em Tempo Real</h1>
      
      <div className="controls-section">
        <h2>Controles de Teste</h2>
        
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={allowHolidayBooking}
              onChange={(e) => {
                console.log('Mudando allowHolidayBooking para:', e.target.checked);
                setAllowHolidayBooking(e.target.checked);
              }}
            />
            Permitir agendamentos em feriados
          </label>
        </div>

        <div className="control-group">
          <label>
            Máximo de agendamentos por dia:
            <select
              value={maxAppointments}
              onChange={(e) => setMaxAppointments(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <button onClick={resetAppointments}>
            Resetar Agendamentos
          </button>
        </div>
      </div>

      <div className="status-section">
        <h3>Status Atual</h3>
        <ul>
          <li><strong>Allow Holiday Booking:</strong> {allowHolidayBooking ? '✅ Permitido' : '❌ Bloqueado'}</li>
          <li><strong>Max Appointments:</strong> {maxAppointments}</li>
          <li><strong>Total de Agendamentos:</strong> {appointments.length}</li>
          <li><strong>Feriados Configurados:</strong> {holidays.length}</li>
        </ul>
      </div>

      <div className="instructions-section">
        <h3>Como Testar</h3>
        <ol>
          <li><strong>Feriados Bloqueados:</strong> Desmarque o checkbox acima. Tente clicar no dia 20/06 (Dia de Teste) - não deve abrir modal</li>
          <li><strong>Feriados Permitidos:</strong> Marque o checkbox acima. Clique no dia 20/06 - deve abrir modal normalmente</li>
          <li><strong>Limite de Agendamentos:</strong> Altere o máximo para 1 e tente criar agendamentos no dia 16/06</li>
          <li><strong>Tooltip:</strong> Passe o mouse sobre os dias para ver as informações</li>
          <li><strong>Console:</strong> Abra o console do navegador para ver os logs de debug</li>
        </ol>
      </div>

      <div className="calendar-section">
        <h3>Calendário</h3>        <div className="calendar-wrapper">
          <Calendar
            key={`holiday-${allowHolidayBooking}-${maxAppointments}`} // Force re-render for debugging
            appointments={appointments}
            maxAppointmentsPerDay={maxAppointments}
            holidays={holidays}
            allowHolidayBooking={allowHolidayBooking}
            enableSaturday={true}
            enableSunday={false}
            onDayClick={handleDayClick}
            onSubmit={handleSubmit}
            renderForm={renderForm}
          />
        </div>
      </div>

      <div className="appointments-section">
        <h3>Lista de Agendamentos</h3>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento</p>
        ) : (
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id}>
                <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString('pt-BR')}
                {appointment.data?.description && (
                  <div className="appointment-description">
                    {appointment.data.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="debug-section">
        <h3>Debug Info</h3>
        <pre>
{JSON.stringify({
  allowHolidayBooking,
  maxAppointments,
  appointmentsCount: appointments.length,
  holidays: holidays.map(h => `${h.date} - ${h.label}`)
}, null, 2)}        </pre>
      </div>
    </div>
  );
};

export default HolidayBookingTestExample;
