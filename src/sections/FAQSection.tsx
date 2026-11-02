import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Instagram, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: 'Como a Cordeiro Construções e Elétrica pode me ajudar na construção da minha casa?',
    answer:
      'Nossa missão é facilitar todo o processo da construção e te orientar nas melhores escolhas e em economias inteligentes. Contamos com a expertise de uma dupla com muito conhecimento técnico e experiência prática, atuando desde os projetos estrutural, elétrico, hidrossanitário e muro de arrimo até o acompanhamento e execução de obras e elétrica.',
  },
  {
    question: 'Como posso fazer um orçamento pelo Direct do Instagram?',
    answer:
      'É muito simples e rápido! Basta enviar uma mensagem no direct do nosso perfil do Instagram (@cordeiroconstrucoeseletrica) informando o tipo de serviço que você precisa (projeto, obra, elétrica ou CFTV) e a localização da sua obra. Nossa equipe responde prontamente.',
  },
  {
    question: 'Por que o projeto estrutural e o cálculo de muro de arrimo são indispensáveis?',
    answer:
      'O projeto estrutural garante a estabilidade, solidez e segurança de toda a edificação. Além de prevenir rachaduras, trincas e desabamentos, ele calcula o uso exato de aço, brita, areia e cimento, gerando economia expressiva contra o desperdício de materiais.',
  },
  {
    question: 'O que está incluso no acompanhamento de obra?',
    answer:
      'O acompanhamento de obra envolve vistorias técnicas periódicas no canteiro, fiscalização da conformidade com os projetos aprovados, instrução aos mestres e pedreiros, e garantia de que o cronograma e os padrões de segurança e qualidade sejam estritamente cumpridos.',
  },
  {
    question: 'Quais serviços elétricos e de segurança vocês executam?',
    answer:
      'Executamos instalações elétricas completas (novas ou reformas, quadros de distribuição, iluminação, tomadas) e segurança patrimonial avançada: instalação de Câmeras CFTV com visualização em tempo real no celular, alarmes e segurança eletrônica.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Trabalhamos com condições flexíveis para viabilizar o seu projeto: PIX, transferências bancárias, dinheiro e parcelamento no cartão de crédito.',
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
      className="rounded-2xl transition-all duration-300 overflow-hidden mb-3"
      style={{
        background: 'rgba(17, 34, 27, 0.7)',
        border: `1px solid ${
          isOpen ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)'
        }`,
        boxShadow: isOpen ? '0 8px 25px rgba(212, 175, 55, 0.15)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 lg:px-8 py-5 text-left transition-colors hover:text-[#D4AF37]"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-base sm:text-lg text-white pr-4 leading-snug">
          {question}
        </span>
        <ChevronDown
          size={22}
          className="flex-shrink-0 text-[#D4AF37] transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 lg:px-8 pb-6 text-sm sm:text-base text-white/75 leading-relaxed border-t border-white/5 pt-3">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 75%',
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
      className="section-padding relative"
      style={{
        background: 'linear-gradient(180deg, #0C1814 0%, #11231C 50%, #0C1814 100%)',
      }}
    >
      <div className="content-container">
        <SectionHeader
          label="PERGUNTAS FREQUENTES"
          heading={
            <>
              Dúvidas sobre Nossos{' '}
              <span className="text-gradient-gold">Projetos &amp; Serviços</span>
            </>
          }
          subtitle="Confira as respostas para as principais perguntas sobre nossa forma de trabalho, orçamentos e acompanhamento de obras."
        />

        <div ref={listRef} className="max-w-[840px] mx-auto">
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

        {/* Still have questions */}
        <div className="max-w-[840px] mx-auto mt-10 p-6 rounded-2xl bg-[#0C1814] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-base">Ainda tem alguma dúvida?</h4>
            <p className="text-xs text-white/60 mt-0.5">
              Fale agora com a nossa equipe pelo Direct ou WhatsApp!
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#D4AF37] text-[#0C1814] hover:bg-[#F3E2B8] transition-colors flex items-center gap-1.5"
            >
              <Instagram size={14} />
              Chamar no Direct
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5522997298782&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20com%20a%20Cordeiro%20Constru%C3%A7%C3%B5es%20e%20El%C3%A9trica.&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors flex items-center gap-1.5"
            >
              <Phone size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
