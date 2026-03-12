"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BannerSlide } from "@/types/homepage"
import { useCarousel } from "@/lib/hook/use-carousel"

const ALIGN_MAP = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
} as const

const SELF_MAP = {
    left: "self-start",
    center: "self-center",
    right: "self-end",
} as const

const ORIGIN_MAP = {
    left: "origin-left",
    center: "origin-center",
    right: "origin-right",
} as const

export default function BannerCarousel() {

    const { emblaRef, selectedIndex } = useCarousel({
        autoplay: true,
        autoplayDelay: 4500,
        options: {
            align: "start",
            slidesToScroll: 1,
            breakpoints: { "(min-width: 1024px)": { active: false } },
        },
    })

    return (
        <section
            aria-label="Hero Banners"
            aria-roledescription="carousel"
            className="relative w-full"
        >
            {/* Embla viewport */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex touch-pan-y will-change-transform">
                    {slides.map((slide, i) => {
                        const isActive = selectedIndex === i;
                        return (
                            <div
                                key={slide.id}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.heading}`}
                                className={`relative flex-[0_0_92%] md:flex-[0_0_49%] lg:flex-[0_0_33.333%] aspect-3/4 sm:aspect-4/5 md:aspect-3/4 xl:aspect-9/11`}
                            >
                                <Image
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    fill
                                    draggable={false}
                                    className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 48vw, 33vw"
                                    priority={i === 0}
                                    loading={i === 0 ? "eager" : "lazy"}
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
                                <div className={`absolute inset-0 z-10 flex flex-col justify-end gap-3 p-5 md:p-7 lg:p-8 ${ALIGN_MAP[slide.align]}`}>
                                    {/* Eyebrow / subheading */}
                                    {slide.subheading && (
                                        <p className={`text-white/65 text-[10px] md:text-xs tracking-[0.32em] uppercase transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 md:translate-y-0 translate-y-3"}`}
                                            style={{ transitionDelay: isActive ? "80ms" : "0ms" }}
                                        >
                                            {slide.subheading}
                                        </p>
                                    )}

                                    {/* Heading */}
                                    <h2 className={`font-heading font-light text-white text-[1.4rem] sm:text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 md:translate-y-0 translate-y-4"}`}
                                    >
                                        {slide.heading}
                                    </h2>

                                    {/* Divider accent */}
                                    <div
                                        className={`h-px w-10 bg-accent transition-all duration-500 ${ORIGIN_MAP[slide.align]} ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 md:scale-x-100 md:opacity-100"} ${SELF_MAP[slide.align]}`}
                                        style={{ transitionDelay: isActive ? "260ms" : "0ms" }}
                                        aria-hidden
                                    />

                                    {/* CTA Button */}
                                    <Link
                                        href={slide.cta.href}
                                        className={`inline-flex items-center gap-2 border border-white/30 hover:border-white/65 bg-white/10 hover:bg-white/20 backdrop-blur-[2px] text-white px-6 py-3 text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 active:scale-[0.97] ${SELF_MAP[slide.align]} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 md:translate-y-0 translate-y-3"}`}
                                        style={{ transitionDelay: isActive ? "320ms" : "0ms" }}>
                                        {slide.cta.label}
                                        <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                                    </Link>
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
const slides: BannerSlide[] = [
    {
        id: "slide-1",
        image: {
            src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=90",
            alt: "Leather jacket lifestyle",
        },
        heading: "Premium Leather Goods",
        subheading: "Crafted for a Lifetime",
        desc: "Discover our curated collection of premium leather apparel and accessories, handcrafted by artisans.",
        cta: { label: "Shop the Edit", href: "#" },
        ctaSecondary: { label: "Men's Collection", href: "#" },
        align: "left",
        badge: "New Season",
    },
    {
        id: "slide-2",
        image: {
            src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=90",
            alt: "Premium leather coat",
        },
        heading: "Craft in Every Detail",
        subheading: "Full-grain leather. Zero compromise.",
        desc: "Each piece is hand-selected and crafted using centuries-old techniques for unmatched quality.",
        cta: { label: "Shop Coats", href: "#" },
        align: "center",
        badge: "Bestseller",
        price: { current: "$899", original: "$1,299" },
    },
    {
        id: "slide-3",
        image: {
            src: "https://images.unsplash.com/photo-1711560955660-6a91f7f2f194?w=1600&q=90",
            alt: "Leather blazer editorial",
        },
        heading: "Power, Refined",
        subheading: "Tailored for those who lead.",
        desc: "Sharp silhouettes and impeccable tailoring define our latest blazer collection.",
        cta: { label: "Shop Blazers", href: "#" },
        ctaSecondary: { label: "View Lookbook", href: "#" },
        align: "right",
        badge: "Limited Edition",
    },
]