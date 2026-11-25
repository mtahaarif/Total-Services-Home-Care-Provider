"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { serviceHref, services } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

const ease = [0.32, 0.72, 0, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  /* Desktop: one soft pill that rests on the active page and glides to the
     hovered link (measured offsets + CSS transition — no layout engine). */
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const placePill = (li: HTMLElement | null | undefined) => {
    const pill = pillRef.current;
    if (!pill) return;
    if (!li) {
      pill.style.opacity = "0";
      return;
    }
    const appearing = pill.style.opacity !== "1";
    if (appearing) pill.style.transitionProperty = "opacity";
    pill.style.transform = `translateX(${li.offsetLeft}px)`;
    pill.style.width = `${li.offsetWidth}px`;
    pill.style.opacity = "1";
    if (appearing) requestAnimationFrame(() => (pill.style.transitionProperty = ""));
  };
  const activeLi = () => listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]')?.parentElement;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rest = () => placePill(activeLi());
    rest();
    const ro = new ResizeObserver(rest);
    ro.observe(list);
    return () => ro.disconnect();
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        style={{ viewTransitionName: "site-header" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-navy-100/70 bg-white/75 backdrop-blur-[16px]"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Brand eager />

          <nav
            aria-label="Main"
            className="hidden lg:block"
            onPointerLeave={() => {
              placePill(activeLi());
              setMegaOpen(false);
            }}
            onClick={(e) => {
              // After choosing a link, drop focus so :focus-within doesn't keep the dropdown open.
              if ((e.target as HTMLElement).closest("a")) (document.activeElement as HTMLElement | null)?.blur();
            }}
          >
            <div className="relative">
              <span
                ref={pillRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-navy-50 opacity-0 transition-[transform,width,opacity] duration-500 ease-out-expo"
              />
              <ul ref={listRef} className="flex items-center gap-1">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  const isServices = item.href === "/services";
                  return (
                    <li
                      key={item.href}
                      className={cn("relative", isServices && "group")}
                      onPointerEnter={(e) => placePill(e.currentTarget)}
                    >
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          aria-haspopup={isServices ? "true" : undefined}
                          className={cn(
                            "relative z-10 block rounded-full py-2 text-sm font-semibold transition-colors duration-300",
                            isServices ? "pl-3.5 pr-1" : "px-3.5",
                            active ? "text-navy-600" : "text-ink/80 hover:text-navy-700",
                          )}
                        >
                          {item.label}
                        </Link>
                        {isServices && (
                          <button
                            type="button"
                            aria-expanded={megaOpen}
                            aria-controls="services-menu"
                            aria-label="Show all services"
                            onClick={() => setMegaOpen((o) => !o)}
                            className="relative z-10 grid size-7 place-items-center rounded-full pr-1 text-ink/60 hover:text-navy-700"
                          >
                            <ChevronDown
                              className={cn("size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180", megaOpen && "rotate-180")}
                              strokeWidth={2.5}
                            />
                          </button>
                        )}
                      </div>

                      {/* Services dropdown (openarmsandheart.org-style): solid white
                          panel that fades in on hover / keyboard focus; one row per
                          service with a tinted icon chip. */}
                      {isServices && (
                        <div
                          id="services-menu"
                          className={cn(
                            "invisible absolute left-1/2 top-full z-20 w-[20rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200",
                            "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                            megaOpen && "visible opacity-100",
                          )}
                        >
                          <div className="rounded-2xl border border-navy-100/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgb(34_85_138/0.35)]">
                            <ul>
                              {services.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={serviceHref(c.slug)}
                                    aria-current={pathname === serviceHref(c.slug) ? "page" : undefined}
                                    className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-[0.9rem] font-semibold text-ink/80 transition-colors hover:bg-navy-50/70 hover:text-navy-700 aria-[current=page]:bg-navy-50 aria-[current=page]:text-navy-700"
                                  >
                                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-600 ring-1 ring-navy-100">
                                      <ServiceIcon icon={c.icon} className="size-[1.05rem]" />
                                    </span>
                                    {c.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-1 flex items-center justify-between border-t border-navy-100 px-2.5 pb-1.5 pt-3 text-sm">
                              <span className="text-ink/55">Not sure what you need?</span>
                              <Link href="/services" className="inline-flex items-center gap-1.5 font-bold text-navy-600 hover:text-navy-700">
                                All services <ArrowRight className="size-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="hidden size-10 place-items-center rounded-full border border-navy-100 text-navy-600 transition-colors hover:border-navy-200 hover:bg-navy-50 sm:grid"
            >
              <Phone className="size-4" />
            </a>
            <Link
              href="/contact"
              className="hidden h-10 items-center rounded-full bg-navy-600 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgb(34_85_138/0.8)] transition-colors hover:bg-navy-700 sm:inline-flex"
            >
              Let&apos;s talk
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="grid size-[42px] place-items-center rounded-full border border-navy-100 bg-white/50 text-ink shadow-sm backdrop-blur-md transition hover:bg-white/80 lg:hidden"
            >
              <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: frosted right-hand drawer */}
      <AnimatePresence>
        {open && (
          <div id="mobile-menu" className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <m.div
              aria-hidden
              className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <m.div
              className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto border-l border-white/40 bg-white/85 px-6 py-6 shadow-2xl backdrop-blur-2xl sm:max-w-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="flex items-center justify-between border-b border-navy-950/10 pb-6">
                <span className="text-lg font-black uppercase tracking-widest text-navy-600">Menu</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full border border-navy-100 bg-white/60 text-ink transition hover:border-navy-600 hover:bg-navy-600 hover:text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="size-5" strokeWidth={2.5} />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-6 flex-1">
                <ul className="space-y-1 py-2">
                  {nav.map((item, i) => {
                    const active = isActive(item.href);
                    const linkCls = cn(
                      "block rounded-xl px-4 py-3.5 text-lg font-bold transition hover:bg-navy-50/70",
                      active ? "bg-navy-50 text-navy-600" : "text-ink",
                    );
                    return (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.04, duration: 0.4, ease }}
                      >
                        {item.href === "/services" ? (
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                              <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(linkCls, "flex-1")}>
                                {item.label}
                              </Link>
                              <button
                                type="button"
                                onClick={() => setServicesOpen((o) => !o)}
                                aria-expanded={servicesOpen}
                                aria-controls="mobile-services"
                                aria-label="Toggle services list"
                                className="p-4 text-ink transition hover:text-navy-600"
                              >
                                <ChevronDown className={cn("size-5 transition-transform duration-300", servicesOpen && "rotate-180")} strokeWidth={2.5} />
                              </button>
                            </div>
                            <div
                              id="mobile-services"
                              inert={!servicesOpen}
                              className={cn(
                                "grid transition-[grid-template-rows,opacity] duration-300",
                                servicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                              )}
                            >
                              <div className="overflow-hidden">
                                <ul className="ml-6 space-y-1.5 border-l-2 border-navy-200 py-1 pl-6">
                                  {services.map((c) => (
                                    <li key={c.slug}>
                                      <Link
                                        href={serviceHref(c.slug)}
                                        aria-current={pathname === serviceHref(c.slug) ? "page" : undefined}
                                        className="block rounded-xl px-4 py-2.5 text-base font-semibold text-ink/80 transition-colors hover:bg-navy-50/70 hover:text-navy-600 aria-[current=page]:text-navy-600"
                                      >
                                        {c.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link href={item.href} aria-current={active ? "page" : undefined} className={linkCls}>
                            {item.label}
                          </Link>
                        )}
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-6 border-t border-navy-950/10 pt-6">
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-navy-600 py-4 text-lg font-bold text-white shadow-[0_12px_30px_-12px_rgb(34_85_138/0.8)] transition-colors hover:bg-navy-700"
                >
                  <Phone className="size-5" /> Call: {site.phone}
                </a>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
