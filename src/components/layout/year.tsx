"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Current year — static fallback on the server, real year on the client. */
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
