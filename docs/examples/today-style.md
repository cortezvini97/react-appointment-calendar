# 🎨 Estilos do Dia Atual

Controle visual do destaque do dia atual no calendário com duas opções de estilo: fundo amarelo tradicional ou círculo ao redor do número.

## 🎯 Funcionalidades

- ✅ **Estilo tradicional**: Fundo amarelo com borda (padrão)
- ✅ **Estilo círculo**: Círculo azul ao redor do número da data
- ✅ **Controle completo**: Ativar/desativar destaque
- ✅ **Responsivo**: Ambos os estilos se adaptam ao tamanho

## 📝 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| `highlightToday` | `boolean` | `true` | Ativa/desativa destaque do dia atual |
| `todayCircleStyle` | `boolean` | `false` | Escolhe o estilo do destaque |

## 🎨 Estilos Disponíveis

### 🟡 **Estilo Padrão** (`todayCircleStyle={false}`)
```css
.calendar-day-today {
  background: #fff3cd;      /* Fundo amarelo claro */
  border: 2px solid #ffc107; /* Borda amarela */
  font-weight: 600;          /* Texto em negrito */
  color: #856404;            /* Texto amarelo escuro */
}
```

**Características:**
- Fundo amarelo distintivo
- Borda colorida 
- Texto contrastante
- Hover com amarelo mais claro

### 🔵 **Estilo Círculo** (`todayCircleStyle={true}`)
```css
.calendar-day-today-circle .calendar-day-number::before {
  content: '';
  width: 32px;
  height: 32px;
  border: 2px solid #007bff;  /* Círculo azul */
  border-radius: 50%;         /* Formato circular */
  background: transparent;    /* Fundo transparente */
}
```

**Características:**
- Círculo azul ao redor do número
- Fundo transparente
- Texto azul e negrito
- Hover com fundo azul claro

## 💻 Exemplos de Uso

### Exemplo Básico - Estilo Padrão
```tsx
<Calendar
  appointments={appointments}
  highlightToday={true}
  todayCircleStyle={false} // Estilo padrão
  onSubmit={handleSubmit}
/>
```

### Exemplo - Estilo Círculo
```tsx
<Calendar
  appointments={appointments}
  highlightToday={true}
  todayCircleStyle={true} // Estilo círculo
  onSubmit={handleSubmit}
/>
```

### Exemplo - Sem Destaque
```tsx
<Calendar
  appointments={appointments}
  highlightToday={false} // Sem destaque algum
  onSubmit={handleSubmit}
/>
```

### Exemplo Completo Interativo
```tsx
import React, { useState } from 'react';
import { Calendar, Appointment } from 'react-appointment-calendar';

function TodayStyleExample() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [highlightToday, setHighlightToday] = useState(true);
  const [todayCircleStyle, setTodayCircleStyle] = useState(false);

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
      <h1>Estilos do Dia Atual</h1>
      
      {/* Controles */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={highlightToday}
            onChange={(e) => setHighlightToday(e.target.checked)}
          />
          Destacar dia atual
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={todayCircleStyle}
            onChange={(e) => setTodayCircleStyle(e.target.checked)}
            disabled={!highlightToday}
          />
          Usar estilo de círculo
        </label>
      </div>
      
      <Calendar
        appointments={appointments}
        highlightToday={highlightToday}
        todayCircleStyle={todayCircleStyle}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

## 🔄 Comportamento

### Combinações de Propriedades

| `highlightToday` | `todayCircleStyle` | Resultado |
|------------------|-------------------|-----------|
| `false` | `false` | ❌ Nenhum destaque |
| `false` | `true` | ❌ Nenhum destaque (highlightToday tem precedência) |
| `true` | `false` | 🟡 Fundo amarelo (padrão) |
| `true` | `true` | 🔵 Círculo azul |

### Lógica de CSS

O sistema aplica classes CSS condicionalmente:

```typescript
// Lógica interna simplificada
if (highlightToday && isToday(day.date)) {
  if (todayCircleStyle) {
    classes.push('calendar-day-today-circle');
  } else {
    classes.push('calendar-day-today');
  }
}
```

## 🎨 Customização Avançada

### Personalizando o Estilo Padrão
```css
.calendar-day-today {
  background: #e8f5e8 !important;  /* Verde claro */
  border: 2px solid #28a745 !important; /* Verde */
}

.calendar-day-today .calendar-day-number {
  color: #155724 !important; /* Verde escuro */
}
```

### Personalizando o Estilo Círculo
```css
.calendar-day-today-circle .calendar-day-number::before {
  border-color: #dc3545 !important; /* Círculo vermelho */
  border-width: 3px !important;     /* Borda mais grossa */
}

.calendar-day-today-circle .calendar-day-number {
  color: #dc3545 !important; /* Texto vermelho */
}
```

## 🔗 Exemplo Interativo

Teste a funcionalidade completa:
- **Demo Online**: [Today Style Example](http://localhost:3000/today-style)
- **Código Fonte**: `example/src/examples/TodayStyleExample.tsx`

### Como Testar:
1. Acesse o exemplo online
2. Observe o dia atual (18 de junho) no calendário
3. Use as checkboxes para alternar entre os estilos
4. Compare os diferentes visuais
5. Desative o destaque para ver sem formatação

## 🎯 Casos de Uso

### 🟡 **Quando usar Estilo Padrão**
- **Destaque máximo**: Quando o dia atual precisa ser muito evidente
- **Aplicações corporativas**: Visual tradicional e profissional
- **Compatibilidade**: Funciona bem com qualquer design existente

### 🔵 **Quando usar Estilo Círculo**
- **Design moderno**: Interface mais clean e elegante
- **Mobile first**: Menos intrusivo em telas pequenas
- **Integração visual**: Combina melhor com designs minimalistas

## ✨ Compatibilidade

- ✅ **Retrocompatibilidade**: Padrão mantém comportamento existente
- ✅ **Sem quebras**: Código existente continua funcionando
- ✅ **TypeScript**: Tipagem completa disponível
- ✅ **Responsivo**: Ambos os estilos se adaptam a diferentes tamanhos

---

**Próximo**: [Showcase Completo](./feature-showcase.md)
