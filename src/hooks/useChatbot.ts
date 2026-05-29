import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const RESPONSES: Record<string, string> = {
  servico:
    'Oferecemos 4 categorias de serviços:\n\n1. **Segurança Eletrônica** — CFTV, alarmes, cercas elétricas e sensores\n2. **Automação Residencial** — Fechaduras eletrônicas, portões automáticos, controle de acesso\n3. **Elétrica Residencial** — Instalações completas, quadros, iluminação LED\n4. **Elétrica Industrial** — Painéis, manutenção, diagnósticos e projetos',
  camera: 'Oferecemos 4 categorias de serviços:\n\n1. **Segurança Eletrônica** — CFTV, alarmes, cercas elétricas e sensores\n2. **Automação Residencial** — Fechaduras eletrônicas, portões automáticos, controle de acesso\n3. **Elétrica Residencial** — Instalações completas, quadros, iluminação LED\n4. **Elétrica Industrial** — Painéis, manutenção, diagnósticos e projetos',
  preco:
    'O valor varia conforme o tipo e complexidade do serviço. Oferecemos **orçamento gratuito e sem compromisso**! Quer agendar uma visita técnica?',
  valor:
    'O valor varia conforme o tipo e complexidade do serviço. Oferecemos **orçamento gratuito e sem compromisso**! Quer agendar uma visita técnica?',
  quanto:
    'O valor varia conforme o tipo e complexidade do serviço. Oferecemos **orçamento gratuito e sem compromisso**! Quer agendar uma visita técnica?',
  custo:
    'O valor varia conforme o tipo e complexidade do serviço. Oferecemos **orçamento gratuito e sem compromisso**! Quer agendar uma visita técnica?',
  agendar:
    'Você pode agendar diretamente pelo formulário na seção "Agendar" aqui no site! É rápido e fácil. Ou, se preferir, fale pelo WhatsApp **(22) 98169-7377**.',
  marcar:
    'Você pode agendar diretamente pelo formulário na seção "Agendar" aqui no site! É rápido e fácil. Ou, se preferir, fale pelo WhatsApp **(22) 98169-7377**.',
  visita:
    'Você pode agendar diretamente pelo formulário na seção "Agendar" aqui no site! É rápido e fácil. Ou, se preferir, fale pelo WhatsApp **(22) 98169-7377**.',
  regiao:
    'Atendemos toda a **região metropolitana do Rio de Janeiro**, incluindo a capital, Niterói, São Gonçalo e Baixada Fluminense.',
  onde: 'Atendemos toda a **região metropolitana do Rio de Janeiro**, incluindo a capital, Niterói, São Gonçalo e Baixada Fluminense.',
  bairro:
    'Atendemos toda a **região metropolitana do Rio de Janeiro**, incluindo a capital, Niterói, São Gonçalo e Baixada Fluminense.',
  cidade:
    'Atendemos toda a **região metropolitana do Rio de Janeiro**, incluindo a capital, Niterói, São Gonçalo e Baixada Fluminense.',
  horario:
    'Nosso horário de atendimento é:\n\n**Segunda a Sexta:** 8h às 18h\n**Sábado:** 8h às 12h\n\nTambém temos **plantão de emergência 24h** para casos urgentes!',
  horário:
    'Nosso horário de atendimento é:\n\n**Segunda a Sexta:** 8h às 18h\n**Sábado:** 8h às 12h\n\nTambém temos **plantão de emergência 24h** para casos urgentes!',
  funcionamento:
    'Nosso horário de atendimento é:\n\n**Segunda a Sexta:** 8h às 18h\n**Sábado:** 8h às 12h\n\nTambém temos **plantão de emergência 24h** para casos urgentes!',
  garantia:
    'Oferecemos **90 dias de garantia** em todos os serviços executados. Equipamentos instalados têm garantia conforme especificação do fabricante, que pode variar de 1 a 5 anos.',
  ola: 'Olá! 👋 Bem-vindo! Sou o assistente virtual do Marcello Cordeiro. Como posso ajudar você hoje?',
  olá: 'Olá! 👋 Bem-vindo! Sou o assistente virtual do Marcello Cordeiro. Como posso ajudar você hoje?',
  oi: 'Oi! 👋 Bem-vindo! Sou o assistente virtual do Marcello Cordeiro. Como posso ajudar você hoje?',
  hey: 'Hey! 👋 Bem-vindo! Sou o assistente virtual do Marcello Cordeiro. Como posso ajudar você hoje?',
  emergencia:
    'Temos **plantão de emergência 24h**! Para atendimento prioritário, ligue diretamente no nosso WhatsApp: **(22) 98169-7377**.',
  emergência:
    'Temos **plantão de emergência 24h**! Para atendimento prioritário, ligue diretamente no nosso WhatsApp: **(22) 98169-7377**.',
  contato:
    'Você pode falar conosco pelo WhatsApp **(22) 98169-7377** ou agendar uma visita diretamente pelo formulário aqui no site.',
  whatsapp:
    'Nosso WhatsApp é **(22) 98169-7377**. É a forma mais rápida de falar conosco!',
  pix: 'Aceitamos pagamento em **dinheiro, PIX, cartão de débito e crédito** (em até 12x). Para valores acima de R$ 2.000, oferecemos condições especiais de parcelamento.',
  cartão:
    'Aceitamos pagamento em **dinheiro, PIX, cartão de débito e crédito** (em até 12x). Para valores acima de R$ 2.000, oferecemos condições especiais de parcelamento.',
  cartao:
    'Aceitamos pagamento em **dinheiro, PIX, cartão de débito e crédito** (em até 12x). Para valores acima de R$ 2.000, oferecemos condições especiais de parcelamento.',
  parcela:
    'Aceitamos pagamento em **dinheiro, PIX, cartão de débito e crédito** (em até 12x). Para valores acima de R$ 2.000, oferecemos condições especiais de parcelamento.',
  empresa:
    'O **Marcello Cordeiro Eletrotécnico** é uma empresa especializada em segurança eletrônica, automação residencial e serviços elétricos. Com mais de 10 anos de experiência, oferecemos atendimento profissional e personalizado na região metropolitana do Rio de Janeiro.',
  quem:
    'O **Marcello Cordeiro** é um eletrotécnico especializado em segurança eletrônica e automação, com mais de 10 anos de experiência atendendo residências e empresas no Rio de Janeiro.',
  experiencia:
    'O Marcello Cordeiro possui **mais de 10 anos de experiência** no mercado, com mais de 500 serviços realizados!',
  experiência:
    'O Marcello Cordeiro possui **mais de 10 anos de experiência** no mercado, com mais de 500 serviços realizados!',
};

