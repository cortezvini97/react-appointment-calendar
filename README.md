# React Appointment Calendar

Uma biblioteca de calendário para agendamento em React.js com funcionalidades avançadas, **IA integrada** e totalmente customizável.

## 📚 Documentação Completa

👉 **[Acesse a documentação completa](https://github.com/cortezvini97/react-appointment-calendar/blob/master/docs/README.md)** com exemplos interativos, guias de instalação e referência da API.

- 📖 [Guia de Instalação](https://github.com/cortezvini97/react-appointment-calendar/blob/master/docs/installation.md)
- 🎯 [Exemplo Básico](https://github.com/cortezvini97/react-appointment-calendar/blob/master/docs/examples/basic-example.md)
- 📚 [Referência da API](https://github.com/cortezvini97/react-appointment-calendar/blob/master/docs/api-reference.md)
- 🌐 [Exemplos Online](http://localhost:3000) (após rodar o projeto)

## ✨ Funcionalidades

- ✅ **Agendamento Inteligente com IA**: Chat bot integrado para agendamentos em linguagem natural
- ✅ **Extração Automática**: IA identifica datas, horários e assuntos automaticamente
- ✅ **Callback Customizado**: Sistema de IA personalizável com `onIACallback`
- ✅ **Bloqueio de dias passados**: Dias passados não podem ser selecionados
- ✅ **Controle de agendamentos**: Limite máximo de agendamentos por dia
- ✅ **Horários específicos**: Defina horários exatos disponíveis para agendamento
- ✅ **Sistema de tolerância**: Bloqueio automático de horários próximos
- ✅ **Modal customizável**: Formulário personalizável para cada agendamento
- ✅ **Controle de fins de semana**: Habilitar/desabilitar sábados e domingos
- ✅ **Feriados personalizados**: Adicione feriados específicos
- ✅ **Feriados móveis**: Páscoa, Carnaval e outros feriados automáticos
- ✅ **Datas desabilitadas**: Bloqueie datas específicas
- ✅ **Navegação controlada**: Limite navegação para meses anteriores
- ✅ **Design responsivo**: Adapta-se automaticamente ao tamanho do container
- ✅ **Temas personalizáveis**: Sistema completo de cores customizáveis
- ✅ **TypeScript**: Totalmente tipado para melhor experiência de desenvolvimento
- ✅ **Acessibilidade**: Suporte completo para leitores de tela
- ✅ **Destaque de eventos**: Destacar dias com agendamentos (configurável)
- ✅ **Destaque do dia atual**: Realçar o dia atual com cor especial
- ✅ **Domingos em vermelho**: Números dos domingos aparecem em vermelho
- ✅ **Tooltip com vagas**: Mostrar vagas disponíveis no tooltip ao passar o mouse
- ✅ **Horário de funcionamento**: Restringir agendamentos a horários específicos

## 🚀 Instalação

```bash
npm install react-appointment-calendar
```

ou

```bash
yarn add react-appointment-calendar
```

## 📝 Uso Básico

```tsx
import React, { useState } from 'react';
import Calendar, { Appointment } from 'react-appointment-calendar';

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

## 🤖 Uso com IA (Recomendado)

```tsx
import React, { useState } from 'react';
import Calendar, { Appointment, IAResponse } from 'react-appointment-calendar';

function AppWithAI() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      time: data.time,
      data: data
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleIAExtraction = (iaAppointment: any) => {
    // Auto-criar agendamentos com alta confiança
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
      setAppointments([...appointments, newAppointment]);
    }
  };

  const handleCustomIA = (prompt: string) => {
    // Personalizar respostas da IA
    if (prompt.toLowerCase().includes('urgente')) {
      return '🚨 Situação urgente! Entre em contato: (11) 99999-9999';
    }
    return null; // Usar sistema padrão
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Calendar
        appointments={appointments}
        onSubmit={handleSubmit}
        IAResource={true} // 🤖 Habilita IA
        onIAAppointmentExtracted={handleIAExtraction}
        onIACallback={handleCustomIA}
        hours={["08:00", "09:00", "10:00", "14:00", "15:00"]}
        minTime={30}
      />
    </div>
  );
}

export default AppWithAI;
```

## 🛠️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `currentDate` | `Date \| string` | `new Date()` | Data atual do calendário (aceita Date ou string no formato "YYYY-MM-DD") |
| `appointments` | `Appointment[]` | `[]` | Lista de agendamentos |
| `maxAppointmentsPerDay` | `number` | `3` | Máximo de agendamentos por dia |
| `hours` | `string[]` | - | Horários específicos disponíveis para agendamento (formato: ["08:00", "09:00", "10:00"]) |
| `minTime` | `number` | `0` | Tolerância em minutos para conflito de horários |
| `blockDay` | `boolean` | `true` | Bloqueia o dia quando excede maxAppointmentsPerDay |
| `holidays` | `Holiday[] \| null` | `null` | Lista de feriados |
| `allowHolidayBooking` | `boolean` | `false` | Permite agendamentos em feriados |
| `enableChristianHolidays` | `boolean` | `true` | Habilita feriados móveis automáticos (Páscoa, Carnaval, etc.) |
| `allowChristianHolidayBooking` | `boolean` | `false` | Permite agendamentos em feriados móveis automáticos |
| `previousMonths` | `boolean` | `true` | Permite navegação para meses anteriores |
| `showDisabledPreviousButton` | `boolean` | `false` | Controla a exibição do botão de mês anterior quando previousMonths é false |
| `disabledDates` | `DisabledDate[] \| null` | `null` | Lista de datas desabilitadas |
| `enableSaturday` | `boolean` | `false` | Habilitar agendamentos aos sábados |
| `enableSunday` | `boolean` | `false` | Habilitar agendamentos aos domingos |
| `highlightEvents` | `boolean` | `true` | Destacar dias com eventos/agendamentos |
| `highlightToday` | `boolean` | `true` | Destacar o dia atual com cor especial |
| `todayCircleStyle` | `boolean` | `false` | Estilo do destaque do dia atual (false: fundo amarelo, true: círculo) |
| `showAvailableSlots` | `boolean` | `true` | Mostrar vagas disponíveis no tooltip |
| `showExistingEvents` | `boolean` | `true` | Exibir eventos existentes no modal |
| `workingHours` | `string \| null` | `null` | Horário de funcionamento (formato: "HH:mm-HH:mm") |
| `workingHoursCurrentDayOnly` | `boolean` | `false` | Bloqueia horário de funcionamento apenas no dia atual |
| `IAResource` | `boolean` | `false` | Habilita o assistente de IA para agendamento inteligente |
| `onIAAppointmentExtracted` | `function` | - | Callback quando a IA extrai um agendamento da conversa |
| `onIACallback` | `function` | - | Callback customizado para processar prompts da IA |
| `onDayClick` | `(date: Date, appointments: Appointment[]) => void` | - | Callback ao clicar em um dia |
| `onSubmit` | `(data: any, date: Date, event?: React.FormEvent) => void` | - | Callback ao submeter o formulário |
| `renderForm` | `(date: Date, onSubmit: (data: any, event?: React.FormEvent) => void, onCancel: () => void, args?: any) => React.ReactNode` | - | Renderizar formulário customizado |
| `args` | `any` | - | Argumentos adicionais para passar ao formulário customizado |
| `style` | `React.CSSProperties` | - | Estilo customizado do calendário |
| `className` | `string` | - | Classe CSS customizada |
| `themeColors` | `ThemeColor` | - | Cores do tema do calendário |

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
import Calendar, { Appointment } from 'react-appointment-calendar';

function AdvancedCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const holidays = [
    { label: "Ano Novo", date: "01/01" },
    { label: "Natal", date: "25/12" }
  ];

  const disabledDates = [
    { label: "Manutenção", date: "15/08/2024" }
  ];

  const businessHours = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleIAExtraction = (iaAppointment: any) => {
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
      setAppointments([...appointments, newAppointment]);
      alert(`✅ Agendamento criado automaticamente! Confiança: ${Math.round(iaAppointment.confidence * 100)}%`);
    }
  };

  const handleCustomIA = (prompt: string) => {
    // Detectar emergências
    if (prompt.toLowerCase().includes('emergência') || prompt.toLowerCase().includes('urgente')) {
      return {
        message: '🚨 Situação urgente detectada!\n\nPara emergências:\n📞 (11) 99999-9999\n⚡ WhatsApp: (11) 88888-8888',
        suggestedActions: ['Ligar emergência', 'WhatsApp urgente', 'Continuar agendamento']
      };
    }
    
    // Detectar consultas médicas
    if (prompt.toLowerCase().includes('consulta') || prompt.toLowerCase().includes('médico')) {
      return {
        message: '🏥 Consulta médica identificada!\n\nRecomendações:\n• Chegar 15 minutos antes\n• Levar documentos\n• Verificar encaixe\n\nMe diga quando gostaria de agendar!',
        suggestedActions: ['Verificar encaixe', 'Agendar consulta', 'Ver especialidades']
      };
    }
    
    return null; // Usar sistema padrão para outros casos
  };

  return (
    <Calendar
      appointments={appointments}
      hours={businessHours}              // Horários específicos
      minTime={30}                     // 30 minutos de tolerância
      holidays={holidays}                // Feriados personalizados
      allowHolidayBooking={false}        // Bloquear feriados
      enableChristianHolidays={true}     // Feriados automáticos
      allowChristianHolidayBooking={false}
      disabledDates={disabledDates}      // Datas específicas bloqueadas
      previousMonths={false}             // Só permite navegar para frente
      enableSaturday={true}
      enableSunday={false}
      highlightEvents={true}             // Destacar eventos
      highlightToday={true}              // Destacar dia atual
      todayCircleStyle={true}            // Estilo de círculo para hoje
      showAvailableSlots={true}          // Mostrar vagas no tooltip
      showExistingEvents={true}          // Mostrar eventos no modal
      workingHours="08:00-18:00"         // Horário de funcionamento
      workingHoursCurrentDayOnly={true}  // Só validar hoje
      blockDay={true}                    // Bloquear dias lotados
      IAResource={true}                  // 🤖 Habilitar IA
      onIAAppointmentExtracted={handleIAExtraction} // Auto-criação
      onIACallback={handleCustomIA}      // IA personalizada
      themeColors={{                     // Cores personalizadas
        color_header_top: '#007bff',
        color_header_bottom: '#0056b3',
        color_font_header: '#ffffff'
      }}
      onSubmit={(data, date) => {
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          title: data.title,
          date: date,
          time: data.time, // Horário selecionado
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

## 🤖 Agendamento Inteligente com IA

A biblioteca inclui um sistema avançado de IA que permite criar agendamentos usando linguagem natural através de um chat bot integrado.

### ✨ Funcionalidades da IA

- **🗣️ Linguagem Natural**: Crie agendamentos falando normalmente
- **📅 Extração Automática**: Identifica datas, horários e assuntos automaticamente  
- **🎯 Sistema de Confiança**: Avalia a certeza da extração (0-100%)
- **⚡ Criação Automática**: Agendamentos com alta confiança são criados automaticamente
- **🔧 Callback Customizado**: Personalize respostas e comportamentos da IA
- **✅ Validação de Conflitos**: Verifica disponibilidade e sugere alternativas

### 🚀 Como Habilitar

```tsx
<Calendar
  appointments={appointments}
  IAResource={true} // Habilita o assistente IA
  onIAAppointmentExtracted={handleIAExtraction}
  onIACallback={handleCustomIA}
  onSubmit={handleSubmit}
/>
```

### 💬 Exemplos de Comandos

Os usuários podem usar linguagem natural como:

- "Quero agendar uma reunião na próxima segunda às 15h"
- "Preciso marcar uma consulta médica para amanhã de manhã"  
- "Agendar compromisso com cliente dia 28 às 16:30"
- "Marcar dentista para sexta-feira à tarde"

### 🔧 Callback Customizado (onIACallback)

Personalize completamente o comportamento da IA:

```tsx
const handleCustomIA = (prompt: string) => {
  // Exemplo 1: Detectar emergências
  if (prompt.toLowerCase().includes('emergência')) {
    return {
      message: '🚨 Situação urgente detectada! Entre em contato: (11) 99999-9999',
      suggestedActions: ['Ligar emergência', 'WhatsApp urgente']
    };
  }
  
  // Exemplo 2: Saudações personalizadas
  if (prompt.toLowerCase().includes('olá')) {
    const saudacoes = [
      '👋 Olá! Como posso ajudar com seus agendamentos?',
      '🌟 Oi! Pronto para organizar sua agenda?',
      '😊 Olá! Sou seu assistente pessoal de agendamentos!'
    ];
    return saudacoes[Math.floor(Math.random() * saudacoes.length)];
  }
  
  // Para outros casos, usar sistema padrão
  return null;
};
```

### 📊 Extração Automática de Agendamentos

Configure o callback para quando a IA extrair um agendamento:

```tsx
const handleIAExtraction = (iaAppointment) => {
  console.log('IA extraiu:', iaAppointment);
  
  // Auto-criar se confiança alta
  if (iaAppointment.confidence > 0.8) {
    const newAppointment = {
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
    alert(`✅ Agendamento criado automaticamente! Confiança: ${Math.round(iaAppointment.confidence * 100)}%`);
  }
};
```

### 🎯 Exemplo Completo com IA

```tsx
import React, { useState } from 'react';
import Calendar, { Appointment, IAResponse } from 'react-appointment-calendar';

function AICalendarExample() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: data.title,
      date: date,
      time: data.time,
      data: data
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleIAExtraction = (iaAppointment: any) => {
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

  const handleCustomIA = (prompt: string) => {
    // Detectar consultas médicas
    if (prompt.toLowerCase().includes('consulta') || prompt.toLowerCase().includes('médico')) {
      return {
        message: '🏥 Consulta médica identificada!\n\nRecomendações:\n• Chegar 15 minutos antes\n• Levar documentos\n• Verificar se tem encaixe hoje\n\nMe diga quando gostaria de agendar!',
        suggestedActions: ['Verificar encaixe', 'Agendar consulta', 'Ver especialidades']
      };
    }
    
    return null; // Usar sistema padrão
  };

  return (
    <Calendar
      appointments={appointments}
      hours={["08:00", "08:30", "09:00", "14:00", "14:30", "15:00"]}
      minTime={30}
      IAResource={true}
      onSubmit={handleSubmit}
      onIAAppointmentExtracted={handleIAExtraction}
      onIACallback={handleCustomIA}
      themeColors={{
        color_header_top: '#10b981',
        color_header_bottom: '#059669',
        color_font_header: '#ffffff'
      }}
    />
  );
}
```

### ⚠️ Validação de Callback

Se você habilitar `IAResource={true}` mas não fornecer `onIACallback`, o sistema exibirá uma mensagem educativa explicando como configurar corretamente:

```tsx
// ❌ Isso gerará um aviso educativo
<Calendar IAResource={true} />

// ✅ Configuração correta
<Calendar 
  IAResource={true}
  onIACallback={handleCustomIA}
/>
```

### 🔍 Troubleshooting IA

#### Problema: Chat bot não aparece
- **Causa**: `IAResource` não está habilitado
- **Solução**: Adicione `IAResource={true}` nas props do Calendar

#### Problema: Mensagem de erro sobre callback
- **Causa**: `IAResource={true}` sem `onIACallback` configurado  
- **Solução**: Adicione o callback: `onIACallback={handleCustomIA}`

#### Problema: IA não extrai agendamentos
- **Causa**: Linguagem muito informal ou ambígua
- **Solução**: Use comandos mais específicos como "agendar reunião segunda 15h"

#### Problema: Confiança sempre baixa
- **Causa**: Falta de contexto temporal ou detalhes
- **Solução**: Inclua data, horário e descrição: "consulta médica amanhã às 14h"

#### Dicas para Melhor Performance:
- ✅ Seja específico: "reunião segunda 15h" > "encontro qualquer hora"
- ✅ Use datas relativas: "amanhã", "próxima segunda" 
- ✅ Inclua horários: "às 14h30", "de manhã", "à tarde"
- ✅ Mencione o assunto: "consulta", "reunião", "compromisso"

## ⏰ Horários Específicos com Tolerância

Nova funcionalidade que permite definir horários específicos disponíveis para agendamento com sistema de tolerância automática.

### Como Configurar

```tsx
<Calendar
  appointments={appointments}
  hours={["08:00", "08:30", "09:00", "14:00", "14:30", "15:00"]}
  minTime={30} // 30 minutos de tolerância
  onSubmit={handleSubmit}
/>
```

### Funcionamento

- **Horários específicos**: Apenas os horários definidos em `hours` ficam disponíveis
- **Tolerância automática**: Sistema bloqueia horários próximos baseado na tolerância
- **Cálculo dinâmico**: `maxAppointmentsPerDay` é calculado automaticamente
- **Horários passados**: Para o dia atual, horários que já passaram ficam indisponíveis
- **Interface inteligente**: Modal mostra apenas horários válidos

### Exemplo Prático

```tsx
function SpecificHoursCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Horários de uma clínica médica
  const availableHours = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  return (
    <Calendar
      appointments={appointments}
      hours={availableHours}
      minTime={30} // 30 minutos entre consultas
      onSubmit={(data, date) => {
        const newAppointment = {
          id: Date.now().toString(),
          title: data.title,
          date: date,
          time: data.time, // Horário selecionado
          data: data
        };
        setAppointments([...appointments, newAppointment]);
      }}
    />
  );
}
```

### Regras de Tolerância

| Tolerância | Agendamento às 09:00 | Horários Bloqueados |
|------------|---------------------|-------------------|
| `0 minutos` | Permitido | Nenhum |
| `15 minutos` | Permitido | 08:45 - 09:15 |
| `30 minutos` | Permitido | 08:30 - 09:30 |
| `60 minutos` | Permitido | 08:00 - 10:00 |

### Vantagens

- ✅ **Automático**: Não precisa calcular `maxAppointmentsPerDay`
- ✅ **Inteligente**: Considera horário atual e tolerância  
- ✅ **Visual**: Tooltip mostra vagas disponíveis em tempo real
- ✅ **Flexível**: Diferentes horários por tipo de serviço

## 🎭 Feriados e Datas Especiais

### Feriados Personalizados

```tsx
const holidays = [
  { label: "Ano Novo", date: "01/01" },
  { label: "Independência", date: "07/09" },
  { label: "Natal", date: "25/12" }
];

<Calendar
  holidays={holidays}
  allowHolidayBooking={false} // Bloquear agendamentos em feriados
/>
```

### Feriados Móveis Automáticos

```tsx
<Calendar
  enableChristianHolidays={true}  // Habilita Páscoa, Carnaval, etc.
  allowChristianHolidayBooking={false} // Bloquear esses feriados
/>
```

### Datas Desabilitadas

```tsx
const disabledDates = [
  { label: "Manutenção", date: "15/08/2024" },
  { label: "Férias", date: "20/12/2024" }
];

<Calendar
  disabledDates={disabledDates}
/>
```

## 🎨 Temas e Personalização

### Cores Personalizadas

```tsx
<Calendar
  themeColors={{
    color_header_top: '#007bff',
    color_header_bottom: '#0056b3', 
    color_font_header: '#ffffff'
  }}
/>
```

### Estilos do Dia Atual

```tsx
<Calendar
  highlightToday={true}
  todayCircleStyle={true} // true: círculo, false: fundo amarelo
/>

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
  time?: string; // Horário do agendamento no formato "HH:mm"
}

interface TimeSlot {
  time: string; // Horário no formato "HH:mm"
  isAvailable: boolean;
  conflictsWith?: string[]; // Horários que conflitam devido à tolerância
}

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  appointment?: Appointment; // Agendamento extraído da mensagem (se houver)
}

interface IAResponse {
  message: string;
  extractedAppointment?: {
    title: string;
    date: Date;
    time?: string;
    confidence: number; // 0-1
  };
  suggestedActions?: string[];
}

interface Holiday {
  label: string;
  date: string; // formato: "DD/MM"
}

interface DisabledDate {
  label: string;
  date: string; // formato: "DD/MM/YYYY"
}

interface ThemeColor {
  color_header_top?: string | null;
  color_header_bottom?: string | null;
  color_font_header?: string | null;
}

interface CalendarProps {
  currentDate?: Date | string;
  appointments?: Appointment[];
  maxAppointmentsPerDay?: number;
  hours?: string[];
  minTime?: number;
  blockDay?: boolean;
  holidays?: Holiday[] | null;
  allowHolidayBooking?: boolean;
  enableChristianHolidays?: boolean;
  allowChristianHolidayBooking?: boolean;
  previousMonths?: boolean;
  showDisabledPreviousButton?: boolean;
  disabledDates?: DisabledDate[] | null;
  enableSaturday?: boolean;
  enableSunday?: boolean;
  highlightEvents?: boolean;
  highlightToday?: boolean;
  todayCircleStyle?: boolean;
  showAvailableSlots?: boolean;
  showExistingEvents?: boolean;
  workingHours?: string | null;
  workingHoursCurrentDayOnly?: boolean;
  
  // 🤖 Props de IA
  IAResource?: boolean;
  onIAAppointmentExtracted?: (appointment: {
    title: string;
    date: Date;
    time?: string;
    confidence: number;
  }) => void;
  onIACallback?: (prompt: string) => string | IAResponse | Promise<string | IAResponse> | null | undefined | void;
  
  // Callbacks principais
  onDayClick?: (date: Date, appointments: Appointment[]) => void;
  onSubmit?: (data: any, date: Date, event?: React.FormEvent) => void;
  renderForm?: (date: Date, onSubmit: (data: any, event?: React.FormEvent) => void, onCancel: () => void, args?: any) => React.ReactNode;
  args?: any;
  style?: React.CSSProperties;
  className?: string;
  themeColors?: ThemeColor;
}
```

## 🌟 Recursos

- **Zero dependências externas** (exceto React)
- **Bundle pequeno** (~20KB gzipped)
- **IA integrada** para agendamentos inteligentes
- **Chat bot conversacional** com linguagem natural
- **Sistema de callbacks customizáveis** para IA
- **Acessibilidade completa** (WCAG 2.1)
- **Suporte a teclado** (navegação e atalhos)
- **Internacionalização** (pt-BR por padrão)

## 📄 Licença

MIT © [Vinicius Cortez]

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor abra uma [issue](https://github.com/cortezvini97/react-appointment-calendar/issues).
