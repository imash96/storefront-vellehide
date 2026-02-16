"use client"

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from '@/module/common/create-section';
import { announcements } from "@lib/constant/announcement";

const options: EmblaOptionsType = { loop: true }

export default function Announcement() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ stopOnInteraction: false, delay: 3000 })])
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        emblaApi.plugins().autoplay?.reset();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        emblaApi.plugins().autoplay?.reset();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);


    return (
        <div className="bg-primary text-primary-foreground select-none">
            <Container width={7}>
                <div className="flex items-center justify-between h-9 gap-2">
                    <AnnouncementButton
                        onClick={scrollPrev}
                        disabled={prevBtnDisabled}
                        direction="prev"
                        label="Previous announcement"
                    />
                    <div className="overflow-hidden flex-1 text-xs font-body" ref={emblaRef}>
                        <div className="flex">
                            {announcements.map((text, index) => (
                                <span
                                    className="flex-[0_0_100%] size-full my-auto tracking-wide text-center"
                                    key={index}
                                >
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>
                    <AnnouncementButton
                        onClick={scrollNext}
                        disabled={nextBtnDisabled}
                        direction="next"
                        label="Next announcement"
                    />
                </div>
            </Container >
        </div >
    )
}

const AnnouncementButton = ({ onClick, disabled, direction, label }: AnnouncementButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className={`
            p-1.5 rounded-sm transition-all duration-200
            ${disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100 hover:bg-primary-foreground/10'}
        `}
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
    disabled: boolean;
    direction: 'prev' | 'next';
    label: string;
}