import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-4 pb-20 pt-36 text-center">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 size-[30rem] -translate-x-1/2 animate-blob rounded-full bg-leaf-200/60 blur-[100px]" />
      <div className="flex flex-col items-center gap-6">
        <Image src="/logo-mark.png" alt="" width={201} height={217} className="w-20 animate-float" />
        <p className="font-serif text-8xl italic text-navy-500 sm:text-9xl">404</p>
        <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">This page isn&apos;t home.</h1>
        <p className="max-w-md text-muted">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back somewhere familiar.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            Call {site.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
