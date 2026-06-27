import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-900 to-brand-950 px-6 text-center text-white">
      <p className="font-display text-7xl font-bold text-gold-400">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-brand-100">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back home.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3 font-semibold text-brand-950 transition-colors hover:bg-gold-400"
      >
        Back to Home
      </Link>
    </main>
  );
}
