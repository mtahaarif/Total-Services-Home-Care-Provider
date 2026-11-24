import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "peer w-full rounded-2xl border bg-white/80 px-4 pb-2.5 pt-6 text-[15px] text-navy-950 outline-none transition-all duration-300 placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_4px_rgb(152_200_96/0.25)]";

function Shell({ label, error, children, name }: { label: string; error?: string; children: ReactNode; name: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {children}
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-navy-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${name}-error`} className="pl-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Floating-label input. */
export function Field({ label, name, error, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string }) {
  return (
    <Shell label={label} error={error} name={name}>
      <input
        id={name}
        name={name}
        placeholder={label}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(control, error ? "border-red-400" : "border-navy-100 focus:border-leaf-400", className)}
        {...rest}
      />
    </Shell>
  );
}

export function TextArea({ label, name, error, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string; error?: string }) {
  return (
    <Shell label={label} error={error} name={name}>
      <textarea
        id={name}
        name={name}
        placeholder={label}
        rows={4}
        className={cn(control, "resize-none", error ? "border-red-400" : "border-navy-100 focus:border-leaf-400")}
        {...rest}
      />
    </Shell>
  );
}

export function Select({
  label,
  name,
  options,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full appearance-none rounded-2xl border border-navy-100 bg-white/80 px-4 pb-2.5 pt-6 text-[15px] text-navy-950 outline-none focus:border-leaf-400 focus:shadow-[0_0_0_4px_rgb(152_200_96/0.25)]"
        {...rest}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <label htmlFor={name} className="pointer-events-none absolute left-4 top-2 text-xs font-semibold text-navy-600">
        {label}
      </label>
      <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 fill-navy-400">
        <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" className="stroke-navy-400" />
      </svg>
    </div>
  );
}

/** Hidden field bots tend to fill in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
