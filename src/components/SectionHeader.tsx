interface SectionHeaderProps {
  label: string;
  heading: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeader({ label, heading, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <span
        className="inline-block font-semibold text-sm uppercase tracking-[0.05em] mb-4"
        style={{ color: 'var(--electric)' }}
      >
        {label}
      </span>
      <h2
        className="font-bold text-3xl lg:text-5xl leading-tight"
        style={{ color: light ? '#0B1F3F' : '#FFFFFF', letterSpacing: '-0.01em' }}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{
            color: light ? 'rgba(11, 31, 63, 0.5)' : 'var(--text-muted)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
