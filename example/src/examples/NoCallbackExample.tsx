import React, { useState } from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';
import './NoCallbackExample.css';

interface AppointmentData {
  title: string;
  description?: string;
  time?: string;
}

const NoCallbackExample: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião existente',
      date: new Date(), // Hoje
      time: '10:00',
      data: { description: 'Reunião de demonstração' }
    }
  ]);

  // Horários disponíveis para agendamento
  const availableHours = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const handleSubmit = (data: AppointmentData, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      time: data.time,
      data: {
        description: data.description
      }
    };

    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento criado:', newAppointment);
  };

  const handleIAAppointmentExtracted = (iaAppointment: {
    title: string;
    date: Date;
    time?: string;
    confidence: number;
  }) => {
    console.log('IA extraiu agendamento:', iaAppointment);
    
    // Auto-criar agendamento se a confiança for alta
    if (iaAppointment.confidence > 0.8) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: iaAppointment.title,
        date: iaAppointment.date,
        time: iaAppointment.time,
        data: {
          source: 'ia-extraction',
          confidence: iaAppointment.confidence,
          auto_created: true
        }
      };

      setAppointments(prev => [...prev, newAppointment]);
      
      // Feedback visual
      alert(`✅ Agendamento criado automaticamente!\n\n${iaAppointment.title}\n${iaAppointment.date.toLocaleDateString('pt-BR')}${iaAppointment.time ? ` às ${iaAppointment.time}` : ''}\n\nConfiança: ${Math.round(iaAppointment.confidence * 100)}%`);
    }
  };

  // NOTA: Propositalmente NÃO implementamos onIACallback para demonstrar o erro

  return (
    <div className="no-callback-example-container">
      <h2>🚫 Exemplo: IA sem Callback (Erro Demonstrativo)</h2>
      
      <div className="error-demo-section">
        <h3>⚠️ Demonstração de Erro:</h3>
        <div className="error-info">
          <p>Este exemplo demonstra o que acontece quando o <strong>ChatBot IA está habilitado</strong> mas <strong>nenhum callback foi configurado</strong>.</p>
          
          <div className="code-example">
            <h4>🔍 Código atual (sem callback):</h4>
            <pre>{`<Calendar
  IAResource={true}           // ✅ IA habilitada
  onIACallback={undefined}    // ❌ Callback não configurado
  // ... outras props
/>`}</pre>
          </div>
          
          <div className="expected-behavior">
            <h4>📋 Comportamento esperado:</h4>
            <ul>
              <li>✅ Chat bot aparece normalmente</li>
              <li>✅ Usuário pode digitar mensagens</li>
              <li>❌ Ao enviar, exibe erro de configuração</li>
              <li>💡 Mostra instruções para desenvolvedores</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="test-instructions">
        <h3>🧪 Como testar o erro:</h3>
        <ol>
          <li>Role para baixo até o chat bot</li>
          <li>Digite qualquer mensagem (ex: "olá" ou "agendar reunião")</li>
          <li>Pressione Enter ou clique em enviar</li>
          <li>Observe a mensagem de erro que aparecerá</li>
        </ol>
        
        <div className="comparison-note">
          <p><strong>💡 Comparação:</strong> Vá para o "Agendamento com IA" para ver a versão com callback funcionando!</p>
        </div>
      </div>

      <Calendar
        appointments={appointments}
        hours={availableHours}
        minTime={30}
        onSubmit={handleSubmit}
        IAResource={true} // 🚀 IA habilitada mas SEM callback
        onIAAppointmentExtracted={handleIAAppointmentExtracted}
        // onIACallback={undefined} // ❌ Propositalmente não configurado
        enableSaturday={true}
        enableSunday={false}
        showExistingEvents={true}
        highlightEvents={true}
        highlightToday={true}
        themeColors={{
          color_header_top: '#dc2626',
          color_header_bottom: '#b91c1c',
          color_font_header: '#ffffff'
        }}
      />

      <div className="appointments-summary">
        <h4>📋 Agendamentos criados ({appointments.length}):</h4>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          <div className="appointments-grid">
            {appointments.map(apt => (
              <div key={apt.id} className="appointment-card">
                <div className="appointment-header">
                  <strong>{apt.title}</strong>
                  {apt.data?.auto_created && (
                    <span className="auto-badge">🤖 Auto</span>
                  )}
                </div>
                <div className="appointment-details">
                  <div>📅 {apt.date.toLocaleDateString('pt-BR')}</div>
                  {apt.time && <div>⏰ {apt.time}</div>}
                  {apt.data?.confidence && (
                    <div>🎯 Confiança: {Math.round(apt.data.confidence * 100)}%</div>
                  )}
                </div>
                {apt.data?.description && (
                  <div className="appointment-description">
                    {apt.data.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoCallbackExample;
