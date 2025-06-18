import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-appointment-calendar';

export const PurpleThemeExample: React.FC = () => {  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião importante',
      date: new Date(2025, 5, 20), // 20 de junho de 2025
      data: { client: 'Cliente ABC' }
    },
    {
      id: '2', 
      title: 'Consulta médica',
      date: new Date(2025, 5, 25), // 25 de junho de 2025
      data: { doctor: 'Dr. Silva' }
    },
    {
      id: '3',
      title: 'Apresentação',
      date: new Date(2025, 5, 30), // 30 de junho de 2025
      data: { project: 'Sistema Web' }
    }
  ]);

  // Exemplo de feriados para demonstrar os estilos
  const holidays = [
    {
      label: 'Dia de São João',
      date: '24/06'
    },
    {
      label: 'Dia de São Pedro',
      date: '29/06'
    }
  ];
  const [showTheme, setShowTheme] = useState(true);

  const handleSubmit = (data: any, date: Date) => {
    console.log('Novo agendamento:', data, 'Data:', date);
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title || 'Novo agendamento',
      date: date,
      data: data
    };
    
    setAppointments(prev => [...prev, newAppointment]);
  };

  // Definir cores do tema roxo
  const themeColors = showTheme ? {
    color_header_top: '#7C3AED',
    color_header_bottom: '#5B21B6',
    color_font_header: 'white'
  } : undefined;

  return (
    <div>
      <h1>🎨 Tema Roxo - Baseado na Imagem</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Controles do Tema</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={showTheme}
            onChange={(e) => setShowTheme(e.target.checked)}
          />
          Aplicar Tema Roxo (baseado na imagem fornecida)
        </label>
        
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <p><strong>Cores usadas:</strong></p>
          <ul>
            <li><strong>Cabeçalho:</strong> #7C3AED (Roxo principal - igual à imagem)</li>
            <li><strong>Dias da semana:</strong> #5B21B6 (Roxo mais escuro)</li>
            <li><strong>Dia atual:</strong> Círculo azul #3B82F6</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: showTheme ? '0' : '12px', 
        overflow: 'hidden',
        maxWidth: '600px'
      }}>        <Calendar
          appointments={appointments}
          holidays={holidays}
          onSubmit={handleSubmit}
          maxAppointmentsPerDay={3}
          enableSaturday={true}
          enableSunday={false}          
          highlightEvents={true}
          highlightToday={true}
          todayCircleStyle={true}
          disabledDates={[{label: 'folga', date: '26/06/2025'}]}
          
          allowHolidayBooking={false}
          themeColors={themeColors}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>📝 Como usar este tema</h3>
        <p>Para aplicar este tema em seu projeto:</p>
        <pre style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`import Calendar from 'react-appointment-calendar';

// Para aplicar o tema, adicione a classe 'calendar-themed'
<Calendar
  className="calendar-themed"
  // suas outras props...
/>

// Ou use themeColors para customizar as cores:
<Calendar
  themeColors={{
    color_header_top: '#7C3AED',    // Roxo do cabeçalho
    color_header_bottom: '#5B21B6'  // Roxo dos dias da semana
  }}
  // suas outras props...
/>`}
        </pre>
      </div>
    </div>
  );
};

export default PurpleThemeExample;
