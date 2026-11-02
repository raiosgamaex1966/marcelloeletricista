import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'agendar', label: 'Orçamento & Agendamento' },
  { id: 'faq', label: 'Dúvidas' },
  { id: 'contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : ''
        }`}
        style={{
          background: 'rgba(12, 24, 20, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="content-container w-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-3 group text-left transition-transform active:scale-95"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#0C1814] flex items-center justify-center">
              <img
                src="/images/cordeiro-emblem.png"
                alt="Cordeiro Construções e Elétrica"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight tracking-[0.08em] font-brand-display group-hover:text-[#D4AF37] transition-colors">
                CORDEIRO
              </div>
              <div
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium"
                style={{ color: '#DEC196' }}
              >
                CONSTRUÇÕES &amp; ELÉTRICA
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative font-medium text-sm transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-[#D4AF37]'
                    : 'text-white/80 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#D4AF37]/30 text-[#DEC196] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all"
              title="Orçamento pelo Direct"
            >
              <Instagram size={14} className="text-[#D4AF37]" />
              <span>Direct</span>
            </a>

            <button
              onClick={() => scrollTo('agendar')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl text-[#0C1814] font-bold text-sm bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] active:scale-95 transition-all duration-300"
            >
              Fazer Orçamento
            </button>

            <button
              className="lg:hidden text-white p-2 hover:text-[#D4AF37] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 px-6"
          style={{ background: 'rgba(12, 24, 20, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] overflow-hidden mb-2 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            <img
              src="/images/cordeiro-emblem.png"
              alt="Cordeiro Construções e Elétrica"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mb-2">
            <div className="text-white font-brand-display font-bold text-xl tracking-wider">
              CORDEIRO
            </div>
            <div className="text-[#DEC196] text-xs uppercase tracking-[0.2em]">
              Construções &amp; Elétrica
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-xl font-semibold transition-colors ${
                activeSection === link.id
                  ? 'text-[#D4AF37]'
                  : 'text-white/90 hover:text-[#D4AF37]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => scrollTo('agendar')}
            className="mt-4 px-8 py-3.5 rounded-xl text-[#0C1814] font-black text-base bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#B89230] shadow-[0_0_25px_rgba(212,175,55,0.4)] w-full max-w-xs"
          >
            Fazer Orçamento
          </button>
          <a
            href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[#DEC196] hover:text-white"
          >
            <Instagram size={16} className="text-[#D4AF37]" />
            Orçamento no Direct @cordeiroconstrucoeseletrica
          </a>
        </div>
      )}
    </>
  );
}
