import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

export const CalendarExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião com cliente',
      date: new Date(2025, 5, 20), // 20 de junho de 2025
      data: { description: 'Discussão sobre projeto', client: 'João Silva' }
    },
    {
      id: '2',
      title: 'Consulta médica',
      date: new Date(2025, 5, 22), // 22 de junho de 2025
      data: { description: 'Checkup anual', doctor: 'Dr. Maria' }
    },
  ]);

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      data: data
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento criado:', newAppointment);
  };

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', dayAppointments);
  };
  return (
    <div className="calendar-example-container">
      <h1>Exemplo de Calendário de Agendamento</h1>
      
      <Calendar
        currentDate={new Date(2025, 5, 13)} // 13 de junho de 2025
        appointments={appointments}
        maxAppointmentsPerDay={3}
        enableSaturday={false}
        enableSunday={false}
        onDayClick={handleDayClick}
        onSubmit={handleSubmit}
      />

      <div className="appointments-list">
        <h2>Agendamentos Atuais:</h2>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString('pt-BR')}
              {appointment.data?.description && (
                <p className="appointment-description">
                  {appointment.data.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .calendar-example-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
          .appointments-list { margin-top: 2rem; }
          .appointment-description { margin: 0.25rem 0; color: #666; }
        `
      }} />
    </div>
  );
};

export default CalendarExample;
