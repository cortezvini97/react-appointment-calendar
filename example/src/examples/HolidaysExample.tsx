import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment, Holiday } from 'react-appointment-calendar';

export const HolidaysExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta médica',
      date: new Date(2025, 5, 16), // 16 de junho
      data: { description: 'Consulta de rotina' }
    },
    {
      id: '2',
      title: 'Reunião',
      date: new Date(2025, 5, 16), // 16 de junho
      data: { description: 'Reunião de trabalho' }
    },
    {
      id: '3',
      title: 'Dentista',
      date: new Date(2025, 5, 17), // 17 de junho
      data: { description: 'Limpeza dental' }
    }
  ]);

  // Lista de feriados
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
    }
  ];

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', dayAppointments);
  };

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title || 'Novo agendamento',
      date,
      data
    };

    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento:', newAppointment);
  };

  const renderForm = (date: Date, onSubmit: (data: any) => void, onCancel: () => void) => (
    <div>
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
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Título:
            <input
              name="title"
              type="text"
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Descrição:
            <textarea
              name="description"
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.25rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#007bff',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Exemplo com Feriados</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Configurações:</h2>
        <ul>
          <li>✅ Máximo de 3 agendamentos por dia</li>
          <li>✅ Feriados configurados (Independência, Dia das Crianças, Natal, Ano Novo)</li>
          <li>❌ Agendamentos em feriados não permitidos</li>
          <li>✅ Estilo vermelho aplicado aos feriados</li>
          <li>✅ Quando atingir limite de agendamentos, dia fica desabilitado (sem estilo vermelho)</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Calendário sem agendamentos em feriados:</h3>
        <Calendar
          appointments={appointments}
          maxAppointmentsPerDay={3}
          holidays={holidays}
          allowHolidayBooking={false}
          enableSaturday={true}
          enableSunday={false}
          onDayClick={handleDayClick}
          onSubmit={handleSubmit}
          renderForm={renderForm}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Calendário com agendamentos em feriados permitidos:</h3>
        <Calendar
          appointments={appointments}
          maxAppointmentsPerDay={3}
          holidays={holidays}
          allowHolidayBooking={true}
          enableSaturday={true}
          enableSunday={false}
          onDayClick={handleDayClick}
          onSubmit={handleSubmit}
          renderForm={renderForm}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Lista de Agendamentos Atuais:</h3>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString('pt-BR')}
              {appointment.data?.description && (
                <div style={{ fontSize: '0.9em', color: '#666' }}>
                  {appointment.data.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HolidaysExample;
