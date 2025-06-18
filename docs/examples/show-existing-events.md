# 👁️ Exibição de Eventos Existentes

Controle total sobre a exibição de eventos existentes no modal de agendamento.

## 🎯 Objetivo

Permite que o desenvolvedor escolha se o modal deve mostrar ou ocultar os eventos já agendados para aquele dia, proporcionando uma interface mais limpa quando necessário.

## 📝 Propriedade

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `showExistingEvents` | `boolean` | `true` | Controla se eventos existentes são exibidos no modal |

## 💡 Casos de Uso

### Quando usar `showExistingEvents={true}` (padrão)
- ✅ **Sistema de gerenciamento**: Usuário precisa ver eventos existentes
- ✅ **Validação de conflitos**: Verificar sobreposições de horários
- ✅ **Interface administrativa**: Visão completa dos agendamentos

### Quando usar `showExistingEvents={false}`
- 🎯 **Interface simplificada**: Foco apenas no novo agendamento
- 🚀 **Processo rápido**: Agendamento sem distrações
- 📱 **Mobile first**: Economia de espaço na tela

## 🔄 Comportamento

### Com `showExistingEvents={true}`
```
┌─────────────────────────────────┐
│ Agendamento para 20/06/2025     │
├─────────────────────────────────┤
│ 📋 Agendamentos existentes:     │
│ • Reunião com cliente           │
│ • Apresentação do projeto       │
├─────────────────────────────────┤
│ ➕ Novo Agendamento:            │
│ [Formulário]                    │
└─────────────────────────────────┘
```

### Com `showExistingEvents={false}`
```
┌─────────────────────────────────┐
│ Agendamento para 20/06/2025     │
├─────────────────────────────────┤
│ ➕ Novo Agendamento:            │
│ [Formulário]                    │
│                                 │
│                                 │
└─────────────────────────────────┘
```

## 💻 Exemplos de Código

### Exemplo Básico - Ocultar Eventos
```tsx
import { Calendar, Appointment } from 'react-appointment-calendar';

function SimpleCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  return (
    <Calendar
      appointments={appointments}
      showExistingEvents={false} // Modal mais limpo
      onSubmit={handleSubmit}
    />
  );
}
```

### Exemplo Avançado - Controle Dinâmico
```tsx
import { Calendar, Appointment } from 'react-appointment-calendar';

function AdvancedCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showEvents, setShowEvents] = useState(true);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showEvents}
          onChange={(e) => setShowEvents(e.target.checked)}
        />
        Mostrar eventos existentes no modal
      </label>
      
      <Calendar
        appointments={appointments}
        showExistingEvents={showEvents}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

## 🎨 Interface Limpa vs Completa

| Aspecto | `showExistingEvents={true}` | `showExistingEvents={false}` |
|---------|----------------------------|------------------------------|
| **Altura do Modal** | Maior (eventos + formulário) | Menor (apenas formulário) |
| **Foco do Usuário** | Dividido | Concentrado no novo evento |
| **Informação** | Completa | Essencial |
| **Velocidade** | Mais análise | Agendamento rápido |

## 🔗 Exemplo Interativo

Teste a funcionalidade completa:
- **Demo Online**: [Show Existing Events Example](http://localhost:3000/show-existing-events)
- **Código Fonte**: `example/src/examples/ShowExistingEventsExample.tsx`

### Como Testar:
1. Acesse o exemplo online
2. Use a checkbox para ligar/desligar a funcionalidade  
3. Clique no dia 20 de junho (que tem 2 eventos)
4. Compare os dois comportamentos do modal

## ✨ Compatibilidade 

- ✅ **Retrocompatibilidade total**: Padrão é `true`
- ✅ **Sem quebras**: Código existente continua funcionando
- ✅ **TypeScript**: Tipagem completa disponível

---

**Próximo**: [Showcase de Funcionalidades](./feature-showcase.md)
