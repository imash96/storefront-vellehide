import Container from "@/ui/container";
import ImageMarquee from "../components/marquee";
import { bottomImages, topImages } from "@/data/gallery-wall";

/* ─── Stats strip ───────────────────────────────────────────────────────── */
const STATS = [
    { value: "12K+", label: "Happy customers" },
    { value: "4.9★", label: "Average rating" },
    { value: "86%", label: "Repeat buyers" },
]

/* ─── Section component ─────────────────────────────────────────────────── */
export default function GalleryWall() {

    return (
        <section aria-label="Premium leather lookbook - customer gallery" className="w-full overflow-hidden bg-background py-10 md:py-16 lg:py-20">
            {/* ── Header ──────────────────────────────────────────────────────── */}
            <Container size="2xl" className="mb-8 md:mb-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    {/* Left: label + heading */}
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <span className="block h-px w-8 bg-accent" aria-hidden />
                            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-accent">
                                The Edit
                            </p>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary font-heading leading-[1.1] tracking-tight">
                            Worn by real people.
                            <br />
                            <span className="text-accent">Loved everywhere.</span>
                        </h2>
                    </div>

                    {/* Right: stats + theme toggle */}
                    <div className="flex flex-col items-start sm:items-end gap-4">
                        {/* Stats */}
                        <div className="flex items-center gap-6">
                            {STATS.map((s) => (
                                <div key={s.label} className="text-center">
                                    <p className="text-xl sm:text-2xl font-bold tabular-nums text-text-primary font-heading">
                                        {s.value}
                                    </p>
                                    <p className="text-[10px] tracking-wide uppercase mt-0.5 text-text-tertiary font-body">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subtext */}
                <p className="mt-4 text-sm max-w-none text-text-tertiary font-body">
                    Unfiltered. Unedited. Community-submitted.
                    <span className="ml-2 font-medium text-primary">
                        Tag @vellehide to be featured.
                    </span>
                </p>
            </Container>

            {/* ── Marquee rows ────────────────────────────────────────────────── */}
            <div
                className="space-y-3 md:space-y-4"
                aria-hidden="true" /* decorative — screen readers skip the marquee */
            >
                {/* Row 1 — forward / left */}
                <ImageMarquee
                    items={topImages}
                    direction="left"
                    duration={52}
                    tileWidth={220}
                    gap={12}
                    aspectRatio="3/4"
                    borderRadius="0.75rem"
                    ariaLabel="Customer photos row one, scrolling left"
                />

                {/* Row 2 — reverse / right */}
                <ImageMarquee
                    items={bottomImages}
                    direction="right"
                    duration={40}
                    tileWidth={190}
                    gap={12}
                    aspectRatio="3/4"
                    borderRadius="0.75rem"
                    ariaLabel="Customer photos row two, scrolling right"
                />
            </div>
        </section>
    );
}