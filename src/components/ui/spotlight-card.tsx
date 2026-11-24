"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card with a soft glow + glowing border that follow the pointer. */
export function SpotlightCard({
  children,
  className,
  spot,
  spotBorder,
}: {
  children: ReactNode;
  className?: string;
  spot?: string;
  spotBorder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn("spotlight relative overflow-hidden", className)}
      style={{ ...(spot && { "--spot": spot }), ...(spotBorder && { "--spot-border": spotBorder }) } as CSSProperties}
    >
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  );
}
