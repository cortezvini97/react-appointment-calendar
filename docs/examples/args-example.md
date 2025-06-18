# Exemplo: Passando Args para Formulário Customizado

Este exemplo demonstra como usar o parâmetro `args` para passar dados adicionais para formulários customizados no calendário.

## 🎯 Funcionalidades Demonstradas

- **Passagem de dados via `args`**: Como passar informações do usuário para o formulário
- **Formulário dinâmico**: Formulário que se adapta baseado nos dados recebidos
- **Validação baseada em contexto**: Serviços disponíveis filtrados por usuário
- **Integração de dados**: Como os dados fluem do Calendar → Modal → renderForm

## 📋 Estrutura do Exemplo

### 1. Dados do Usuário (args)
```typescript
interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  department: string;
  allowedServices: string[];
}

const userData: UserData = {
  userId: 123,
  userName: "João Silva",
  userEmail: "joao.silva@empresa.com",
  department: "Desenvolvimento",
  allowedServices: ["Consultoria", "Treinamento", "Suporte Técnico"]
};
```

### 2. Formulário Customizado
```typescript
const renderCustomForm = (
  date: Date, 
  onSubmit: (data: any, event?: React.FormEvent) => void, 
  onCancel: () => void,
  args?: UserData // Recebe os dados do usuário
) => {
  // Formulário usa os dados do args para:
  // - Mostrar informações do usuário
  // - Filtrar serviços disponíveis
  // - Preencher dados automaticamente
};
```

### 3. Uso no Calendar
```typescript
<Calendar
  args={userData} // Passa os dados do usuário
  renderForm={renderCustomForm} // Formulário que recebe os args
  onSubmit={handleSubmit}
  // ... outras props
/>
```

## 🔄 Fluxo de Dados

1. **Calendar** recebe `args` como prop
2. **Calendar** passa `args` para o **Modal**
3. **Modal** passa `args` para o **renderForm**
4. **renderForm** usa `args` para personalizar o formulário

## 💡 Casos de Uso

- **Sistemas multi-usuário**: Passar dados do usuário logado
- **Contexto empresarial**: Departamento, permissões, configurações
- **Dados de sessão**: Preferências, histórico, configurações
- **Validação contextual**: Regras baseadas no usuário/contexto
- **Formulários dinâmicos**: Campos que mudam baseado no contexto

## 🚀 Como Testar

1. Acesse o exemplo através do menu lateral
2. Clique em qualquer dia do calendário
3. Observe como o formulário mostra os dados do usuário
4. Veja como os serviços são filtrados baseados no usuário
5. Crie um agendamento e veja como os dados são integrados

## 📝 Código Exemplo Básico

```typescript
// Args simples
const myArgs = {
  companyId: 456,
  userRole: 'manager',
  theme: 'dark'
};

// Formulário básico
const simpleForm = (date, onSubmit, onCancel, args) => {
  return (
    <div>
      <h3>Empresa: {args?.companyId}</h3>
      <p>Perfil: {args?.userRole}</p>
      {/* Resto do formulário */}
    </div>
  );
};

// Uso
<Calendar
  args={myArgs}
  renderForm={simpleForm}
/>
```

## ✅ Benefícios

- **Flexibilidade**: Formulários que se adaptam ao contexto
- **Reutilização**: Mesmo calendário para diferentes cenários
- **Tipagem**: Suporte completo ao TypeScript
- **Integração**: Fácil integração com sistemas existentes
