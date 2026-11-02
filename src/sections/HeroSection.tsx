import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Shield,
  Camera,
  Zap,
  Phone,
  Instagram,
  Compass,
  HardHat,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const STATS = [
  { number: '100%', label: 'Compromisso com Qualidade' },
  { number: 'Dupla', label: 'Técnica & Prática Especializada' },
  { number: 'Completo', label: 'Do Projeto ao Acabamento' },
];

const SLIDES = [
  {
    title: 'Projetos Estruturais & Complementares',
    tag: 'Estrutural • Elétrico • Hidrossanitário • Arrimo',
    description: 'Projetos seguros com cálculo preciso para economias inteligentes na sua obra.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-electrician-fixing-an-electrical-outlet-41978-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    icon: Compass,
  },
  {
    title: 'Acompanhamento de Obra',
    tag: 'Gestão & Fiscalização',
    description: 'Orientação técnica nas melhores escolhas para construir sem desperdício e sem dores de cabeça.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machinery-in-a-factory-44331-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80',
    icon: HardHat,
  },
  {
    title: 'Instalações & Reparos Elétricos',
    tag: 'Residencial & Comercial',
    description: 'Quadros de distribuição, fiação, iluminação e manutenções com total segurança.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-electrician-fixing-an-electrical-outlet-41978-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    icon: Zap,
  },
  {
    title: 'Câmera e CFTV',
    tag: 'Monitoramento em Alta Definição',
    description: 'Instalação de câmeras com visualização no celular em tempo real 24 horas por dia.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-monitoring-a-building-entrance-41712-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    icon: Camera,
  },
  {
    title: 'Segurança Eletrônica',
    tag: 'Proteção Patrimonial',
    description: 'Sistemas de alarme, sensores de presença e barreiras de proteção para seu imóvel.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-tablet-in-a-smart-home-43285-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    icon: Shield,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-title-word',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-slogan',
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
          '-=0.3'
        )
        .fromTo(
          '.hero-stat',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-visual',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          '.hero-orb',
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.5'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16 lg:py-28"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 20%, #162B22 0%, #0C1814 60%, #060F0C 100%)',
      }}
    >
      {/* Decorative Golden Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* Ambient Gold Glow Behind Emblem */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: '#D4AF37' }}
      />

      <div className="content-container relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          {/* Left Column - 58% */}
          <div className="flex-1 lg:max-w-[58%] text-left">
            {/* Slogan Badge */}
            <div
              className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider mb-6 opacity-0"
              style={{
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#DEC196',
              }}
            >
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span className="uppercase font-bold tracking-[0.14em]">
                Projetando Hoje, Construindo Amanhã
              </span>
            </div>

            {/* Brand Title */}
            <h1 className="font-brand-display text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-4">
              <span className="hero-title-word inline-block opacity-0 text-white">
                CORDEIRO
              </span>
              <br />
              <span
                className="hero-title-word inline-block opacity-0 text-gradient-gold font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-normal"
              >
                Construções &amp; Elétrica
              </span>
            </h1>

            {/* Slogan Display Bar */}
            <div className="hero-slogan mb-6 flex items-center gap-3 opacity-0">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <p className="text-sm sm:text-base font-semibold tracking-[0.18em] uppercase text-[#DEC196]">
                Projetando Hoje • Construindo Amanhã
              </p>
            </div>

            {/* Description */}
            <p
              className="hero-subtitle text-base sm:text-lg lg:text-xl leading-relaxed max-w-[540px] opacity-0 text-white/80 mb-8"
            >
              A <strong>Cordeiro Construções e Elétrica</strong> une conhecimento técnico e experiência prática para garantir excelência, segurança e orientações em economias inteligentes para sua obra.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap gap-4 opacity-0">
              {/* Direct Instagram Button */}
              <a
                href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0C1814] bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.6)] active:scale-95 transition-all duration-300"
              >
                <Instagram size={18} />
                Orçamento pelo Direct
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://api.whatsapp.com/send/?phone=5522997298782&text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20com%20a%20Cordeiro%20Constru%C3%A7%C3%B5es%20e%20El%C3%A9trica.&type=phone_number&app_absent=0&utm_source=ig"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:text-white active:scale-95 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                style={{
                  background: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                }}
              >
                <Phone size={18} />
                Fale no WhatsApp
              </a>

              {/* Agendar Wizard Button */}
              <button
                onClick={() => scrollTo('agendar')}
                className="px-6 py-3.5 rounded-xl text-white/90 hover:text-white font-medium text-sm sm:text-base border border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                Ver Serviços &amp; Agendar
              </button>
            </div>

            {/* Value Callout */}
            <div className="mt-8 p-3.5 rounded-xl bg-white/[0.03] border border-[#D4AF37]/20 flex items-center gap-3 max-w-[540px]">
              <CheckCircle2 size={20} className="text-[#D4AF37] flex-shrink-0" />
              <p className="text-xs sm:text-sm text-white/90">
                <span className="text-[#DEC196] font-semibold">Pensando em construir?</span> Nós somos a melhor escolha para você. Faça um orçamento conosco!
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-10 mt-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-stat opacity-0">
                  <div className="font-brand-display font-black text-2xl lg:text-3xl text-[#D4AF37]">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm mt-0.5 text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 42% Visual Feature with Cordeiro Emblem & Video Carousel */}
          <div className="flex-1 w-full lg:max-w-[42%] flex justify-center items-center relative">
            <div className="hero-visual relative w-full opacity-0">
              
              {/* Outer Golden Border & Glow */}
              <div
                className="relative rounded-3xl overflow-hidden p-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.7) 0%, rgba(12,24,20,0.9) 50%, rgba(212,175,55,0.4) 100%)',
                }}
              >
                <div className="rounded-[22px] overflow-hidden bg-[#0C1814] flex flex-col relative">
                  
                  {/* Top: Official Brand Lamb Emblem Presentation */}
                  <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#142820] to-[#0C1814] border-b border-[#D4AF37]/20">
                    
                    {/* Pulsing Lamb Emblem with Construction Helmet */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-[#DEC196] via-[#D4AF37] to-[#8F6C22] shadow-[0_0_35px_rgba(212,175,55,0.35)] animate-shield-pulse">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#0C1814] flex items-center justify-center">
                        <img
                          src="/images/cordeiro-emblem.png"
                          alt="Cordeiro Construções e Elétrica - Símbolo"
                          className="w-full h-full object-cover scale-105"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-white font-brand-display font-black text-xl tracking-[0.12em]">
                        CORDEIRO
                      </div>
                      <div className="text-[#DEC196] text-xs uppercase font-medium tracking-[0.2em] mt-0.5">
                        CONSTRUÇÕES &amp; ELÉTRICA
                      </div>
                      <div className="mt-2 text-[11px] font-bold text-[#D4AF37] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-[#D4AF37]/10 inline-block border border-[#D4AF37]/30">
                        Projetando Hoje, Construindo Amanhã
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Dynamic Service Showcase */}
                  <div className="p-5 bg-[#091410] relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#DEC196] font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                        Serviços em Destaque
                      </span>
                      <span className="text-[11px] text-white/50">
                        {activeSlide + 1} de {SLIDES.length}
                      </span>
                    </div>

                    <div className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                      {(() => {
                        const IconComponent = SLIDES[activeSlide].icon;
                        return <IconComponent size={18} className="text-[#D4AF37] flex-shrink-0" />;
                      })()}
                      <span>{SLIDES[activeSlide].title}</span>
                    </div>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                      {SLIDES[activeSlide].description}
                    </p>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                      <div className="flex gap-1.5">
                        {SLIDES.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === activeSlide ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-white/30'
                            }`}
                            aria-label={`Ir para slide ${index + 1}`}
                          />
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={prevSlide}
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#D4AF37] hover:text-[#0C1814] text-white transition-all active:scale-90"
                          aria-label="Slide anterior"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#D4AF37] hover:text-[#0C1814] text-white transition-all active:scale-90"
                          aria-label="Próximo slide"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Orbs around the Visual */}
              <div
                className="hero-orb hidden sm:flex absolute -top-3 -left-4 w-12 h-12 rounded-full items-center justify-center opacity-0 animate-float shadow-lg"
                style={{
                  background: '#11221B',
                  border: '1px solid rgba(212,175,55,0.4)',
                  zIndex: 12,
                }}
                title="Projetos Estruturais"
              >
                <Compass size={22} className="text-[#D4AF37]" />
              </div>

              <div
                className="hero-orb hidden sm:flex absolute top-12 -right-4 w-12 h-12 rounded-full items-center justify-center opacity-0 animate-float-delayed shadow-lg"
                style={{
                  background: '#11221B',
                  border: '1px solid rgba(212,175,55,0.4)',
                  zIndex: 12,
                }}
                title="Acompanhamento de Obras"
              >
                <HardHat size={22} className="text-[#D4AF37]" />
              </div>

              <div
                className="hero-orb hidden sm:flex absolute -bottom-3 left-10 w-12 h-12 rounded-full items-center justify-center opacity-0 animate-float-delayed-2 shadow-lg"
                style={{
                  background: '#11221B',
                  border: '1px solid rgba(212,175,55,0.4)',
                  zIndex: 12,
                }}
                title="Instalações Elétricas"
              >
                <Zap size={22} className="text-[#D4AF37]" />
              </div>

              <div
                className="hero-orb hidden sm:flex absolute bottom-20 -right-3 w-12 h-12 rounded-full items-center justify-center opacity-0 animate-float-delayed-3 shadow-lg"
                style={{
                  background: '#11221B',
                  border: '1px solid rgba(212,175,55,0.4)',
                  zIndex: 12,
                }}
                title="Câmeras e CFTV"
              >
                <Camera size={22} className="text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
