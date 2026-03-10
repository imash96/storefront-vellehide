"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { BannerSlide } from "@/types/homepage"

const ALIGN: Record<BannerSlide["align"], string> = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
}

const CTA_SELF: Record<BannerSlide["align"], string> = {
    left: "self-start",
    center: "self-center",
    right: "self-end",
}

const RULE_ORIGIN: Record<BannerSlide["align"], string> = {
    left: "[transform-origin:left]",
    center: "[transform-origin:center]",
    right: "[transform-origin:right]",
}

export default function BannerCarousel() {

    const [selectedIndex, setSelectedIndex] = useState(0)

    const autoplayRef = useRef(
        Autoplay({
            delay: 4500,
            instant: false,
            defaultInteraction: false,
            stopOnLastSnap: false
        })
    )

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        breakpoints: { "(min-width: 1024px)": { active: false } },
    }, [autoplayRef.current])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedSnap())
        emblaApi.on("select", onSelect)
        return () => { emblaApi.off("select", onSelect) }
    }, [emblaApi])

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <section
            aria-label="Hero Banners"
            aria-roledescription="carousel"
            className="relative w-full"
        >
            {/* Embla viewport */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex touch-pan-y will-change-transform">
                    {Slides.map((slide, i) => {
                        const isActive = selectedIndex === i;
                        return (
                            <div
                                key={slide.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${i + 1} of ${Slides.length}: ${slide.heading}`}
                                className={`relative flex-[0_0_90%] md:flex-[0_0_48%] lg:flex-[0_0_33.333%] aspect-3/4 sm:aspect-4/5 md:aspect-3/4 xl:aspect-9/11`}
                            >
                                <Image
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    fill
                                    draggable={false}
                                    className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 48vw, 33vw"
                                    priority={i === 0}
                                />

                                {/* Premium Gradient Overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    aria-hidden="true"
                                    style={{
                                        background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.26) 46%, transparent 68%)",
                                    }}
                                />
                                {/* Content */}
                                <div className={`absolute inset-0 z-10 flex flex-col justify-end gap-3 p-5 md:p-7 lg:p-8 ${ALIGN[slide.align]}`}>
                                    {/* Eyebrow / subheading */}
                                    {slide.subheading && (
                                        <p className={`text-white/65 text-[10px] md:text-xs tracking-[0.32em] uppercase transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-3"}`}
                                            style={{ transitionDelay: isActive ? "80ms" : "0ms" }}>
                                            {slide.subheading}
                                        </p>
                                    )}

                                    {/* Heading */}
                                    <h2 className={`font-heading font-light text-white text-[1.4rem] sm:text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-4"}`}>
                                        {slide.heading}
                                    </h2>

                                    {/* Divider accent */}
                                    <div
                                        className={`h-px w-10 bg-accent transition-all duration-500 ${RULE_ORIGIN[slide.align]} ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"} ${CTA_SELF[slide.align]}`}
                                        style={{
                                            transitionDelay: isActive ? "260ms" : "0ms",
                                        }}
                                        aria-hidden
                                    />

                                    {/* CTA Button */}
                                    <Link
                                        href={slide.cta.href}
                                        className={`inline-flex items-center gap-2 border border-white/30 hover:border-white/65 bg-white/10 hover:bg-white/20 backdrop-blur-[2px] text-white px-6 py-3 text-sm font-medium tracking-[0.14em] uppercase rounded-none transition-all duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white/60 ${CTA_SELF[slide.align]} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-3"}`}
                                        style={{ transitionDelay: isActive ? "320ms" : "0ms" }}>
                                        {slide.cta.label}
                                        <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                                    </Link>
                                    {/* <div className="flex items-center gap-3 flex-wrap">
                                        <button
                                            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
                                            Shop All Categories
                                            <ChevronRight className="size-4" />
                                        </button>
                                        <button
                                            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                                            Men’s Collection
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

// ─── Demo Data ────────────────────────────────────────────────────────────────
const Slides: BannerSlide[] = [
    {
        id: "slide-1",
        image: {
            src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=90",
            alt: "Leather jacket lifestyle",
        },
        heading: "Premium Leather Goods",
        subheading: "Crafted for a Lifetime",
        desc: "Discover our curated collection of premium leather apparel and accessories, handcrafted by artisans using centuries-old techniques. Shop All Categories Men's Collection",
        cta: { label: "Shop the Edit", href: "/collections/new-arrivals" },
        align: "left",
    },
    {
        id: "slide-2",
        image: {
            src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=90",
            alt: "Premium leather coat",
        },
        heading: "Craft in Every Detail",
        subheading: "Full-grain leather. Zero compromise.",
        cta: { label: "Shop Coats", href: "/collections/coats" },
        align: "center",
    },
    {
        id: "slide-3",
        image: {
            src: "https://images.unsplash.com/photo-1711560955660-6a91f7f2f194?w=1600&q=90",
            alt: "Leather blazer editorial",
        },
        heading: "Power, Refined",
        subheading: "Tailored for those who lead.",
        cta: { label: "Shop Blazers", href: "/collections/blazers" },
        align: "right",
    },
]