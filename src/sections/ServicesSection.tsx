import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  HardHat,
  Zap,
  Camera,
  Shield,
  Check,
  Instagram,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Compass,
    title: 'Projeto Estrutural, Hidrossanitário, Elétrico e Muro de Arrimo',
    tag: 'Engenharia & Planejamento',
    description:
      'Desenvolvimento de projetos técnicos completos, seguros e dimensionados com precisão para evitar desperdício de materiais e garantir a segurança estrutural da sua construção.',
    features: [
      'Projeto estrutural detalhado',
      'Projeto hidrossanitário e esgoto',
      'Projeto elétrico residencial e comercial',
      'Cálculo e projeto de muro de arrimo',
      'Conformidade com normas técnicas (ABNT)',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: HardHat,
    title: 'Acompanhamento de Obra',
    tag: 'Gestão & Fiscalização',
    description:
      'Orientação próxima e rigorosa em cada fase da obra. Ajudamos você nas melhores tomadas de decisão, prevenindo erros construtivos e garantindo economias inteligentes.',
    features: [
      'Fiscalização técnica da execução',
      'Controle de qualidade de materiais',
      'Orientação em economias inteligentes',
      'Cumprimento de cronograma e metas',
      'Segurança e tranquilidade para o proprietário',
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Zap,
    title: 'Instalações e Reparos Elétricos',
    tag: 'Segurança & Alta Performance',
    description:
      'Soluções elétricas completas para casas, comércios e empresas. Instalações novas, reformas, diagnósticos e manutenções preventivas com materiais certificados.',
    features: [
      'Instalação e reparos elétricos completos',
      'Montagem e reforma de quadros de distribuição',
      'Troca de cabeamento e fiação antiga',
      'Projetos de iluminação LED inteligente',
      'Tomadas, disjuntores e balanceamento de cargas',
    ],
    image: '/images/service-residential.jpg',
  },
  {
    icon: Camera,
    title: 'Câmera e CFTV',
    tag: 'Monitoramento 24h',
    description:
      'Sistemas avançados de circuito fechado de TV com imagens em Full HD/4K e acesso remoto instantâneo pelo smartphone, computador ou tablet.',
    features: [
      'Instalação e configuração de câmeras IP e analógicas',
      'Gravadores digitais DVR / NVR com armazenamento seguro',
      'Visualização remota em tempo real via celular',
      'Câmeras de alta resolução com visão noturna',
      'Manutenção preventiva e reparo de sistemas CFTV',
    ],
    image: '/images/service-cftv.jpg',
  },
  {
    icon: Shield,
    title: 'Segurança Eletrônica',
    tag: 'Proteção Patrimonial',
    description:
      'Equipamentos de segurança de última geração para proteger sua residência ou empresa contra invasões e incidentes.',
    features: [
      'Alarmes residenciais e comerciais monitorados',
      'Cercas elétricas e concertinas perimetrais',
      'Sensores infravermelhos e de presença',
      'Fechaduras digitais e controle de acesso',
      'Interfonia e videoporteiros inteligentes',
    ],
    image: '/images/service-automation.jpg',
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, grid);

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
      id="servicos"
      className="section-padding relative"
      style={{
        background: 'linear-gradient(180deg, #0C1814 0%, #10231C 50%, #0C1814 100%)',
      }}
    >
      <div className="content-container">
        <SectionHeader
          label="NOSSAS SOLUÇÕES"
          heading={
            <>
              Serviços Especializados em{' '}
              <span className="text-gradient-gold block sm:inline">
                Construção &amp; Elétrica
              </span>
            </>
          }
          subtitle="Do projeto arquitetônico e estrutural até as instalações elétricas e sistemas de segurança, oferecemos suporte técnico completo para sua obra."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={service.title}
                className={`group rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                style={{
                  background: 'rgba(17, 34, 27, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212, 175, 55, 0.22)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 35px rgba(212, 175, 55, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.22)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 30px rgba(0, 0, 0, 0.35)';
                }}
              >
                <div>
                  {/* Image header */}
                  <div
                    className={`relative rounded-xl overflow-hidden mb-5 ${
                      isFeatured ? 'h-52 sm:h-64' : 'h-44'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(12,24,20,0.92) 0%, rgba(12,24,20,0.3) 50%, transparent 100%)',
                      }}
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0C1814]/90 border border-[#D4AF37]/30 text-[#DEC196] backdrop-blur-sm">
                      {service.tag}
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center bg-[#D4AF37] text-[#0C1814] shadow-lg shadow-[#D4AF37]/30">
                      <service.icon size={22} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-brand-display font-bold text-xl sm:text-2xl text-white mb-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span className="text-xs sm:text-sm text-white/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DEC196] hover:text-white transition-colors"
                  >
                    <Instagram size={14} className="text-[#D4AF37]" />
                    <span>Orçamento no Direct</span>
                  </a>

                  <button
                    onClick={() => scrollTo('agendar')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#FFF5DE] group/btn transition-colors"
                  >
                    <span>Agendar</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Banner Propaganda Callout */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-10 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(20,40,32,0.95) 0%, rgba(12,24,20,0.95) 100%)',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
              Oportunidade
            </span>
            <h3 className="font-brand-display text-2xl sm:text-3xl font-black text-white mt-1 mb-2">
              Se você está pensando em construir, nós somos a melhor escolha para você!
            </h3>
            <p className="text-sm text-white/70">
              Entre em contato conosco hoje mesmo e garanta assessoria de alto nível para sua casa ou negócio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-[#0C1814] bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all text-center flex items-center justify-center gap-2"
            >
              <Instagram size={16} />
              Orçamento pelo Direct
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=5522997298782&text=Ol%C3%A1!%20Estou%20pensando%20em%20construir%20e%20gostaria%20de%20um%20or%C3%A7amento.&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
