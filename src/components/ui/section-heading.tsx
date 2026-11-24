import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedHeadline } from "./animated-headline";
import { Reveal } from "./reveal";

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]",
        dark ? "border-white/15 bg-white/5 text-leaf-300" : "border-navy-100 bg-white/70 text-navy-600",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf-400 opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-leaf-400" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <AnimatedHeadline
        text={title}
        className={cn(
          "max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.5rem]",
          dark ? "text-white" : "text-navy-950",
          titleClassName,
        )}
        accentClassName={dark ? "text-leaf-300" : "text-navy-500"}
      />
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className={cn("max-w-2xl text-lg leading-relaxed", dark ? "text-navy-100/80" : "text-muted")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
