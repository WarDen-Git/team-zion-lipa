import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { LiveBanner } from "@/components/LiveBanner";
import { PageTransition } from "@/components/PageTransition";
import { StructuredData } from "@/components/StructuredData";
import { urlForImage } from "@/sanity/image";
import { getSettings, getActiveAnnouncement } from "@/sanity/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, announcement] = await Promise.all([
    getSettings(),
    getActiveAnnouncement(),
  ]);

  const logoUrl = settings?.logo
    ? urlForImage(settings.logo).height(72).url()
    : null;

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <StructuredData settings={settings} />
      <LiveBanner settings={settings} />
      <AnnouncementBar announcement={announcement} />
      <Header logoUrl={logoUrl} title={settings?.title || "Team Zion Lipa"} />
      <main id="content" className="min-h-[60vh]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer settings={settings} />
      <Analytics />
    </>
  );
}
