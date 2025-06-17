import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { Appointment } from 'react-appointment-calendar';

/**
 * Exemplo demonstrando todas as funcionalidades do calendário
 */
const FeatureShowcaseExample: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião de equipe',
      date: new Date(2025, 5, 15), // Junho 15, 2025
    },
    {
      id: '2',
      title: 'Consulta médica',
      date: new Date(2025, 5, 18), // Junho 18, 2025
    },
    {
      id: '3',
      title: 'Workshop técnico',
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
    console.log('Agendamento criado:', newAppointment);
  };

  const handleDayClick = (date: Date, appointmentsForDay: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', appointmentsForDay);
  };

  const renderCustomForm = (
    date: Date, 
    onSubmit: (data: any) => void, 
    onCancel: () => void
  ) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [priority, setPriority] = React.useState('medium');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim()) {
        onSubmit({
          title,
          description,
          priority,
          createdAt: new Date().toISOString(),
        });
      }
    };

    return (
      <div className="custom-form">
        <h3>Novo Agendamento - {date.toLocaleDateString('pt-BR')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título do agendamento:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reunião com cliente"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição opcional do agendamento"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Prioridade:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>        
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Confirmar Agendamento
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>Calendário com Funcionalidades Avançadas</h1>
        <p>
          Este exemplo demonstra todas as funcionalidades do calendário, incluindo 
          as novas melhorias implementadas.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h2>Funcionalidades Ativas</h2>
          <ul style={{ marginBottom: '20px' }}>
            <li>✅ Destaque de eventos (azul)</li>
            <li>✅ Destaque do dia atual (amarelo)</li>
            <li>✅ Números dos domingos em vermelho</li>
            <li>✅ Tooltip com vagas disponíveis</li>
            <li>✅ Fins de semana habilitados</li>
            <li>✅ Formulário customizado</li>
          </ul>
          
          <Calendar
            currentDate={new Date(2025, 5, 13)} // Junho 13, 2025
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={true}
            highlightEvents={true}
            highlightToday={true}
            showAvailableSlots={true}
            onDayClick={handleDayClick}
            onSubmit={handleSubmit}
            renderForm={renderCustomForm}
            style={{ border: '2px solid #007bff', borderRadius: '12px' }}
          />
        </div>

        <div>
          <h2>Funcionalidades Desabilitadas</h2>
          <ul style={{ marginBottom: '20px' }}>
            <li>❌ Destaque de eventos desabilitado</li>
            <li>❌ Destaque do dia atual desabilitado</li>
            <li>❌ Tooltip sem vagas disponíveis</li>
            <li>❌ Apenas formulário básico</li>
            <li>✅ Mesmos agendamentos para comparação</li>
          </ul>
          
          <Calendar
            currentDate={new Date(2025, 5, 13)} // Junho 13, 2025
            appointments={appointments}
            maxAppointmentsPerDay={3}
            enableSaturday={true}
            enableSunday={true}
            highlightEvents={false}
            highlightToday={false}
            showAvailableSlots={false}
            onDayClick={handleDayClick}
            onSubmit={handleSubmit}
            style={{ border: '2px solid #6c757d', borderRadius: '12px' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Instruções</h3>
        <ul>
          <li>Clique em qualquer dia disponível para abrir o modal de agendamento</li>
          <li>Passe o mouse sobre os dias para ver o tooltip com informações</li>
          <li>Observe as diferenças visuais entre os dois calendários</li>
          <li>Dias passados aparecem desabilitados</li>
          <li>O dia atual (13/06/2025) está destacado em amarelo no primeiro calendário</li>
          <li>Domingos têm números vermelhos em ambos os calendários</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureShowcaseExample;
