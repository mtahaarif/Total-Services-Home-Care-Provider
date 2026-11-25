"use client";

import { useState } from "react";
import { MapPin, Navigation, Map as MapIcon } from "lucide-react";
import { fullAddress, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Click-to-load Google Map. The real embed pulls ~0.5 MB of Google Maps
 * JavaScript and keeps the main thread busy, so we show a lightweight,
 * map-styled preview until the visitor asks for the interactive map.
 */
export function MapEmbed({ className, showAddress = true }: { className?: string; showAddress?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Map showing ${fullAddress}`}
        src={site.mapsEmbed}
        className={cn("block w-full", className)}
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className={cn("relative isolate grid w-full place-items-center overflow-hidden bg-[#eef2ea]", className)}>
      {/* Decorative street map */}
      <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 size-full">
        <path d="M-10 210 C 80 190, 120 240, 210 215 S 330 170, 410 190" fill="none" stroke="#bcd7ee" strokeWidth="16" />
        <path d="M250 -10 L 290 120 L 410 140 L 410 -10 Z" fill="#d6e8c4" />
        <path d="M-10 40 L 120 60 L 100 150 L -10 140 Z" fill="#d6e8c4" opacity="0.8" />
        <g stroke="#ffffff" strokeLinecap="round" fill="none">
          <path d="M-10 95 L 410 75" strokeWidth="12" />
          <path d="M170 -10 L 205 310" strokeWidth="12" />
          <path d="M-10 255 L 410 240" strokeWidth="8" />
          <path d="M60 -10 L 85 310" strokeWidth="6" />
          <path d="M320 -10 L 300 310" strokeWidth="6" />
          <path d="M-10 165 L 410 150" strokeWidth="6" />
          <path d="M120 60 L 290 300" strokeWidth="5" />
        </g>
        <g stroke="#e3e8df" strokeWidth="2" fill="none">
          <path d="M-10 125 L 410 108" />
          <path d="M-10 195 L 410 180" />
          <path d="M130 -10 L 160 310" />
          <path d="M245 -10 L 250 310" />
          <path d="M370 -10 L 350 310" />
        </g>
      </svg>

      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <span className="relative grid size-14 place-items-center rounded-full bg-navy-600 text-white shadow-[0_12px_30px_-8px_rgb(34_85_138/0.7)]">
          <span className="absolute inset-0 animate-ping rounded-full bg-navy-500/40" />
          <MapPin className="relative size-6" />
        </span>
        {showAddress && (
          <div className="glass rounded-2xl px-5 py-3">
            <p className="font-bold text-navy-950">{site.legalName}</p>
            <p className="text-sm text-muted">{fullAddress}</p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            <MapIcon className="size-4" /> Show interactive map
          </button>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-navy-200 bg-white/80 px-5 text-sm font-semibold text-navy-800 transition-colors hover:bg-white"
          >
            <Navigation className="size-4" /> Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
