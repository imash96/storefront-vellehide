import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"

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
        autoplay ? [autoplayRef.current!] : []
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
        const onSelect = (api: EmblaCarouselType) => setSelectedIndex(api.selectedSnap())
        emblaApi.on("select", onSelect)
        onSelect(emblaApi)
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