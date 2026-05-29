import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: 'Quais regiões vocês atendem?',
    answer:
      'Atendemos toda a região metropolitana do Rio de Janeiro, incluindo capital, Niterói, São Gonçalo e Baixada Fluminense. Para outras regiões, entre em contato para verificarmos a disponibilidade.',
  },
  {
    question: 'O orçamento é realmente gratuito?',
    answer:
      'Sim! A visita técnica e o orçamento são completamente gratuitos e sem compromisso. Você só paga após a aprovação do serviço.',
  },
  {
    question: 'Qual o prazo de garantia dos serviços?',
    answer:
      'Todos os nossos serviços possuem garantia de 90 dias. Equipamentos instalados têm garantia conforme especificação do fabricante, que pode variar de 1 a 5 anos.',
  },
  {
    question: 'Vocês trabalham com materiais de qualidade?',
    answer:
      'Utilizamos apenas materiais certificados e de marcas reconhecidas no mercado. Trabalhamos com Intelbras, Hikvision, PPA, Garen e outras marcas de confiança.',
  },
  {
    question: 'É possível parcelar o serviço?',
    answer:
      'Sim! Aceitamos pagamento em dinheiro, PIX, cartão de débito e crédito (em até 12x). Para valores acima de R$ 2.000, oferecemos condições especiais de parcelamento.',
  },
  {
    question: 'Como funciona o atendimento de emergência?',
    answer:
      'Temos plantão de emergência 24h para casos de curto-circuito, queda de energia e problemas críticos de segurança. Ligue diretamente no nosso WhatsApp para atendimento prioritário.',
  },
  {
    question: 'Preciso estar presente no dia da instalação?',
    answer:
      'Recomendamos que alguém responsável esteja presente para acompanhar o serviço e esclarecer qualquer dúvida. O tempo de instalação varia conforme a complexidade, de 2 a 8 horas em média.',
  },
  {
    question: 'Vocês fazem manutenção de sistemas instalados por outras empresas?',
    answer:
      'Sim! Fazemos manutenção, reparo e atualização de sistemas de segurança e elétrica instalados por terceiros. Realizamos uma avaliação técnica antes de qualquer intervenção.',
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-xl transition-all duration-300 overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${
          isOpen ? 'rgba(26, 115, 232, 0.3)' : 'var(--surface-border)'
        }`,
        marginBottom: '12px',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 lg:px-8 py-5 lg:py-7 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-base lg:text-xl text-white pr-4">
          {question}
        </span>
        <ChevronDown
          size={24}
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: 'var(--electric)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 lg:px-8 pb-5 lg:pb-7 text-base lg:text-base leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: '#0B1F3F' }}
    >
      <div className="content-container">
        <SectionHeader
          label="PERGUNTAS FREQUENTES"
          heading={<>Tire suas Dúvidas</>}
        />

        <div ref={listRef} className="max-w-[800px] mx-auto">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() =>
                setOpenIndex(openIndex === idx ? null : idx)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
