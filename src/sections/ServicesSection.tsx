import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Zap, Building, Check } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Shield,
    title: 'Segurança Eletrônica',
    description:
      'Instalação e manutenção de sistemas de segurança completa para residências e empresas.',
    features: [
      'Câmeras de segurança (CFTV)',
      'Instalação de DVR/NVR',
      'Monitoramento remoto',
      'Alarmes residenciais e comerciais',
      'Cercas elétricas',
      'Sensores de presença',
    ],
    image: '/images/service-cftv.jpg',
  },
  {
    icon: Lock,
    title: 'Automação e Controle de Acesso',
    description:
      'Fechaduras eletrônicas e sistemas de automação para maior comodidade e proteção.',
    features: [
      'Fechaduras eletrônicas',
      'Controle de acesso',
      'Automatização de portões',
      'Interfones e video porteiros',
    ],
    image: '/images/service-automation.jpg',
  },
  {
    icon: Zap,
    title: 'Serviços Elétricos Residenciais',
    description:
      'Instalações elétricas completas com garantia de segurança e conformidade com normas técnicas.',
    features: [
      'Instalação elétrica completa',
      'Quadros de disjuntores',
      'Troca de fiação',
      'Iluminação LED',
      'Tomadas e interruptores',
    ],
    image: '/images/service-residential.jpg',
  },
  {
    icon: Building,
    title: 'Serviços Elétricos Industriais',
    description:
      'Manutenção e instalação elétrica industrial com equipe especializada.',
    features: [
      'Manutenção elétrica industrial',
      'Organização de painéis',
      'Diagnóstico de falhas',
      'Instalação preventiva',
      'Projetos elétricos',
    ],
    image: '/images/service-industrial.jpg',
  },
];

export function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      className="section-padding"
      style={{ background: '#0B1F3F' }}
    >
      <div className="content-container">
        <SectionHeader
          label="NOSSOS SERVIÇOS"
          heading={
            <>
              Soluções Completas em
              <br />
              <span style={{ color: 'var(--electric)' }}>
                Segurança e Elétrica
              </span>
            </>
          }
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl p-8 lg:p-10 transition-all duration-400 hover:-translate-y-1 overflow-hidden"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--surface-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26, 115, 232, 0.4)';
                e.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(26, 115, 232, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Service Image */}
              <div className="relative h-40 rounded-xl overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(11,31,63,0.8) 0%, transparent 60%)',
                  }}
                />
                {/* Icon overlay */}
                <div
                  className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(26, 115, 232, 0.9)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <service.icon size={24} className="text-white" />
                </div>
              </div>

              <h3 className="font-bold text-xl lg:text-2xl text-white mb-3">
                {service.title}
              </h3>
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: 'var(--text-muted)' }}
              >
                {service.description}
              </p>

              <ul className="flex flex-col gap-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check
                      size={16}
                      style={{ color: 'var(--electric)' }}
                      strokeWidth={3}
                    />
                    <span
                      className="text-sm lg:text-[15px]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
