import React from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleHolidayTest from '../examples/SimpleHolidayTest';

const markdownContent = `# Teste Simples de Feriados

Este exemplo demonstra como configurar e testar a funcionalidade de **allowHolidayBooking** no calendário.

## 🎯 Objetivo

Testar se o calendário respeita corretamente a configuração de \`allowHolidayBooking\` para controlar se agendamentos podem ser feitos em feriados.

## 🔧 Configuração

- **Feriado de Teste**: 20 de junho de 2025 (Dia de Teste)
- **Controle**: Checkbox para alternar \`allowHolidayBooking\`
- **Feedback Visual**: Status atual claramente indicado

## 📋 Como Testar

1. **Quando BLOQUEADO** (checkbox desmarcado):
   - O dia 20/06 aparece em vermelho
   - Clicar no dia não abre o modal de agendamento
   - Feriado é apenas visual

2. **Quando PERMITIDO** (checkbox marcado):
   - O dia 20/06 ainda aparece em vermelho (indica feriado)
   - Clicar no dia ABRE o modal de agendamento
   - Permite criar agendamentos normalmente

## 🐛 Debug

O exemplo inclui informações de debug para acompanhar:
- Estado atual do \`allowHolidayBooking\`
- Número de atualizações do componente
- Logs no console do navegador

---

**💡 Dica**: Abra o console do navegador (F12) para ver os logs detalhados do comportamento.
`;

const SimpleHolidayTestPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <SimpleHolidayTest />
      </div>
    </div>
  );
};

export default SimpleHolidayTestPage;
