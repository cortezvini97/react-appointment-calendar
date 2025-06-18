import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

export const TodayStyleExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião matinal',
      date: new Date(2025, 5, 20), // 20 de junho de 2025
      data: { description: 'Reunião com a equipe' }
    },
    {
      id: '2',
      title: 'Apresentação',
      date: new Date(2025, 5, 25), // 25 de junho de 2025
      data: { description: 'Apresentação do projeto' }
    },
  ]);

  const [todayCircleStyle, setTodayCircleStyle] = React.useState(false);
  const [highlightToday, setHighlightToday] = React.useState(true);

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
      <h1>Exemplo: Estilos do Dia Atual</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Controles de Estilo:</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={highlightToday}
              onChange={(e) => setHighlightToday(e.target.checked)}
            />
            Destacar dia atual
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={todayCircleStyle}
              onChange={(e) => setTodayCircleStyle(e.target.checked)}
              disabled={!highlightToday}
            />
            Usar estilo de círculo (em vez do fundo amarelo)
          </label>
        </div>
        
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <strong>Status atual:</strong>
          <br />
          {!highlightToday && '❌ Dia atual sem destaque'}
          {highlightToday && !todayCircleStyle && '🟡 Destaque com fundo amarelo (padrão)'}
          {highlightToday && todayCircleStyle && '🔵 Destaque com círculo azul ao redor do número'}
        </div>
      </div>

      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <strong>Como testar:</strong>
        <ol style={{ marginTop: '5px', paddingLeft: '20px' }}>
          <li>Observe o dia 18 de junho (hoje) no calendário</li>
          <li>Alterne entre os diferentes estilos usando as checkboxes acima</li>
          <li>Compare o estilo padrão (fundo amarelo) com o estilo de círculo</li>
          <li>Desative o destaque para ver o dia sem formatação especial</li>
        </ol>
      </div>
      
      <Calendar
        currentDate={new Date(2025, 5, 18)} // 18 de junho de 2025 (hoje)
        appointments={appointments}
        maxAppointmentsPerDay={3}
        enableSaturday={false}
        enableSunday={false}
        highlightToday={highlightToday}
        todayCircleStyle={todayCircleStyle}
        onDayClick={handleDayClick}
        onSubmit={handleSubmit}
      />

      <div className="appointments-list" style={{ marginTop: '20px' }}>
        <h3>Diferenças entre os Estilos:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '10px' }}>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>🟡 Estilo Padrão (todayCircleStyle={'{false}'})</h4>
            <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
              <li>Fundo amarelo claro</li>
              <li>Borda amarela</li>
              <li>Texto em amarelo escuro</li>
              <li>Hover com amarelo mais claro</li>
            </ul>
          </div>
          
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>🔵 Estilo Círculo (todayCircleStyle={'{true}'})</h4>
            <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
              <li>Círculo azul ao redor do número</li>
              <li>Texto azul e negrito</li>
              <li>Fundo transparente</li>
              <li>Hover com fundo azul claro</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayStyleExample;
