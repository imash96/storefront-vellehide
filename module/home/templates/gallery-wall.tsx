/**
 * GalleryWall — Premium leather jacket lookbook section
 *
 * Two infinite marquee rows:
 *   Row 1 → scrolls LEFT  at a slower pace (wider tiles, richer presence)
 *   Row 2 → scrolls RIGHT at a faster pace (narrower tiles, dynamic contrast)
 *
 * Uses Unsplash source images that fit a leather-jacket / fashion aesthetic.
 * In production, swap src values for your real CDN URLs or Next.js <Image />.
 */

import Container from "@/ui/container";
import ImageMarquee, { MarqueeImage } from "../components/marquee";

/* ─── Image data ────────────────────────────────────────────────────────── */

// Top row — forward (left)
const topImages: MarqueeImage[] = [
    {
        id: "1",
        src: "/images/marquee/t1.jpg",
        alt: "Customer wearing a black leather biker jacket",
        customerName: "James M.",
        tag: "Moto Classic",
    },
    {
        id: "2",
        src: "/images/marquee/t2.jpg",
        alt: "Customer in cognac leather jacket on city street",
        customerName: "Priya S.",
        tag: "Cognac Racer",
    },
    {
        id: "3",
        src: "/images/marquee/t3.jpg",
        alt: "Model in dark brown leather jacket",
        customerName: "Lena K.",
        tag: "Heritage Bomber",
    },
    {
        id: "4",
        src: "/images/marquee/t4.jpg",
        alt: "Woman wearing a distressed leather jacket",
        customerName: "Sofia R.",
        tag: "Distressed Edit",
    },
    {
        id: "5",
        src: "/images/marquee/t5.jpg",
        alt: "Man in slim-fit black leather jacket",
        customerName: "Marcus T.",
        tag: "Slim Rider",
    },
    {
        id: "6",
        src: "/images/marquee/t6.jpg",
        alt: "Customer in olive leather jacket",
        customerName: "Hana W.",
        tag: "Field Jacket",
    },
    {
        id: "7",
        src: "/images/marquee/t7.jpg",
        alt: "Person in vintage-style leather jacket",
        customerName: "Tom A.",
        tag: "Vintage Biker",
    },
    {
        id: "8",
        src: "/images/marquee/t8.jpg",
        alt: "Model wearing oversized leather jacket",
        customerName: "Nour E.",
        tag: "Oversized Moto",
    },
]

// Bottom row — reverse (right)
const bottomImages: MarqueeImage[] = [
    {
        id: "11",
        src: "/images/marquee/b1.jpg",
        alt: "Customer in slim brown leather jacket",
        customerName: "Elena V.",
        tag: "Café Racer",
    },
    {
        id: "12",
        src: "/images/marquee/b2.jpg",
        alt: "Man in black leather jacket outdoor shoot",
        customerName: "Carlos D.",
        tag: "Moto Classic",
    },
    {
        id: "13",
        src: "/images/marquee/b3.jpg",
        alt: "Woman in tan leather jacket",
        customerName: "Maya L.",
        tag: "Tan Rider",
    },
    {
        id: "14",
        src: "/images/marquee/b4.jpg",
        alt: "Customer in burgundy leather jacket",
        customerName: "Zara P.",
        tag: "Burgundy Biker",
    },
    {
        id: "15",
        src: "/images/marquee/b5.jpg",
        alt: "Man in double-rider leather jacket",
        customerName: "Kai F.",
        tag: "Double Rider",
    },
    {
        id: "16",
        src: "/images/marquee/b6.jpg",
        alt: "Customer in tailored leather blazer",
        customerName: "Leo B.",
        tag: "Leather Blazer",
    },
    {
        id: "17",
        src: "/images/marquee/b7.jpg",
        alt: "Woman in black moto jacket",
        customerName: "Aria N.",
        tag: "Moto Edit",
    },
    {
        id: "18",
        src: "/images/marquee/b8.jpg",
        alt: "Customer wearing premium leather jacket",
        customerName: "Sara M.",
        tag: "Heritage Slim",
    },
]

/* ─── Stats strip ───────────────────────────────────────────────────────── */
const STATS = [
    { value: "12K+", label: "Happy customers" },
    { value: "4.9★", label: "Average rating" },
    { value: "86%", label: "Repeat buyers" },
];

/* ─── Section component ─────────────────────────────────────────────────── */
export function GalleryWall() {

    return (
        <section aria-label="Premium leather lookbook - customer gallery" className="w-full overflow-hidden bg-background py-14 md:py-20 lg:py-28">
            {/* ── Header ──────────────────────────────────────────────────────── */}
            <Container size="2xl" className="mb-10 md:mb-14">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    {/* Left: label + heading */}
                    <div className="space-y-3">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3">
                            <span className="block h-px w-8 bg-accent" aria-hidden="true" />
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

export default GalleryWall;
