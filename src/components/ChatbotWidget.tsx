import { useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Phone,
} from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';

const SUGGESTED_QUESTIONS = [
  'Quais serviços oferecem?',
  'Como agendar?',
  'Qual o valor?',
  'Região de atendimento',
];

export function ChatbotWidget() {
  const {
    isOpen,
    toggle,
    close,
    messages,
    isTyping,
    sendMessage,
    showTooltip,
  } = useChatbot();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;
    sendMessage(text);
    inputRef.current!.value = '';
  };

  const handleSuggestionClick = (q: string) => {
    sendMessage(q);
  };

  return (
    <>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[1001] animate-bob"
        >
          <div
            className="px-4 py-2 rounded-xl text-sm font-medium text-white shadow-lg relative"
            style={{ background: 'var(--amber)' }}
          >
            Precisa de ajuda?
            <div
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
              style={{ background: 'var(--amber)' }}
            />
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed z-[1001] shadow-2xl overflow-hidden flex flex-col"
          style={{
            bottom: '24px',
            right: '24px',
            width: 'min(400px, calc(100vw - 48px))',
            height: 'min(520px, calc(100vh - 100px))',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(11,31,63,0.08)',
            transformOrigin: 'bottom right',
            animation: 'chatOpen 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0B1F3F, #1A73E8)',
              borderRadius: '16px 16px 0 0',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-base text-white">
                  Assistente MC
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-white/70">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={close}
              className="text-white/80 hover:text-white transition-opacity p-1"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{ background: '#F8FAFF' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-[15px] leading-[22px] ${
                    msg.sender === 'user'
                      ? 'rounded-[16px_16px_4px_16px] text-white'
                      : 'rounded-[16px_16px_16px_4px]'
                  }`}
                  style={
                    msg.sender === 'user'
                      ? { background: 'var(--electric)' }
                      : {
                          background: '#FFFFFF',
                          border: '1px solid rgba(11,31,63,0.08)',
                          color: '#0B1F3F',
                        }
                  }
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-1' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div
                  className="px-4 py-3 rounded-[16px_16px_16px_4px]"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(11,31,63,0.08)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full typing-dot"
                      style={{ background: 'var(--electric)' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full typing-dot"
                      style={{ background: 'var(--electric)' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full typing-dot"
                      style={{ background: 'var(--electric)' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 hover:opacity-80"
                    style={{
                      border: '1px solid rgba(26,115,232,0.2)',
                      background: 'rgba(26,115,232,0.04)',
                      color: 'var(--electric)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(11,31,63,0.08)' }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite sua pergunta..."
              className="flex-1 px-5 py-2.5 rounded-full text-sm outline-none transition-all"
              style={{
                border: '1px solid rgba(11,31,63,0.12)',
                color: '#0B1F3F',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--electric)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(11,31,63,0.12)';
              }}
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'var(--electric)' }}
            >
              <Send size={16} className="text-white" />
            </button>
          </form>

          {/* WhatsApp fallback */}
          <div
            className="px-4 py-2.5 flex-shrink-0 text-center"
            style={{ borderTop: '1px solid rgba(11,31,63,0.06)' }}
          >
            <a
              href="https://wa.me/5522981697377"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--success)' }}
            >
              <Phone size={14} />
              Falar direto no WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[1000] w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'var(--electric)',
          boxShadow: '0 4px 20px rgba(26, 115, 232, 0.4)',
        }}
        aria-label="Abrir chat"
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ripple" />
        )}
        {isOpen ? (
          <X size={28} className="text-white" />
        ) : (
          <Bot size={28} className="text-white" />
        )}
      </button>

      <style>{`
        @keyframes chatOpen {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
