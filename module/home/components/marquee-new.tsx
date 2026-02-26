import Image from "next/image"

// ─────────────────────────────────────────────────────────────────────────────
// ImageMarquee
// ─────────────────────────────────────────────────────────────────────────────
//
// Fix log:
// [1][2] Edge fade via mask-image — the primary visual trick for infinite look.
//        Doubles items: animates translateX(0 → -50%) = exactly one set width.
//        Seam is always outside the visible fade zone.
// [3]    marquee.css keyframe conflict resolved — see marquee.css note.
//        This component drives duration/direction via inline style only.
// [4]    Direction: "left" = normal (0→-50%), "right" = reverse (-50%→0).
//        No more inverted reverse logic.
// [5]    duration prop = total seconds for one loop. Scales predictably since
//        all tile widths are identical (same clamp expression).
// [6]    bg-muted on tile container — not bg-accent (gold bleeds around images).
// [7]    shadow-secondary-hover removed — not a valid token.
// [8]    Named groups: group/marquee (strip), group/tile (each card).
//        Hover state never bleeds between levels.
// [9]    Responsive tiles via CSS clamp — fluid 160px → tileWidth.
// [10]   motion-safe: guards on animation + image scale + transitions.
// [11]   priority={i < items.length} — covers only the first (visible) copy.
// [12]   marginRight on each tile (not flex gap) — fixes seam gap.
//        With flex gap, last item in set2 → first item in set1 has NO gap.
//        With marginRight, every item carries its own trailing space. ✓
// [13]   Pause feedback: accent underline scales in on hover (CSS-only).
// [14]   Image is position:fill inside the tile — no border/bg bleed.
// ─────────────────────────────────────────────────────────────────────────────

type MarqueeItem = {
    src: string
    alt: string
}

interface ImageMarqueeProps {
    items: MarqueeItem[]
    /** "left" = items scroll left (default). "right" = items scroll right. */
    direction?: "left" | "right"
    /** Seconds for one full loop cycle. */
    duration?: number
    /** Max tile width in px. Fluid-scales down to 68% on small screens. */
    tileWidth?: number
    /**
     * Tile aspect ratio [width, height].
     * @default [3, 4]  — portrait, ideal for fashion photography
     */
    aspectRatio?: [number, number]
    /** Gap between tiles in px. Applied as marginRight for seamless loop. */
    gap?: number
    className?: string
}

export default function ImageMarquee({
    items,
    direction = "left",
    duration = 44,
    tileWidth = 220,
    aspectRatio = [3, 4],
    gap = 10,
    className = "",
}: ImageMarqueeProps) {
    // ── Doubles items for seamless loop ──────────────────────────────────────
    // The track is [A,A]. Animating translateX(0 → -50%) moves exactly one
    // full set (A). At -50% the view is identical to the start → loops cleanly.
    const track = [...items, ...items]

    // ── Responsive tile width via CSS clamp ──────────────────────────────────
    // Scales from 68% of tileWidth (mobile) up to tileWidth (desktop ~1280px).
    // All tiles share the same expression → -50% loop math always holds. [9]
    const minW = Math.round(tileWidth * 0.68)
    const vwCoeff = Math.round(tileWidth / 12.8) // hits tileWidth at ~1280px vw
    const responsiveW = `clamp(${minW}px, ${vwCoeff}vw, ${tileWidth}px)`

    return (
        <div
            className={`relative overflow-hidden group/marquee ${className}`}
            aria-hidden="true" // Decorative — no meaningful content for AT
            style={{
                // ── [1][2] Edge fade masks — the infinite illusion ──────────
                // Transparent → opaque over 8% of width on each side.
                // The seam (loop point) is never visible inside the opaque zone.
                maskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                willChange: "transform",
            }}
        >
            {/* ── Scrolling track ──────────────────────────────────────────── */}
            < div
                className={
                    [
                        "flex w-max",                                    // expands to total content width
                        "will-change-transform",                         // GPU compositing hint
                        "motion-safe:animate-marquee",                   // [10] reduced-motion guard
                        "group-hover/marquee:[animation-play-state:paused]", // CSS-only pause [8]
                    ].join(" ")
                }
                style={{
                    animationDuration: `${duration}s`,
                    // [4] correct direction: normal = left (0→-50%), reverse = right
                    animationDirection: direction === "left" ? "normal" : "reverse",
                }}
            >
                {
                    track.map((item, i) => (
                        // ── Tile ─────────────────────────────────────────────────
                        // [12] marginRight (not flex gap) — applies trailing space
                        //      to every tile including the last, so the seam gap
                        //      matches all other inter-tile gaps exactly.
                        <div
                            key={`${item.src}-${i}`}
                            className="group/tile relative shrink-0 overflow-hidden bg-muted" // [6][14]
                            style={{
                                width: responsiveW,
                                aspectRatio: `${aspectRatio[0]} / ${aspectRatio[1]}`,
                                marginRight: `${gap}px`,    // [12] seamless loop gap fix
                            }}
                        >
                            {/* Image */}
                            <Image
                                src={item.src || "/svg/placeholder.svg"}
                                alt=""   // decorative — intentionally empty [aria-hidden on parent]
                                fill
                                // [10] motion-safe guards on zoom transform
                                className="object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover/tile:scale-[1.06]"
                                sizes={`${tileWidth}px`}
                                priority={i < items.length} // [11] only first (visible) copy
                            />

                            {/* ── Hover overlay ────────────────────────────────── */}
                            {/* Lightens the image slightly on hover for interactivity feel */}
                            <div
                                className="absolute inset-0 bg-white/0 motion-safe:transition-colors motion-safe:duration-400 group-hover/tile:bg-white/[0.07]"
                                aria-hidden
                            />

                            {/* ── Bottom micro-scrim ───────────────────────────── */}
                            {/* Adds subtle depth — more visible on hover */}
                            <div
                                className="absolute inset-x-0 bottom-0 h-1/3 opacity-0 motion-safe:transition-opacity motion-safe:duration-400 group-hover/tile:opacity-100"
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 100%)",
                                }}
                                aria-hidden
                            />
                        </div>
                    ))
                }
            </div >

            {/* ── [13] Pause indicator ─────────────────────────────────────── */}
            {/* Accent underline scales in from left on hover — CSS-only, no JS */}
            <div
                className="absolute bottom-0 inset-x-0 h-[2px] bg-accent origin-left scale-x-0 group-hover/marquee:scale-x-100 motion-safe:transition-transform motion-safe:duration-600 motion-safe:ease-out"
                aria-hidden
            />
        </div >
    )
}