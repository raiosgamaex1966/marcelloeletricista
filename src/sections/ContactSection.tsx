import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, Clock, Instagram, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    icon: Instagram,
    title: 'Instagram Direct',
    info: '@cordeiroconstrucoeseletrica',
    detail: 'Orçamento rápido por mensagem',
    action: 'Enviar Direct →',
    href: 'https://www.instagram.com/cordeiroconstrucoeseletrica/',
    highlight: true,
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    info: '(22) 99729-8782',
    detail: 'Atendimento ágil e direto',
    action: 'Chamar no WhatsApp →',
    href: 'https://api.whatsapp.com/send/?phone=5522997298782&text&type=phone_number&app_absent=0&utm_source=ig',
    highlight: false,
  },
  {
    icon: MessageCircle,
    title: 'Ligação Telefônica',
    info: '(22) 99729-8782',
    detail: 'Plantão para dúvidas e agendamentos',
    action: 'Ligar Agora →',
    href: 'tel:+5522997298782',
    highlight: false,
  },
  {
    icon: Clock,
    title: 'Horário de Atendimento',
    info: 'Segunda a Sexta: 8h às 18h',
    detail: 'Sábados: 8h às 12h',
    action: '',
    href: '',
    highlight: false,
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
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
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0C1814 0%, #10231C 50%, #08120E 100%)',
      }}
    >
      <div className="content-container">
        <div className="max-w-[960px] mx-auto text-center">
          <SectionHeader
            label="FALE CONOSCO"
            heading={
              <>
                Pronto para Construir com{' '}
                <span className="text-gradient-gold">Excelência e Segurança?</span>
              </>
            }
            subtitle="Se você está pensando em construir, nós somos a melhor escolha para você! Faça um orçamento conosco pelo direct ou WhatsApp."
          />

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center mt-12"
          >
            {CONTACTS.map((contact) => (
              <div
                key={contact.title}
                className={`rounded-2xl p-6 text-center flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  contact.highlight
                    ? 'bg-[#152E23] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)]'
                    : 'bg-[#11231C] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      contact.highlight
                        ? 'bg-gradient-to-r from-[#F3E2B8] to-[#D4AF37] text-[#0C1814]'
                        : 'bg-white/5 text-[#D4AF37]'
                    }`}
                  >
                    <contact.icon size={22} strokeWidth={2.2} />
                  </div>

                  <h4 className="font-brand-display font-bold text-base text-white">
                    {contact.title}
                  </h4>
                  <p className="text-sm font-semibold text-[#D4AF37] mt-2">
                    {contact.info}
                  </p>
                  {contact.detail && (
                    <p className="text-xs text-white/60 mt-1 leading-snug">
                      {contact.detail}
                    </p>
                  )}
                </div>

                {contact.href && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        contact.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="inline-block text-xs font-bold text-[#F3E2B8] hover:text-white transition-colors"
                    >
                      {contact.action}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Slogan Banner */}
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mt-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#DEC196]"
          >
            <Sparkles size={16} className="text-[#D4AF37]" />
            <span className="font-bold text-xs sm:text-sm tracking-widest uppercase">
              Projetando Hoje, Construindo Amanhã
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
