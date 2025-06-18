import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface ExampleItem {
  path: string;
  name: string;
  description: string;
  category: string;
}

const examples: ExampleItem[] = [
  {
    path: '/',
    name: 'Início',
    description: 'Página inicial com documentação',
    category: 'Geral'
  },
  {
    path: '/calendar-example',
    name: 'Exemplo Básico',
    description: 'Exemplo básico do calendário',
    category: 'Básico'
  },
  {
    path: '/practical-example',
    name: 'Exemplo Prático',
    description: 'Exemplo prático de uso',
    category: 'Básico'
  },
  {
    path: '/example-with-features',
    name: 'Com Recursos',
    description: 'Exemplo com múltiplos recursos',
    category: 'Avançado'
  },
  {
    path: '/feature-showcase',
    name: 'Showcase de Features',
    description: 'Demonstração de todas as funcionalidades',
    category: 'Avançado'
  },
  {
    path: '/holidays-example',
    name: 'Feriados',
    description: 'Exemplo com feriados personalizados',
    category: 'Feriados'
  },  {
    path: '/movable-holidays',
    name: 'Feriados Móveis',
    description: 'Exemplo com feriados móveis',
    category: 'Feriados'
  },
  {
    path: '/holiday-booking-test',
    name: 'Teste Reserva Feriados',
    description: 'Teste de agendamentos em feriados',
    category: 'Feriados'
  },
  {
    path: '/simple-holiday-test',
    name: 'Teste Simples Feriados',
    description: 'Teste simples de configuração de feriados',
    category: 'Feriados'
  },
  {
    path: '/disabled-dates',
    name: 'Datas Desabilitadas',
    description: 'Exemplo com datas desabilitadas',
    category: 'Configurações'
  },
  {
    path: '/disabled-dates-label',
    name: 'Label Datas Desabilitadas',
    description: 'Teste de labels para datas desabilitadas',
    category: 'Configurações'
  }, 
   {
    path: '/working-hours',
    name: 'Horário de Funcionamento',
    description: 'Exemplo com horários de trabalho',
    category: 'Configurações'
  },  
  {
    path: '/previous-months',
    name: 'Previous Months',
    description: 'Teste de navegação para meses anteriores',
    category: 'Configurações'
  },  
  {
    path: '/show-existing-events',
    name: 'Controle de Eventos Existentes',
    description: 'Exemplo de controle para exibir/ocultar eventos existentes no modal',
    category: 'Configurações'
  },  {
    path: '/previous-button-control',
    name: 'Controle Botão Anterior',
    description: 'Exemplo de controle de exibição do botão de mês anterior',
    category: 'Configurações'
  },
  {
    path: '/today-style',
    name: 'Estilos do Dia Atual',
    description: 'Exemplo de diferentes estilos para destacar o dia atual',
    category: 'Configurações'
  },
  {
    path: '/corrections-demo',
    name: 'Demo de Correções',
    description: 'Demonstração de correções implementadas',
    category: 'Testes'
  }
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = Array.from(new Set(examples.map(ex => ex.category)));

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">        <h2 className="sidebar-title">
          {!isCollapsed && 'React Appointment Calendar'}
        </h2>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {categories.map(category => (
          <div key={category} className="nav-category">
            {!isCollapsed && <h3 className="category-title">{category}</h3>}
            {examples
              .filter(ex => ex.category === category)
              .map(example => (
                <Link
                  key={example.path}
                  to={example.path}
                  className={`nav-link ${location.pathname === example.path ? 'active' : ''}`}
                  title={isCollapsed ? `${example.name} - ${example.description}` : undefined}
                >
                  <span className="nav-link-text">
                    {isCollapsed ? example.name.charAt(0).toUpperCase() : example.name}
                  </span>
                  {!isCollapsed && (
                    <span className="nav-link-description">{example.description}</span>
                  )}
                </Link>
              ))
            }
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
