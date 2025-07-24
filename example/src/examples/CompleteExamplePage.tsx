import React, { useState } from 'react';
import Calendar, { Appointment, Holiday, DisabledDate, ThemeColor } from 'react-appointment-calendar';
import './CompleteExamplePage.css';

export const CompleteExamplePage: React.FC = () => {  // Estados para todos os parâmetros
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião de equipe',
      date: new Date(2025, 5, 20), // 20 de junho de 2025
      data: { type: 'work', priority: 'high' }
    },
    {
      id: '2',
      title: 'Consulta médica',
      date: new Date(2025, 5, 25), // 25 de junho de 2025
      data: { type: 'personal', location: 'Hospital' }
    },
    {
      id: '3',
      title: 'Reunião com cliente',
      date: new Date(2025, 5, 25), // 25 de junho de 2025 (mesmo dia)
      data: { type: 'work', priority: 'medium' }
    },
    {
      id: '4',
      title: 'Dentista',
      date: new Date(2025, 5, 25), // 25 de junho de 2025 (mesmo dia - atingindo limite)
      data: { type: 'personal', location: 'Clínica' }
    }
  ]);

  // Configurações básicas
  const [currentDate] = useState<Date>(new Date(2025, 5, 18));
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState(3);
  const [blockDay, setBlockDay] = useState(true);

  // Feriados
  const [holidays] = useState<Holiday[]>([
    { label: 'Dia de São João', date: '24/06' },
    { label: 'Dia de São Pedro', date: '29/06' },
    { label: 'Festa Junina', date: '23/06' }
  ]);
  const [allowHolidayBooking, setAllowHolidayBooking] = useState(false);
  const [enableChristianHolidays, setEnableChristianHolidays] = useState(true);
  const [allowChristianHolidayBooking, setAllowChristianHolidayBooking] = useState(false);

  // Navegação
  const [previousMonths, setPreviousMonths] = useState(true);
  const [showDisabledPreviousButton, setShowDisabledPreviousButton] = useState(false);

  // Datas desabilitadas
  const [disabledDates] = useState<DisabledDate[]>([
    { label: 'Manutenção do sistema', date: '28/06/2025' },
    { label: 'Feriado local', date: '15/06/2025' }
  ]);

  // Dias da semana
  const [enableSaturday, setEnableSaturday] = useState(false);
  const [enableSunday, setEnableSunday] = useState(false);

  // Destaques
  const [highlightEvents, setHighlightEvents] = useState(true);
  const [highlightToday, setHighlightToday] = useState(true);
  const [todayCircleStyle, setTodayCircleStyle] = useState(false);

  // Modal e tooltips
  const [showAvailableSlots, setShowAvailableSlots] = useState(true);
  const [showExistingEvents, setShowExistingEvents] = useState(true);

  // Horário de funcionamento
  const [workingHours, setWorkingHours] = useState<string | null>('08:00-18:00');
  const [workingHoursCurrentDayOnly, setWorkingHoursCurrentDayOnly] = useState(false);

  // Horários específicos com tolerância
  const [useSpecificHours, setUseSpecificHours] = useState(false);
  const [specificHours] = useState<string[]>([
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ]);
  const [minTime, setMinTime] = useState(30);

  // Tema
  const [selectedTheme, setSelectedTheme] = useState<'default' | 'purple' | 'blue' | 'green' | 'red' | 'dark'>('default');

  // IA Resource
  const [enableIA, setEnableIA] = useState(false);

  const getThemeColors = (): ThemeColor => {
    switch (selectedTheme) {
      case 'purple':
        return {
          color_header_top: '#7C3AED',
          color_header_bottom: '#5B21B6',
          color_font_header: '#FFFFFF'
        };
      case 'blue':
        return {
          color_header_top: '#3B82F6',
          color_header_bottom: '#1E40AF',
          color_font_header: '#FFFFFF'
        };
      case 'green':
        return {
          color_header_top: '#059669',
          color_header_bottom: '#047857',
          color_font_header: '#FFFFFF'
        };
      case 'red':
        return {
          color_header_top: '#DC2626',
          color_header_bottom: '#B91C1C',
          color_font_header: '#FFFFFF'
        };
      case 'dark':
        return {
          color_header_top: '#1F2937',
          color_header_bottom: '#374151',
          color_font_header: '#F9FAFB'
        };
      default:
        return {
          color_header_top: null,
          color_header_bottom: null,
          color_font_header: null
        };
    }
  };

  const handleSubmit = (data: any, date: Date) => {
    console.log('Novo agendamento:', data, 'Data:', date);
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title || 'Novo agendamento',
      date: date,
      ...(useSpecificHours && data.time && { time: data.time }),
      data: data
    };
    
    setAppointments(prev => [...prev, newAppointment]);
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
    }
  };

  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date, 'Agendamentos:', dayAppointments);
  };

  const themes = [
    { id: 'default', name: 'Padrão', color: '#6c757d' },
    { id: 'purple', name: 'Roxo', color: '#7C3AED' },
    { id: 'blue', name: 'Azul', color: '#3B82F6' },
    { id: 'green', name: 'Verde', color: '#059669' },
    { id: 'red', name: 'Vermelho', color: '#DC2626' },
    { id: 'dark', name: 'Escuro', color: '#1F2937' }
  ];

  return (
    <div className="complete-example-container">
      <h1>🔧 Exemplo Completo - Todos os Parâmetros</h1>
      
      <p>Este exemplo permite testar todas as funcionalidades e parâmetros do React Appointment Calendar.</p>

      {/* Destaque da funcionalidade blockDay */}
      <div className="highlight-section">
        <h3>🚫 Nova Funcionalidade: blockDay</h3>
        <p>
          <strong>Teste a funcionalidade blockDay:</strong> O dia 25/06 já possui 3 agendamentos (limite máximo). 
          Use o controle "Bloquear dia quando atingir limite" para ver a diferença:
        </p>
        <ul>
          <li><strong>blockDay: true</strong> - Dia 25/06 fica bloqueado (não clicável)</li>
          <li><strong>blockDay: false</strong> - Dia 25/06 permite abrir modal mesmo com limite atingido</li>
        </ul>
      </div>

      {/* Controles de Configuração */}
      <div className="controls-grid">
        
        {/* Configurações Básicas */}
        <div className="control-section basic">
          <h3>⚙️ Configurações Básicas</h3>
          
          <div className="control-item">
            <label>
              <strong>Máximo de agendamentos por dia:</strong>
              <input 
                type="number" 
                value={maxAppointmentsPerDay} 
                onChange={(e) => setMaxAppointmentsPerDay(Number(e.target.value))}
                min="1" 
                max="10"
              />
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={blockDay} 
                onChange={(e) => setBlockDay(e.target.checked)}
              />
              <strong>Bloquear dia quando atingir limite (blockDay)</strong>
            </label>
            <small>Se desmarcado, permite abrir modal mesmo excedendo o limite</small>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={enableSaturday} 
                onChange={(e) => setEnableSaturday(e.target.checked)}
              />
              <span>Habilitar sábados</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={enableSunday} 
                onChange={(e) => setEnableSunday(e.target.checked)}
              />
              <span>Habilitar domingos</span>
            </label>
          </div>
        </div>

        {/* Feriados */}
        <div className="control-section holidays">
          <h3>🎉 Feriados</h3>
          
          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={enableChristianHolidays} 
                onChange={(e) => setEnableChristianHolidays(e.target.checked)}
              />
              <span>Feriados cristãos automáticos</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={allowHolidayBooking} 
                onChange={(e) => setAllowHolidayBooking(e.target.checked)}
              />
              <span>Permitir agendamentos em feriados</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={allowChristianHolidayBooking} 
                onChange={(e) => setAllowChristianHolidayBooking(e.target.checked)}
              />
              <span>Permitir agendamentos em feriados cristãos</span>
            </label>
          </div>

          <div className="holidays-list">
            <strong>Feriados configurados:</strong>
            <ul>
              {holidays.map((holiday, index) => (
                <li key={index}>{holiday.label} - {holiday.date}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navegação */}
        <div className="control-section navigation">
          <h3>🧭 Navegação</h3>
          
          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={previousMonths} 
                onChange={(e) => setPreviousMonths(e.target.checked)}
              />
              <span>Permitir meses anteriores</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={showDisabledPreviousButton} 
                onChange={(e) => setShowDisabledPreviousButton(e.target.checked)}
                disabled={previousMonths}
              />
              <span>Mostrar botão anterior desabilitado</span>
            </label>
          </div>
        </div>

        {/* Visual */}
        <div className="control-section visual">
          <h3>👁️ Visual</h3>
          
          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={highlightEvents} 
                onChange={(e) => setHighlightEvents(e.target.checked)}
              />
              <span>Destacar eventos</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={highlightToday} 
                onChange={(e) => setHighlightToday(e.target.checked)}
              />
              <span>Destacar dia atual</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={todayCircleStyle} 
                onChange={(e) => setTodayCircleStyle(e.target.checked)}
                disabled={!highlightToday}
              />
              <span>Estilo círculo para hoje</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={showAvailableSlots} 
                onChange={(e) => setShowAvailableSlots(e.target.checked)}
              />
              <span>Mostrar vagas no tooltip</span>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={showExistingEvents} 
                onChange={(e) => setShowExistingEvents(e.target.checked)}
              />
              <span>Mostrar eventos no modal</span>
            </label>
          </div>
        </div>

        {/* Horário de Funcionamento */}
        <div className="control-section working-hours">
          <h3>🕒 Horário de Funcionamento</h3>
          
          <div className="control-item">
            <label>
              <strong>Horário:</strong>
              <select 
                value={workingHours || 'none'} 
                onChange={(e) => setWorkingHours(e.target.value === 'none' ? null : e.target.value)}
              >
                <option value="none">Sem restrição</option>
                <option value="08:00-18:00">08:00 - 18:00</option>
                <option value="09:00-17:00">09:00 - 17:00</option>
                <option value="10:00-16:00">10:00 - 16:00</option>
                <option value="14:00-22:00">14:00 - 22:00</option>
              </select>
            </label>
          </div>

          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={workingHoursCurrentDayOnly} 
                onChange={(e) => setWorkingHoursCurrentDayOnly(e.target.checked)}
                disabled={!workingHours}
              />
              <span>Apenas dia atual</span>
            </label>
          </div>
        </div>

        {/* Horários Específicos */}
        <div className="control-section specific-hours">
          <h3>⏰ Horários Específicos</h3>
          
          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={useSpecificHours} 
                onChange={(e) => setUseSpecificHours(e.target.checked)}
              />
              <span>Usar horários específicos</span>
            </label>
            <small>Se ativado, substitui o controle tradicional de máximo por dia</small>
          </div>

          {useSpecificHours && (
            <>
              <div className="control-item">
                <label>
                  <strong>Tolerância (minutos):</strong>
                  <select 
                    value={minTime} 
                    onChange={(e) => setMinTime(Number(e.target.value))}
                  >
                    <option value={15}>15 minutos</option>
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>60 minutos</option>
                    <option value={90}>90 minutos</option>
                  </select>
                </label>
                <small>Tempo mínimo entre agendamentos</small>
              </div>

              <div className="hours-info">
                <strong>Horários disponíveis:</strong>
                <div className="hours-grid">
                  {specificHours.map((hour, index) => (
                    <span key={index} className="hour-tag">{hour}</span>
                  ))}
                </div>
                <small>Total: {specificHours.length} horários • Tolerância: {minTime} min</small>
              </div>
            </>
          )}
        </div>

        {/* Temas */}
        <div className="control-section themes">
          <h3>🎨 Temas</h3>
          
          <div className="theme-buttons">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id as any)}
                className={`theme-button ${selectedTheme === theme.id ? 'active' : ''}`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Assistente IA */}
        <div className="control-section ia-section">
          <h3>🤖 Assistente IA</h3>
          
          <div className="control-item">
            <label>
              <input 
                type="checkbox" 
                checked={enableIA} 
                onChange={(e) => setEnableIA(e.target.checked)}
              />
              <span>Habilitar Agendamento Inteligente</span>
            </label>
            <small>Chat bot com IA para criar agendamentos usando linguagem natural</small>
          </div>

          {enableIA && (
            <div className="ia-info">
              <strong>🚀 Recursos da IA:</strong>
              <ul>
                <li>Extração automática de datas e horários</li>
                <li>Validação de conflitos em tempo real</li>
                <li>Criação automática de agendamentos</li>
                <li>Sugestões de horários alternativos</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Informações do Estado Atual */}
      <div className="status-info">
        <h3>📊 Estado Atual</h3>
        <div className="status-grid">
          <div><strong>Agendamentos:</strong> {appointments.length}</div>
          <div><strong>Max por dia:</strong> {useSpecificHours ? 'Dinâmico (baseado em horários)' : maxAppointmentsPerDay}</div>
          <div><strong>Modo:</strong> {useSpecificHours ? 'Horários específicos' : 'Tradicional'}</div>
          {useSpecificHours && (
            <>
              <div><strong>Tolerância:</strong> {minTime} min</div>
              <div><strong>Horários:</strong> {specificHours.length} disponíveis</div>
            </>
          )}
          <div><strong>Block Day:</strong> {blockDay ? 'Ativo' : 'Inativo'}</div>
          <div><strong>Tema:</strong> {selectedTheme}</div>
          <div><strong>Horário:</strong> {workingHours || 'Sem restrição'}</div>
          <div><strong>Sábados:</strong> {enableSaturday ? 'Habilitado' : 'Desabilitado'}</div>
          <div><strong>Domingos:</strong> {enableSunday ? 'Habilitado' : 'Desabilitado'}</div>
          <div><strong>IA:</strong> {enableIA ? 'Habilitada' : 'Desabilitada'}</div>
        </div>
      </div>

      {/* Calendário */}
      <div className={`calendar-wrapper ${selectedTheme !== 'default' ? 'themed' : 'default'}`}>
        <Calendar
          currentDate={currentDate}
          appointments={appointments}
          maxAppointmentsPerDay={maxAppointmentsPerDay}
          blockDay={blockDay}
          {...(useSpecificHours && { hours: specificHours, minTime })}
          holidays={holidays}
          allowHolidayBooking={allowHolidayBooking}
          enableChristianHolidays={enableChristianHolidays}
          allowChristianHolidayBooking={allowChristianHolidayBooking}
          previousMonths={previousMonths}
          showDisabledPreviousButton={showDisabledPreviousButton}
          disabledDates={disabledDates}
          enableSaturday={enableSaturday}
          enableSunday={enableSunday}
          highlightEvents={highlightEvents}
          highlightToday={highlightToday}
          todayCircleStyle={todayCircleStyle}
          showAvailableSlots={showAvailableSlots}
          showExistingEvents={showExistingEvents}
          workingHours={workingHours}
          workingHoursCurrentDayOnly={workingHoursCurrentDayOnly}
          themeColors={getThemeColors()}
          IAResource={enableIA}
          onIAAppointmentExtracted={handleIAAppointmentExtracted}
          onDayClick={handleDayClick}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Instruções de teste */}
      <div className="test-instructions">
        <h3>🧪 Como Testar as Funcionalidades</h3>
        <div className="instructions-grid">
          <div className="instruction-step">
            <strong>1. Teste blockDay (modo tradicional)</strong>
            <p>Com "Usar horários específicos" <strong>desabilitado</strong>, clique no dia <strong>25/06</strong> - não deve abrir o modal pois já tem 3 agendamentos (limite atingido)</p>
          </div>
          <div className="instruction-step">
            <strong>2. Teste horários específicos</strong>
            <p>Habilite "Usar horários específicos" e clique em qualquer dia - o modal mostrará apenas horários válidos baseados na tolerância</p>
          </div>
          <div className="instruction-step">
            <strong>3. Teste tolerância</strong>
            <p>Crie agendamentos próximos e mude a tolerância para ver como os horários são bloqueados</p>
          </div>
          <div className="instruction-step">
            <strong>4. Compare modos</strong>
            <p>Alterne entre modo tradicional e horários específicos para ver as diferenças no comportamento</p>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      {appointments.length > 0 && (
        <div className="appointments-list">
          <h3>📅 Agendamentos Cadastrados</h3>
          <div>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString('pt-BR')}
                {appointment.time && <span className="appointment-time"> às {appointment.time}</span>}
                {appointment.data && (
                  <div className="appointment-data">
                    {JSON.stringify(appointment.data)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteExamplePage;
