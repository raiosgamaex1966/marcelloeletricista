import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Shield, Camera, Lock, Zap, Phone, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';

const STATS = [
  { number: '500+', label: 'Serviços Realizados' },
  { number: '10+', label: 'Anos de Experiência' },
  { number: '24h', label: 'Atendimento Emergencial' },
];

const SLIDES = [
  {
    title: 'Segurança Eletrônica',
    tag: 'CFTV & Alarmes',
    description: 'Instalação de câmeras e sensores de monitoramento inteligente.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-monitoring-a-building-entrance-41712-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    icon: Camera
  },
  {
    title: 'Automação Residencial',
    tag: 'Casa Inteligente',
    description: 'Fechaduras digitais, iluminação controlada e portões automáticos.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-tablet-in-a-smart-home-43285-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    icon: Lock
  },
  {
    title: 'Elétrica Residencial',
    tag: 'Instalação & Manutenção',
    description: 'Quadros elétricos de distribuição, tomadas e projetos de iluminação.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-electrician-fixing-an-electrical-outlet-41978-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    icon: Zap
  },
  {
    title: 'Elétrica Industrial',
    tag: 'Painéis & Comandos',
    description: 'Manutenção de máquinas de alta potência e comandos elétricos.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machinery-in-a-factory-44331-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    icon: Shield
  }
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
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-title-word',
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.3'
        )
        .fromTo(
          '.hero-stat',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-shield',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' },
          '-=0.8'
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
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B1F3F 0%, #091829 100%)',
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="content-container relative z-10 w-full py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Column - 60% */}
          <div className="flex-1 lg:max-w-[60%]">
            {/* Badge */}
            <div
              className="hero-badge inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 opacity-0"
              style={{
                background: 'rgba(245, 166, 35, 0.15)',
                border: '1px solid rgba(245, 166, 35, 0.3)',
                color: 'var(--amber)',
              }}
            >
              PROFISSIONAL CERTIFICADO
            </div>

            {/* Title */}
            <h1 className="font-black text-5xl sm:text-6xl lg:text-[88px] lg:leading-[92px] text-white mb-5">
              <span className="hero-title-word inline-block opacity-0">
                Segurança{' '}
              </span>
              <span
                className="hero-title-word inline-block opacity-0"
                style={{ color: 'var(--electric)' }}
              >
                &amp;
              </span>
              <br />
              <span className="hero-title-word inline-block opacity-0">
                Tecnologia
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtitle text-lg lg:text-xl leading-7 max-w-[480px] opacity-0"
              style={{ color: 'var(--text-muted)' }}
            >
              Eletrotécnico especializado em segurança eletrônica, automação
              residencial e serviços elétricos comerciais e industriais.
            </p>

            {/* CTA Row */}
            <div className="hero-cta flex flex-wrap gap-4 mt-10 opacity-0">
              <button
                onClick={() => scrollTo('agendar')}
                className="px-10 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(26,115,232,0.4)] active:scale-95"
                style={{ background: 'var(--electric)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'var(--electric-light)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'var(--electric)')
                }
              >
                Agendar Visita
              </button>
              <a
                href="https://wa.me/5522981697377"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:text-white active:scale-95"
                style={{
                  background: 'rgba(46, 204, 113, 0.15)',
                  border: '1px solid rgba(46, 204, 113, 0.4)',
                  color: 'var(--success)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--success)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(46, 204, 113, 0.15)';
                  e.currentTarget.style.color = 'var(--success)';
                }}
              >
                <Phone size={18} />
                Fale no WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 lg:gap-12 mt-14">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-stat opacity-0">
                  <div
                    className="font-black text-3xl lg:text-4xl"
                    style={{ color: 'var(--electric)' }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 40% Video/Slideshow Carousel */}
          <div className="hidden lg:flex flex-1 justify-center items-center relative w-full lg:max-w-[450px]">
            <div className="hero-shield relative w-full opacity-0 animate-shield-pulse">
              
              {/* Carousel Container */}
              <div
                className="w-full aspect-[4/3] rounded-3xl overflow-hidden flex flex-col justify-end relative group"
                style={{
                  background: '#0B1F3F',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  boxShadow: '0 0 40px rgba(26, 115, 232, 0.2), inset 0 0 40px rgba(26, 115, 232, 0.1)',
                }}
              >
                {/* Border gradient overlay */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    padding: '2.5px',
                    background: 'linear-gradient(135deg, var(--electric), var(--amber))',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                />

                {/* Looping Video for current slide */}
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === activeSlide ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <video
                      src={slide.videoUrl}
                      poster={slide.posterUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                    />
                    
                    {/* Shadow gradient overlay for text readability */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(11, 31, 63, 0.95) 0%, rgba(11, 31, 63, 0.4) 50%, transparent 100%)',
                        zIndex: 2,
                      }}
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-[5] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-navy/80 backdrop-blur-sm border border-surface-border text-white">
                      <slide.icon size={14} className="text-[var(--electric)]" />
                      <span>{slide.tag}</span>
                    </div>
                  </div>
                ))}

                {/* Content Overlay */}
                <div className="relative z-10 p-6 md:p-8 text-left w-full">
                  <div className="text-white font-black text-2xl md:text-3xl leading-tight tracking-tight">
                    {SLIDES[activeSlide].title}
                  </div>
                  <p className="text-sm mt-2 leading-relaxed animate-fade-in" style={{ color: 'var(--text-muted)' }}>
                    {SLIDES[activeSlide].description}
                  </p>

                  {/* Navigation dots & arrows */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-1.5">
                      {SLIDES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === activeSlide ? 'w-6 bg-[var(--electric)]' : 'w-1.5 bg-white/30'
                          }`}
                          aria-label={`Ir para slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-[var(--electric)] text-white transition-all border border-white/10 active:scale-90"
                        aria-label="Slide anterior"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-[var(--electric)] text-white transition-all border border-white/10 active:scale-90"
                        aria-label="Próximo slide"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video label icon (Volume muted notification) */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-[10px] font-medium text-white/50 bg-black/40 px-2.5 py-1 rounded-full pointer-events-none">
                  <VolumeX size={10} />
                  <span>MUDO</span>
                </div>
              </div>

              {/* Floating Orbs */}
              <div
                className="hero-orb absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center opacity-0 animate-float"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  zIndex: 12,
                }}
              >
                <Camera size={22} style={{ color: 'var(--electric)' }} />
              </div>
              <div
                className="hero-orb absolute top-8 -right-8 w-12 h-12 rounded-full flex items-center justify-center opacity-0 animate-float-delayed"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  zIndex: 12,
                }}
              >
                <Shield size={22} style={{ color: 'var(--electric)' }} />
              </div>
              <div
                className="hero-orb absolute -bottom-2 left-8 w-12 h-12 rounded-full flex items-center justify-center opacity-0 animate-float-delayed-2"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  zIndex: 12,
                }}
              >
                <Zap size={22} style={{ color: 'var(--electric)' }} />
              </div>
              <div
                className="hero-orb absolute bottom-12 -right-4 w-12 h-12 rounded-full flex items-center justify-center opacity-0 animate-float-delayed-3"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  zIndex: 12,
                }}
              >
                <Lock size={22} style={{ color: 'var(--electric)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
