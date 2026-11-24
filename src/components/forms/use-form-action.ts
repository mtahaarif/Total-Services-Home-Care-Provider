"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import type { FormState } from "@/app/actions";

/**
 * useActionState wrapper that submits via onSubmit so React does not reset the
 * form on validation errors (users keep what they typed).
 */
export function useFormAction(action: (prev: FormState, fd: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, { status: "idle" } as FormState);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
  return { state, pending, onSubmit };
}
