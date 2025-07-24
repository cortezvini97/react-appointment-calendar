# 🎯 onIACallback - Callback Customizado para IA

## Visão Geral

O prop `onIACallback` permite interceptar e customizar as respostas da IA no chat bot do calendário. Isso é útil para implementar lógicas específicas de negócio, integrar com APIs externas ou tratar casos especiais.

## Assinatura

```typescript
onIACallback?: (prompt: string) => string | IAResponse | Promise<string | IAResponse> | null | undefined | void
```

### Parâmetros
- **prompt**: `string` - O texto enviado pelo usuário no chat

### Retorno
O callback pode retornar:
- **`string`**: Resposta simples de texto
- **`IAResponse`**: Objeto completo com extração de agendamento
- **`Promise<string | IAResponse>`**: Para operações assíncronas
- **`null | undefined | void`**: Usa o sistema padrão da IA

## Interface IAResponse

```typescript
interface IAResponse {
  message: string;
  extractedAppointment?: {
    title: string;
    date: Date;
    time?: string;
    confidence: number; // 0-1
  };
  suggestedActions?: string[];
}
```

## Exemplos de Uso

### 1. Resposta Simples

```typescript
const handleIACallback = (prompt: string) => {
  if (prompt.toLowerCase().includes('horário')) {
    return "Nosso horário de funcionamento é das 8h às 18h, de segunda a sexta.";
  }
  
  // Retorna null para usar sistema padrão
  return null;
};

<Calendar
  IAResource={true}
  onIACallback={handleIACallback}
  // ... outras props
/>
```

### 2. Resposta com Extração de Agendamento

```typescript
const handleIACallback = (prompt: string): IAResponse | null => {
  if (prompt.toLowerCase().includes('vip')) {
    return {
      message: "🌟 Cliente VIP detectado! Priorizando seu agendamento...",
      extractedAppointment: {
        title: "Atendimento VIP",
        date: new Date(),
        time: "09:00",
        confidence: 0.95
      },
      suggestedActions: ["Confirmar horário VIP", "Entrar em contato"]
    };
  }
  
  return null;
};
```

### 3. Integração com API Externa

```typescript
const handleIACallback = async (prompt: string) => {
  if (prompt.toLowerCase().includes('verificar disponibilidade')) {
    try {
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        body: JSON.stringify({ query: prompt })
      });
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      return "Erro ao verificar disponibilidade. Tente novamente.";
    }
  }
  
  return null; // Usar sistema padrão
};
```

### 4. Tratamento de Emergências

```typescript
const handleIACallback = (prompt: string): IAResponse | null => {
  const emergencyKeywords = ['emergência', 'urgente', 'socorro', 'agora'];
  
  if (emergencyKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword)
  )) {
    return {
      message: `🚨 Situação urgente detectada!\n\nPara emergências, ligue: (11) 99999-9999\n\nOu posso tentar agendar para o próximo horário disponível.`,
      extractedAppointment: undefined,
      suggestedActions: [
        'Ligar para emergência',
        'Agendar próximo disponível',
        'Falar com supervisor'
      ]
    };
  }
  
  return null;
};
```

## Tratamento de Erros

O sistema possui tratamento robusto de erros:

1. **Callback não definido**: Usa sistema padrão
2. **Callback retorna null/undefined**: Usa sistema padrão  
3. **Callback lança erro**: Captura erro e usa sistema padrão
4. **Retorno inválido**: Valida formato e usa sistema padrão se necessário

```typescript
const handleIACallback = (prompt: string) => {
  try {
    // Sua lógica aqui
    if (someCondition) {
      return "Resposta customizada";
    }
    
    // Explicitly usar sistema padrão
    return null;
  } catch (error) {
    console.error('Erro no callback:', error);
    return "Desculpe, houve um erro. Tente novamente.";
  }
};
```

## Boas Práticas

### ✅ Recomendado

```typescript
// Validação de entrada
const handleIACallback = (prompt: string) => {
  if (!prompt || prompt.trim().length === 0) {
    return null; // Deixar sistema padrão tratar
  }
  
  // Lógica específica
  if (prompt.includes('palavra-chave')) {
    return "Resposta específica";
  }
  
  // Sempre retornar null para casos não tratados
  return null;
};
```

### ❌ Evitar

```typescript
// NÃO fazer - sempre retornar algo
const handleIACallback = (prompt: string) => {
  return "Resposta genérica"; // Nunca usa sistema padrão!
};

// NÃO fazer - não tratar erros
const handleIACallback = async (prompt: string) => {
  const response = await fetch('/api/endpoint'); // Pode falhar!
  return response.text();
};
```

## Integração com onIAAppointmentExtracted

Os dois callbacks trabalham em conjunto:

```typescript
const handleIACallback = (prompt: string): IAResponse | null => {
  if (prompt.includes('reunião importante')) {
    return {
      message: "Entendi que é uma reunião importante!",
      extractedAppointment: {
        title: "Reunião Importante",
        date: new Date(),
        time: "14:00",
        confidence: 0.9
      }
    };
  }
  return null;
};

const handleIAAppointmentExtracted = (appointment) => {
  console.log('Agendamento extraído:', appointment);
  
  if (appointment.confidence > 0.8) {
    // Criar agendamento automaticamente
    createAppointment(appointment);
  }
};

<Calendar
  IAResource={true}
  onIACallback={handleIACallback}
  onIAAppointmentExtracted={handleIAAppointmentExtracted}
/>
```

## Exemplo Completo

Veja o arquivo `IAAppointmentExample.tsx` para um exemplo completo de implementação com tratamento de emergências e fallback para o sistema padrão.
