# React Calendar Scheduler

Uma biblioteca de calendário para agendamento em React.js com funcionalidades avançadas e totalmente customizável.

## ✨ Funcionalidades

- ✅ **Bloqueio de dias passados**: Dias passados não podem ser selecionados
- ✅ **Controle de agendamentos**: Limite máximo de agendamentos por dia
- ✅ **Modal customizável**: Formulário personalizável para cada agendamento
- ✅ **Controle de fins de semana**: Habilitar/desabilitar sábados e domingos
- ✅ **Design responsivo**: Adapta-se automaticamente ao tamanho do container
- ✅ **TypeScript**: Totalmente tipado para melhor experiência de desenvolvimento
- ✅ **Acessibilidade**: Suporte completo para leitores de tela
- ✅ **Destaque de eventos**: Destacar dias com agendamentos (configurável)
- ✅ **Destaque do dia atual**: Realçar o dia atual com cor especial
- ✅ **Domingos em vermelho**: Números dos domingos aparecem em vermelho
- ✅ **Tooltip com vagas**: Mostrar vagas disponíveis no tooltip ao passar o mouse
- ✅ **Horário de funcionamento**: Restringir agendamentos a horários específicos

## 🚀 Instalação

```bash
npm install react-event-scheduler
```

ou

```bash
yarn add react-event-scheduler
```

## 📝 Uso Básico

```tsx
import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-event-scheduler';

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      data: data
    };
    
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Calendar
        appointments={appointments}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
```

## 🛠️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `currentDate` | `Date` | `new Date()` | Data atual do calendário |
| `appointments` | `Appointment[]` | `[]` | Lista de agendamentos |
| `maxAppointmentsPerDay` | `number` | `3` | Máximo de agendamentos por dia |
| `enableSaturday` | `boolean` | `false` | Habilitar agendamentos aos sábados |
| `enableSunday` | `boolean` | `false` | Habilitar agendamentos aos domingos |
| `highlightEvents` | `boolean` | `true` | Destacar dias com eventos/agendamentos |
| `highlightToday` | `boolean` | `true` | Destacar o dia atual com cor especial |
| `showAvailableSlots` | `boolean` | `true` | Mostrar vagas disponíveis no tooltip |
| `showExistingEvents` | `boolean` | `true` | Exibir eventos existentes no modal |
| `workingHours` | `string \| null` | `null` | Horário de funcionamento (formato: "HH:mm-HH:mm") |
| `onDayClick` | `(date: Date, appointments: Appointment[]) => void` | - | Callback ao clicar em um dia |
| `onSubmit` | `(data: any, date: Date) => void` | - | Callback ao submeter o formulário |
| `renderForm` | `(date: Date, onSubmit: (data: any) => void, onCancel: () => void) => React.ReactNode` | - | Renderizar formulário customizado |
| `style` | `React.CSSProperties` | - | Estilo customizado do calendário |
| `className` | `string` | - | Classe CSS customizada |

## 🎨 Formulário Customizado

Você pode criar seu próprio formulário personalizado usando a prop `renderForm`:

```tsx
const customFormRenderer = (date, onSubmit, onCancel) => {
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: `${service} - ${clientName}`,
      clientName,
      service,
      time,
      date
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Cliente:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label>Serviço:</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="">Selecione um serviço</option>
          <option value="Corte de Cabelo">Corte de Cabelo</option>
          <option value="Manicure">Manicure</option>
          <option value="Pedicure">Pedicure</option>
        </select>
      </div>

      <div>
        <label>Horário:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit">
          Agendar
        </button>
      </div>
    </form>
  );
};

// Uso
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  renderForm={customFormRenderer}
/>
```

## 🎯 Exemplos Avançados

### Calendário com Fins de Semana Habilitados

```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  enableSaturday={true}
  enableSunday={true}
/>
```

### Calendário com Limite de Agendamentos

```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  maxAppointmentsPerDay={1}
/>
```

### Calendário com Estilo Customizado

```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  className="meu-calendario"
  style={{ 
    border: '2px solid #007bff',
    borderRadius: '16px'
  }}
/>
```

### Calendário com Todas as Funcionalidades

```tsx
import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-event-scheduler';

function AdvancedCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <Calendar
      appointments={appointments}
      maxAppointmentsPerDay={5}
      enableSaturday={true}
      enableSunday={true}
      // Novas funcionalidades
      highlightEvents={true}        // Destacar eventos (padrão)
      highlightToday={true}         // Destacar dia atual (padrão)
      showAvailableSlots={true}     // Mostrar vagas no tooltip (padrão)
      onSubmit={(data, date) => {
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          title: data.title,
          date: date,
          data: data
        };
        setAppointments([...appointments, newAppointment]);
      }}
    />
  );
}
```

### Calendário Simples (sem destaques)

