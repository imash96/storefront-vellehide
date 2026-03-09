"use client"

import { testimonials } from "@/data/testimonials"
import SectionHeader from "../components/section-header"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import TestimonialCard from "../components/testimonials-card"

export default function Testimonials() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            skipSnaps: false,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
            dragFree: false,
            breakpoints: {
                "(min-width: 768px)": { slidesToScroll: 2 },
                "(min-width: 1024px)": { slidesToScroll: 3 },
                "(min-width: 1280px)": { slidesToScroll: 4 },
            },
        },
        [Autoplay({ delay: 5000 })]
    )

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi?.goToPrev()
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi?.goToNext()
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return
        emblaApi?.goTo(index)
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedSnap())
        emblaApi.on("select", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    // Navigation controls to inject into the SectionHeader action slot
    const NavControls = (
        <div className="hidden md:flex items-center gap-3">
            {/* FIX: arrows now visible on all viewports */}
            <button
                onClick={scrollPrev}
                aria-label="Previous testimonial"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-200 hover:border-border-strong hover:bg-card-hover hover:text-text-primary active:scale-95"
            >
                <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
                onClick={scrollNext}
                aria-label="Next testimonial"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-text-secondary transition-all duration-200 hover:border-border-strong hover:bg-card-hover hover:text-text-primary active:scale-95"
            >
                <ChevronRight size={16} strokeWidth={1.5} />
            </button>
        </div>
    )

    return (
        <SectionHeader
            title="What Our Customers Say"
            desc="Hear from our community about the craftsmanship, comfort, and customer service that define the Velle Hide experience."
            sectionName="testimonials"
            eyebrow="Customer Stories"
            action={NavControls}
        >
            <div className="relative -mx-3">
                {/* Fade edges — desktop only */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-linear-to-r from-background to-transparent lg:block" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-linear-to-l from-background to-transparent lg:block" />
                {/* ── Carousel ────────────────────────────────────────────────── */}
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-3 md:gap-4 touch-pan-y">
                        {testimonials.map((t, i) => (
                            <div
                                key={t.id}
                                className="flex-[0_0_85%] sm:flex-[0_0_48%] md:flex-[0_0_40%] lg:flex-[0_0_31%] xl:flex-[0_0_23%] min-w-0 px-1"
                                aria-current={i === selectedIndex ? "true" : undefined}
                            >
                                <TestimonialCard testimonial={t} isActive={i === selectedIndex} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Dot pagination ──────────────────────────────────────────── */}
            {(emblaApi?.snapList() || []).length > 1 && (
                <div
                    className="mt-6 flex justify-center items-center gap-1.5"
                    role="tablist"
                    aria-label="Testimonial navigation"
                >
                    {emblaApi!.snapList().map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === selectedIndex}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => scrollTo(i)}
                            className={`rounded-full bg-accent transition-all duration-300 ${i === selectedIndex ? "w-5 h-1.5 opacity-100" : "w-1.5 h-1.5 opacity-25 hover:opacity-50"}`}
                        />
                    ))}
                </div>
            )}
        </SectionHeader>
    )
}