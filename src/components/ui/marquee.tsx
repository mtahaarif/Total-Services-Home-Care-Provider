import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite, CSS-only marquee. Content is rendered twice; the second copy is
 * inert so keyboard and screen-reader users only meet it once.
 */
export function Marquee({
  children,
  reverse = false,
  vertical = false,
  duration = 40,
  gap = "1rem",
  pauseOnHover = true,
  fade = true,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  vertical?: boolean;
  duration?: number;
  gap?: string;
  pauseOnHover?: boolean;
  fade?: boolean;
  className?: string;
}) {
  const style = { "--marquee-duration": `${duration}s`, "--marquee-gap": gap, gap } as CSSProperties;
  const copy = cn("flex shrink-0", vertical ? "flex-col" : "flex-row items-center");
  return (
    <div
      className={cn(
        "flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover && "marquee-group",
        fade && (vertical ? "mask-fade-y" : "mask-fade-x"),
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track flex shrink-0 will-change-transform",
          vertical ? "animate-marquee-y flex-col" : "animate-marquee flex-row",
          reverse && "[animation-direction:reverse]",
        )}
        style={style}
      >
        <div className={copy} style={{ gap }}>
          {children}
        </div>
        <div className={copy} style={{ gap }} aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
