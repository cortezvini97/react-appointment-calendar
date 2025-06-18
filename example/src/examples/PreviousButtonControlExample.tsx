import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

export const PreviousButtonControlExample: React.FC = () => {
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
      date: new Date(2025, 6, 15), // 15 de julho de 2025
      data: { description: 'Checkup anual', doctor: 'Dr. Maria' }
    },
  ]);

  const [previousMonths, setPreviousMonths] = React.useState(false);
  const [showDisabledPreviousButton, setShowDisabledPreviousButton] = React.useState(false);

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
      <h1>Exemplo: Controle do Botão de Mês Anterior</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Controles:</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={previousMonths}
              onChange={(e) => setPreviousMonths(e.target.checked)}
            />
            Permitir navegação para meses anteriores (previousMonths)
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showDisabledPreviousButton}
              onChange={(e) => setShowDisabledPreviousButton(e.target.checked)}
              disabled={previousMonths}
            />
            Mostrar botão anterior desabilitado quando previousMonths = false
          </label>
        </div>
        
        <div style={{ padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '4px', fontSize: '14px' }}>
          <strong>Comportamento atual:</strong>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            {previousMonths ? (
              <li>✅ Navegação livre para qualquer mês (botão sempre visível)</li>
            ) : (
              <>
                <li>🚫 Navegação bloqueada para meses anteriores</li>
                {showDisabledPreviousButton ? (
                  <li>👁️ Botão anterior sempre visível (desabilitado quando necessário)</li>
                ) : (
                  <li>🫥 Botão anterior oculto no mês atual, aparece apenas quando navegar para frente</li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <strong>Como testar:</strong>
        <ol style={{ marginTop: '5px', paddingLeft: '20px' }}>
          <li>Comece com previousMonths = false e showDisabledPreviousButton = false</li>
          <li>Observe que o botão ← não aparece inicialmente</li>
          <li>Clique no botão → para avançar para julho</li>
          <li>Agora observe que o botão ← aparece</li>
          <li>Teste alternar as configurações acima para ver os diferentes comportamentos</li>
        </ol>
      </div>
      
      <Calendar
        currentDate={new Date(2025, 5, 13)} // 13 de junho de 2025
        appointments={appointments}
        maxAppointmentsPerDay={3}
        enableSaturday={false}
        enableSunday={false}
        previousMonths={previousMonths}
        showDisabledPreviousButton={showDisabledPreviousButton}
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

export default PreviousButtonControlExample;
