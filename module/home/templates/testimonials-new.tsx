"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Quote } from "lucide-react"
import RatingSystem from "@/ui/rating-system"
import { testimonials } from "@/lib/constant/testimonials"

export default function Testimonials() {
    return (
        <section
            aria-label="Customer testimonials"
            className="w-full bg-background-secondary border-y border-border-subtle"
        >
            <div className="container-custom py-12 md:py-16 lg:py-20">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14 space-y-2">
                    <p className="inline-flex items-center gap-2.5 text-[9px] font-semibold tracking-[0.30em] uppercase text-accent">
                        <span className="block h-px w-7 bg-accent" aria-hidden="true" />
                        Reviews
                        <span className="block h-px w-7 bg-accent" aria-hidden="true" />
                    </p>
                    <h2 className="font-heading font-light leading-[1.08] tracking-[-0.02em] text-text-primary text-[2rem] md:text-[2.4rem] lg:text-[2.75rem]">
                        Worn &amp; Loved
                    </h2>
                    <p className="text-sm font-light text-text-secondary max-w-xs mx-auto">
                        Real reviews from real leather enthusiasts.
                    </p>
                </div>

                {/* Desktop: 3-col grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.id} testimonial={t} featured={i === 1} />
                    ))}
                </div>

                {/* Mobile: embla carousel */}
                <MobileTestimonialCarousel />
            </div>
        </section>
    )
}

// ─── Desktop card ─────────────────────────────────────────────────────────────

function TestimonialCard({
    testimonial,
    featured = false,
}: {
    testimonial: (typeof testimonials)[number]
    featured?: boolean
}) {
    return (
        <article
            className={`flex flex-col gap-4 p-6 lg:p-7 border transition-shadow duration-300 ${featured
                ? "bg-card border-card-border shadow-md hover:shadow-lg -translate-y-1"
                : "bg-card border-card-border hover:shadow-md"
                }`}
        >
            {/* Quote icon + rating */}
            <div className="flex items-start justify-between">
                <Quote className="size-7 text-accent/40 fill-accent/10" aria-hidden />
                <RatingSystem
                    size="sm"
                    averageRating={testimonial.star}
                    type="test"
                />
            </div>

            {/* Review text */}
            <blockquote className="flex-1 text-[14px] leading-relaxed font-light text-text-primary italic">
                &ldquo;{testimonial.review}&rdquo;
            </blockquote>

            {/* Reviewer */}
            <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
                {testimonial.image && (
                    <div className="relative size-10 rounded-full overflow-hidden shrink-0 bg-muted">
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    </div>
                )}

                {/* Verified badge */}
                <div className="ml-auto shrink-0">
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wide uppercase text-success bg-success-subtle px-2 py-0.5">
                        ✓ Verified
                    </span>
                </div>
            </div>
        </article>
    )
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────

function MobileTestimonialCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ stopOnInteraction: true, delay: 3500 })]
    )

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    }, [emblaApi])

    return (
        <div className="md:hidden">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-3 touch-pan-y">
                    {testimonials.slice(0, 5).map((t) => (
                        <div key={t.id} className="flex-[0_0_90%] min-w-0">
                            <TestimonialCard testimonial={t} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
                {testimonials.slice(0, 5).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        aria-label={`Go to review ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === selectedIndex ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border-strong"}`}
                    />
                ))}
            </div>
        </div>
    )
}