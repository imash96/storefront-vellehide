import ImageMarquee from "../components/marquee-new"

// ─────────────────────────────────────────────────────────────────────────────
// GalleryWall
// ─────────────────────────────────────────────────────────────────────────────
// Dual-row marquee gallery. Rows scroll in opposite directions for depth.
//
// Speeds are deliberately different (52s vs 40s) — the small mismatch creates
// a subtle parallax feel where tiles in row 2 appear "closer" or faster.
//
// Import of marquee.css is intentionally removed here.
// The @keyframes marquee definition in common.css is canonical.
// Having two CSS files defining the same keyframe name caused [3] — whichever
// bundled last would silently override the other, breaking direction logic.
// ─────────────────────────────────────────────────────────────────────────────

const tImages = [
    { src: "/images/marquee/t1.jpg", alt: "" },
    { src: "/images/marquee/t2.jpg", alt: "" },
    { src: "/images/marquee/t3.jpg", alt: "" },
    { src: "/images/marquee/t4.jpg", alt: "" },
    { src: "/images/marquee/t5.jpg", alt: "" },
    { src: "/images/marquee/t6.jpg", alt: "" },
    { src: "/images/marquee/t7.jpg", alt: "" },
    { src: "/images/marquee/t8.jpg", alt: "" },
]

const bImages = [
    { src: "/images/marquee/b1.jpg", alt: "" },
    { src: "/images/marquee/b2.jpg", alt: "" },
    { src: "/images/marquee/b3.jpg", alt: "" },
    { src: "/images/marquee/b4.jpg", alt: "" },
    { src: "/images/marquee/b5.jpg", alt: "" },
    { src: "/images/marquee/b6.jpg", alt: "" },
    { src: "/images/marquee/b7.jpg", alt: "" },
    { src: "/images/marquee/b8.jpg", alt: "" },
]

export default function GalleryWall() {
    return (
        <section
            aria-label="Leather lookbook gallery"
            className="w-full overflow-hidden bg-background py-10 md:py-14 lg:py-20"
        >
            {/* ── Eyebrow label ────────────────────────────────────────── */}
            <div className="container-custom mb-7 md:mb-10">
                <p className="inline-flex items-center gap-2.5 text-[9px] font-semibold tracking-[0.30em] uppercase text-accent">
                    <span className="block h-px w-6 bg-accent" aria-hidden />
                    The Edit
                </p>
            </div>

            {/* ── Row 1 — scrolls left ─────────────────────────────────── */}
            {/*    Portrait tiles, slower speed for an editorial "wide lens" feel */}
            <ImageMarquee
                items={tImages}
                direction="left"
                duration={52}
                tileWidth={220}
                aspectRatio={[3, 4]}
                gap={10}
            />

            {/* ── Spacer row ───────────────────────────────────────────── */}
            <div className="h-2.5 md:h-3" aria-hidden />

            {/* ── Row 2 — scrolls right ────────────────────────────────── */}
            {/*    Slightly faster (40s vs 52s) — creates a parallax depth cue.
                  Narrower tiles give a different visual rhythm to row 1. */}
            <ImageMarquee
                items={bImages}
                direction="right"
                duration={40}
                tileWidth={190}
                aspectRatio={[3, 4]}
                gap={10}
            />
        </section>
    )
}