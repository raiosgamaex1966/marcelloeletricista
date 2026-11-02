import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const RESPONSES: Record<string, string> = {
  servico:
    'A **Cordeiro Construções e Elétrica** oferece soluções completas:\n\n1. 📐 **Projetos** — Estrutural, Hidrossanitário, Elétrico e Muro de Arrimo\n2. 🏗️ **Acompanhamento de Obra** — Gestão técnica e economias inteligentes\n3. ⚡ **Instalações e Reparos Elétricos** — Residenciais, comerciais e reformas\n4. 📷 **Câmera e CFTV** — Monitoramento HD/4K com acesso pelo celular\n5. 🛡️ **Segurança Eletrônica** — Alarmes e proteção patrimonial\n\nQual deles você precisa no momento?',
  projeto:
    'Desenvolvemos **projeto estrutural, hidrossanitário, elétrico e muro de arrimo** com precisão técnica e total conformidade com as normas ABNT. Isso garante a segurança do seu imóvel e evita desperdício de ferro e concreto!',
  obra:
    'No **acompanhamento de obra**, nossa dupla com conhecimento técnico e experiência prática fiscaliza a execução, orienta nas melhores decisões e proporciona economias inteligentes na compra e uso de materiais.',
  eletrica:
    'Realizamos **instalações e reparos elétricos completos**: montagem e reforma de quadros de distribuição, troca de fiação, iluminação LED e manutenção preventiva e corretiva com máxima segurança.',
  camera:
    'Instalamos sistemas de **Câmeras CFTV** de alta definição com visualização em tempo real pelo seu smartphone, onde você estiver, 24 horas por dia!',
  cftv:
    'Instalamos sistemas de **Câmeras CFTV** de alta definição com visualização em tempo real pelo seu smartphone, onde você estiver, 24 horas por dia!',
  preco:
    'O valor varia conforme a dimensão e complexidade do projeto ou obra. Oferecemos **orçamento sem compromisso pelo Direct do Instagram ou WhatsApp**! Quer que façamos uma estimativa para você?',
  valor:
    'O valor varia conforme a dimensão e complexidade do projeto ou obra. Oferecemos **orçamento sem compromisso pelo Direct do Instagram ou WhatsApp**! Quer que façamos uma estimativa para você?',
  orcamento:
    'Você pode solicitar seu orçamento agora mesmo enviando uma mensagem no nosso **Direct do Instagram (@cordeiroconstrucoeseletrica)** ou pelo WhatsApp **(22) 99729-8782**!',
  orçamento:
    'Você pode solicitar seu orçamento agora mesmo enviando uma mensagem no nosso **Direct do Instagram (@cordeiroconstrucoeseletrica)** ou pelo WhatsApp **(22) 99729-8782**!',
  direct:
    'Nosso Instagram é **@cordeiroconstrucoeseletrica**. Você pode enviar uma mensagem no direct a qualquer momento com as especificações da sua obra que responderemos rapidamente!',
  instagram:
    'Nosso Instagram é **@cordeiroconstrucoeseletrica** (https://www.instagram.com/cordeiroconstrucoeseletrica/). Siga-nos e faça seu orçamento pelo direct!',
  agendar:
    'Você pode agendar pelo formulário de agendamento aqui no site, ou direto no WhatsApp **(22) 99729-8782** ou Direct!',
  empresa:
    'A **Cordeiro Construções e Elétrica** conta com a expertise de uma dupla com muito conhecimento técnico e experiência prática. Nosso lema é: **"Projetando hoje, construindo amanhã"**! Nossa missão é facilitar o processo da construção da sua casa e te orientar nas melhores escolhas e economias inteligentes.',
  quem:
    'A Cordeiro Construções e Elétrica é formada por uma dupla qualificada com conhecimento técnico de engenharia e ampla experiência prática em canteiro de obras e instalações elétricas.',
  ola:
    'Olá! 👋 Seja muito bem-vindo à **Cordeiro Construções e Elétrica**! Como posso ajudar você com sua obra ou projeto hoje?',
  olá:
    'Olá! 👋 Seja muito bem-vindo à **Cordeiro Construções e Elétrica**! Como posso ajudar você com sua obra ou projeto hoje?',
  oi:
    'Olá! 👋 Seja muito bem-vindo à **Cordeiro Construções e Elétrica**! Como posso ajudar você com sua obra ou projeto hoje?',
  whatsapp:
    'Nosso WhatsApp é **(22) 99729-8782**. Clique para conversar ou nos chame no Direct **@cordeiroconstrucoeseletrica**!',
  contato:
    'Você pode nos contatar pelo WhatsApp **(22) 99729-8782**, pelo Direct do Instagram **@cordeiroconstrucoeseletrica** ou pelo formulário do site.',
};

const FALLBACK =
  'Posso te ajudar com projetos (estrutural, muro de arrimo, hidrossanitário, elétrico), acompanhamento de obra, instalações elétricas, CFTV ou solicitação de orçamento pelo Direct e WhatsApp! Sobre o que gostaria de saber?';

const WELCOME: ChatMessage = {
  id: 'welcome',
  sender: 'bot',
  text: 'Olá! Sou o assistente virtual da **Cordeiro Construções e Elétrica**. Projetando hoje, construindo amanhã! Como posso te ajudar hoje?',
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

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
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
