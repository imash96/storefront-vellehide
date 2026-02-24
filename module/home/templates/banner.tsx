"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { BannerSlide } from "@/types/homepage"
import Button from "@/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

type HeroBannerCarouselProps = {
    slides: BannerSlide[]
}

// ─── Slide Card ───────────────────────────────────────────────────────────────

function SlideCard({ slide, isActive }: { slide: BannerSlide, isActive: boolean }) {
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
        <article className="relative size-full overflow-hidden group select-none">
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
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
                }}
            />

            {/* Content */}
            <div
                className={`absolute inset-0 z-10 flex flex-col justify-end gap-2 p-5 sm:p-6 md:p-7 lg:p-8 ${alignClass}`}
            >
                {/* Eyebrow / subheading */}
                {slide.subheading && (
                    <p
                        className={`text-white/60 text-[9px] sm:text-[10px] font-medium tracking-[0.28em] uppercase transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                        style={{ transitionDelay: "100ms" }}
                    >
                        {slide.subheading}
                    </p>
                )}

                {/* Heading */}
                <h2
                    className={`font-heading text-white font-light leading-[1.05] tracking-[-0.02em] max-w-[14ch] transition-all duration-700 text-[1.7rem] sm:text-[2rem] md:text-[2.15rem] lg:text-[2.35rem] xl:text-[2.6rem] ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                    style={{ transitionDelay: "200ms" }}
                >
                    {slide.heading}
                </h2>

                <Button
                    href={slide.cta.href}
                    className={`mt-3 group/cta inline-flex items-center gap-2 text-white border border-white/40 bg-white/10 hover:bg-white hover:text-black backdrop-blur-sm text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase px-5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 hover:border-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${ctaSelfClass} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                    style={{ transitionDelay: "350ms" }}
                    icon={<ArrowRight className="size-3 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden />}
                    iconPosition="right"
                >
                    {slide.cta.label}
                </Button>
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
            className={`lg:hidden absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-9 sm:w-10 sm:h-10 bg-surface/60 hover:bg-surface backdrop-blur-sm border border-border text-text-primary transition-all duration-200 active:scale-95 ${direction === "prev" ? "left-2 sm:left-3" : "right-2 sm:right-3"}`}
        >
            {direction === "prev" ? (
                <ChevronLeft className="size-4" />
            ) : (
                <ChevronRight className="size-4" />
            )}
        </button>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BannerCarousel({ slides }: HeroBannerCarouselProps) {

    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
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

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    }, [emblaApi])

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <section
            aria-label="Hero Banners"
            aria-roledescription="carousel"
            className="relative w-full bg-background-secondary"
        >
            {/* Embla viewport */}
            <div
                ref={emblaRef}
                className="overflow-hidden"
                role="region"
                aria-label="Hero slides"
            >
                <div className="flex gap-x-2 touch-pan-y">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.heading}`}
                            className={`relative shrink-0 w-[90%] md:w-[calc(50%-4px)] lg:w-[calc(33.333%-5.34px)] aspect-3/4 sm:aspect-4/5 md:aspect-3/4 xl:aspect-9/11`}
                        >
                            <SlideCard slide={slide} isActive={selectedIndex === i} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev / Next arrows (hidden on lg+) */}
            <NavArrow direction="prev" onClick={scrollPrev} />
            <NavArrow direction="next" onClick={scrollNext} />
        </section>
    )
}