"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt toward the pointer with a moving sheen. Pointer position is written
 * to CSS custom properties; CSS does the transform + easing (no library).
 */
export function TiltCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="[perspective:1000px]">
      <div
        ref={ref}
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.style.setProperty("--rx", `${(0.5 - py) * 2 * max}deg`);
          el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
          el.style.setProperty("--sx", `${px * 100}%`);
          el.style.setProperty("--sy", `${py * 100}%`);
        }}
        onPointerLeave={() => {
          const el = ref.current;
          if (!el) return;
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        }}
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", transformStyle: "preserve-3d" } as CSSProperties}
        className={cn("group relative transition-transform duration-300 ease-out", className)}
      >
        {children}
        <div
          aria-hidden
          style={{ background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgb(255 255 255 / 0.35), transparent 55%)" }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
