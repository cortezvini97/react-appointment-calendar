import React from 'react';
import ReactMarkdown from 'react-markdown';
import './HomePage.css';

const markdownContent = `# React Appointment Calendar

Bem-vindo ao **React Appointment Calendar**, uma biblioteca de calendário poderosa e flexível para React!

## ✨ Recursos Principais

- 📅 **Calendário Interativo**: Interface intuitiva e responsiva
- 🎯 **Agendamentos**: Sistema completo de gerenciamento de eventos
- 🏖️ **Feriados**: Suporte completo a feriados personalizados e móveis
- ⏰ **Horários de Trabalho**: Configuração flexível de horários
- 🚫 **Datas Desabilitadas**: Controle total sobre disponibilidade
- 🎨 **Personalizável**: Temas e estilos customizáveis

## 🚀 Como Usar

### Instalação

\`\`\`bash
npm install react-appointment-calendar
\`\`\`

### Exemplo Básico

\`\`\`jsx
import { Calendar } from 'react-appointment-calendar';

function App() {
  return (
    <Calendar
      appointments={[]}
      onCreateAppointment={(appointment) => {
        console.log('Novo agendamento:', appointment);
      }}
    />
  );
}
\`\`\`

## 📂 Exemplos Disponíveis

Use o menu lateral para navegar pelos exemplos:

### 🔰 Básicos
- **Exemplo Básico**: Implementação simples do calendário
- **Exemplo Prático**: Caso de uso real com agendamentos

### 🎯 Avançados
- **Com Recursos**: Demonstração de múltiplas funcionalidades
- **Showcase de Features**: Todas as funcionalidades em um só lugar

### 🏖️ Feriados
- **Feriados Personalizados**: Como configurar feriados específicos
- **Feriados Móveis**: Suporte automático a feriados móveis
- **Testes de Reserva**: Controle de agendamentos em feriados

### ⚙️ Configurações
- **Datas Desabilitadas**: Como desabilitar datas específicas
- **Horário de Funcionamento**: Configuração de horários válidos
- **Labels Personalizadas**: Customização de textos e mensagens

## 🛠️ Propriedades Principais

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| \`appointments\` | \`Appointment[]\` | Lista de agendamentos |
| \`holidays\` | \`Holiday[]\` | Feriados personalizados |
| \`maxAppointmentsPerDay\` | \`number\` | Limite de agendamentos por dia |
| \`allowHolidayBooking\` | \`boolean\` | Permite agendamentos em feriados |
| \`enableChristianHolidays\` | \`boolean\` | Habilita feriados móveis |
| \`workingHours\` | \`WorkingHours\` | Configuração de horários |

## 🎨 Personalização

O calendário suporta personalização completa via CSS e props. Veja os exemplos para diferentes configurações de tema e estilo.

---

**💡 Dica**: Comece com o "Exemplo Básico" e explore gradualmente os recursos mais avançados!
`;

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-content">        
        <div className="markdown-content">
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
