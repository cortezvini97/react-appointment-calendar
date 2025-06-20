# blockDay - Controle de Bloqueio por Limite

A propriedade `blockDay` controla se um dia deve ser bloqueado quando o número máximo de agendamentos (`maxAppointmentsPerDay`) é atingido.

## 📋 Comportamento

### `blockDay: true` (padrão)
- **Comportamento tradicional**: Quando o limite é atingido, o dia fica visualmente bloqueado
- **Interação**: Não é possível clicar no dia para abrir o modal
- **Uso**: Ideal quando você quer impedir completamente novos agendamentos

### `blockDay: false`
- **Comportamento flexível**: O dia continua clicável mesmo com limite atingido
- **Interação**: É possível abrir o modal e tentar criar agendamentos
- **Uso**: Útil quando você quer permitir agendamentos extras ou mostrar avisos

## 🎯 Casos de Uso

### Quando usar `blockDay: true`
- Sistema de agendamentos rígido
- Controle de capacidade máxima
- Prevenção de sobrecarga

### Quando usar `blockDay: false`
- Sistemas com agendamentos emergenciais
- Permitir "overbooking" controlado
- Mostrar avisos sem bloquear completamente

## 💻 Exemplo de Uso

```typescript
// Bloquear dia quando limite atingido (padrão)
<Calendar
  maxAppointmentsPerDay={3}
  blockDay={true}
  // ... outras props
/>

// Permitir modal mesmo com limite atingido
<Calendar
  maxAppointmentsPerDay={3}
  blockDay={false}
  // ... outras props
/>
```

## 🔄 Integração com Validação

Quando `blockDay={false}`, você pode implementar validação personalizada no `onSubmit`:

```typescript
const handleSubmit = (data: any, date: Date) => {
  const dayAppointments = appointments.filter(apt => 
    isSameDay(apt.date, date)
  );
  
  if (dayAppointments.length >= maxAppointmentsPerDay) {
    // Mostrar aviso ou lógica de emergência
    const confirmOverbook = confirm(
      `Este dia já tem ${maxAppointmentsPerDay} agendamentos. Confirmar mesmo assim?`
    );
    
    if (!confirmOverbook) {
      return; // Cancelar se usuário não confirmar
    }
  }
  
  // Criar agendamento normalmente
  createAppointment(data, date);
};
```

## ✅ Benefícios

- **Flexibilidade**: Adapta-se a diferentes cenários de negócio
- **Controle**: Permite estratégias de agendamento mais sofisticadas
- **UX**: Melhora a experiência do usuário em casos específicos
- **Compatibilidade**: Mantém comportamento padrão quando não especificado
