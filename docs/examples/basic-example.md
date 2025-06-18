# 🎯 Exemplo Básico

Aprenda a usar o React Appointment Calendar com o exemplo mais simples possível.

## 🚀 Código Completo

```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';

function BasicExample() {
  // Estado para armazenar os agendamentos
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Reunião com cliente',
      date: new Date(2025, 5, 20), // 20 de junho de 2025
      data: { description: 'Discussão sobre projeto' }
    }
  ]);

  // Função chamada quando um novo agendamento é criado
  const handleSubmit = (data: any, date: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(), // ID único baseado no timestamp
      title: data.title,
      date: date,
      data: data
    };
    
    // Adiciona o novo agendamento à lista existente
    setAppointments(prev => [...prev, newAppointment]);
    console.log('Novo agendamento criado:', newAppointment);
  };

  // Função opcional chamada quando um dia é clicado
  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log('Dia clicado:', date);
    console.log('Agendamentos do dia:', dayAppointments);
  };

  return (
    <div>
      <h1>Meu Calendário de Agendamentos</h1>
      
      <Calendar
        appointments={appointments}
        onSubmit={handleSubmit}
        onDayClick={handleDayClick}
      />
      
      {/* Lista opcional dos agendamentos */}
      <div>
        <h3>Agendamentos ({appointments.length})</h3>
        {appointments.map(appointment => (
          <div key={appointment.id}>
            <strong>{appointment.title}</strong> - {appointment.date.toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BasicExample;
```

## 📋 Explicação Passo a Passo

### 1. **Importações**
```tsx
import { Calendar, Appointment } from 'react-appointment-calendar';
```
- `Calendar`: Componente principal do calendário
- `Appointment`: Interface TypeScript para tipagem

### 2. **Estado dos Agendamentos**
```tsx
const [appointments, setAppointments] = useState<Appointment[]>([]);
```
- Array que armazena todos os agendamentos
- Pode iniciar vazio ou com dados pré-existentes

### 3. **Callback de Submissão**
```tsx
const handleSubmit = (data: any, date: Date) => {
  // Cria novo agendamento
  const newAppointment: Appointment = {
    id: Date.now().toString(),
    title: data.title,
    date: date,
    data: data
  };
  
  // Adiciona à lista
  setAppointments(prev => [...prev, newAppointment]);
};
```

### 4. **Renderização do Calendar**
```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
/>
```
- `appointments`: Lista atual de agendamentos
- `onSubmit`: Função chamada ao criar novo agendamento

## 🎨 Funcionalidades Incluídas (Automáticas)

- ✅ **Modal de agendamento** ao clicar em qualquer dia
- ✅ **Formulário padrão** com título e descrição
- ✅ **Navegação entre meses** com setas
- ✅ **Destaque do dia atual** (azul)
- ✅ **Indicador de eventos** (número no canto dos dias)
- ✅ **Bloqueio de datas passadas** automático
- ✅ **Máximo de 3 agendamentos por dia** (padrão)

## 🔧 Configurações Padrão

| Propriedade | Valor Padrão | Descrição |
|-------------|--------------|-----------|
| `maxAppointmentsPerDay` | `3` | Máximo de agendamentos por dia |
| `enableSaturday` | `false` | Sábados desabilitados |
| `enableSunday` | `false` | Domingos desabilitados |
| `highlightToday` | `true` | Destaca dia atual |
| `highlightEvents` | `true` | Destaca dias com eventos |

## 🧪 Como Testar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/cortezvini97/react-appointment-calendar
   cd react-appointment-calendar/example
   npm install && npm start
   ```

2. **Acesse**: http://localhost:3000/calendar-example

3. **Teste as funcionalidades**:
   - Clique em qualquer dia disponível
   - Preencha o formulário no modal
   - Observe o agendamento sendo criado
   - Tente clicar em dias passados (bloqueados)
   - Navegue entre os meses

## 🚀 Próximos Passos

Após dominar o exemplo básico, explore:

1. [**Exemplo Prático**](./practical-example.md) - Uso em aplicação real
2. [**Configuração de Feriados**](./holidays.md) - Bloqueio de datas especiais
3. [**Horário de Funcionamento**](./working-hours.md) - Controle de horários
4. [**API Completa**](../api-reference.md) - Todas as opções disponíveis

---

**Próximo**: [Exemplo Prático](./practical-example.md)
