import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SermonCard } from "@/components/SermonCard";
import { getSermons } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and re-watch messages from Team Zion Lipa.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">Sermons</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        Catch up on recent messages, or revisit a favorite.
      </p>

      {sermons.length === 0 ? (
        <div className="mt-10 rounded-xl bg-slate-50 p-10 text-center text-slate-500">
          No sermons yet. Add them in the Studio — just paste a YouTube or
          Facebook link.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((s) => (
            <SermonCard key={s._id} sermon={s} />
          ))}
        </div>
      )}
    </Container>
  );
}
