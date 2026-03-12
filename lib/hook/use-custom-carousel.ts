"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseCarouselReturn {
    currentIndex: number
    slidesPerView: number
    isCarouselActive: boolean
    maxIndex: number
    goToSlide: (index: number) => void
    goNext: () => void
    goPrev: () => void
    dragOffset: number
    isDragging: boolean
    onPointerDown: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerUp: () => void
    onPointerCancel: () => void
    onMouseEnter: () => void
    onMouseLeave: () => void
}

export function useCarousel(
    totalSlides: number,
    autoPlayInterval = 5000
): UseCarouselReturn {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(3)
    const [isPaused, setIsPaused] = useState(false)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const startX = useRef(0)
    const startTime = useRef(0)
    const containerWidth = useRef(0)
    const dragging = useRef(false)
    const autoplayRef = useRef<NodeJS.Timeout | null>(null)

    /* -------------------------------------------------------
       Responsive slidesPerView
    ------------------------------------------------------- */

    useEffect(() => {
        const updateSlides = () => {
            const width = window.innerWidth
            containerWidth.current = width

            let newSlides = 3

            if (width < 768) newSlides = 1
            else if (width < 1024) newSlides = 2

            setSlidesPerView(newSlides)

            const newMaxIndex = Math.max(0, totalSlides - newSlides)

            setCurrentIndex(prev => Math.min(prev, newMaxIndex))
        }

        updateSlides()

        let resizeTimer: NodeJS.Timeout

        const onResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(updateSlides, 120)
        }

        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [totalSlides])

    /* -------------------------------------------------------
       Computed values
    ------------------------------------------------------- */

    const maxIndex = Math.max(0, totalSlides - slidesPerView)
    const isCarouselActive = slidesPerView < totalSlides

    /* -------------------------------------------------------
       Navigation
    ------------------------------------------------------- */

    const clamp = useCallback(
        (value: number) => Math.min(Math.max(value, 0), maxIndex),
        [maxIndex]
    )

    const goToSlide = useCallback(
        (index: number) => {
            setCurrentIndex(clamp(index))
        },
        [clamp]
    )

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
    }, [maxIndex])

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
    }, [maxIndex])

    /* -------------------------------------------------------
       Autoplay
    ------------------------------------------------------- */

    useEffect(() => {
        if (!isCarouselActive || isPaused || isDragging) return

        autoplayRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
        }, autoPlayInterval)

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current)
        }
    }, [isCarouselActive, isPaused, isDragging, maxIndex, autoPlayInterval])

    /* -------------------------------------------------------
       Drag handling
    ------------------------------------------------------- */

    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (!isCarouselActive) return

            dragging.current = true
            setIsDragging(true)

            startX.current = e.clientX
            startTime.current = Date.now()

            setDragOffset(0)

            e.currentTarget.setPointerCapture(e.pointerId)
        },
        [isCarouselActive]
    )

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return

        const diff = e.clientX - startX.current
        setDragOffset(diff)
    }, [])

    const finishDrag = useCallback(() => {
        if (!dragging.current) return

        dragging.current = false

        const timeDiff = Math.max(Date.now() - startTime.current, 1)
        const velocity = Math.abs(dragOffset) / timeDiff

        const slideWidth = containerWidth.current / slidesPerView

        const threshold =
            velocity > 0.4
                ? slideWidth * 0.1
                : slideWidth * 0.25

        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset < 0) goNext()
            else goPrev()
        }

        setDragOffset(0)
        setIsDragging(false)
    }, [dragOffset, slidesPerView, goNext, goPrev])

    const onPointerUp = finishDrag
    const onPointerCancel = finishDrag

    /* -------------------------------------------------------
       Hover pause
    ------------------------------------------------------- */

    const onMouseEnter = useCallback(() => {
        setIsPaused(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        setIsPaused(false)
    }, [])

    /* -------------------------------------------------------
       Return API
    ------------------------------------------------------- */

    return {
        currentIndex,
        slidesPerView,
        isCarouselActive,
        maxIndex,
        goToSlide,
        goNext,
        goPrev,
        dragOffset,
        isDragging,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onMouseEnter,
        onMouseLeave
    }
}