"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** 3D tilt toward the pointer with a moving sheen. */
export function TiltCard({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 200, damping: 20 });
  const spy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(spy, [0, 1], [max, -max]);
  const rotateY = useTransform(spx, [0, 1], [-max, max]);
  const sheenX = useTransform(spx, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(spy, [0, 1], ["0%", "100%"]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.35), transparent 55%)`;

  return (
    <div className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("group relative", className)}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}
