"use client";

import { usePathname } from "next/navigation";

/**
 * Replays a subtle fade/slide entrance whenever the route changes,
 * giving smooth page-to-page transitions. Reduced-motion safe (CSS).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
