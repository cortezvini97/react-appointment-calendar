import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

/**
 * Exemplo demonstrando a funcionalidade de horário de funcionamento
 */
const WorkingHoursExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião matinal',
      date: new Date(2025, 5, 16), // Junho 16, 2025
    },
    {
      id: '2',
      title: 'Consulta tarde',
      date: new Date(2025, 5, 17), // Junho 17, 2025
    },
  ]);

  const [currentWorkingHours, setCurrentWorkingHours] = React.useState<string>('08:00-18:00');
  const [workingHoursCurrentDayOnly, setWorkingHoursCurrentDayOnly] = React.useState<boolean>(false);

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

  const presetWorkingHours = [
    { label: 'Sem restrição', value: '' },
    { label: 'Comercial (08:00-18:00)', value: '08:00-18:00' },
    { label: 'Meio período manhã (08:00-12:00)', value: '08:00-12:00' },
    { label: 'Meio período tarde (13:00-17:00)', value: '13:00-17:00' },
    { label: 'Horário estendido (07:00-22:00)', value: '07:00-22:00' },
    { label: 'Plantão noturno (22:00-06:00)', value: '22:00-06:00' },
  ];

  const getCurrentTimeInfo = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Funcionalidade: Horário de Funcionamento</h1>
        <p>
          Esta funcionalidade permite definir um horário de funcionamento para limitar 
          quando os agendamentos podem ser feitos. Horário atual: <strong>{getCurrentTimeInfo()}</strong>
        </p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Configurações de Horário</h3>        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <label>Horário de funcionamento:</label>
          <select 
            value={currentWorkingHours} 
            onChange={(e) => setCurrentWorkingHours(e.target.value)}
            style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            {presetWorkingHours.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          <span style={{ fontSize: '12px', color: '#666' }}>
            ou digite manualmente:
          </span>
          <input
            type="text"
            value={currentWorkingHours}
            onChange={(e) => setCurrentWorkingHours(e.target.value)}
            placeholder="Ex: 08:00-18:00"
            style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd', width: '120px' }}
          />
        </div>
        
        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={workingHoursCurrentDayOnly}
              onChange={(e) => setWorkingHoursCurrentDayOnly(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Aplicar restrição apenas no dia atual
          </label>
          <span style={{ fontSize: '12px', color: '#666' }}>
            (Se marcado, permite agendamentos em datas futuras mesmo fora do horário)
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h2>Horário Configurado: {currentWorkingHours || 'Sem restrição'}</h2>
            <Calendar
            currentDate={new Date(2025, 5, 15)} // Junho 15, 2025
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={true}
            highlightEvents={true}
            highlightToday={true}
            showAvailableSlots={true}
            workingHours={currentWorkingHours || null}
            workingHoursCurrentDayOnly={workingHoursCurrentDayOnly}
            onSubmit={handleSubmit}
            renderForm={renderForm}
            style={{ border: '2px solid #007bff', borderRadius: '12px' }}
          />
        </div>

        <div>
          <h2>Informações e Testes</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h4>Como funciona:</h4>            <ul style={{ fontSize: '14px' }}>
              <li>🕐 <strong>Dentro do horário:</strong> Agendamentos permitidos normalmente</li>
              <li>🚫 <strong>Fora do horário:</strong> Clique no dia mostra alerta e impede agendamento</li>
              <li>📅 <strong>Restrição apenas hoje:</strong> Se ativado, permite agendar em datas futuras mesmo fora do horário</li>
              <li>💡 <strong>Tooltip:</strong> Mostra status do horário de funcionamento</li>
              <li>📋 <strong>Indicador visual:</strong> Barra colorida mostra se está aberto/fechado</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Exemplos de formato:</h4>
            <ul style={{ fontSize: '14px', fontFamily: 'monospace' }}>
              <li>✅ 08:00-18:00 (horário comercial)</li>
              <li>✅ 07:30-19:30 (com minutos)</li>
              <li>✅ 22:00-06:00 (horário noturno)</li>
              <li>❌ 8:00-18:00 (sem zero à esquerda)</li>
              <li>❌ 08:00 - 18:00 (com espaços)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Status atual:</h4>
            <div style={{ 
              padding: '10px', 
              borderRadius: '4px', 
              backgroundColor: currentWorkingHours ? '#e8f5e8' : '#fff3cd',
              border: currentWorkingHours ? '1px solid #c3e6cb' : '1px solid #ffeaa7'
            }}>
              {currentWorkingHours ? (
                <>
                  <strong>Horário configurado:</strong> {currentWorkingHours}<br/>
                  <strong>Horário atual:</strong> {getCurrentTimeInfo()}<br/>                  <strong>Status:</strong> {(() => {
                    if (!currentWorkingHours || !currentWorkingHours.includes('-')) return 'Sempre aberto';
                    
                    const now = new Date();
                    const currentMinutes = now.getHours() * 60 + now.getMinutes();
                    const [start, end] = currentWorkingHours.split('-');
                    const [startHour, startMin] = start.split(':').map(Number);
                    const [endHour, endMin] = end.split(':').map(Number);
                    const startMinutes = startHour * 60 + startMin;
                    const endMinutes = endHour * 60 + endMin;
                    
                    if (endMinutes < startMinutes) {
                      // Horário noturno (ex: 22:00-06:00)
                      return (currentMinutes >= startMinutes || currentMinutes <= endMinutes) ? 
                        '🟢 Aberto' : '🔴 Fechado';
                    } else {
                      // Horário normal
                      return (currentMinutes >= startMinutes && currentMinutes <= endMinutes) ? 
                        '🟢 Aberto' : '🔴 Fechado';
                    }
                  })()}
                </>
              ) : (
                <>
                  <strong>Sem restrição de horário</strong><br/>
                  Agendamentos permitidos a qualquer hora
                </>
              )}
            </div>
          </div>

          <div style={{ padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px', border: '1px solid #bee5eb' }}>
            <h4 style={{ color: '#0c5460', margin: '0 0 10px 0' }}>💡 Dica de Teste</h4>
            <p style={{ color: '#0c5460', margin: 0, fontSize: '14px' }}>
              Experimente diferentes horários e tente clicar nos dias do calendário. 
              Quando estiver fora do horário de funcionamento, um alerta impedirá o agendamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursExample;
