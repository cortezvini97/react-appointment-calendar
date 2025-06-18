# 🚀 Guia de Uso Básico

Tutorial passo a passo para começar a usar o React Appointment Calendar em sua aplicação.

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter:
- **React** 16.8+ instalado
- **Node.js** 14+ instalado
- Conhecimento básico de React Hooks

## 🛠️ Setup Inicial

### 1. Instale a biblioteca
```bash
npm install react-appointment-calendar
```

### 2. Importe no seu componente
```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';
```

### 3. Configure o estado inicial
```tsx
function MyCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // ... resto do código
}
```

## 🔧 Implementação Passo a Passo

### Passo 1: Estado dos Agendamentos
```tsx
const [appointments, setAppointments] = useState<Appointment[]>([
  // Você pode iniciar com dados existentes
  {
    id: '1',
    title: 'Reunião importante',
    date: new Date(2025, 5, 25), // 25 de junho de 2025
    data: { description: 'Reunião com a equipe' }
  }
]);
```

### Passo 2: Função de Submissão
```tsx
const handleSubmit = (formData: any, selectedDate: Date) => {
  // Criar novo agendamento
  const newAppointment: Appointment = {
    id: Date.now().toString(), // ID único simples
    title: formData.title,     // Título do formulário
    date: selectedDate,        // Data selecionada no calendário
    data: formData            // Dados extras do formulário
  };
  
  // Adicionar à lista existente
  setAppointments(prevAppointments => [
    ...prevAppointments,
    newAppointment
  ]);
  
  // Log para desenvolvimento (opcional)
  console.log('Novo agendamento criado:', newAppointment);
};
```

### Passo 3: Renderizar o Calendário
```tsx
return (
  <div className="my-calendar-container">
    <h1>Meu Calendário</h1>
    
    <Calendar
      appointments={appointments}
      onSubmit={handleSubmit}
    />
  </div>
);
```

## 💻 Código Completo

```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';

function MyCalendarApp() {
  // Estado para armazenar todos os agendamentos
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Exemplo inicial',
      date: new Date(2025, 5, 20),
      data: { description: 'Este é um agendamento de exemplo' }
    }
  ]);

  // Função chamada quando um novo agendamento é criado
  const handleSubmit = (formData: any, selectedDate: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: formData.title,
      date: selectedDate,
      data: formData
    };
    
    setAppointments(prev => [...prev, newAppointment]);
  };

  // Função opcional para capturar cliques nos dias
  const handleDayClick = (date: Date, dayAppointments: Appointment[]) => {
    console.log(`Clicou em ${date.toLocaleDateString()}`);
    console.log(`Agendamentos do dia:`, dayAppointments);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Meu Sistema de Agendamentos</h1>
      
      <Calendar
        appointments={appointments}
        onSubmit={handleSubmit}
        onDayClick={handleDayClick}
      />
      
      {/* Lista opcional dos agendamentos */}
      <div style={{ marginTop: '30px' }}>
        <h2>Agendamentos Cadastrados ({appointments.length})</h2>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento cadastrado ainda.</p>
        ) : (
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id} style={{ marginBottom: '10px' }}>
                <strong>{appointment.title}</strong>
                <br />
                📅 {appointment.date.toLocaleDateString('pt-BR')}
                {appointment.data?.description && (
                  <>
                    <br />
                    📝 {appointment.data.description}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyCalendarApp;
```

## 🎯 Comportamentos Padrão

Com a configuração básica acima, você terá:

### ✅ **Funcionalidades Ativas**
- Modal de agendamento ao clicar em dias disponíveis
- Formulário padrão com campos "Título" e "Descrição"
- Navegação entre meses com botões de seta
- Destaque do dia atual em azul
- Indicador numérico de eventos em cada dia
- Máximo de 3 agendamentos por dia

### ❌ **Funcionalidades Desabilitadas**
- Agendamentos em sábados (desabilitado por padrão)
- Agendamentos em domingos (desabilitado por padrão)
- Datas passadas (sempre bloqueadas)
- Feriados (nenhum configurado por padrão)

## 🔧 Personalizações Rápidas

### Habilitar Fins de Semana
```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  enableSaturday={true}
  enableSunday={true}
/>
```

### Aumentar Limite de Agendamentos
```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  maxAppointmentsPerDay={5}
/>
```

### Definir Data Inicial
```tsx
<Calendar
  appointments={appointments}
  onSubmit={handleSubmit}
  currentDate={new Date(2025, 5, 1)} // Junho de 2025
/>
```

## 🚨 Erros Comuns

### 1. **Agendamentos não aparecem**
```tsx
// ❌ Erro: não atualizar o estado
const handleSubmit = (data: any, date: Date) => {
  appointments.push(newAppointment); // Mutação direta
};

// ✅ Correto: usar setState
const handleSubmit = (data: any, date: Date) => {
  setAppointments(prev => [...prev, newAppointment]);
};
```

### 2. **Data incorreta**
```tsx
// ❌ Erro: mês em JavaScript é 0-indexado
new Date(2025, 6, 15) // 15 de julho (não junho!)

// ✅ Correto: subtrair 1 do mês
new Date(2025, 5, 15) // 15 de junho
```

### 3. **ID duplicado**
```tsx
// ❌ Erro: ID fixo
id: '1' // Todos terão ID 1

// ✅ Correto: ID único
id: Date.now().toString() // Timestamp único
```

## 🚀 Próximos Passos

Agora que você tem o básico funcionando:

1. **Explore configurações avançadas**: [API Reference](../api-reference.md)
2. **Adicione feriados**: [Feriados](./holidays.md)
3. **Configure horários**: [Working Hours](./working-hours.md)
4. **Veja exemplos práticos**: [Practical Example](./practical-example.md)

---

**Próximo**: [Exemplo Prático](./practical-example.md)
