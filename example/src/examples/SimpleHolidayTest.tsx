import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment, Holiday } from 'react-appointment-calendar';
import './HolidayBookingTest.css';

const SimpleHolidayTest: React.FC = () => {
  const [allowHolidayBooking, setAllowHolidayBooking] = React.useState<boolean>(false);
  const [updateCount, setUpdateCount] = React.useState(0);

  // Effect para monitorar mudanças
  React.useEffect(() => {
    console.log('🔄 SimpleHolidayTest - allowHolidayBooking changed to:', allowHolidayBooking);
    setUpdateCount(prev => prev + 1);
  }, [allowHolidayBooking]);

  // Feriado próximo para teste fácil
  const holidays: Holiday[] = [
    { label: "Dia de Teste", date: "20/06" } // 20 de junho de 2025
  ];

  const appointments: Appointment[] = [];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔄 Teste Simples: allowHolidayBooking</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
          <input
            type="checkbox"
            checked={allowHolidayBooking}
            onChange={(e) => {
              console.log('🔄 Mudando allowHolidayBooking para:', e.target.checked);
              setAllowHolidayBooking(e.target.checked);
            }}
            style={{ transform: 'scale(1.5)' }}
          />
          <strong>Permitir agendamentos em feriados</strong>
        </label>
        
        <div style={{ marginTop: '10px', fontSize: '16px' }}>
          Status atual: <strong>{allowHolidayBooking ? '✅ PERMITIDO' : '❌ BLOQUEADO'}</strong>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#e7f3ff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>📋 Instruções de Teste:</h3>
        <ol style={{ margin: 0, lineHeight: '1.6' }}>
          <li><strong>Feriado configurado:</strong> 20 de junho de 2025 (Dia de Teste)</li>
          <li><strong>Quando BLOQUEADO:</strong> Dia 20/06 deve aparecer em vermelho e não abrir modal ao clicar</li>
          <li><strong>Quando PERMITIDO:</strong> Dia 20/06 deve aparecer em vermelho mas abrir modal ao clicar</li>
          <li><strong>Teste:</strong> Alterne o checkbox acima e observe a mudança em tempo real</li>
          <li><strong>Console:</strong> Abra o console do navegador para ver os logs de debug</li>
        </ol>
      </div>

      <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <Calendar
          appointments={appointments}
          holidays={holidays}
          allowHolidayBooking={allowHolidayBooking}
          maxAppointmentsPerDay={5}
          enableSaturday={true}
          enableSunday={true}
          onDayClick={(date, appts) => {
            console.log('🗓️ Dia clicado:', date.toLocaleDateString('pt-BR'));
            console.log('⚙️ allowHolidayBooking:', allowHolidayBooking);
            alert(`Dia clicado: ${date.toLocaleDateString('pt-BR')}\nallowHolidayBooking: ${allowHolidayBooking}`);
          }}
          onSubmit={(data, date) => {
            console.log('📝 Agendamento criado:', data, date);
            alert('Agendamento criado com sucesso!');
          }}
          renderForm={(date, onSubmit, onCancel) => (
            <div style={{ padding: '20px' }}>
              <h3>Novo Agendamento</h3>
              <p><strong>Data:</strong> {date.toLocaleDateString('pt-BR')}</p>
              <p><strong>allowHolidayBooking:</strong> {allowHolidayBooking ? 'PERMITIDO' : 'BLOQUEADO'}</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ title: 'Teste de agendamento', description: 'Agendamento de teste' });
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <label>
                    Título:
                    <input 
                      name="title" 
                      type="text" 
                      defaultValue="Agendamento de Teste"
                      style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                  </label>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={onCancel} style={{ padding: '8px 16px' }}>
                    Cancelar
                  </button>
                  <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none' }}>
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          )}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🐛 Debug Info:</h3>        <div style={{ fontFamily: 'monospace', background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
          allowHolidayBooking: {JSON.stringify(allowHolidayBooking)}<br/>
          holidays: {JSON.stringify(holidays)}<br/>
          updateCount: {updateCount}<br/>
          timestamp: {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
};

export default SimpleHolidayTest;
