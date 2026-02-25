"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { BannerSlide } from "@/types/homepage"
import Button from "@/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

type HeroBannerCarouselProps = {
    slides: BannerSlide[]
}

const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
}

const ctaSelfClasses = {
    left: "self-start",
    center: "self-center",
    right: "self-end",
}

export default function BannerCarousel({ slides }: HeroBannerCarouselProps) {

    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 1024px)": { active: false, },
            },
        },
        [Autoplay({
            delay: 3500,
        })]
    )

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedSnap())
        emblaApi.on("select", onSelect)
        return () => { emblaApi.off("select", onSelect) }
    }, [emblaApi])

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <section
            aria-label="Hero Banners"
            aria-roledescription="carousel"
            className="relative w-full bg-background-secondary"
        >
            {/* Embla viewport */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-x-2 touch-pan-y">
                    {slides.map((slide, i) => {
                        const isActive = selectedIndex === i;
                        const alignClass = alignClasses[slide.align];
                        const ctaSelfClass = ctaSelfClasses[slide.align];

                        return (
                            <div
                                key={slide.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.heading}`}
                                className={`relative flex-[0_0_90%] md:flex-[0_0_48%] lg:flex-[33.33%] aspect-3/4 sm:aspect-4/5 md:aspect-3/4 xl:aspect-9/11`}
                            >
                                <Image
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    fill
                                    draggable={false}
                                    className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-[1.05]"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 33vw"
                                    priority
                                />

                                {/* Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-scrim via-overlay-light to-transparent" aria-hidden />

                                {/* Content */}
                                <div
                                    className={`absolute inset-0 z-10 flex flex-col justify-end gap-3 p-6 md:p-8 ${alignClass}`}
                                >
                                    {/* Eyebrow / subheading */}
                                    {slide.subheading && (
                                        <p
                                            className={`text-white/55 text-xs tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-3"}`}
                                            style={{ transitionDelay: isActive ? "80ms" : "0ms" }}
                                        >
                                            {slide.subheading}
                                        </p>
                                    )}

                                    {/* Heading */}
                                    <h2
                                        className={`font-heading text-white text-2xl md:text-3xl lg:text-4xl leading-tight transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-4"}`}
                                    >
                                        {slide.heading}
                                    </h2>

                                    {/* Divider accent */}
                                    <div
                                        className={`h-px w-10 bg-accent transition-all duration-500 ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"} ${slide.align === "center" ? "self-center" : slide.align === "right" ? "self-end" : "self-start"}`}
                                        style={{
                                            transitionDelay: isActive ? "260ms" : "0ms",
                                            transformOrigin: slide.align === "right" ? "right" : "left",
                                        }}
                                        aria-hidden
                                    />

                                    {/* CTA Button */}
                                    <Button
                                        href={slide.cta.href}
                                        className={`inline-flex items-center gap-2 bg-button-accent text-button-accent-foreground hover:bg-button-accent-hover px-6 py-3 text-xs tracking-wide uppercase transition-all duration-200 active:scale-95 ${ctaSelfClass} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-3"}`}
                                        icon={<ArrowRight className="size-4" />}
                                        iconPosition="right"
                                    >
                                        {slide.cta.label}
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}