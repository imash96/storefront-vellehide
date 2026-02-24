"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BannerSlide } from "@/types/homepage"

// ─── Types ────────────────────────────────────────────────────────────────────

type HeroBannerCarouselProps = {
    slides: BannerSlide[]
    autoplay?: boolean
    autoplayDelay?: number
}

// ─── Slide Card ───────────────────────────────────────────────────────────────

function SlideCard({ slide }: { slide: BannerSlide }) {
    const alignClass = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
    }[slide.align ?? "left"]

    const ctaSelfClass = {
        left: "self-start",
        center: "self-center",
        right: "self-end",
    }[slide.align ?? "left"]

    return (
        <article className="relative w-full h-full overflow-hidden group select-none">
            {/* Image */}
            <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                draggable={false}
                className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 33vw"
                priority
            />

            {/* Scrim */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
                }}
            />

            {/* Content */}
            <div
                className={`absolute inset-0 z-10 flex flex-col justify-end gap-2 p-5 sm:p-6 md:p-7 lg:p-8 ${alignClass}`}
            >
                {slide.subheading && (
                    <p className="text-white/55 text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase">
                        {slide.subheading}
                    </p>
                )}

                <h2 className="font-serif text-white text-[1.65rem] sm:text-[1.85rem] md:text-[2rem] lg:text-[2.1rem] xl:text-[2.4rem] font-light leading-[1.12] tracking-tight max-w-[13ch]">
                    {slide.heading}
                </h2>

                <Link
                    href={slide.cta.href}
                    className={`mt-2 inline-flex items-center gap-1.5 bg-white text-black text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-200 hover:bg-stone-100 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${ctaSelfClass}`}
                >
                    {slide.cta.label}
                    <ChevronRight className="w-3 h-3" aria-hidden />
                </Link>
            </div>
        </article>
    )
}

// ─── Nav Arrow ────────────────────────────────────────────────────────────────

function NavArrow({
    direction,
    onClick,
}: {
    direction: "prev" | "next"
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
            className={`lg:hidden absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/15 text-white transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-white ${direction === "prev" ? "left-2 sm:left-3" : "right-2 sm:right-3"}`}
        >
            {direction === "prev" ? (
                <ChevronLeft className="w-4 h-4" />
            ) : (
                <ChevronRight className="w-4 h-4" />
            )}
        </button>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BannerCarousel({ slides }: HeroBannerCarouselProps) {

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 1024px)": { active: false },
            },
        },
        [Autoplay({
            delay: 3500,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
        })]
    )

    // ── Scroll handlers ────────────────────────────────────────────────────────

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <section
            aria-label="Hero Banners"
            aria-roledescription="carousel"
            className="w-full"
        >
            <div className="relative">
                {/* Embla viewport */}
                <div
                    ref={emblaRef}
                    className="overflow-hidden"
                    role="region"
                    aria-label="Hero slides"
                >
                    <div className="flex touch-pan-y">
                        {slides.map((slide, i) => (
                            <div
                                key={slide.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.heading}`}
                                className={`relative pl-1 shrink-0 w-[90%] md:w-[calc(50%-4px)] lg:w-[calc(33.333%-5.34px)] aspect-3/4 sm:aspect-4/5 md:aspect-3/4 lg:aspect-3/4 xl:aspect-9/11`}
                            >
                                <SlideCard slide={slide} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prev / Next arrows (hidden on lg+) */}
                <NavArrow direction="prev" onClick={scrollPrev} />
                <NavArrow direction="next" onClick={scrollNext} />
            </div>
        </section>
    )
}