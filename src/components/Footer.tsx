import { Phone } from 'lucide-react';

const QUICK_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'agendar', label: 'Agendar' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
];

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="pt-14 pb-10"
      style={{
        background: '#061220',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="content-container">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--electric)' }}
            >
              <span className="text-white font-black text-sm">MC</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">
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

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5522981697377"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'rgba(46, 204, 113, 0.1)',
              border: '1px solid rgba(46, 204, 113, 0.2)',
              color: 'var(--success)',
            }}
          >
            <Phone size={16} />
            <span className="font-medium text-sm">(22) 98169-7377</span>
          </a>
        </div>

        {/* Divider */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)' }} className="text-[13px]">
            &copy; 2026 Marcello Cordeiro. Todos os direitos reservados.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }} className="text-[13px]">
            Desenvolvido com segurança e tecnologia.
          </span>
        </div>
      </div>
    </footer>
  );
}
