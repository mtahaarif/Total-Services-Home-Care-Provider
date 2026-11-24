import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page's content so route changes cross-fade with a soft rise.
 * Must live in each page (not the layout) — layouts persist across navigations.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
