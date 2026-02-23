"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

// ─── Types ────────────────────────────────────────────────────────────────────

type Slide = {
    id: string
    image: {
        src: string
        alt: string
    }
    heading: string
    subheading?: string
    cta: {
        label: string
        href: string
    }
    /** Optional: text alignment on the slide  */
    align?: "left" | "center" | "right"
}

type HeroBannerCarouselProps = {
    slides: Slide[]
    autoplay?: boolean
    autoplayDelay?: number
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

export const DEMO_SLIDES: Slide[] = [
    {
        id: "slide-1",
        image: {
            src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=90",
            alt: "Leather jacket lifestyle",
        },
        heading: "Shades of Noir",
        subheading: "New season. Unapologetic edge.",
        cta: { label: "Shop the Edit", href: "/collections/new-arrivals" },
        align: "left",
    },
    {
        id: "slide-2",
        image: {
            src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=90",
            alt: "Premium leather coat",
        },
        heading: "Craft in Every Detail",
        subheading: "Full-grain leather. Zero compromise.",
        cta: { label: "Shop Coats", href: "/collections/coats" },
        align: "center",
    },
    {
        id: "slide-3",
        image: {
            src: "https://images.unsplash.com/photo-1520975922-0b4c6e677bc1?w=1600&q=90",
            alt: "Leather blazer editorial",
        },
        heading: "Power, Refined",
        subheading: "Tailored for those who lead.",
        cta: { label: "Shop Blazers", href: "/collections/blazers" },
        align: "right",
    },
]

// ─── Dot indicator ────────────────────────────────────────────────────────────

function DotButton({
    active,
    onClick,
}: {
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            aria-label={active ? "Current slide" : "Go to slide"}
            className={`h-0.5 transition-all duration-500 ease-in-out rounded-full ${active ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"}`}
        />
    )
}

// ─── Single slide card ────────────────────────────────────────────────────────

function SlideCard({ slide }: { slide: Slide }) {
    const alignClass = {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
    }[slide.align ?? "left"]

    return (
        <article className="relative w-full h-full overflow-hidden group">
            {/* Image */}
            <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 90vw, 33vw"
                priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div
                className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 gap-3 ${alignClass}`}
            >
                <h2 className="font-serif text-white text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-tight tracking-tight">
                    {slide.heading}
                </h2>

                {slide.subheading && (
                    <p className="text-white/80 text-sm md:text-base font-light tracking-wide max-w-xs">
                        {slide.subheading}
                    </p>
                )}

                <Link
                    href={slide.cta.href}
                    className="mt-2 inline-flex items-center gap-2 self-auto bg-white text-black text-xs font-medium tracking-[0.12em] uppercase px-5 py-3 transition-colors duration-200 hover:bg-stone-100 focus-visible:outline focus-visible:outline-white"
                >
                    {slide.cta.label}
                    <span aria-hidden className="text-base leading-none">→</span>
                </Link>
            </div>
        </article>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroBannerCarousel({
    slides = DEMO_SLIDES,
    autoplay = true,
    autoplayDelay = 4500,
}: HeroBannerCarouselProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            // Show a peek of the next slide on mobile/tablet
            slidesToScroll: 1,
            breakpoints: {
                // These are Embla breakpoints (min-width in px)
                "(min-width: 1024px)": { active: false }, // disable carousel on desktop
            },
        },
        autoplay
            ? [
                Autoplay({
                    delay: autoplayDelay,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                }),
            ]
            : []
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", onSelect)
        onSelect()
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    )

    return (
        <section
            aria-label="Hero Banner"
            className="w-full bg-stone-950"
        >
            {/*
       * MOBILE / TABLET  → Embla carousel
       *   - 1 slide visible + ~15% peek of next slide
       * DESKTOP (lg+)    → Static 3-column grid, no scrolling
       */}

            {/* ── Mobile / Tablet: Carousel ─────────────────────────────────────── */}
            <div className="block lg:hidden">
                <div
                    ref={emblaRef}
                    className="overflow-hidden"
                    role="region"
                    aria-label="Hero Slides"
                >
                    <div
                        className="flex gap-1"
                        style={{ touchAction: "pan-y pinch-zoom" }}
                    >
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                // 85% width so the next slide peeks in (~15%)
                                className="relative shrink-0 w-[85%] aspect-3/4 sm:aspect-9/10"
                                aria-label={`Slide: ${slide.heading}`}
                            >
                                <SlideCard slide={slide} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot indicators */}
                <div
                    className="flex items-center justify-center gap-2 py-4"
                    aria-label="Slide indicators"
                >
                    {slides.map((slide, i) => (
                        <DotButton
                            key={slide.id}
                            active={i === selectedIndex}
                            onClick={() => scrollTo(i)}
                        />
                    ))}
                </div>
            </div>

            {/* ── Desktop: Static 3-column grid ─────────────────────────────────── */}
            <div
                className="hidden lg:grid lg:grid-cols-3 gap-1"
                aria-label="Hero Banners"
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative aspect-3/4 xl:aspect-9/11"
                        aria-label={`Banner: ${slide.heading}`}
                    >
                        <SlideCard slide={slide} />
                    </div>
                ))}
            </div>
        </section>
    )
}