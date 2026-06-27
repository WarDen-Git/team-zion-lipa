import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { ClockIcon, UsersIcon } from "./icons";
import type { Ministry } from "@/sanity/queries";

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  const img = ministry.image
    ? urlForImage(ministry.image).width(800).height(450).fit("crop").url()
    : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {img ? (
        <div className="relative aspect-video w-full bg-slate-100">
          <Image src={img} alt={ministry.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[5/2] w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50">
          <UsersIcon width={34} height={34} className="text-brand-500" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-brand-900">
          {ministry.name}
        </h3>
        {ministry.audience && (
          <span className="mt-2 self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {ministry.audience}
          </span>
        )}
        {ministry.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            {ministry.description}
          </p>
        )}
        {(ministry.schedule || ministry.leader) && (
          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-500">
            {ministry.schedule && (
              <p className="flex items-center gap-2">
                <ClockIcon width={15} height={15} className="text-brand-500" />
                {ministry.schedule}
              </p>
            )}
            {ministry.leader && (
              <p className="flex items-center gap-2">
                <UsersIcon width={15} height={15} className="text-brand-500" />
                {ministry.leader}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
