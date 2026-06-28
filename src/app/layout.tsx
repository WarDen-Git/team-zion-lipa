import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Team Zion Lipa — A Church in Lipa City",
    template: "%s | Team Zion Lipa",
  },
  description:
    "Team Zion Lipa is a Christ-centered church in Lipa City. Join us this week — everyone is welcome.",
  openGraph: {
    title: "Team Zion Lipa",
    description:
      "A Christ-centered church in Lipa City. Join us this week — everyone is welcome.",
    type: "website",
    locale: "en_PH",
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify Search Console
  // (renders <meta name="google-site-verification" ...> when present).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2c88",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
