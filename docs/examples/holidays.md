# 🎃 Feriados Personalizados

Configure feriados específicos e controle se agendamentos são permitidos nessas datas.

## 🎯 Funcionalidades
- ✅ **Feriados fixos**: Defina datas que se repetem anualmente
- ✅ **Labels personalizados**: Nomes customizados para cada feriado
- ✅ **Controle de agendamento**: Permitir ou bloquear agendamentos
- ✅ **Destaque visual**: Feriados aparecem em cor diferenciada
- ✅ **Tooltip informativo**: Mostra o nome do feriado ao passar o mouse

## 📝 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `holidays` | `Holiday[]` | `null` | Lista de feriados personalizados |
| `allowHolidayBooking` | `boolean` | `false` | Permite agendamentos em feriados |

## 🔧 Interface Holiday

```tsx
interface Holiday {
  label: string;    // Nome do feriado
  date: string;     // Data no formato "DD/MM"
}
```

## 💡 Exemplos de Uso

### Feriados Básicos (Bloqueados)
```tsx
const holidays = [
  { label: "Natal", date: "25/12" },
  { label: "Ano Novo", date: "01/01" },
  { label: "Independência", date: "07/09" },
  { label: "Tiradentes", date: "21/04" }
];

<Calendar
  appointments={appointments}
  holidays={holidays}
  allowHolidayBooking={false} // Bloqueia agendamentos
  onSubmit={handleSubmit}
/>
```

### Feriados com Agendamento Permitido
```tsx
const holidays = [
  { label: "Black Friday", date: "29/11" },
  { label: "Dia das Mães", date: "12/05" }
];

<Calendar
  appointments={appointments}
  holidays={holidays}
  allowHolidayBooking={true} // Permite agendamentos
  onSubmit={handleSubmit}
/>
```

### Exemplo Completo Interativo
```tsx
import React, { useState } from 'react';
import { Calendar, Appointment, Holiday } from 'react-appointment-calendar';

function HolidaysExample() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [allowBooking, setAllowBooking] = useState(false);
  
  const brazilianHolidays: Holiday[] = [
    { label: "Natal", date: "25/12" },
    { label: "Ano Novo", date: "01/01" },
    { label: "Dia do Trabalho", date: "01/05" },
    { label: "Independência do Brasil", date: "07/09" },
    { label: "Nossa Senhora Aparecida", date: "12/10" },
    { label: "Finados", date: "02/11" },
    { label: "Proclamação da República", date: "15/11" }
  ];

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
    <div>
      <h1>Calendário com Feriados Brasileiros</h1>
      
      {/* Controle de agendamento em feriados */}
      <label>
        <input
          type="checkbox"
          checked={allowBooking}
          onChange={(e) => setAllowBooking(e.target.checked)}
        />
        Permitir agendamentos em feriados
      </label>
      
      <Calendar
        appointments={appointments}
        holidays={brazilianHolidays}
        allowHolidayBooking={allowBooking}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

## 🎨 Comportamento Visual

### Feriado Bloqueado (`allowHolidayBooking={false}`)
```css
.calendar-day-holiday {
  background-color: #ffebee; /* Fundo rosa claro */
  color: #c62828;            /* Texto vermelho */
  cursor: not-allowed;       /* Cursor de proibido */
}
```

### Feriado Permitido (`allowHolidayBooking={true}`)
```css
.calendar-day-holiday {
  background-color: #fff3e0; /* Fundo laranja claro */
  color: #e65100;            /* Texto laranja */
  cursor: pointer;           /* Cursor normal */
}
```

## 🔄 Funcionamento por Mês

O sistema verifica automaticamente se a data atual do calendário contém algum feriado:

```typescript
// Exemplo interno (simplificado)
const checkHoliday = (date: Date, holidays: Holiday[]) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const dateString = `${day}/${month}`;
  
  return holidays.find(holiday => holiday.date === dateString);
};
```

## 🌟 Casos de Uso Comuns

### 🏥 **Clínica Médica**
```tsx
const medicalClinicHolidays = [
  { label: "Natal", date: "25/12" },
  { label: "Ano Novo", date: "01/01" },
  { label: "Dia do Médico", date: "18/10" }
];
// allowHolidayBooking: false (fechado em feriados)
```

### 🎪 **Empresa de Eventos**
```tsx
const eventCompanyHolidays = [
  { label: "Dia das Mães", date: "12/05" },
  { label: "Dia dos Namorados", date: "12/06" },
  { label: "Black Friday", date: "29/11" }
];
// allowHolidayBooking: true (mais eventos em feriados)
```

### 🏢 **Escritório Corporativo**
```tsx
const corporateHolidays = [
  { label: "Recesso de Final de Ano", date: "24/12" },
  { label: "Recesso de Final de Ano", date: "25/12" },
  { label: "Recesso de Final de Ano", date: "31/12" }
];
// allowHolidayBooking: false (escritório fechado)
```

## 🔗 Exemplo Interativo

Teste todas as funcionalidades:
- **Demo Online**: [Holidays Example](http://localhost:3000/holidays-example)
- **Código Fonte**: `example/src/examples/HolidaysExample.tsx`

### Como Testar:
1. Acesse o exemplo online
2. Observe os feriados destacados no calendário
3. Toggle a opção de permitir agendamentos
4. Tente clicar em dias marcados como feriado
5. Veja as diferentes mensagens de tooltip

## ⚠️ Dicas Importantes

- ✅ **Formato de data**: Sempre use "DD/MM" (com zero à esquerda)
- ✅ **Ano independente**: Feriados se aplicam a todos os anos
- ✅ **Combinação**: Pode usar junto com `disabledDates` para datas específicas
- ⚠️ **Performance**: Listas grandes de feriados são otimizadas automaticamente

---

**Próximo**: [Feriados Móveis](./movable-holidays.md)
