import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  gold: "bg-gold-500 text-brand-950 hover:bg-gold-400 shadow-sm",
  outline: "border border-white/40 text-white hover:bg-white/10",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

function cx(variant: Variant, size: Size, className?: string) {
  return `${baseClass} ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
}

type ButtonAsLink = {
  href: string;
  variant?: Variant;
  size?: Size;
} & Omit<ComponentProps<typeof Link>, "href">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonAsLink) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cx(variant, size, className)}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={cx(variant, size, className)} {...props} />;
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={cx(variant, size, className)} {...props} />;
}
