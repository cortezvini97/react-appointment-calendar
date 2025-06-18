import React, { useState } from 'react';
import Calendar from 'react-appointment-calendar';
import './ArgsExample.css';

// Interface para os dados do usuário que serão passados via args
interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  department: string;
  allowedServices: string[];
}

// Interface para os dados do agendamento
interface AppointmentData {
  title: string;
  description: string;
  service: string;
  userId: number;
  userName: string;
  userEmail: string;
  department: string;
}

const ArgsExample: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  // Dados do usuário que serão passados como args
  const userData: UserData = {
    userId: 123,
    userName: "João Silva",
    userEmail: "joao.silva@empresa.com",
    department: "Desenvolvimento",
    allowedServices: ["Consultoria", "Treinamento", "Suporte Técnico", "Análise de Sistema"]
  };

  // Formulário customizado que recebe os args
  const renderCustomForm = (
    date: Date, 
    onSubmit: (data: any, event?: React.FormEvent) => void, 
    onCancel: () => void,
    args?: UserData // Aqui recebemos os args com tipagem
  ) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (title.trim() && selectedService && args) {
        const appointmentData: AppointmentData = {
          title: title.trim(),
          description: description.trim(),
          service: selectedService,
          userId: args.userId,
          userName: args.userName,
          userEmail: args.userEmail,
          department: args.department,
        };
        
        onSubmit(appointmentData, e);
      }
    };    return (
      <div className="args-example-form-container">
        <h3>🎯 Agendamento com Dados do Usuário</h3>
        
        {/* Informações do usuário vindas dos args */}
        <div className="args-example-user-data">
          <h4>📋 Dados do Solicitante:</h4>
          <p><strong>Nome:</strong> {args?.userName || 'N/A'}</p>
          <p><strong>Email:</strong> {args?.userEmail || 'N/A'}</p>
          <p><strong>Departamento:</strong> {args?.department || 'N/A'}</p>
          <p><strong>ID:</strong> {args?.userId || 'N/A'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="args-example-form-group">
            <label>Título do Agendamento:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ex: Consultoria sobre novo projeto"
            />
          </div>

          <div className="args-example-form-group">
            <label>Serviço Solicitado:</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">Selecione um serviço...</option>
              {args?.allowedServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="args-example-form-group">
            <label>Descrição (Opcional):</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Descreva detalhes sobre o agendamento..."
            />
          </div>

          <div className="args-example-form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="args-example-btn args-example-btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="args-example-btn args-example-btn-submit"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    );
  };

  const handleSubmit = (data: AppointmentData, date: Date) => {
    console.log('Dados do agendamento:', data);
    console.log('Data selecionada:', date);
    
    // Adicionar o agendamento à lista
    const newAppointment = {
      id: Date.now(),
      date: date.toISOString().split('T')[0],
      title: data.title,
      description: data.description,
      service: data.service,
      user: {
        id: data.userId,
        name: data.userName,
        email: data.userEmail,
        department: data.department
      }
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Mostrar feedback para o usuário
    alert(`✅ Agendamento criado com sucesso!\n\nServiço: ${data.service}\nData: ${date.toLocaleDateString('pt-BR')}\nSolicitante: ${data.userName}`);
  };
  return (
    <div className="args-example-container">
      <h1>📅 Exemplo: Passando Args para Formulário Customizado</h1>
      
      <div className="args-example-info-box">
        <h3>💡 Como funciona:</h3>
        <ul>
          <li>O parâmetro <code>args</code> permite passar dados adicionais para o formulário</li>
          <li>Neste exemplo, passamos dados do usuário (ID, nome, email, departamento)</li>
          <li>O formulário usa esses dados para preencher informações automáticas</li>
          <li>Os serviços disponíveis são filtrados baseados no usuário</li>
        </ul>
      </div>

      <div className="args-example-user-info">
        <h3>👤 Usuário Logado:</h3>
        <div className="args-example-user-card">
          <strong>{userData.userName}</strong> ({userData.userEmail}) - {userData.department}
        </div>
      </div>

      <Calendar
        appointments={appointments}
        enableSaturday={true}
        enableSunday={true}
        highlightToday={true}
        todayCircleStyle={true}
        maxAppointmentsPerDay={5}
        args={userData} // Passando os dados do usuário como args
        renderForm={renderCustomForm} // Formulário que recebe os args
        onSubmit={handleSubmit}
        themeColors={{
          color_header_top: '#007bff',
          color_header_bottom: '#0056b3',
          color_font_header: 'white'
        }}
      />      {appointments.length > 0 && (
        <div className="args-example-appointments">
          <h3>📋 Agendamentos Criados:</h3>
          <div className="args-example-appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="args-example-appointment-card">
                <h4>{appointment.title}</h4>
                <p><strong>Data:</strong> {new Date(appointment.date).toLocaleDateString('pt-BR')}</p>
                <p><strong>Serviço:</strong> {appointment.service}</p>
                <p><strong>Solicitante:</strong> {appointment.user.name} ({appointment.user.email})</p>
                <p><strong>Departamento:</strong> {appointment.user.department}</p>
                {appointment.description && (
                  <p><strong>Descrição:</strong> {appointment.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArgsExample;
