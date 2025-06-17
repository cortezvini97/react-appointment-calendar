import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

const ExampleWithFeatures: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta médica',
      date: new Date(2025, 5, 15), // Junho 15, 2025
    },
    {
      id: '2',
      title: 'Reunião',
      date: new Date(2025, 5, 20), // Junho 20, 2025
    },
    {
      id: '3',
      title: 'Dentista',
      date: new Date(2025, 5, 25), // Junho 25, 2025
    },
  ]);

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title || 'Novo agendamento',
      date: date,
      data: data,
    };
    setAppointments([...appointments, newAppointment]);
  };

  const renderForm = (date: Date, onSubmit: (data: any) => void, onCancel: () => void) => (
    <div>
      <h3>Agendar para {date.toLocaleDateString('pt-BR')}</h3>
      <input
        type="text"
        placeholder="Título do agendamento"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit({ title: (e.target as HTMLInputElement).value });
          }
        }}
      />
      <div>
        <button onClick={() => onSubmit({ title: 'Agendamento teste' })}>
          Confirmar
        </button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Calendário com Novas Funcionalidades</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Funcionalidades demonstradas:</h3>
        <ul>
          <li>✅ Destacar eventos (padrão: true)</li>
          <li>✅ Destacar dia atual com cor amarela</li>
          <li>✅ Números dos domingos em vermelho</li>
          <li>✅ Tooltip mostra vagas disponíveis ao passar o mouse</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>Calendário com todas as funcionalidades ativas (padrão)</h3>
          <Calendar
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={true}
            onSubmit={handleSubmit}
            renderForm={renderForm}
            highlightEvents={true}
            highlightToday={true}
            showAvailableSlots={true}
          />
        </div>

        <div>
          <h3>Calendário com funcionalidades desabilitadas</h3>
          <Calendar
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={true}
            onSubmit={handleSubmit}
            renderForm={renderForm}
            highlightEvents={false}
            highlightToday={false}
            showAvailableSlots={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ExampleWithFeatures;
