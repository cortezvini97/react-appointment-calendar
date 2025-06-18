# 📚 Referência da API

Documentação completa de todas as propriedades, interfaces e callbacks disponíveis no React Appointment Calendar.

## 🎯 Interface Principal: CalendarProps

### 📅 **Propriedades de Data**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `currentDate` | `Date \| string` | `new Date()` | Data inicial do calendário. Aceita objeto Date ou string "YYYY-MM-DD" |
| `appointments` | `Appointment[]` | `[]` | Lista de agendamentos existentes |

### 🔢 **Controle de Capacidade**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `maxAppointmentsPerDay` | `number` | `3` | Máximo de agendamentos permitidos por dia |

### 🎉 **Feriados e Datas Especiais**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `holidays` | `Holiday[] \| null` | `null` | Lista de feriados personalizados |
| `allowHolidayBooking` | `boolean` | `false` | Permite agendamentos em feriados personalizados |
| `enableChristianHolidays` | `boolean` | `true` | Habilita feriados móveis automáticos (Páscoa, Carnaval, etc) |
| `allowChristianHolidayBooking` | `boolean` | `false` | Permite agendamentos em feriados móveis |
| `disabledDates` | `DisabledDate[] \| null` | `null` | Lista de datas específicas desabilitadas |

### 🗓️ **Dias da Semana**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `enableSaturday` | `boolean` | `false` | Permite agendamentos aos sábados |
| `enableSunday` | `boolean` | `false` | Permite agendamentos aos domingos |

### 🎨 **Interface Visual**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `highlightEvents` | `boolean` | `true` | Destaca dias com eventos |
| `highlightToday` | `boolean` | `true` | Destaca o dia atual |
| `showAvailableSlots` | `boolean` | `true` | Mostra vagas disponíveis no tooltip |
| `showExistingEvents` | `boolean` | `true` | Exibe eventos existentes no modal |

### 🧭 **Navegação**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `previousMonths` | `boolean` | `true` | Permite navegação para meses anteriores |
| `showDisabledPreviousButton` | `boolean` | `false` | Mostra botão anterior desabilitado vs oculto |

### ⏰ **Horário de Funcionamento**

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `workingHours` | `string \| null` | `null` | Horário no formato "HH:mm-HH:mm" |
| `workingHoursCurrentDayOnly` | `boolean` | `false` | Restrição apenas para o dia atual |

### 🎭 **Callbacks**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `onDayClick` | `(date: Date, appointments: Appointment[]) => void` | Executado ao clicar em um dia |
| `onSubmit` | `(data: any, date: Date, event?: React.FormEvent) => void` | Executado ao submeter novo agendamento |

### 🎨 **Customização**

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `renderForm` | `(date: Date, onSubmit: Function, onCancel: Function) => ReactNode` | Formulário customizado para o modal |
| `style` | `any` | Estilos inline personalizados |
| `className` | `string` | Classes CSS customizadas |

## 🔍 Interfaces de Dados

### 📋 Appointment
```tsx
interface Appointment {
  id: string;          // Identificador único
  title: string;       // Título do agendamento
  date: Date;          // Data do agendamento
  data?: any;          // Dados adicionais personalizados
}
```

### 🎉 Holiday
```tsx
interface Holiday {
  label: string;       // Nome do feriado
  date: string;        // Data no formato "DD/MM"
}
```

### 🚫 DisabledDate
```tsx
interface DisabledDate {
  label: string;       // Motivo da desabilitação
  date: string;        // Data no formato "DD/MM/YYYY"
}
```

### 📅 CalendarDay
```tsx
interface CalendarDay {
  date: Date;                    // Data do dia
  isCurrentMonth: boolean;       // Se pertence ao mês atual
  isPast: boolean;               // Se é uma data passada
  isDisabled: boolean;           // Se está desabilitado
  appointments: Appointment[];   // Agendamentos do dia
  isHoliday?: boolean;          // Se é feriado
  holidayLabel?: string;        // Nome do feriado
  isDisabledDate?: boolean;     // Se é data desabilitada
  disabledDateLabel?: string;   // Motivo da desabilitação
}
```

## 💡 Exemplos de Uso por Categoria

### 🚀 Configuração Básica
```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
/>
```

### 🎯 Controle de Capacidade
```tsx
<Calendar
  appointments={appointments}
  maxAppointmentsPerDay={5}
  onSubmit={handleSubmit}
/>
```

### 🎉 Com Feriados
```tsx
<Calendar
  appointments={appointments}
  holidays={[
    { label: "Natal", date: "25/12" },
    { label: "Ano Novo", date: "01/01" }
  ]}
  allowHolidayBooking={true}
  enableChristianHolidays={true}
  onSubmit={handleSubmit}
/>
```

### ⏰ Com Horário de Funcionamento
```tsx
<Calendar
  appointments={appointments}
  workingHours="08:00-18:00"
  workingHoursCurrentDayOnly={false}
  onSubmit={handleSubmit}
/>
```

### 🎨 Interface Customizada
```tsx
<Calendar
  appointments={appointments}
  highlightEvents={true}
  showExistingEvents={false}
  className="my-custom-calendar"
  style={{ border: '1px solid #ccc' }}
  onSubmit={handleSubmit}
/>
```

### 🧭 Controle de Navegação
```tsx
<Calendar
  appointments={appointments}
  previousMonths={false}
  showDisabledPreviousButton={true}
  onSubmit={handleSubmit}
/>
```

## 🎭 Formulário Customizado

```tsx
const customForm = (date: Date, onSubmit: Function, onCancel: Function) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit({
        title: formData.get('title'),
        description: formData.get('description')
      }, e);
    }}>
      <input name="title" placeholder="Título" required />
      <textarea name="description" placeholder="Descrição" />
      <button type="submit">Agendar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

<Calendar
  appointments={appointments}
  renderForm={customForm}
  onSubmit={handleSubmit}
/>
```

## 🔗 Links Relacionados

- [📦 Instalação](./installation.md)
- [🚀 Uso Básico](./basic-usage.md)
- [📋 Exemplos Práticos](./examples/)
- [🌐 Demo Online](http://localhost:3000)

---

*Esta documentação é gerada automaticamente baseada no código TypeScript da biblioteca.*
