import * as React from 'react';
import { ChatMessage, IAResponse, Appointment } from './types';
import { parseNaturalLanguageAppointment, generateIAResponse } from './iaUtils';
import './ChatBot.css';

interface ChatBotProps {
  isEnabled: boolean;
  appointments: Appointment[];
  hours?: string[];
  minTime?: number;
  onAppointmentExtracted?: (appointment: {
    title: string;
    date: Date;
    time?: string;
    confidence: number;
  }) => void;
  onIACallback?: (prompt: string) => string | IAResponse | Promise<string | IAResponse> | null | undefined | void;
  themeColors?: {
    color_header_top?: string | null;
    color_header_bottom?: string | null;
    color_font_header?: string | null;
  };
}

export const ChatBot: React.FC<ChatBotProps> = ({
  isEnabled,
  appointments,
  hours,
  minTime = 0,
  onAppointmentExtracted,
  onIACallback,
  themeColors
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      message: '🤖 Olá! Sou seu assistente inteligente de agendamentos. Como posso ajudá-lo hoje?\n\nVocê pode usar linguagem natural para criar seus agendamentos. Por exemplo:\n• "Agendar reunião amanhã às 15h"\n• "Preciso marcar um compromisso na sexta de manhã"\n• "Quero um horário no dia 28 às 16:30"',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isEnabled) {
    return null;
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de processamento da IA
    setTimeout(async () => {
      try {
        let iaResponse: IAResponse;
        let extractedAppointment: any = null;

        // Verificar se há callback customizado configurado
        if (!onIACallback) {
          // Erro: Callback não configurado
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            message: '🚫 **Erro de Configuração**\n\nNenhum callback de IA foi configurado para este calendário.\n\n**Para desenvolvedores:**\n• Implemente a prop `onIACallback` no componente Calendar\n• O callback deve processar prompts e retornar respostas customizadas\n• Consulte a documentação para exemplos de implementação\n\n**Exemplo:**\n```javascript\nconst handleIA = (prompt) => {\n  return { message: "Sua resposta aqui" };\n};\n\n<Calendar onIACallback={handleIA} />\n```',
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
          return;
        }

        // Tentar usar o callback customizado
        try {
          const customResponse = await onIACallback(currentInput);
          
          // Verificar se o callback retornou algo válido
          if (customResponse !== null && customResponse !== undefined && customResponse !== '') {
            if (typeof customResponse === 'string') {
              // Se for string, usar como mensagem simples
              iaResponse = {
                message: customResponse,
                extractedAppointment: undefined,
                suggestedActions: []
              };
            } else if (typeof customResponse === 'object' && customResponse.message) {
              // Se for objeto IAResponse, usar diretamente
              iaResponse = customResponse as IAResponse;
              extractedAppointment = iaResponse.extractedAppointment;
            } else {
              // Fallback para sistema padrão se retorno for inválido
              throw new Error('Callback retornou formato inválido');
            }
          } else {
            // Se callback retornou null/undefined/vazio, usar sistema padrão
            throw new Error('Callback não retornou resposta válida');
          }
        } catch (callbackError) {
          console.warn('Callback customizado falhou, usando sistema padrão:', callbackError);
          // Fallback para sistema padrão
          extractedAppointment = parseNaturalLanguageAppointment(currentInput, appointments, hours);
          iaResponse = generateIAResponse(currentInput, extractedAppointment, appointments, hours, minTime);
        }
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: iaResponse.message,
          isUser: false,
          timestamp: new Date(),
          appointment: extractedAppointment ? {
            id: Date.now().toString(),
            title: extractedAppointment.title,
            date: extractedAppointment.date,
            time: extractedAppointment.time,
            data: { source: 'ia-chat', confidence: extractedAppointment.confidence }
          } : undefined
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Se um agendamento foi extraído com boa confiança, notificar o parent
        if (extractedAppointment && extractedAppointment.confidence > 0.7 && onAppointmentExtracted) {
          onAppointmentExtracted(extractedAppointment);
        }
        
      } catch (error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: '🚫 Desculpe, houve um erro ao processar sua solicitação. Pode tentar novamente?',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 2000); // 1-3 segundos de delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChatHeaderStyles = () => {
    if (!themeColors?.color_header_top) return {};
    
    return {
      background: `linear-gradient(135deg, ${themeColors.color_header_top} 0%, ${themeColors.color_header_bottom || themeColors.color_header_top} 100%)`,
      color: themeColors.color_font_header || 'white'
    };
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header" style={getChatHeaderStyles()}>
        <div className="chatbot-header-content">
          <div className="chatbot-avatar">🤖</div>
          <div className="chatbot-title">
            <h3>Assistente IA</h3>
            <span className="chatbot-status">Online</span>
          </div>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <div className="message-text">
                {message.message.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.message.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            {message.appointment && (
              <div className="extracted-appointment">
                <strong>📅 Agendamento extraído:</strong>
                <div>{message.appointment.title}</div>
                <div>{message.appointment.date.toLocaleDateString('pt-BR')}</div>
                {message.appointment.time && <div>⏰ {message.appointment.time}</div>}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua solicitação de agendamento..."
          disabled={isTyping}
          rows={2}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!inputMessage.trim() || isTyping}
          className="send-button"
        >
          ✈️
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
