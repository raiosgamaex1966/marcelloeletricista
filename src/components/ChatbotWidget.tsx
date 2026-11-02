import { useRef, useEffect } from 'react';
import {
  X,
  Send,
  Phone,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';

const SUGGESTED_QUESTIONS = [
  'Quais serviços oferecem?',
  'Projeto e muro de arrimo',
  'Acompanhamento de obra',
  'Orçamento no Direct',
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
        <div className="fixed bottom-24 right-6 z-[1001] animate-bob">
          <div
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#0C1814] shadow-xl relative bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] border border-[#D4AF37]"
          >
            Pensando em construir? Tire dúvidas aqui!
            <div
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-[#D4AF37]"
            />
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed z-[1001] shadow-2xl overflow-hidden flex flex-col border border-[#D4AF37]/30"
          style={{
            bottom: '24px',
            right: '24px',
            width: 'min(420px, calc(100vw - 32px))',
            height: 'min(560px, calc(100vh - 80px))',
            background: '#0C1814',
            borderRadius: '20px',
            transformOrigin: 'bottom right',
            animation: 'chatOpen 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0 bg-gradient-to-r from-[#11231C] via-[#162D24] to-[#11231C] border-b border-[#D4AF37]/25"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37] p-0.5 bg-[#0C1814] flex items-center justify-center">
                <img
                  src="/images/cordeiro-emblem.png"
                  alt="Cordeiro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-brand-display font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                  <span>Cordeiro Assistente</span>
                  <Sparkles size={13} className="text-[#D4AF37]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[11px] text-[#DEC196]">Projetando hoje, construindo amanhã</span>
                </div>
              </div>
            </div>
            <button
              onClick={close}
              className="text-white/70 hover:text-white transition-opacity p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#08120E]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'rounded-[16px_16px_4px_16px] bg-gradient-to-r from-[#D4AF37] to-[#B89230] text-[#0C1814] font-medium shadow-md'
                      : 'rounded-[16px_16px_16px_4px] bg-[#11231C] border border-[#D4AF37]/20 text-white/90 shadow-md'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-[16px_16px_16px_4px] bg-[#11231C] border border-[#D4AF37]/20"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] typing-dot" />
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] typing-dot" />
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] typing-dot" />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#DEC196] hover:bg-[#D4AF37] hover:text-[#0C1814] transition-all"
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
            className="flex items-center gap-2 px-3 py-3 bg-[#11231C] border-t border-[#D4AF37]/20 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite sua dúvida ou mensagem..."
              className="flex-1 px-4 py-2 rounded-full text-xs sm:text-sm bg-[#08120E] text-white border border-white/10 outline-none focus:border-[#D4AF37] transition-all"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#D4AF37] text-[#0C1814] hover:bg-[#F3E2B8] active:scale-95 transition-all"
              aria-label="Enviar"
            >
              <Send size={15} />
            </button>
          </form>

          {/* Direct & WhatsApp fallback bar */}
          <div
            className="px-4 py-2.5 bg-[#0C1814] border-t border-white/5 flex items-center justify-between text-[11px]"
          >
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#DEC196] hover:text-white transition-colors"
            >
              <Instagram size={13} className="text-[#D4AF37]" />
              <span>Direct @cordeiroconstrucoeseletrica</span>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=5522997298782&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#25D366] hover:text-white transition-colors font-medium"
            >
              <Phone size={13} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_4px_25px_rgba(212,175,55,0.45)] border-2 border-[#D4AF37] bg-[#0C1814]"
        aria-label="Abrir assistente virtual"
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ripple pointer-events-none" />
        )}
        {isOpen ? (
          <X size={26} className="text-[#D4AF37]" />
        ) : (
          <div className="w-full h-full rounded-full overflow-hidden p-0.5 flex items-center justify-center">
            <img
              src="/images/cordeiro-emblem.png"
              alt="Cordeiro"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
      </button>

      <style>{`
        @keyframes chatOpen {
          from {
            transform: scale(0.3);
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
