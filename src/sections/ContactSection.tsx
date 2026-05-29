import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, Clock } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    icon: Phone,
    title: 'WhatsApp',
    info: '(22) 98169-7377',
    action: 'Enviar Mensagem →',
    href: 'https://wa.me/5522981697377',
  },
  {
    icon: MessageCircle,
    title: 'Telefone',
    info: '(22) 98169-7377',
    action: 'Ligar Agora →',
    href: 'tel:+5522981697377',
  },
  {
    icon: Clock,
    title: 'Horário',
    info: 'Seg–Sex: 8h às 18h',
    detail: 'Sáb: 8h às 12h',
  },
];

export function ContactSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, cards);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, #0B1F3F 0%, #0D2247 50%, #0B1F3F 100%)',
      }}
    >
      <div className="content-container">
        <div className="max-w-[800px] mx-auto text-center">
          <SectionHeader
            label="PRONTO PARA COMEÇAR?"
            heading={<>Entre em Contato</>}
            subtitle="Estamos prontos para atender você. Solicite um orçamento gratuito ou fale diretamente pelo WhatsApp."
          />

          <div
            ref={cardsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-14"
          >
            {CONTACTS.map((contact) => (
              <div
                key={contact.title}
                className="flex-1 max-w-[280px] mx-auto sm:mx-0 rounded-2xl p-8 lg:p-10 text-center"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'var(--electric)' }}
                >
                  <contact.icon size={24} className="text-white" />
                </div>
                <h4 className="font-bold text-xl text-white mt-5">
                  {contact.title}
                </h4>
                <p
                  className="text-base mt-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {contact.info}
                </p>
                {contact.detail && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {contact.detail}
                  </p>
                )}
                {contact.href && (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      contact.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="inline-block mt-4 font-semibold text-base transition-all duration-200 hover:underline"
                    style={{ color: 'var(--electric)' }}
                  >
                    {contact.action}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Emergency badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mt-12"
            style={{
              border: '1px solid var(--amber)',
              color: 'var(--amber)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--amber)] animate-pulse" />
            <span className="font-medium text-sm">
              Atendimento emergencial 24h disponível
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
