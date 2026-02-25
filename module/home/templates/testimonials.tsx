"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Minus, MoveLeft, MoveRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { div as Div } from "motion/react-client";
import RatingSystem from "@/ui/rating-system";
import { testimonials } from "@/lib/constant/testimonials";
import Autoplay from "embla-carousel-autoplay";
import SectionHeader from "../components/section-header";

export default function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

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
        return () => emblaApi?.destroy();
    }, [emblaApi, onSelect]);

    return (
        <SectionHeader title="Worn &amp; Loved" desc="Real reviews from real leather enthusiasts." sectionName="Customer testimonials" eyebrow="Reviews" align="center">


            <div className="relative">
                <div className="overflow-hidden no-scrollbar" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-12 sm:-ml-6">
                        {testimonials.map((item, index) => {
                            const isActive = selectedIndex === index;
                            const distance = Math.abs(selectedIndex - index);
                            const scale = [1, 0.6, 0.3][distance] || 0.3;
                            return (
                                <div key={item.id} className="flex-[0_0_30%] md:flex-[0_0_20%] min-w-0 pl-12 md:pl-6">
                                    <div className="rounded-xl overflow-hidden no-scrollbar shadow-md aspect-square transition-transform duration-500 ease-out" style={{ transform: `scale(${scale})`, opacity: isActive ? 1 : 0.5, }}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            height={200}
                                            width={200}
                                            className="h-full w-full object-cover transition-opacity duration-300"
                                            style={{ opacity: selectedIndex === index ? 1 : 0.5 }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button onClick={scrollPrev} aria-label="Previous testimonial" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 shadow hover:bg-background transition">
                    <MoveLeft size={18} strokeWidth={1.5} />
                </button>

                <button onClick={scrollNext} aria-label="Next testimonial" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 shadow hover:bg-background transition">
                    <MoveRight size={18} strokeWidth={1.5} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <Div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-lg mx-auto mt-8 text-center min-h-44">
                    <div className="animate-fade-in-up">
                        <RatingSystem size="lg" averageRating={testimonials[selectedIndex].star} type="test" className="justify-center mb-4" />

                        <p className="text-foreground text-base font-light leading-relaxed">
                            {testimonials[selectedIndex].review}
                        </p>

                        <div className="flex items-center justify-center gap-1 text-lg text-foreground-muted mt-1">
                            <Minus strokeWidth={1} size={18} />
                            {testimonials[selectedIndex].name}
                        </div>
                    </div>
                </Div>
            </AnimatePresence>
        </SectionHeader>
    );
}