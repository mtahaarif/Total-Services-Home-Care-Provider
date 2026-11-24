import { Leaf } from "lucide-react";
import { allServiceNames } from "@/lib/services";
import { Marquee } from "@/components/ui/marquee";

/** Two counter-scrolling infinite bands of every service we offer. */
export function ServiceTicker() {
  const half = Math.ceil(allServiceNames.length / 2);
  const rowA = allServiceNames.slice(0, half);
  const rowB = allServiceNames.slice(half);

  return (
    <section aria-label="Services we offer" className="relative py-6">
      <div className="-rotate-[1.5deg] bg-navy-700 py-5 shadow-[0_30px_60px_-30px_rgb(8_26_48/0.6)]">
        <Marquee duration={45} gap="2.5rem" fade={false}>
          {rowA.map((s) => (
            <span key={s} className="flex items-center gap-10 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {s}
              <Leaf className="size-6 text-leaf-400" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="-mt-3 rotate-[1deg] border-y border-leaf-300 bg-leaf-400 py-4">
        <Marquee duration={40} gap="2rem" reverse fade={false}>
          {rowB.map((s) => (
            <span key={s} className="flex items-center gap-8 font-serif text-2xl italic text-navy-950 sm:text-3xl">
              {s}
              <span className="size-2 rounded-full bg-navy-700" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
