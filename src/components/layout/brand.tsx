import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ dark = false, compact = false, className }: { dark?: boolean; compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="Total Services Home Care Provider — home">
      <span className={cn("relative grid shrink-0 place-items-center rounded-2xl transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105", dark && "bg-white p-1.5")}>
        <Image
          src="/logo-mark.png"
          alt=""
          width={201}
          height={217}
          priority
          className={cn("h-auto", compact ? "w-9" : "w-11", dark && "w-10")}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.2rem] font-extrabold tracking-tight", dark ? "text-white" : "text-navy-600")}>Total Services</span>
        <span className={cn("mt-1 text-[0.78rem] font-medium", dark ? "text-leaf-300" : "text-navy-500/80")}>Home Care Provider</span>
      </span>
    </Link>
  );
}
