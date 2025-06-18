# ⏰ Horário de Funcionamento

Esta funcionalidade permite definir horários de trabalho e controlar quando os agendamentos podem ser feitos.

## 🎯 Funcionalidades

- **Horário definido**: Configure horários como "08:00-18:00"
- **Validação em tempo real**: Bloqueio automático fora do horário
- **Controle de aplicação**: Apenas hoje ou todos os dias
- **Feedback visual**: Indicadores de status do horário

## 📝 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `workingHours` | `string \| null` | `null` | Horário no formato "HH:mm-HH:mm" |
| `workingHoursCurrentDayOnly` | `boolean` | `false` | Se `true`, restrição apenas para hoje |

## 💡 Exemplos de Uso

### Exemplo Básico
```tsx
<Calendar
  workingHours="08:00-18:00"
  appointments={appointments}
  onSubmit={handleSubmit}
/>
```

### Controle Apenas Hoje
```tsx
<Calendar
  workingHours="09:00-17:00"
  workingHoursCurrentDayOnly={true}
  appointments={appointments}
  onSubmit={handleSubmit}
/>
```

## 🔄 Comportamentos

### `workingHoursCurrentDayOnly = false` (padrão)
- ❌ **Bloqueia agendamentos em qualquer data** se estiver fora do horário
- 🔒 **Mostra modal informativo** em vez de alert
- ⚠️ **Aplica a qualquer dia** selecionado no calendário

### `workingHoursCurrentDayOnly = true`
- ✅ **Permite agendamentos futuros** independente do horário atual
- 🚨 **Bloqueia apenas hoje** se estiver fora do horário
- 📱 **Mostra alert simples** para restrição

## 🎨 Indicador Visual

Quando `workingHoursCurrentDayOnly = false`, o calendário mostra um indicador de status:

```tsx
// Status aberto
<div className="calendar-working-hours-info">
  🟢 Funcionamento: 08:00 às 18:00 (Aberto)
</div>

// Status fechado
<div className="calendar-working-hours-info closed">
  🔴 Funcionamento: 08:00 às 18:00 (Fechado)
</div>
```

## 🔗 Exemplo Completo

Veja o exemplo interativo completo em:
- **Demo Online**: [Working Hours Example](http://localhost:3000/working-hours)
- **Código Fonte**: `example/src/examples/WorkingHoursExample.tsx`

## 📱 Como Testar

1. Acesse a [demonstração online](http://localhost:3000/working-hours)
2. Configure diferentes horários de funcionamento
3. Teste com `workingHoursCurrentDayOnly` ligado/desligado
4. Observe os diferentes comportamentos ao tentar agendar

---

**Próximo**: [Navegação de Meses](./previous-months.md)
