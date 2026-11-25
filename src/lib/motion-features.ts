// Loaded lazily by <LazyMotion> (see components/layout/providers.tsx).
// domAnimation = animations, exit (AnimatePresence), hover/tap/focus, in-view.
// The site deliberately avoids layout animations (layout/layoutId) and drag,
// so the much larger domMax / projection engine is never shipped.
import { domAnimation } from "framer-motion";

export default domAnimation;
