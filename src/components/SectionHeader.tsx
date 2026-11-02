interface SectionHeaderProps {
  label: string;
  heading: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeader({ label, heading, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <span
        className="inline-block font-bold text-xs sm:text-sm uppercase tracking-[0.18em] mb-3 text-[#D4AF37]"
      >
        {label}
      </span>
      <h2
        className="font-brand-display font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-white tracking-tight"
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-white/70"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
