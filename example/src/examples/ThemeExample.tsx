import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-appointment-calendar';

export const ThemeExample: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião de equipe',
      date: new Date(2024, 11, 15), // 15 de dezembro de 2024
      data: { client: 'Empresa ABC', duration: '2h' }
    },
    {
      id: '2',
      title: 'Consulta médica',
      date: new Date(2024, 11, 20), // 20 de dezembro de 2024
      data: { doctor: 'Dr. Silva', time: '14:00' }
    },
    {
      id: '3',
      title: 'Apresentação de projeto',
      date: new Date(2024, 11, 22), // 22 de dezembro de 2024
      data: { project: 'Sistema Web', client: 'TechCorp' }
    }
  ]);
  const [selectedTheme, setSelectedTheme] = useState<'default' | 'purple'>('default');

  const handleSubmit = (data: any, date: Date) => {
    console.log('Dados do formulário:', data, 'Data:', date);
    
    const newAppointment = {
      id: Date.now().toString(),
      title: data.title || 'Novo agendamento',
      date: date,
      data: data
    };
    
    setAppointments(prev => [...prev, newAppointment]);
  };

  // Definir cores do tema
  const themeColors = selectedTheme === 'purple' ? {
    color_header_top: '#7C3AED',
    color_header_bottom: '#5B21B6',
    color_font_header: 'white'
  } : undefined;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Sistema de Temas do Calendário</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>🎨 Seletor de Tema</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedTheme('default')}
            style={{
              padding: '10px 20px',
              border: '2px solid',
              borderColor: selectedTheme === 'default' ? '#007bff' : '#ddd',
              backgroundColor: selectedTheme === 'default' ? '#007bff' : 'white',
              color: selectedTheme === 'default' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedTheme === 'default' ? 'bold' : 'normal'
            }}
          >
            Tema Padrão (Azul)
          </button>
          
          <button
            onClick={() => setSelectedTheme('purple')}
            style={{
              padding: '10px 20px',
              border: '2px solid',
              borderColor: selectedTheme === 'purple' ? '#8B5CF6' : '#ddd',
              background: selectedTheme === 'purple' 
                ? 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' 
                : 'white',
              color: selectedTheme === 'purple' ? 'white' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedTheme === 'purple' ? 'bold' : 'normal'
            }}
          >
            Tema Roxo (Gradiente)
          </button>
        </div>
        
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <strong>Tema Atual:</strong> {selectedTheme === 'default' ? 'Padrão' : 'Roxo com Gradiente'}
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>ℹ️ Informações sobre Temas</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p><strong>Tema Padrão:</strong> Design limpo com cabeçalho azul clássico.</p>
          <p><strong>Tema Roxo:</strong> Design moderno com gradiente roxo no cabeçalho e elementos aprimorados.</p>
          <p><strong>Personalização:</strong> Use a prop <code>themeColors</code> para definir as cores do gradiente:</p>
          <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
{`<Calendar
  themeColors={{
    color_header_top: '#8B5CF6',
    color_header_bottom: '#A78BFA'
  }}
/>`}
          </pre>
        </div>
      </div>      <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
        <Calendar
          appointments={appointments}
          onSubmit={handleSubmit}
          maxAppointmentsPerDay={5}
          enableSaturday={true}
          enableSunday={false}
          highlightEvents={true}
          highlightToday={true}
          todayCircleStyle={false}
          showAvailableSlots={true}
          themeColors={themeColors}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h3>💡 Dicas de Uso</h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <li>Clique nos botões acima para alternar entre os temas</li>
          <li>O tema roxo adiciona efeitos visuais modernos como gradientes e sombras</li>
          <li>Você pode criar seus próprios temas definindo cores personalizadas</li>
          <li>Use <code>color_header_top</code> e <code>color_header_bottom</code> para criar gradientes</li>
          <li>Se apenas uma cor for definida, será aplicada de forma sólida</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
        <h3>🎨 Exemplos de Cores Personalizadas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
          <div style={{ padding: '10px', background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)', borderRadius: '6px', color: 'white', fontSize: '12px' }}>
            <strong>Tema Vermelho</strong><br/>
            color_header_top: '#FF6B6B'<br/>
            color_header_bottom: '#FF8E8E'
          </div>
          <div style={{ padding: '10px', background: 'linear-gradient(135deg, #4ECDC4 0%, #7FDBDA 100%)', borderRadius: '6px', color: 'white', fontSize: '12px' }}>
            <strong>Tema Verde-Azulado</strong><br/>
            color_header_top: '#4ECDC4'<br/>
            color_header_bottom: '#7FDBDA'
          </div>
          <div style={{ padding: '10px', background: 'linear-gradient(135deg, #FFD93D 0%, #FFE066 100%)', borderRadius: '6px', color: '#333', fontSize: '12px' }}>
            <strong>Tema Amarelo</strong><br/>
            color_header_top: '#FFD93D'<br/>
            color_header_bottom: '#FFE066'
          </div>
        </div>
      </div>
    </div>
  );
};
