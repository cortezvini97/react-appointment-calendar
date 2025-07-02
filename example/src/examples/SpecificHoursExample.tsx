import React, { useState } from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

interface AppointmentData {
  title: string;
  description?: string;
  time?: string;
}

const SpecificHoursExample: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta Dr. Silva',
      date: new Date(), // Hoje
      time: '09:00',
      data: { description: 'Consulta médica de rotina' }
    },
    {
      id: '2',
      title: 'Reunião de equipe',
      date: new Date(), // Hoje
      time: '14:00',
      data: { description: 'Reunião semanal da equipe' }
    }
  ]);

  // Horários disponíveis para agendamento
  const availableHours = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Exemplo: Horários Específicos com Tolerância</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>Configuração:</h3>
        <ul>
          <li><strong>Horários disponíveis:</strong> {availableHours.join(', ')}</li>
          <li><strong>Tolerância:</strong> 30 minutos</li>
          <li><strong>Funcionamento:</strong> O sistema automaticamente bloqueia horários que conflitam com a tolerância</li>
        </ul>
        
        <h4>Como funciona:</h4>
        <ul>
          <li>Com tolerância de 30 minutos, se houver um agendamento às 09:00, os horários de 08:30 e 09:30 também ficam bloqueados automaticamente.</li>
          <li>Para o dia atual, horários que já passaram ficam automaticamente indisponíveis (considerando a tolerância).</li>
          <li>O número máximo de agendamentos por dia é calculado automaticamente para cada dia baseado nos horários disponíveis, tolerância e horário atual.</li>
          <li>Quando <code>hours</code> é fornecido, não é necessário definir <code>maxAppointmentsPerDay</code> - ele é ignorado.</li>
          <li>Clique em um dia para ver apenas os horários válidos no formulário.</li>
        </ul>
      </div>

      <Calendar
        appointments={appointments}
        hours={availableHours}
        tolerance={30} // 30 minutos de tolerância
        onSubmit={handleSubmit}
        enableSaturday={true}
        enableSunday={false}
        showExistingEvents={true}
        highlightEvents={true}
        highlightToday={true}
        themeColors={{
          color_header_top: '#007bff',
          color_header_bottom: '#0056b3',
          color_font_header: '#ffffff'
        }}
      />

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
        <h4>Agendamentos atuais:</h4>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          <ul>
            {appointments.map(apt => (
              <li key={apt.id}>
                <strong>{apt.title}</strong>
                {apt.time && <span> - {apt.time}</span>}
                <br />
                <small>{apt.date.toLocaleDateString('pt-BR')}</small>
                {apt.data?.description && (
                  <div style={{ marginLeft: '10px', color: '#666' }}>
                    {apt.data.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SpecificHoursExample;
