import React, { useState } from 'react';
import Calendar from 'react-appointment-calendar';

const BlockDayExample: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([
    {
      id: '1',
      title: 'Reunião 1',
      date: new Date(2025, 5, 25), // 25 de junho
      description: 'Primeira reunião do dia'
    },
    {
      id: '2', 
      title: 'Reunião 2',
      date: new Date(2025, 5, 25), // 25 de junho
      description: 'Segunda reunião do dia'
    },
    {
      id: '3',
      title: 'Reunião 3', 
      date: new Date(2025, 5, 25), // 25 de junho
      description: 'Terceira reunião do dia'
    }
  ]);
  
  const [blockDayEnabled, setBlockDayEnabled] = useState(true);
  const maxAppointments = 3;

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      description: data.description || ''
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    alert(`✅ Agendamento criado: ${data.title} para ${date.toLocaleDateString('pt-BR')}`);
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.getFullYear() === date.getFullYear() &&
      apt.date.getMonth() === date.getMonth() &&
      apt.date.getDate() === date.getDate()
    ).length;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚫 Exemplo: Controle de Bloqueio por Limite (blockDay)</h1>
      
      <div style={{ 
        background: '#e7f3ff', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>💡 Como funciona:</h3>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li><strong>blockDay: true (padrão)</strong> - Bloqueia o dia quando atinge o limite máximo</li>
          <li><strong>blockDay: false</strong> - Permite abrir o modal mesmo excedendo o limite</li>
          <li>Útil para casos onde você quer mostrar avisos mas não impedir agendamentos</li>
          <li>O limite atual está configurado para <strong>{maxAppointments} agendamentos por dia</strong></li>
        </ul>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>⚙️ Configurações:</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={blockDayEnabled}
              onChange={(e) => setBlockDayEnabled(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: 'bold' }}>
              blockDay = {blockDayEnabled ? 'true' : 'false'}
            </span>
          </label>
          <p style={{ margin: '5px 0 0 30px', fontSize: '14px', color: '#666' }}>
            {blockDayEnabled 
              ? 'Dias com limite atingido ficam bloqueados (comportamento padrão)'
              : 'Dias com limite atingido permitem abertura do modal'
            }
          </p>
        </div>

        <div style={{ 
          background: blockDayEnabled ? '#fff3cd' : '#d1ecf1',
          padding: '10px',
          borderRadius: '4px',
          border: `1px solid ${blockDayEnabled ? '#ffeaa7' : '#bee5eb'}`
        }}>
          <strong>Comportamento atual:</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            {blockDayEnabled 
              ? '🔒 O dia 25/06 está bloqueado pois já tem 3 agendamentos (limite atingido)'
              : '🔓 O dia 25/06 permite abrir o modal mesmo com 3 agendamentos'
            }
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📊 Status dos Agendamentos:</h3>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ margin: '0', fontSize: '14px' }}>
            <strong>25/06/2025:</strong> {getAppointmentsForDate(new Date(2025, 5, 25))} de {maxAppointments} agendamentos
            {getAppointmentsForDate(new Date(2025, 5, 25)) >= maxAppointments && (
              <span style={{ color: '#dc3545', fontWeight: 'bold' }}> (LIMITE ATINGIDO)</span>
            )}
          </p>
        </div>
      </div>

      <Calendar
        currentDate={new Date(2025, 5, 1)} // Junho 2025
        appointments={appointments}
        maxAppointmentsPerDay={maxAppointments}
        blockDay={blockDayEnabled}
        enableSaturday={true}
        enableSunday={true}
        highlightToday={true}
        showAvailableSlots={true}
        showExistingEvents={true}
        onSubmit={handleSubmit}
        themeColors={{
          color_header_top: '#28a745',
          color_header_bottom: '#20692e',
          color_font_header: 'white'
        }}
      />

      <div style={{ marginTop: '30px' }}>
        <h3>📋 Lista de Agendamentos:</h3>
        {appointments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {appointments.map((appointment) => (
              <div 
                key={appointment.id}
                style={{
                  background: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #dee2e6'
                }}
              >
                <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{appointment.title}</h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  📅 {appointment.date.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                {appointment.description && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                    {appointment.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhum agendamento criado ainda.</p>
        )}
      </div>

      <div style={{ 
        marginTop: '30px', 
        background: '#fff3cd',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🧪 Teste a Funcionalidade:</h3>
        <ol style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Clique no dia <strong>25 de junho</strong> quando <code>blockDay = true</code> (não deve abrir modal)</li>
          <li>Desmarque a opção <code>blockDay</code> para definir como <code>false</code></li>
          <li>Clique novamente no dia <strong>25 de junho</strong> (agora deve abrir o modal)</li>
          <li>Teste criar mais agendamentos no mesmo dia</li>
          <li>Compare o comportamento entre os dois modos</li>
        </ol>
      </div>
    </div>
  );
};

export default BlockDayExample;
