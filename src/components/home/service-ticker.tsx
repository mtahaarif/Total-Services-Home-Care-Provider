import { allServiceNames } from "@/lib/services";
import { Marquee } from "@/components/ui/marquee";

/** Single straight green band: every service scrolling infinitely. */
export function ServiceTicker() {
  return (
    <section aria-label="Services we offer" className="border-y border-leaf-300 bg-leaf-400 py-4">
      <Marquee duration={60} gap="2rem" fade={false}>
        {allServiceNames.map((s) => (
          <span key={s} className="flex items-center gap-8 whitespace-nowrap text-2xl font-semibold text-navy-950 sm:text-3xl">
            {s}
            <span className="size-2 rounded-full bg-navy-700" aria-hidden />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
