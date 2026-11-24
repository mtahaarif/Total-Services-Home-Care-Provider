import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "leaf" | "outline" | "glass" | "white" | "ghost-light";

const base =
  "group/btn relative isolate inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold transition-[color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97] whitespace-nowrap";

/* `before:` is a fill that sweeps up from the bottom on hover. */
const variants: Record<Variant, string> = {
  primary:
    "bg-navy-600 text-white shadow-[0_10px_30px_-10px_rgb(34_85_138/0.7)] before:bg-leaf-400 hover:text-navy-950",
  leaf: "bg-leaf-400 text-navy-950 shadow-[0_10px_30px_-10px_rgb(127_177_69/0.8)] before:bg-white",
  outline: "border border-navy-200 bg-white/60 text-navy-800 before:bg-navy-600 hover:text-white",
  glass: "glass text-navy-900 before:bg-white",
  white: "bg-white text-navy-900 before:bg-leaf-300",
  "ghost-light": "border border-white/25 bg-white/5 text-white backdrop-blur before:bg-white hover:text-navy-950",
};

const sweep =
  "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-out-expo hover:before:translate-y-0";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, sweep, variants[variant], className);
}

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode | false;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "primary", children, icon, className, ...rest }: Props) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  const content = (
    <>
      {children}
      {icon !== false && (
        <span className="relative grid size-5 place-items-center overflow-hidden">
          {icon ?? (
            <>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-5 group-hover/btn:translate-x-5" />
              <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  );
}
