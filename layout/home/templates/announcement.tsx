"use client"

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from '@/ui/container';
import type { AnnouncementItem } from '@/types/homepage';
import Link from "next/link";

export default function AnnouncementBar({ items }: { items: AnnouncementItem[] }) {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.goToPrev()
        emblaApi.plugins().autoplay?.reset()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.goToNext()
        emblaApi.plugins().autoplay?.reset()
    }, [emblaApi])

    if (!items?.length) return null


    return (
        <div
            className="bg-primary text-primary-foreground select-none"
            aria-label="Store announcements"
            aria-roledescription="carousel"
            aria-live="polite"
            role="region"
        >
            <Container size="2xl" className="flex items-center justify-between h-9 gap-2">
                <AnnouncementButton
                    onClick={scrollPrev}
                    direction="prev"
                    label="Previous announcement"
                />
                <div className="overflow-hidden flex-1" ref={emblaRef}>
                    <div className="flex">
                        {items.map((item, index) => {
                            const baseClass =
                                "flex-[0_0_100%] flex items-center justify-center text-center text-xs text-primary-foreground font-body tracking-wide uppercase"

                            if (item.link) {
                                return (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        className={`${baseClass} hover:opacity-90 transition-opacity`}
                                    >
                                        {item.message}
                                    </Link>
                                )
                            }

                            return (
                                <span key={index} className={baseClass}>
                                    {item.message}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <AnnouncementButton
                    onClick={scrollNext}
                    direction="next"
                    label="Next announcement"
                />
            </Container >
        </div >
    )
}

const AnnouncementButton = ({ onClick, direction, label }: AnnouncementButtonProps) => {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className="p-1.5 hidden sm:block rounded-sm opacity-70 hover:opacity-100 hover:bg-primary-foreground/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
            {direction === 'prev' ? (
                <ChevronLeft className="h-4 w-4 shrink-0" />
            ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
            )}
        </button>
    )
};

type AnnouncementButtonProps = {
    onClick: () => void;
    direction: 'prev' | 'next';
    label: string;
}