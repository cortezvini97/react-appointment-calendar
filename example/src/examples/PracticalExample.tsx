/**
 * Exemplo Prático de Uso da Biblioteca React Appointment Calendar
 * 
 * Este exemplo demonstra como usar a biblioteca em uma aplicação real,
 * incluindo gerenciamento de estado, persistência de dados e formulários customizados.
 */

import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

// Exemplo de interface para dados customizados
interface ClientAppointment {
  id: string;
  title: string;
  date: Date;
  data: {
    clientName: string;
    clientPhone: string;
    service: string;
    duration: number;
    price: number;
    notes?: string;
  };
}

export const PracticalExample: React.FC = () => {
  // Estado dos agendamentos
  const [appointments, setAppointments] = React.useState<ClientAppointment[]>([]);
  
  // Estado das configurações
  const [settings, setSettings] = React.useState({
    maxAppointmentsPerDay: 6,
    enableSaturday: true,
    enableSunday: false,
    workingHours: { start: '08:00', end: '18:00' }
  });

  // Carregar agendamentos do localStorage na inicialização
  React.useEffect(() => {
    const saved = localStorage.getItem('calendar-appointments');
    if (saved) {
      try {
        const parsedAppointments = JSON.parse(saved).map((apt: any) => ({
          ...apt,
          date: new Date(apt.date)
        }));
        setAppointments(parsedAppointments);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    }
  }, []);

  // Salvar agendamentos no localStorage quando mudarem
  React.useEffect(() => {
    localStorage.setItem('calendar-appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Handler para novo agendamento
  const handleNewAppointment = (data: any, date: Date) => {
    const newAppointment: ClientAppointment = {
      id: Date.now().toString(),
      title: `${data.service} - ${data.clientName}`,
      date: date,
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        service: data.service,
        duration: parseInt(data.duration),
        price: parseFloat(data.price),
        notes: data.notes
      }
    };

    setAppointments(prev => [...prev, newAppointment]);
    
    // Simular notificação
    alert(`Agendamento confirmado!\n${data.service} para ${data.clientName}\nData: ${date.toLocaleDateString('pt-BR')}`);
  };

  // Handler para clique no dia
  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log(`Dia selecionado: ${date.toLocaleDateString('pt-BR')}`);
    console.log(`Agendamentos do dia: ${dayAppointments.length}`);
  };

  // Formulário customizado
  const renderCustomForm = (date: Date, onSubmit: (data: any) => void, onCancel: () => void) => {
    const [formData, setFormData] = React.useState({
      clientName: '',
      clientPhone: '',
      service: '',
      duration: '60',
      price: '',
      notes: ''
    });

    const services = [
      { name: 'Corte Masculino', duration: 30, price: 25 },
      { name: 'Corte Feminino', duration: 45, price: 35 },
      { name: 'Coloração', duration: 120, price: 80 },
      { name: 'Escova', duration: 30, price: 20 },
      { name: 'Manicure', duration: 60, price: 15 },
      { name: 'Pedicure', duration: 60, price: 18 }
    ];

    const handleServiceChange = (serviceName: string) => {
      const service = services.find(s => s.name === serviceName);
      if (service) {
        setFormData(prev => ({
          ...prev,
          service: serviceName,
          duration: service.duration.toString(),
          price: service.price.toString()
        }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.clientName && formData.clientPhone && formData.service) {
        onSubmit(formData);
      }
    };

    return (
      <div>
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clientName">Nome do Cliente *</label>
              <input
                id="clientName"
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                required
                placeholder="Nome completo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="clientPhone">Telefone *</label>
              <input
                id="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                required
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">Serviço *</label>
            <select
              id="service"
              value={formData.service}
              onChange={(e) => handleServiceChange(e.target.value)}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map(service => (
                <option key={service.name} value={service.name}>
                  {service.name} - {service.duration}min - R$ {service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duração (min)</label>
              <input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                min="15"
                max="240"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Preço (R$)</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Observações</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Informações adicionais..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Confirmar Agendamento
            </button>
          </div>
        </form>

        <style dangerouslySetInnerHTML={{
          __html: `
            .appointment-form { display: flex; flex-direction: column; gap: 1rem; }
            .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
            .form-group { display: flex; flex-direction: column; }
            .form-group label { font-weight: 600; margin-bottom: 0.5rem; color: #333; }
            .form-group input, .form-group select, .form-group textarea { 
              padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem;
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
              outline: none; border-color: #007bff; box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }
            .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem; }
            .btn-cancel, .btn-primary { padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
            .btn-cancel { background: #6c757d; color: white; }
            .btn-primary { background: #007bff; color: white; }
            .btn-cancel:hover { background: #5a6268; }
            .btn-primary:hover { background: #0056b3; }
            @media (max-width: 576px) { .form-row { grid-template-columns: 1fr; } }
          `
        }} />
      </div>
    );
  };

  // Calcular estatísticas
  const todayAppointments = appointments.filter(apt => 
    apt.date.toDateString() === new Date().toDateString()
  );
  
  const totalRevenue = appointments
    .filter(apt => apt.date.getMonth() === new Date().getMonth())
    .reduce((sum, apt) => sum + apt.data.price, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Agendamento - Salão de Beleza</h1>
        
        <div className="stats">
          <div className="stat-card">
            <h3>Hoje</h3>
            <p>{todayAppointments.length} agendamentos</p>
          </div>
          <div className="stat-card">
            <h3>Este Mês</h3>
            <p>R$ {totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="calendar-section">
          <div className="calendar-controls">
            <h2>Calendário de Agendamentos</h2>
            
            <div className="settings">
              <label>
                Máx. agendamentos/dia:
                <input
                  type="number"
                  value={settings.maxAppointmentsPerDay}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    maxAppointmentsPerDay: parseInt(e.target.value) 
                  }))}
                  min="1"
                  max="20"
                />
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={settings.enableSaturday}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    enableSaturday: e.target.checked 
                  }))}
                />
                Trabalhar aos sábados
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={settings.enableSunday}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    enableSunday: e.target.checked 
                  }))}
                />
                Trabalhar aos domingos
              </label>
            </div>
          </div>

          <Calendar
            appointments={appointments}
            maxAppointmentsPerDay={settings.maxAppointmentsPerDay}
            enableSaturday={settings.enableSaturday}
            enableSunday={settings.enableSunday}
            onDayClick={handleDayClick}
            onSubmit={handleNewAppointment}
            renderForm={renderCustomForm}
            className="main-calendar"
          />
        </div>

        <aside className="appointments-sidebar">
          <h3>Próximos Agendamentos</h3>
          <div className="appointments-list">
            {appointments
              .filter(apt => apt.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 10)
              .map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <strong>{appointment.data.clientName}</strong>
                    <span className="appointment-date">
                      {appointment.date.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <p>{appointment.data.service}</p>
                    <p>Tel: {appointment.data.clientPhone}</p>
                    <p>Duração: {appointment.data.duration}min</p>
                    <p>Valor: R$ {appointment.data.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </aside>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
          .app-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
          .app-header { margin-bottom: 2rem; }
          .app-header h1 { color: #333; margin-bottom: 1rem; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
          .stat-card { background: #f8f9fa; padding: 1rem; border-radius: 8px; text-align: center; }
          .stat-card h3 { margin: 0 0 0.5rem 0; color: #666; }
          .stat-card p { margin: 0; font-size: 1.25rem; font-weight: bold; color: #007bff; }
          .app-main { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
          .calendar-controls { margin-bottom: 1.5rem; }
          .calendar-controls h2 { margin: 0 0 1rem 0; }
          .settings { display: flex; flex-wrap: wrap; gap: 1rem; }
          .settings label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
          .settings input[type="number"] { width: 60px; padding: 0.25rem; }
          .appointments-sidebar { background: #f8f9fa; padding: 1.5rem; border-radius: 12px; height: fit-content; }
          .appointments-sidebar h3 { margin: 0 0 1rem 0; color: #333; }
          .appointments-list { display: flex; flex-direction: column; gap: 1rem; }
          .appointment-card { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .appointment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
          .appointment-header strong { color: #333; }
          .appointment-date { font-size: 0.85rem; color: #666; }
          .appointment-details p { margin: 0.25rem 0; font-size: 0.85rem; color: #666; }
          @media (max-width: 768px) { .app-main { grid-template-columns: 1fr; } }
        `
      }} />
    </div>
  );
};

export default PracticalExample;
