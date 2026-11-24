"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { fullAddress, nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { Magnetic } from "@/components/ui/magnetic";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev && !open);
  });

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <m.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[82rem] items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2 transition-all duration-500 ease-out-expo sm:pl-5",
            scrolled || open ? "glass" : "border border-transparent bg-transparent",
          )}
        >
          <Brand compact={scrolled} eager />

          <nav aria-label="Main" className="hidden lg:block" onPointerLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-1 rounded-full p-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative" onPointerEnter={() => setHovered(item.href)}>
                    {hovered === item.href && (
                      <m.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-navy-50"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-[15px] font-semibold transition-colors",
                        active ? "text-navy-600" : "text-ink/70 hover:text-navy-700",
                      )}
                    >
                      {item.label}
                      {active && (
                        <m.span
                          layoutId="nav-active"
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-leaf-400"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex" strength={0.25}>
              <a
                href={site.phoneHref}
                className="group flex h-11 items-center gap-2.5 rounded-full bg-navy-600 pl-1.5 pr-5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgb(34_85_138/0.8)] transition-colors hover:bg-navy-700"
              >
                <span className="grid size-8 place-items-center rounded-full bg-leaf-400 text-navy-950 transition-transform duration-500 group-hover:rotate-[20deg]">
                  <Phone className="size-4" />
                </span>
                {site.phone}
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full bg-navy-950 text-white lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition-all duration-500 ease-out-expo", open && "top-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-[2px] w-5 rounded bg-current transition-all duration-500 ease-out-expo", open && "bottom-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-950 px-5 pb-8 pt-28 text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 top-24 size-80 rounded-full bg-leaf-400/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -left-24 bottom-10 size-80 rounded-full bg-navy-400/30 blur-3xl" />
            <nav aria-label="Mobile" className="relative">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 text-4xl font-extrabold tracking-tight"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-serif text-base italic text-leaf-300">0{i + 1}</span>
                        <span className={cn(isActive(item.href) && "text-leaf-300")}>{item.label}</span>
                      </span>
                      <ArrowUpRight className="size-6 text-white/40" />
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative mt-auto flex flex-col gap-3 pt-10"
            >
              <a href={site.phoneHref} className="flex items-center gap-3 rounded-2xl bg-leaf-400 px-5 py-4 font-bold text-navy-950">
                <Phone className="size-5" /> Call {site.phone}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/15 px-5 py-4 text-sm text-white/80">
                <MapPin className="size-5 shrink-0 text-leaf-300" /> {fullAddress}
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