```tsx
function SimpleCalendar() {
  return (
    <Calendar
      highlightEvents={false}       // Desabilitar destaque de eventos
      highlightToday={false}        // Desabilitar destaque do dia atual
      showAvailableSlots={false}    // Desabilitar tooltip de vagas
    />
  );
}
```

### Controle de Exibição de Eventos Existentes

```tsx
function CalendarWithEventControl() {
  const [showExistingEvents, setShowExistingEvents] = useState(true);
  
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showExistingEvents}
          onChange={(e) => setShowExistingEvents(e.target.checked)}
        />
        Mostrar eventos existentes no modal
      </label>
      
      <Calendar
        appointments={appointments}
        showExistingEvents={showExistingEvents}  // Controlar exibição de eventos
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Calendário com Horário de Funcionamento

```tsx
function BusinessHoursCalendar() {
  return (
    <Calendar
      appointments={appointments}
      workingHours="08:00-18:00"    // Agendamentos só das 8h às 18h
      onSubmit={(data, date) => {
        // Só será chamado se estiver dentro do horário
        console.log('Agendamento criado:', data, date);
      }}
    />
  );
}

// Exemplos de horários suportados:
// "08:00-18:00" - Horário comercial
// "07:30-19:30" - Com minutos específicos  
// "22:00-06:00" - Horário noturno (atravessa meia-noite)
// null ou "" - Sem restrições de horário
```

## 🕐 Horário de Funcionamento

A funcionalidade de horário de funcionamento permite restringir quando os agendamentos podem ser feitos, ideal para estabelecimentos comerciais.

### Como Configurar

```tsx
<Calendar
  workingHours="08:00-18:00"  // Formato: "HH:mm-HH:mm"
  // ... outras props
/>
```

### Formatos Suportados

| Exemplo | Descrição | Comportamento |
|---------|-----------|---------------|
| `"08:00-18:00"` | Horário comercial | Agendamentos das 8h às 18h |
| `"07:30-19:30"` | Com minutos específicos | Agendamentos das 7h30 às 19h30 |
| `"22:00-06:00"` | Horário noturno | Das 22h às 6h (atravessa meia-noite) |
| `"00:00-23:59"` | 24 horas | Praticamente sem restrições |
| `null` ou `""` | Sem horário definido | Agendamentos permitidos sempre |

### Comportamentos

- **✅ Dentro do horário**: Agendamentos funcionam normalmente
- **❌ Fora do horário**: Clique no dia mostra alerta e impede agendamento
- **📋 Indicador visual**: Barra colorida mostra status (aberto/fechado)
- **💡 Tooltip**: Mostra horário de funcionamento e status atual
- **🔄 Tempo real**: Status atualiza automaticamente conforme o horário

### Validação

- Formato deve ser exatamente `HH:mm-HH:mm`
- Horas de 00 a 23, minutos de 00 a 59
- Horários inválidos são ignorados (comporta como sem restrição)
- Console mostra avisos para formatos incorretos

## 📱 Responsividade

O calendário é totalmente responsivo e se adapta ao tamanho do container pai. Ele funciona perfeitamente em:

- 📱 Dispositivos móveis (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🎨 Customização de Estilos

Você pode customizar o visual do calendário sobrescrevendo as classes CSS:

```css
/* Customizar o container principal */
.calendar-container {
  border: 2px solid #007bff;
  border-radius: 16px;
}

/* Customizar dias com agendamentos */
.calendar-day-has-appointments {
  background: #e8f5e8;
  border-left: 4px solid #28a745;
}

/* Customizar dias lotados */
.calendar-day-full {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
}

/* Customizar o modal */
.calendar-modal {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

## 🔧 Tipos TypeScript

```typescript
interface Appointment {
  id: string;
  title: string;
  date: Date;
  data?: any;
}

interface CalendarProps {
  currentDate?: Date;
  appointments?: Appointment[];
  maxAppointmentsPerDay?: number;
  enableSaturday?: boolean;
  enableSunday?: boolean;
  highlightEvents?: boolean;
  highlightToday?: boolean;
  showAvailableSlots?: boolean;
  showExistingEvents?: boolean;
  workingHours?: string | null;
  onDayClick?: (date: Date, appointments: Appointment[]) => void;
  onSubmit?: (data: any, date: Date) => void;
  renderForm?: (date: Date, onSubmit: (data: any) => void, onCancel: () => void) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
```

## 🌟 Recursos

- **Zero dependências externas** (exceto React)
- **Bundle pequeno** (~15KB gzipped)
- **Acessibilidade completa** (WCAG 2.1)
- **Suporte a teclado** (navegação e atalhos)
- **Internacionalização** (pt-BR por padrão)

## 📄 Licença

MIT © [Vinicius Cortez]

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma [issue](https://github.com/cortezvini97/react-event-scheduler/issues).
