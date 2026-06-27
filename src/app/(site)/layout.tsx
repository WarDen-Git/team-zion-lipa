import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { StructuredData } from "@/components/StructuredData";
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

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <StructuredData settings={settings} />
      <AnnouncementBar announcement={announcement} />
      <Header />
      <main id="content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
