"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: boolean;
};

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ children, delay = 0, y = 32, x = 0, scale = 1, blur = false, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Parent that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({ children, stagger = 0.08, ...rest }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  );
}