const FALLBACK =
  'Desculpe, não entendi completamente. Posso transferir você para o WhatsApp do Marcello? Ou tente perguntar sobre: serviços, preços, agendamento, região de atendimento, horários ou garantia.';

const WELCOME: ChatMessage = {
  id: 'welcome',
  sender: 'bot',
  text: 'Olá! Sou o assistente virtual do Marcello Cordeiro. Como posso ajudar você hoje?',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  const words = lower.split(/\s+/);

  for (const word of words) {
    for (const [key, response] of Object.entries(RESPONSES)) {
      if (word.includes(key)) {
        return response;
      }
    }
  }

  return FALLBACK;
}

async function fetchOpenAICompatibleResponse(
  endpoint: string,
  apiKey: string,
  model: string,
  systemInstruction: string,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.filter(m => m.id !== 'welcome').map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: message }
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible request failed: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('Invalid response structure');
  }
  return text.trim();
}

async function fetchGeminiResponseWithInstructions(
  apiKey: string,
  systemInstruction: string,
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const contents = [
    ...history.filter(m => m.id !== 'welcome').map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    })),
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Gemini request failed');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Invalid response structure');
  }
  return text.trim();
}

async function fetchAIResponse(message: string, history: ChatMessage[]): Promise<string> {
  const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;
  const deepInfraKey = import.meta.env.VITE_DEEPINFRA_API_KEY;
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const systemInstruction = `Você é o assistente virtual do Marcello Cordeiro Eletrotécnico.
Sua persona: educado, profissional, objetivo e prestativo.
Seu objetivo é tirar dúvidas sobre os serviços e incentivar o cliente a agendar uma visita técnica ou entrar em contato pelo WhatsApp.

Informações sobre a empresa:
- Serviços:
  1. Segurança Eletrônica (CFTV, alarmes, cercas elétricas, sensores).
  2. Automação Residencial (fechaduras eletrônicas, portões automáticos, controle de acesso).
  3. Elétrica Residencial (instalações completas, quadros elétricos, iluminação LED, reformas).
  4. Elétrica Industrial (painéis, manutenção industrial, diagnósticos, projetos).
- Diferenciais: Mais de 10 anos de experiência, mais de 500 serviços realizados. Oferecemos 90 dias de garantia em todos os serviços. Orçamento gratuito e sem compromisso.
- Área de Atendimento: Região metropolitana do Rio de Janeiro (incluindo Capital, Niterói, São Gonçalo e Baixada Fluminense).
- Contato: WhatsApp ou Telefone (22) 98169-7377.
- Horário de Atendimento: Segunda a Sexta: 8h às 18h. Sábado: 8h às 12h. Plantão de emergência 24h para casos urgentes.
- Formas de Pagamento: Dinheiro, PIX, cartões de débito/crédito (em até 12x). Condições especiais de parcelamento para valores acima de R$ 2.000.

Regras importantes:
- Responda em português do Brasil (pt-BR).
- Mantenha as respostas curtas e diretas (no máximo 2 a 3 parágrafos curtos).
- Se o usuário demonstrar interesse em fechar serviço, solicitar orçamento personalizado, falar de preços específicos ou falar com um humano, responda de forma receptiva e inclua uma instrução clara para ele falar direto no WhatsApp pelo número (22) 98169-7377 ou clicar no botão no rodapé do chat.
- Nunca invente serviços que a empresa não faz (por exemplo, encanamento ou pintura).`;

  // 1. Try OpenRouter
  if (openRouterKey && !openRouterKey.startsWith('sua_chave')) {
    try {
      return await fetchOpenAICompatibleResponse(
        'https://openrouter.ai/api/v1/chat/completions',
        openRouterKey,
        'google/gemini-2.5-flash',
        systemInstruction,
        message,
        history
      );
    } catch (e) {
      console.warn('OpenRouter failed, trying next provider...', e);
    }
  }

  // 2. Try OpenAI
  if (openAIKey && !openAIKey.startsWith('sua_chave')) {
    try {
      return await fetchOpenAICompatibleResponse(
        'https://api.openai.com/v1/chat/completions',
        openAIKey,
        'gpt-4o-mini',
        systemInstruction,
        message,
        history
      );
    } catch (e) {
      console.warn('OpenAI failed, trying next provider...', e);
    }
  }

  // 3. Try DeepInfra
  if (deepInfraKey && !deepInfraKey.startsWith('sua_chave')) {
    try {
      return await fetchOpenAICompatibleResponse(
        'https://api.deepinfra.com/v1/openai/chat/completions',
        deepInfraKey,
        'meta-llama/Meta-Llama-3-8B-Instruct',
        systemInstruction,
        message,
        history
      );
    } catch (e) {
      console.warn('DeepInfra failed, trying next provider...', e);
    }
  }

  // 4. Try Gemini
  if (geminiKey && !geminiKey.startsWith('sua_chave')) {
    try {
      return await fetchGeminiResponseWithInstructions(
        geminiKey,
        systemInstruction,
        message,
        history
      );
    } catch (e) {
      console.warn('Gemini failed...', e);
    }
  }

  throw new Error('No working AI provider configuration found');
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setHasOpened(true);
        setShowTooltip(false);
        if (messages.length === 0) {
          setMessages([WELCOME]);
        }
      }
      return !prev;
    });
  }, [messages.length]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Show tooltip after 30s if never opened
  useState(() => {
    timeoutRef.current = setTimeout(() => {
      if (!hasOpened) {
        setShowTooltip(true);
      }
    }, 30000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  });

  const sendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => {
      const updatedMessages = [...prev, userMsg];
      
      setIsTyping(true);
      const hasAnyApiKey = 
        !!import.meta.env.VITE_OPENROUTER_API_KEY ||
        !!import.meta.env.VITE_OPENAI_API_KEY ||
        !!import.meta.env.VITE_DEEPINFRA_API_KEY ||
        !!import.meta.env.VITE_GEMINI_API_KEY;

      if (hasAnyApiKey) {
        const history = updatedMessages.slice(0, -1);
        fetchAIResponse(text, history)
          .then((botText) => {
            const botMsg: ChatMessage = {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: botText,
            };
            setMessages((prevHistory) => [...prevHistory, botMsg]);
          })
          .catch((err) => {
            console.error('Error fetching AI response, falling back to local:', err);
            const response = getResponse(text);
            const botMsg: ChatMessage = {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: response,
            };
            setMessages((prevHistory) => [...prevHistory, botMsg]);
          })
          .finally(() => {
            setIsTyping(false);
          });
      } else {
        const delay = 800 + Math.random() * 700;
        setTimeout(() => {
          const response = getResponse(text);
          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: response,
          };
          setMessages((prevHistory) => [...prevHistory, botMsg]);
          setIsTyping(false);
        }, delay);
      }

      return updatedMessages;
    });
  }, []);

  return {
    isOpen,
    toggle,
    close,
    messages,
    isTyping,
    sendMessage,
    showTooltip,
  };
}
