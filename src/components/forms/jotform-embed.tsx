"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Embeds a published Jotform (only the public form ID — never builder links
 * or access keys). The form inside the iframe posts `setHeight:<px>:<formId>`
 * and `scrollIntoView:...` messages; we size the frame to fit (no inner
 * scrollbars) and bring it into view after submission. Messages are accepted
 * only from Jotform origins and only for this form's ID.
 */
export function JotformEmbed({
  formId,
  title,
  minHeight = 640,
  className,
}: {
  formId: string;
  title: string;
  minHeight?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      let host = "";
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      if (host !== "jotform.com" && !host.endsWith(".jotform.com")) return;
      // Only react to messages from our own iframe.
      if (frameRef.current && e.source !== frameRef.current.contentWindow) return;

      const [cmd, value, id] = e.data.split(":");
      if (id && id !== formId) return;
      if (cmd === "setHeight") {
        const h = parseInt(value, 10);
        if (Number.isFinite(h) && h > 0) setHeight(Math.max(h + 16, 320));
      } else if (cmd === "scrollIntoView") {
        frameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [formId]);

  return (
    <div className={cn("relative", className)}>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 flex flex-col gap-4 p-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-2xl bg-navy-50" />
          ))}
          <div className="h-32 animate-pulse rounded-2xl bg-navy-50" />
          <div className="h-12 w-48 animate-pulse rounded-full bg-navy-100" />
        </div>
      )}
      <iframe
        ref={frameRef}
        id={`JotFormIFrame-${formId}`}
        title={title}
        src={`https://form.jotform.com/${formId}?isIframeEmbed=1`}
        loading="lazy"
        allow="geolocation; microphone; camera; fullscreen"
        onLoad={() => setLoaded(true)}
        style={{ height }}
        className={cn("block w-full scroll-mt-28 border-0 transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
