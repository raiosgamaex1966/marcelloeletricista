import { Phone, Instagram, Sparkles } from 'lucide-react';

const QUICK_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'agendar', label: 'Orçamento' },
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
      className="pt-16 pb-12 relative overflow-hidden"
      style={{
        background: '#07100D',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      }}
    >
      <div className="content-container">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[#0C1814] flex-shrink-0">
              <img
                src="/images/cordeiro-emblem.png"
                alt="Cordeiro Construções e Elétrica"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-brand-display font-black text-lg leading-tight tracking-[0.08em]">
                CORDEIRO
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.16em] font-medium"
                style={{ color: '#DEC196' }}
              >
                CONSTRUÇÕES &amp; ELÉTRICA
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Direct & WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/cordeiroconstrucoeseletrica/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#D4AF37]/40 text-[#DEC196] hover:bg-[#D4AF37]/15 hover:text-white transition-all"
            >
              <Instagram size={15} className="text-[#D4AF37]" />
              <span>Direct</span>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=5522997298782&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: '#25D366',
              }}
            >
              <Phone size={15} />
              <span>(22) 99729-8782</span>
            </a>
          </div>
        </div>

        {/* Brand Mission Callout in Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/60">
          <div className="flex items-center gap-2 text-[#DEC196]">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="font-semibold uppercase tracking-wider">
              Projetando Hoje, Construindo Amanhã
            </span>
          </div>
          <p className="max-w-md">
            Expertise técnica e experiência prática para transformar seu projeto em realidade com máxima segurança e economias inteligentes.
          </p>
        </div>

        {/* Divider & Copyright */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} Cordeiro Construções e Elétrica. Todos os direitos reservados.
          </span>
          <span>
            Projetos • Obras • Elétrica • CFTV • Segurança Eletrônica
          </span>
        </div>
      </div>
    </footer>
  );
}
