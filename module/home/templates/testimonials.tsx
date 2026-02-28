"use client"

import { testimonials } from "@/data/testimonials";
import SectionHeader from "../components/section-header";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import TestimonialCard from "../components/testimonials-card";

const totalReviews = testimonials.length;
const avgRating = (testimonials.reduce((sum, t) => sum + t.star, 0) / totalReviews).toFixed(1);

export default function Testimonials() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            skipSnaps: false,
            slidesToScroll: 1,
            containScroll: false,
            dragFree: false,
        },
        [
            Autoplay({
                delay: 4500,
            }),
        ]
    );

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.goToPrev();
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.goToNext();
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <SectionHeader title="Worn & Loved" desc="Hear from our community about the craftsmanship, comfort, and customer service that define the Velle Hide experience." sectionName="Customer testimonials" eyebrow="Customer Stories" action={<div className="hidden sm:flex items-center gap-6 shrink-0">
            {/* Aggregate stats pill */}
            <div className="flex items-center gap-3 rounded-full border border-border-subtle bg-surface px-5 py-2.5">
                <span className="text-2xl font-bold tracking-tight text-text-primary font-heading">
                    {avgRating}
                </span>
                <div className="flex flex-col gap-0 leading-none">
                    <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <svg
                                key={i}
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                className={`shrink-0 ${i < Math.floor(Number(avgRating)) ? "fill-rating-filled text-rating-filled" : "fill-rating-empty text-rating-empty"}`}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[10.5px] font-medium text-text-tertiary mt-1">
                        {totalReviews} verified reviews
                    </span>
                </div>
            </div>
            {/* Nav arrows */}
            <div className="hidden md:flex items-center gap-2">
                <button
                    onClick={scrollPrev}
                    aria-label="Previous testimonials"
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 border-border bg-surface text-text-secondary hover:border-border-strong hover:bg-card-hover hover:text-text-primary hover:shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={scrollNext}
                    aria-label="Next testimonials"
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 border-border bg-surface text-text-secondary hover:border-border-strong hover:bg-card-hover hover:text-text-primary hover:shadow-sm active:scale-95 disabled:pointer-events-none disabled:opacity-30"

                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>}>
            <div className="relative">
                {/* Fade edges — desktop only */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-linear-to-r from-background to-transparent lg:block" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-linear-to-l from-background to-transparent lg:block" />
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex touch-pan-y">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 first:pl-0 sm:basis-[48%] md:pl-5 lg:basis-[33.333%] xl:basis-[23.333%] lg:pl-6"
                            >
                                <TestimonialCard
                                    testimonial={testimonial}
                                    isActive={selectedIndex === index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* MOBILE NAV */}
            <div className="mt-8 flex items-center justify-center gap-4 md:mt-10">
                {/* Mobile arrows */}
                <button
                    onClick={scrollPrev}
                    aria-label="Previous"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-text-secondary sm:hidden transition-all duration-300 hover:border-border-strong hover:bg-card-hover hover:text-text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                {/* Mobile arrows */}
                <button
                    onClick={scrollNext}
                    aria-label="Next"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-text-secondary sm:hidden transition-all duration-300 hover:border-border-strong hover:bg-card-hover hover:text-text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                >
                    <ChevronRight size={16} strokeWidth={1.5} />
                </button>
            </div>
        </SectionHeader>
    )
}