import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';
import './PreviousMonthsExample.css';

export const PreviousMonthsExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião importante',
      date: new Date(2025, 5, 16), // 16 de junho
      data: { description: 'Reunião de planejamento' }
    },
    {
      id: '2',
      title: 'Consulta',
      date: new Date(2025, 4, 15), // 15 de maio (mês passado)
      data: { description: 'Consulta médica' }
    }
  ]);

  // Estado para controlar previousMonths
  const [previousMonths, setPreviousMonths] = React.useState<boolean>(false);

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', dayAppointments);
    console.log('previousMonths atual:', previousMonths);
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
        title: 'Reunião importante',
        date: new Date(2025, 5, 16),
        data: { description: 'Reunião de planejamento' }
      },
      {
        id: '2',
        title: 'Consulta',
        date: new Date(2025, 4, 15),
        data: { description: 'Consulta médica' }
      }
    ]);
  };

  return (
    <div className="test-container">
      <h1>🧪 Teste de previousMonths em Tempo Real</h1>
      
      <div className="controls-section">
        <h2>Controles de Teste</h2>
        
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={previousMonths}
              onChange={(e) => {
                console.log('Mudando previousMonths para:', e.target.checked);
                setPreviousMonths(e.target.checked);
              }}
            />
            Permitir navegação para meses anteriores
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
          <li><strong>Previous Months:</strong> {previousMonths ? '✅ Permitido' : '❌ Bloqueado'}</li>
          <li><strong>Total de Agendamentos:</strong> {appointments.length}</li>
          <li><strong>Mês Atual:</strong> {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</li>
        </ul>
      </div>

      <div className="instructions-section">
        <h3>Como Testar</h3>
        <ol>
          <li><strong>Navegação Livre:</strong> Marque o checkbox acima. Use as setas do calendário para navegar para meses passados (ex: maio 2025)</li>
          <li><strong>Navegação Bloqueada:</strong> Desmarque o checkbox acima. Tente navegar para meses passados - o botão deve ficar desabilitado</li>
          <li><strong>Agendamentos Históricos:</strong> Note que há um agendamento em maio de 2025 (consulta médica)</li>
          <li><strong>Console:</strong> Abra o console do navegador para ver os logs de debug</li>
        </ol>
      </div>

      <div className="calendar-section">
        <h3>Calendário</h3>
        <div className="calendar-wrapper">
          <Calendar
            key={`previous-months-${previousMonths}`} // Force re-render for debugging
            appointments={appointments}
            previousMonths={previousMonths}
            enableSaturday={true}
            enableSunday={true}
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
  previousMonths,
  appointmentsCount: appointments.length,
  currentDate: new Date().toISOString().split('T')[0]
}, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default PreviousMonthsExample;
