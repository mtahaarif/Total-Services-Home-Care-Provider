"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { submitApplication } from "@/app/actions";
import { buttonClass } from "@/components/ui/button";
import { Field, Honeypot, Select, TextArea } from "./fields";
import { useFormAction } from "./use-form-action";

export const positions = ["Home Care Aide / Personal Care Aide", "Companion Caregiver", "Respite Caregiver", "Office / Care Coordination"];

export function CareersForm() {
  const { state, pending, onSubmit } = useFormAction(submitApplication);
  const e = state.errors ?? {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
          className="flex min-h-[26rem] flex-col items-center justify-center gap-4 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="grid size-20 place-items-center rounded-full bg-leaf-400 text-navy-950"
          >
            <CircleCheckBig className="size-9" />
          </motion.span>
          <h3 className="text-3xl font-extrabold text-navy-950">Application received</h3>
          <p className="max-w-sm text-muted">{state.message}</p>
        </motion.div>
      ) : (
        <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
          <Honeypot />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name *" name="firstName" autoComplete="given-name" error={e.firstName} />
            <Field label="Last name *" name="lastName" autoComplete="family-name" error={e.lastName} />
            <Field label="Phone *" name="phone" type="tel" autoComplete="tel" error={e.phone} />
            <Field label="Email *" name="email" type="email" autoComplete="email" error={e.email} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Position" name="position" options={positions} />
            <Select label="Availability" name="availability" options={["Weekdays", "Evenings", "Weekends", "Overnights", "Flexible"]} />
          </div>
          <Select label="Caregiving experience" name="experience" options={["New to caregiving", "Less than 1 year", "1–3 years", "3+ years"]} />
          <TextArea label="Tell us why you'd be a great caregiver" name="message" />

          {state.status === "error" && state.message && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {state.message}
            </p>
          )}

          <button type="submit" disabled={pending} className={buttonClass("primary", "mt-2 h-14 w-full text-base disabled:opacity-70")}>
            {pending ? (
              <>
                <LoaderCircle className="size-5 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                Submit application <Send className="size-4" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
