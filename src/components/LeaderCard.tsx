import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import type { Leader } from "@/sanity/queries";

function initials(name: string) {
  const parts = name.replace(/[""().]/g, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function LeaderCard({ leader }: { leader: Leader }) {
  const photo = leader.photo
    ? urlForImage(leader.photo).width(320).height(320).fit("crop").url()
    : null;

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
      <div className="relative h-24 w-24 overflow-hidden rounded-full">
        {photo ? (
          <Image
            src={photo}
            alt={leader.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 font-display text-2xl font-bold text-white">
            {initials(leader.name)}
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">
        {leader.name}
      </h3>
      {leader.role && (
        <p className="mt-0.5 text-sm font-medium text-gold-600">{leader.role}</p>
      )}
      {leader.bio && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {leader.bio}
        </p>
      )}
    </div>
  );
}
