import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'agendar', label: 'Agendar' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
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
            ? 'shadow-[0_4px_24px_rgba(0,0,0,0.15)]'
            : ''
        }`}
        style={{
          background: 'rgba(11, 31, 63, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div className="content-container w-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--electric)' }}
            >
              <span className="text-white font-black text-sm tracking-tight">
                MC
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight tracking-tight">
                MARCELLO CORDEIRO
              </div>
              <div
                className="text-xs uppercase tracking-[0.15em]"
                style={{ color: 'var(--text-muted)' }}
              >
                ELETROTÉCNICO
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative font-medium text-base transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-[var(--electric)]'
                    : 'text-white/80 hover:text-[var(--electric)]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[var(--electric)] rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('agendar')}
              className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-all duration-400 hover:shadow-[0_0_20px_rgba(26,115,232,0.4)]"
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
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--navy)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-2xl font-semibold transition-colors ${
                activeSection === link.id
                  ? 'text-[var(--electric)]'
                  : 'text-white hover:text-[var(--electric)]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('agendar')}
            className="mt-4 px-8 py-3 rounded-xl text-white font-bold text-lg"
            style={{ background: 'var(--electric)' }}
          >
            Agendar Visita
          </button>
        </div>
      )}
    </>
  );
}
