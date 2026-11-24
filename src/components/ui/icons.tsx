import { Coffee, Footprints, HandHeart, House, MessageCircleHeart, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { IconKey } from "@/lib/services";

export const serviceIcons: Record<IconKey, LucideIcon> = {
  "hand-heart": HandHeart,
  footprints: Footprints,
  utensils: UtensilsCrossed,
  home: House,
  "message-heart": MessageCircleHeart,
  coffee: Coffee,
};

export function ServiceIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = serviceIcons[icon];
  return <Icon className={className} aria-hidden />;
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="inline-block size-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
