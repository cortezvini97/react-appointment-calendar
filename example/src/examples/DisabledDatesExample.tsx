import * as React from 'react';
import { Calendar } from 'react-appointment-calendar';
import { DisabledDate } from 'react-appointment-calendar';

const DisabledDatesExample: React.FC = () => {
  const [disabledDates] = React.useState<DisabledDate[]>([
    { label: "Reunião de diretoria", date: "28/06/2025" },
    { label: "Manutenção do sistema", date: "30/06/2025" },
    { label: "Treinamento interno", date: "15/07/2025" },
    { label: "Evento corporativo", date: "20/07/2025" }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>🚫 Exemplo: Datas Desabilitadas</h1>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>
          Este exemplo demonstra como desabilitar datas específicas no calendário usando a prop <code>disabledDates</code>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div>
          <Calendar
            enableSaturday={true}
            enableSunday={true}
            disabledDates={disabledDates}
            onSubmit={(data, date) => {
              alert(`✅ Agendamento "${data.title}" criado para ${date.toLocaleDateString('pt-BR')}`);
            }}
            renderForm={(date, onSubmit, onCancel) => (
              <div>
                <h3 style={{ marginBottom: '20px' }}>
                  Agendamento para {date.toLocaleDateString('pt-BR')}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  onSubmit({ 
                    title: formData.get('title'),
                    description: formData.get('description')
                  });
                }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Título:
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      placeholder="Ex: Reunião com cliente"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Descrição:
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Descrição opcional do agendamento"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={onCancel}
                      style={{
                        padding: '10px 20px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            )}
          />
        </div>

        <div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>📋 Datas Desabilitadas</h3>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {disabledDates.map((disabled, index) => (
                <div key={index} style={{ 
                  marginBottom: '12px',
                  padding: '10px',
                  background: '#f3e5f5',
                  borderLeft: '4px solid #9c27b0',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#7b1fa2' }}>
                    {disabled.date}
                  </div>
                  <div style={{ color: '#6c757d', fontSize: '13px' }}>
                    {disabled.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#1976d2', marginBottom: '15px', fontSize: '18px' }}>ℹ️ Como usar</h3>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#424242' }}>
              <p><strong>1. Visual:</strong> Datas desabilitadas aparecem com fundo roxo</p>
              <p><strong>2. Tooltip:</strong> Passe o mouse sobre as datas roxas para ver o motivo</p>
              <p><strong>3. Clique:</strong> Tentar clicar não abrirá o modal de agendamento</p>
              <p><strong>4. Formato:</strong> Use "DD/MM/YYYY" para datas específicas</p>
            </div>
          </div>

          <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <h3 style={{ color: '#856404', marginBottom: '15px', fontSize: '18px' }}>🔧 Configuração</h3>
            <pre style={{ 
              fontSize: '12px', 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`disabledDates={[
  {
    label: "Reunião de diretoria",
    date: "28/06/2025"
  },
  {
    label: "Manutenção do sistema", 
    date: "30/06/2025"
  }
]}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisabledDatesExample;
