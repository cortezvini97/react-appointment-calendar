import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

export const ShowExistingEventsExample: React.FC = () => {
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
    {
      id: '3',
      title: 'Apresentação',
      date: new Date(2025, 5, 20), // 20 de junho de 2025 (mesmo dia)
      data: { description: 'Apresentação do projeto final' }
    },
  ]);

  const [showExistingEvents, setShowExistingEvents] = React.useState(true);

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
      <h1>Exemplo: Controle de Exibição de Eventos Existentes</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Controles:</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={showExistingEvents}
            onChange={(e) => setShowExistingEvents(e.target.checked)}
          />
          Exibir eventos existentes no modal
        </label>
        
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          {showExistingEvents 
            ? '✅ O modal mostrará os eventos existentes do dia selecionado'
            : '🚫 O modal NÃO mostrará os eventos existentes (apenas o formulário de novo agendamento)'
          }
        </p>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <strong>Como testar:</strong>
        <ol style={{ marginTop: '5px', paddingLeft: '20px' }}>
          <li>Clique no dia 20 de junho (tem 2 eventos)</li>
          <li>Observe que o modal mostra/esconde os eventos existentes conforme a opção acima</li>
          <li>Teste alternar a checkbox e clicar novamente no dia</li>
        </ol>
      </div>
      
      <Calendar
        currentDate={new Date(2025, 5, 13)} // 13 de junho de 2025
        appointments={appointments}
        maxAppointmentsPerDay={3}
        enableSaturday={false}
        enableSunday={false}
        showExistingEvents={showExistingEvents}
        onDayClick={handleDayClick}
        onSubmit={handleSubmit}
      />

      <div className="appointments-list" style={{ marginTop: '20px' }}>
        <h3>Lista de Agendamentos:</h3>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} style={{ marginBottom: '10px' }}>
                <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString('pt-BR')}
                {appointment.data?.description && (
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {appointment.data.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShowExistingEventsExample;
