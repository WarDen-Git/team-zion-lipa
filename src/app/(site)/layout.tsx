import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
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
      <AnnouncementBar announcement={announcement} />
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
