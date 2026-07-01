import Image from "next/image";
import { CopyButton } from "./CopyButton";
import { urlForImage } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/queries";

type Method = NonNullable<SiteSettings["givingMethods"]>[number];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 py-3">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="truncate font-medium text-slate-900">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export function GivingMethods({ methods }: { methods: Method[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {methods.map((m, i) => {
        const qr = m.qr ? urlForImage(m.qr).width(500).height(500).url() : null;
        return (
          <div
            key={m._key ?? i}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
          >
            <h3 className="font-display text-xl font-semibold text-brand-900">
              {m.platform}
            </h3>
            {qr && (
              <div className="mt-4 self-center rounded-xl bg-white p-2 ring-1 ring-slate-200">
                <Image
                  src={qr}
                  alt={`${m.platform} QR code`}
                  width={200}
                  height={200}
                  className="h-44 w-44"
                />
              </div>
            )}
            <div className="mt-2">
              {m.accountName && (
                <Row label="Account Name" value={m.accountName} />
              )}
              {m.accountNumber && (
                <Row label="Account Number" value={m.accountNumber} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
