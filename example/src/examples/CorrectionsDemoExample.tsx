import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

/**
 * Exemplo demonstrando as correções implementadas
 */
const CorrectionsDemoExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião importante',
      date: new Date(2025, 5, 15), // Junho 15, 2025 (domingo)
    },
    {
      id: '2',
      title: 'Consulta médica',
      date: new Date(2025, 5, 16), // Junho 16, 2025 (segunda)
    },
    {
      id: '3',
      title: 'Workshop',
      date: new Date(2025, 5, 22), // Junho 22, 2025 (domingo)
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Demonstração das Correções Implementadas</h1>
        <p>
          Este exemplo demonstra as correções feitas conforme solicitado:
        </p>
        <ul>
          <li><strong>Correção 1:</strong> Quando highlightEvents=false, o indicador numérico dos eventos não aparece</li>
          <li><strong>Correção 2:</strong> Domingos sempre aparecem com números vermelhos, mesmo quando desabilitados</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h2>Com Destaque de Eventos (highlightEvents=true)</h2>
          <ul style={{ marginBottom: '20px', fontSize: '14px' }}>
            <li>✅ Dias com eventos destacados em azul</li>
            <li>✅ Indicador numérico visível</li>
            <li>✅ Domingos com números vermelhos</li>
            <li>✅ Dia atual destacado</li>
          </ul>
          
          <Calendar
            currentDate={new Date(2025, 5, 13)} // Junho 13, 2025
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={false} // Domingos desabilitados mas números ficam vermelhos
            highlightEvents={true}
            highlightToday={true}
            showAvailableSlots={true}
            onSubmit={handleSubmit}
            renderForm={renderForm}
            style={{ border: '2px solid #007bff', borderRadius: '12px' }}
          />
        </div>

        <div>
          <h2>Sem Destaque de Eventos (highlightEvents=false)</h2>
          <ul style={{ marginBottom: '20px', fontSize: '14px' }}>
            <li>❌ Dias com eventos SEM destaque visual</li>
            <li>❌ Indicador numérico OCULTO</li>
            <li>✅ Domingos com números vermelhos (sempre)</li>
            <li>✅ Dia atual destacado</li>
          </ul>
          
          <Calendar
            currentDate={new Date(2025, 5, 13)} // Junho 13, 2025
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={false} // Domingos desabilitados mas números ficam vermelhos
            highlightEvents={false} // CORREÇÃO: Indicador numérico oculto
            highlightToday={true}
            showAvailableSlots={true}
            onSubmit={handleSubmit}
            renderForm={renderForm}
            style={{ border: '2px solid #6c757d', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Diferenças Observadas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Calendário da Esquerda (highlightEvents=true)</h4>
            <ul>
              <li>Dias 15, 16 e 22 de junho têm fundo azul (eventos destacados)</li>
              <li>Pequenos círculos azuis mostram o número de agendamentos</li>
              <li>Domingos (1, 8, 15, 22, 29) têm números vermelhos</li>
              <li>Dia 13 (hoje) tem fundo amarelo</li>
            </ul>
          </div>
          <div>
            <h4>Calendário da Direita (highlightEvents=false)</h4>
            <ul>
              <li>Dias 15, 16 e 22 de junho NÃO têm fundo azul</li>
              <li>NÃO há círculos azuis (indicadores ocultos)</li>
              <li>Domingos (1, 8, 15, 22, 29) têm números vermelhos (sempre)</li>
              <li>Dia 13 (hoje) tem fundo amarelo</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
        <h4 style={{ color: '#155724', margin: '0 0 10px 0' }}>✅ Correções Implementadas</h4>
        <ol style={{ color: '#155724', margin: 0 }}>
          <li><strong>Indicador numérico condicionado:</strong> Só aparece quando highlightEvents=true</li>
          <li><strong>Domingos sempre vermelhos:</strong> Números dos domingos ficam vermelhos mesmo quando desabilitados</li>
        </ol>
      </div>
    </div>
  );
};

export default CorrectionsDemoExample;
