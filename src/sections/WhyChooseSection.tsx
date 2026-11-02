import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Users,
  TrendingDown,
  ShieldCheck,
  Award,
  Instagram,
  Phone,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: Users,
    title: 'Dupla Técnica Especializada',
    description:
      'União perfeita de conhecimento técnico de engenharia com larga experiência prática de canteiro de obras.',
  },
  {
    icon: TrendingDown,
    title: 'Economias Inteligentes',
    description:
      'Orientação estratégica na escolha de materiais e métodos para reduzir custos sem comprometer a qualidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança & Rigor Normativo',
    description:
      'Projetos e execuções 100% de acordo com as normas ABNT para máxima durabilidade e tranquilidade da sua família.',
  },
  {
    icon: Award,
    title: 'Excelência em Cada Detalhe',
    description:
      'Do cálculo do muro de arrimo ao acabamento elétrico e CFTV, compromisso com a perfeição.',
  },
];

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-left',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        '.why-right',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0C1814 0%, #11221B 50%, #0C1814 100%)',
      }}
    >
      <div className="content-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column - 54% Content */}
          <div className="flex-1 lg:max-w-[54%]">
            <div className="why-left">
              <span className="font-semibold text-xs uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                <Sparkles size={16} />
                SOBRE A EMPRESA
              </span>

              <h2 className="font-brand-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-3 leading-tight">
                Cordeiro{' '}
                <span className="text-gradient-gold">
                  Construções &amp; Elétrica
                </span>
              </h2>

              {/* Slogan Banner */}
              <div className="mt-2 text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-[#DEC196]">
                Projetando Hoje, Construindo Amanhã
              </div>

              {/* User's Exact Description */}
              <div className="mt-6 space-y-4 text-base sm:text-lg text-white/80 leading-relaxed">
                <p>
                  A <strong>Cordeiro Construções e Elétrica</strong> conta com a expertise de uma dupla com muito conhecimento técnico e experiência prática.
                </p>
                <p>
                  Essas características, aliadas ao nosso compromisso em fornecer um trabalho de excelência, garantindo segurança e qualidade, trazem um diferencial para nossa empresa.
                </p>
                <p className="p-4 rounded-xl bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] text-white/90">
                  <span className="font-bold text-[#F3E2B8] block mb-1">Nossa Missão:</span>
                  Facilitar o processo da construção da sua casa e te orientar nas melhores escolhas e em economias inteligentes.
                </p>
              </div>

              {/* Four Pillar Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3">
                      <pillar.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 mt-1 leading-snug">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct & WhatsApp CTA */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#0C1814] bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] active:scale-95 transition-all"
                >
                  <Instagram size={16} />
                  Fazer Orçamento pelo Direct
                </a>

                <a
                  href="https://api.whatsapp.com/send/?phone=5522997298782&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20com%20a%20Cordeiro%20Constru%C3%A7%C3%B5es%20e%20El%C3%A9trica.&type=phone_number&app_absent=0&utm_source=ig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all"
                >
                  <Phone size={16} />
                  (22) 99729-8782
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - 46% Brand Poster Image with Golden Frame */}
          <div className="flex-1 lg:max-w-[46%] w-full">
            <div className="why-right relative">
              {/* Outer Golden Glow Border Card */}
              <div
                className="rounded-3xl p-1 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, rgba(20,40,32,0.8) 50%, #D4AF37 100%)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.2)',
                }}
              >
                <div className="rounded-[22px] overflow-hidden bg-[#0C1814]">
                  {/* The official logo/brand artwork requested by user - fully visible without any elements covering it */}
                  <img
                    src="/images/cordeiro-logo.png"
                    alt="Cordeiro Construções & Elétrica - Projetando Hoje, Construindo Amanhã"
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Quality badge positioned cleanly BELOW the image so it doesn't block any text */}
              <div className="mt-4 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#11231C] border border-[#D4AF37]/30">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={20} className="text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">
                      Segurança e Qualidade Garantidas
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#DEC196]">
                      Conhecimento Técnico &amp; Experiência Prática
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0C1814] font-black text-xs hover:bg-[#F3E2B8] transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <Instagram size={13} />
                  <span>Direct</span>
                </a>
              </div>

              {/* Decorative Golden Orbs in Background */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ background: '#D4AF37' }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none"
                style={{ background: '#DEC196' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
