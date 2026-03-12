import { useEffect, useRef, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"

type UseCarouselOptions = {
    autoplay?: boolean
    autoplayDelay?: number
    options?: EmblaOptionsType
}

export function useCarousel({ autoplay = false, autoplayDelay = 4500, options }: UseCarouselOptions = {}) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const autoplayRef = useRef(autoplay ?
        Autoplay({
            delay: autoplayDelay,
            instant: false,
            defaultInteraction: false,
            stopOnLastSnap: false
        }) : undefined
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        options,
        autoplay ? [autoplayRef.current!] : undefined
    )

    const scrollTo = useCallback((index: number) => {
        emblaApi?.goTo(index);
        autoplayRef.current?.reset();
    }, [emblaApi])


    const scrollPrev = useCallback(() => {
        emblaApi?.goToPrev();
        autoplayRef.current?.reset();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.goToNext();
        autoplayRef.current?.reset();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedSnap())
        emblaApi.on("select", onSelect)
        onSelect()
        return () => { emblaApi.off("select", onSelect) }
    }, [emblaApi])

    return {
        emblaRef,
        emblaApi,
        selectedIndex,
        scrollTo,
        scrollPrev,
        scrollNext,
    }
}