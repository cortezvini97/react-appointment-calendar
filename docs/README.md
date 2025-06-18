# 📚 Documentação - React Appointment Calendar

Esta pasta contém a documentação completa com exemplos de uso da biblioteca React Appointment Calendar.

## 📖 Índice da Documentação

### 🚀 Começando
- [**Guia de Instalação**](./installation.md) - Como instalar e configurar
- [**Exemplo Básico**](./basic-usage.md) - Primeiro uso da biblioteca
- [**API Completa**](./api-reference.md) - Referência completa de todas as propriedades

### 📋 Exemplos por Categoria

#### 🎯 **Básicos**
- [**Exemplo Básico**](./examples/basic-example.md) - Configuração mínima
- [**Exemplo Prático**](./examples/practical-example.md) - Uso em aplicação real

#### ⚙️ **Configurações**
- [**Feriados Personalizados**](./examples/holidays.md) - Como configurar feriados
- [**Feriados Móveis**](./examples/movable-holidays.md) - Feriados automáticos (Páscoa, Carnaval, etc)
- [**Datas Desabilitadas**](./examples/disabled-dates.md) - Bloqueio de datas específicas
- [**Horário de Funcionamento**](./examples/working-hours.md) - Controle de horários de trabalho
- [**Navegação de Meses**](./examples/previous-months.md) - Controle de navegação
- [**Controle de Botão Anterior**](./examples/previous-button-control.md) - Personalização do botão de mês anterior

#### 🎨 **Interface e UX**
- [**Exibição de Eventos Existentes**](./examples/show-existing-events.md) - Controle de exibição no modal
- [**Showcase de Funcionalidades**](./examples/feature-showcase.md) - Demonstração completa
- [**Exemplo com Múltiplas Features**](./examples/example-with-features.md) - Combinação de recursos

#### 🧪 **Testes e Demonstrações**
- [**Teste de Reserva em Feriados**](./examples/holiday-booking-test.md) - Comportamento em feriados
- [**Teste Simples de Feriados**](./examples/simple-holiday-test.md) - Configuração básica de feriados
- [**Teste de Labels em Datas Desabilitadas**](./examples/disabled-dates-labels.md) - Personalização de mensagens
- [**Demo de Correções**](./examples/corrections-demo.md) - Demonstração de correções implementadas

## 🔗 Links Úteis

- [**🌐 Demonstração Online**](http://localhost:3000) - Acesse todos os exemplos rodando
- [**📦 NPM Package**](https://www.npmjs.com/package/react-appointment-calendar)
- [**🐙 GitHub Repository**](https://github.com/cortezvini97/react-appointment-calendar)
- [**🐛 Reportar Bugs**](https://github.com/cortezvini97/react-appointment-calendar/issues)

## 🚀 Início Rápido

```bash
npm install react-appointment-calendar
```

```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';

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

## 📱 Exemplos Interativos

Todos os exemplos podem ser testados na aplicação de demonstração:

1. Clone o repositório
2. Execute `cd example && npm install && npm start`
3. Acesse http://localhost:3000
4. Navegue pelos exemplos na sidebar

---

*Documentação gerada automaticamente para React Appointment Calendar v1.0.0*
