import React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { DisabledDate } from 'react-appointment-calendar';

// Teste para verificar se o label "Data desabilitada" é removido quando há disabledDates
const DisabledDatesLabelTest: React.FC = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  // Exemplo com datas desabilitadas - não deve mostrar "Data desabilitada" no tooltip
  const disabledDates: DisabledDate[] = [
    {
      date: `${tomorrow.getDate().toString().padStart(2, '0')}/${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}/${tomorrow.getFullYear()}`,
      label: 'Manutenção programada'
    },
    {
      date: `${dayAfterTomorrow.getDate().toString().padStart(2, '0')}/${(dayAfterTomorrow.getMonth() + 1).toString().padStart(2, '0')}/${dayAfterTomorrow.getFullYear()}`,
      label: 'Evento especial'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Teste: Label "Data desabilitada" com disabledDates</h2>
      <p>
        <strong>Comportamento esperado:</strong> Quando há datas desabilitadas configuradas,
        o tooltip não deve mostrar "- Data desabilitada" genérico, mas sim pode mostrar
        o label personalizado da data desabilitada.
      </p>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Com disabledDates configuradas:</h3>
        <p>
          Passe o mouse sobre as datas desabilitadas (amanhã e depois de amanhã).
          O tooltip deve mostrar apenas o label personalizado, sem "- Data desabilitada".
        </p>
        <Calendar
          currentDate={today}
          disabledDates={disabledDates}
          maxAppointmentsPerDay={5}
          showAvailableSlots={true}
          highlightToday={true}
        />
      </div>

      <div>
        <h3>Sem disabledDates (null):</h3>
        <p>
          Para comparação: sem disabledDates configuradas, datas desabilitadas
          por outros motivos ainda mostrariam "- Data desabilitada" se aplicável.
        </p>
        <Calendar
          currentDate={today}
          disabledDates={null}
          maxAppointmentsPerDay={5}
          showAvailableSlots={true}
          highlightToday={true}
          enableSaturday={false}
          enableSunday={false}
        />
      </div>
    </div>
  );
};

export default DisabledDatesLabelTest;
