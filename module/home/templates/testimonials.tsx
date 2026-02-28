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
            loop: true,
            align: "center",
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
        <SectionHeader title="What Our Customers Say" desc="Hear from our community about the craftsmanship, comfort, and customer service that define the Velle Hide experience." sectionName="Customer testimonials" eyebrow="Customer Stories" action={<div className="hidden sm:flex items-center gap-6 shrink-0">
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
                                className="min-w-0 pl-4 md:pl-5 lg:pl-6 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_40%] lg:flex-[0_0_33%] xl:flex-[0_0_23%]"
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