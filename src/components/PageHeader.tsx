import { Container } from "./Container";

/** Consistent header band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100/60 blur-3xl"
      />
      <Container className="relative py-14 sm:py-16">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl font-bold text-brand-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
