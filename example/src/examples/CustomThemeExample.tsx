import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-appointment-calendar';

export const CustomThemeExample: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
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

  const [selectedTheme, setSelectedTheme] = useState<'default' | 'purple' | 'dark' | 'green'>('default');

  // Exemplo de feriados
  const holidays = [
    { label: 'Dia de São João', date: '24/06' },
    { label: 'Dia de São Pedro', date: '29/06' }
  ];

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

  // Definir cores dos temas
  const getThemeColors = () => {
    switch (selectedTheme) {
      case 'purple':
        return {
          color_header_top: '#7C3AED',      // Roxo do cabeçalho
          color_header_bottom: '#5B21B6',   // Roxo dos dias da semana
          color_font_header: '#FFFFFF'      // Fonte branca
        };
      case 'dark':
        return {
          color_header_top: '#1F2937',      // Cinza escuro
          color_header_bottom: '#374151',   // Cinza médio
          color_font_header: '#F9FAFB'      // Fonte cinza claro
        };
      case 'green':
        return {
          color_header_top: '#059669',      // Verde escuro
          color_header_bottom: '#047857',   // Verde mais escuro
          color_font_header: '#ECFDF5'      // Fonte verde claro
        };
      default:
        return {
          color_header_top: null,
          color_header_bottom: null,
          color_font_header: null
        };
    }
  };

  const themeColors = getThemeColors();
  const isThemed = selectedTheme !== 'default';

  return (
    <div>
      <h1>🎨 Personalização Completa de Temas</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Seletor de Tema</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button
            onClick={() => setSelectedTheme('default')}
            style={{
              padding: '10px 15px',
              border: '2px solid',
              borderColor: selectedTheme === 'default' ? '#007bff' : '#ddd',
              backgroundColor: selectedTheme === 'default' ? '#007bff' : 'white',
              color: selectedTheme === 'default' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Tema Padrão
          </button>
          
          <button
            onClick={() => setSelectedTheme('purple')}
            style={{
              padding: '10px 15px',
              border: '2px solid',
              borderColor: selectedTheme === 'purple' ? '#7C3AED' : '#ddd',
              background: selectedTheme === 'purple' ? '#7C3AED' : 'white',
              color: selectedTheme === 'purple' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Tema Roxo
          </button>
          
          <button
            onClick={() => setSelectedTheme('dark')}
            style={{
              padding: '10px 15px',
              border: '2px solid',
              borderColor: selectedTheme === 'dark' ? '#1F2937' : '#ddd',
              background: selectedTheme === 'dark' ? '#1F2937' : 'white',
              color: selectedTheme === 'dark' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Tema Escuro
          </button>
          
          <button
            onClick={() => setSelectedTheme('green')}
            style={{
              padding: '10px 15px',
              border: '2px solid',
              borderColor: selectedTheme === 'green' ? '#059669' : '#ddd',
              background: selectedTheme === 'green' ? '#059669' : 'white',
              color: selectedTheme === 'green' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Tema Verde
          </button>
        </div>
        
        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong>Configuração Atual:</strong>
          <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', marginTop: '10px', fontSize: '12px' }}>
{JSON.stringify(themeColors, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>📋 Propriedades do ThemeColor</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p><strong>color_header_top:</strong> Cor de fundo do cabeçalho principal (mês/ano)</p>
          <p><strong>color_header_bottom:</strong> Cor de fundo da linha dos dias da semana</p>
          <p><strong>color_font_header:</strong> ✨ <em>Nova!</em> Cor da fonte do cabeçalho e dias da semana</p>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: isThemed ? '0' : '12px', 
        overflow: 'hidden',
        maxWidth: '600px'
      }}>
        <Calendar
          appointments={appointments}
          holidays={holidays}
          onSubmit={handleSubmit}
          maxAppointmentsPerDay={3}          enableSaturday={true}
          enableSunday={false}
          highlightEvents={true}
          highlightToday={true}
          todayCircleStyle={false}
          allowHolidayBooking={false}
          themeColors={themeColors}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>💡 Como usar</h3>
        <p>Para aplicar um tema personalizado:</p>
        <pre style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto', fontSize: '12px' }}>
{`<Calendar
  themeColors={{
    color_header_top: '${themeColors.color_header_top || '#7C3AED'}',    // Cor do cabeçalho
    color_header_bottom: '${themeColors.color_header_bottom || '#5B21B6'}', // Cor dos dias da semana
    color_font_header: '${themeColors.color_font_header || '#FFFFFF'}'     // Cor da fonte
  }}
  // outras props...
/>`}
        </pre>
      </div>
    </div>
  );
};

export default CustomThemeExample;
