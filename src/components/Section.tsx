import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

/** Consistent vertical rhythm for page sections. */
export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
