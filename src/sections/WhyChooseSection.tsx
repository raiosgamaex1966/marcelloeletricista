import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Clock, Shield, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: Star,
    title: 'Atendimento Profissional',
    description: 'Especialistas certificados para cada tipo de serviço.',
  },
  {
    icon: Clock,
    title: 'Rápido e Eficiente',
    description:
      'Chegamos no horário combinado e executamos com agilidade.',
  },
  {
    icon: Shield,
    title: 'Garantia nos Serviços',
    description:
      'Todos os trabalhos possuem garantia e suporte pós-instalação.',
  },
  {
    icon: CheckCircle,
    title: 'Orçamento sem Compromisso',
    description:
      'Avaliação gratuita e orçamento detalhado antes de qualquer serviço.',
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
        { x: -80, opacity: 0 },
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
        { x: 80, opacity: 0 },
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
      ref={sectionRef}
      className="section-padding"
      style={{
        background: 'linear-gradient(180deg, #0B1F3F 0%, #0D2247 100%)',
      }}
    >
      <div className="content-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column - 55% */}
          <div className="flex-1 lg:max-w-[55%]">
            <div className="why-left">
              <span
                className="font-semibold text-sm uppercase tracking-[0.05em]"
                style={{ color: 'var(--electric)' }}
              >
                POR QUE NOS ESCOLHER
              </span>
              <h2 className="font-bold text-3xl lg:text-5xl text-white mt-4 leading-tight">
                Compromisso com
                <br />
                <span style={{ color: 'var(--electric)' }}>
                  Segurança e Qualidade
                </span>
              </h2>
              <p
                className="text-lg leading-7 mt-6 max-w-[500px]"
                style={{ color: 'var(--text-muted)' }}
              >
                Com mais de 10 anos de experiência, oferecemos atendimento
                personalizado e soluções técnicas para cada necessidade. Todos
                os serviços são executados seguindo rigorosamente as normas
                técnicas e de segurança.
              </p>

              <div className="flex flex-col gap-8 mt-12">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--electric)' }}
                    >
                      <feature.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white">
                        {feature.title}
                      </h4>
                      <p
                        className="text-[15px] mt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 45% */}
          <div className="flex-1 lg:max-w-[45%] w-full">
            <div className="why-right relative">
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  border: '2px solid rgba(26, 115, 232, 0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src="/images/feature-electrician.jpg"
                  alt="Eletrotécnico profissional instalando câmera de segurança"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />

                {/* Floating badge */}
                <div
                  className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'var(--amber)',
                  }}
                >
                  <CheckCircle size={18} className="text-[#0B1F3F]" />
                  <span className="font-bold text-sm text-[#0B1F3F]">
                    QUALIDADE GARANTIDA
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
                style={{ background: 'var(--electric)' }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-15"
                style={{ background: 'var(--amber)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
