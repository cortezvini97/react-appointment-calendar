# 📦 Instalação

Guia completo para instalar e configurar o React Appointment Calendar.

## 🚀 Instalação via NPM

```bash
npm install react-appointment-calendar
```

## 🧶 Instalação via Yarn

```bash
yarn add react-appointment-calendar
```

## 📋 Requisitos

- **React**: ^16.8.0 ou superior
- **TypeScript**: ^4.0.0 (opcional, mas recomendado)
- **Node.js**: ^14.0.0 ou superior

## 🎯 Configuração Básica

### 1. Importar o Componente

```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';
```

### 2. Configurar Estado

```tsx
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
    <Calendar
      appointments={appointments}
      onSubmit={handleSubmit}
    />
  );
}
```

## 📱 Exemplo Mínimo Funcional

```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';

function MinimalExample() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <Calendar
      appointments={appointments}
      onSubmit={(data, date) => {
        console.log('Novo agendamento:', data, 'para', date);
      }}
    />
  );
}

export default MinimalExample;
```

## 🎨 Estilos CSS (Opcional)

O componente já vem com estilos padrão, mas você pode customizar:

```css
/* Personalizar cores do calendário */
.calendar-container {
  font-family: 'Arial', sans-serif;
}

.calendar-day-today {
  background-color: #007bff;
  color: white;
}

.calendar-day-has-appointments {
  border: 2px solid #28a745;
}
```

## 🔧 TypeScript (Recomendado)

Para melhor experiência de desenvolvimento:

```tsx
import { Calendar, Appointment, CalendarProps } from 'react-appointment-calendar';

interface MyAppointment extends Appointment {
  clientName?: string;
  phone?: string;
}

const MyCalendar: React.FC = () => {
  const [appointments, setAppointments] = useState<MyAppointment[]>([]);
  
  const calendarProps: CalendarProps = {
    appointments,
    maxAppointmentsPerDay: 5,
    enableSaturday: true,
    onSubmit: handleSubmit
  };

  return <Calendar {...calendarProps} />;
};
```

## 🐛 Resolução de Problemas

### Erro: "Calendar is not a function"
```bash
# Instale novamente
npm uninstall react-appointment-calendar
npm install react-appointment-calendar
```

### Erro de TypeScript
```tsx
// Certifique-se de usar a importação correta
import { Calendar } from 'react-appointment-calendar';
// NÃO: import Calendar from 'react-appointment-calendar';
```

### Estilos não aparecem
```tsx
// Verifique se está importando corretamente
import { Calendar } from 'react-appointment-calendar';
// Os estilos são incluídos automaticamente
```

## 📚 Próximos Passos

Após a instalação, explore os exemplos:

1. [**Exemplo Básico**](./examples/basic-example.md) - Primeiro uso
2. [**API Completa**](./api-reference.md) - Todas as propriedades
3. [**Exemplos Práticos**](./examples/) - Casos de uso reais

## 🔗 Links Úteis

- [📖 Documentação Completa](./README.md)
- [🌐 Exemplos Online](http://localhost:3000)
- [🐙 Repositório GitHub](https://github.com/cortezvini97/react-appointment-calendar)

---

**Próximo**: [Uso Básico](./basic-usage.md)
