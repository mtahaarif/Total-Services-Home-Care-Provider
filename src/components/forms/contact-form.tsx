"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { submitContact } from "@/app/actions";
import { services } from "@/lib/services";
import { buttonClass } from "@/components/ui/button";
import { Field, Honeypot, Select, TextArea } from "./fields";
import { useFormAction } from "./use-form-action";

export function ContactForm() {
  const { state, pending, onSubmit } = useFormAction(submitContact);
  const e = state.errors ?? {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[28rem] flex-col items-center justify-center gap-4 text-center"
          role="status"
        >
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="grid size-20 place-items-center rounded-full bg-leaf-400 text-navy-950"
          >
            <CircleCheckBig className="size-9" />
          </motion.span>
          <h3 className="text-3xl font-extrabold text-navy-950">Message sent</h3>
          <p className="max-w-sm text-muted">{state.message ?? "Thank you — we'll be in touch shortly."}</p>
        </motion.div>
      ) : (
        <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
          <Honeypot />
          <Field label="Your name *" name="name" autoComplete="name" required error={e.name} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={e.phone} />
            <Field label="Email" name="email" type="email" autoComplete="email" error={e.email} />
          </div>
          <Select label="Care is for" name="relationship" options={["Myself", "A parent", "A spouse or partner", "Another family member", "A client (professional referral)", "Someone else"]} />

          <fieldset className="flex flex-col gap-3 pt-1">
            <legend className="mb-3 text-sm font-semibold text-navy-900">I&apos;m interested in…</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <label key={s.slug} className="cursor-pointer">
                  <input type="checkbox" name="services" value={s.title} className="peer sr-only" />
                  <span className="inline-flex rounded-full border border-navy-100 bg-white/80 px-4 py-2 text-sm font-medium text-navy-800 transition-all peer-checked:border-navy-600 peer-checked:bg-navy-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-leaf-400 hover:border-navy-300">
                    {s.title}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <TextArea label="Tell us a little about your situation" name="message" />

          {state.status === "error" && state.message && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className={buttonClass("primary", "mt-2 h-14 w-full text-base disabled:opacity-70")}>
            {pending ? (
              <>
                <LoaderCircle className="size-5 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send message <Send className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-muted">We&apos;ll only use your details to respond to your inquiry.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
