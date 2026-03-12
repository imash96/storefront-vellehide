"use client"

import Image from "next/image"
import { DollarSign, Scissors, Shield, ShoppingBag, Sparkles } from "lucide-react"
import { useCarousel } from "@/lib/hook/use-carousel"

export default function HeroBanner() {
    const { emblaRef, selectedIndex } = useCarousel({
        autoplay: true,
        autoplayDelay: 4500,
        options: {
            align: "start",
            loop: true,
            slidesToScroll: 1,
            breakpoints: {
                "(min-width:1024px)": { active: false }
            }
        }
    })

    return (
        <section
            className="relative w-full bg-neutral-950"
            aria-roledescription="carousel"
            aria-label="Hero Banner"
        >
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex touch-pan-y will-change-transform">

                    {heroSlides.map((slide, index) => (
                        <HeroSlideCard
                            key={slide.id}
                            slide={slide}
                            isActive={selectedIndex === index}
                            index={index}
                        />
                    ))}

                </div>
            </div>

            <div className="absolute bottom-6 right-6 lg:hidden z-20">
                <span className="rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-xs font-mono tracking-wider text-white/70">
                    {String(selectedIndex + 1).padStart(2, "0")} /
                    {String(heroSlides.length).padStart(2, "0")}
                </span>
            </div>
        </section>
    )
}

function HeroSlideCard({ slide, isActive, index }: HeroSlideCardProps) {

    return (
        <div
            className="relative flex-[0_0_92%] md:flex-[0_0_49%] lg:flex-[0_0_33.333%] aspect-3/4 sm:aspect-4/5 md:aspect-4/6 xl:aspect-9/11"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${heroSlides.length}`}
        >

            <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-1600 ease-out group-hover:scale-105"
            />

            <div
                className="absolute inset-0"
                style={{ background: slide.overlayGradient }}
            />

            <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-6 md:px-10 md:pb-8 lg:px-14 lg:pb-10">
                {/* Badge */}
                {slide.badge && (
                    <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md mb-5 w-fit transition-all duration-700 ${isActive ? 'animate-fade-in' : 'opacity-0  md:animate-fade-in'}`}
                        style={{
                            background: `${slide.accentColor}18`,
                            border: `1px solid ${slide.accentColor}30`,
                            animationDelay: '0.2s',
                            animationFillMode: 'both',
                        }}
                    >
                        <span style={{ color: slide.accentColor }}>{variantIcons[slide.variant]}</span>
                        <span
                            className="text-[10px] md:text-xs font-medium tracking-[0.14em] uppercase"
                            style={{ color: slide.accentColor }}
                        >
                            {slide.badge}
                        </span>
                    </div>
                )}
                {/* Tagline */}
                <p
                    className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-3 transition-all duration-700 ${isActive ? 'animate-slide-up' : 'opacity-0 md:animate-slide-up'}`}
                    style={{
                        color: `${slide.accentColor}CC`,
                        animationDelay: '0.3s',
                        animationFillMode: 'both',
                    }}
                >
                    {slide.tagline}
                </p>
                {/* Title */}
                <h2
                    className={`font-heading text-[clamp(1.75rem,5vw,3.25rem)] lg:text-[clamp(2.25rem,3.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight mb-4 max-w-130 transition-all duration-700 ${isActive ? 'animate-slide-up' : 'opacity-0 md:animate-slide-up'}`}
                    style={{
                        color: '#FAFAF5',
                        animationDelay: '0.4s',
                        animationFillMode: 'both',
                    }}
                >
                    {slide.title}
                    {slide.titleAccent && (
                        <>
                            <br />
                            <span
                                className="italic font-semibold"
                                style={{ color: slide.accentColor }}
                            >
                                {slide.titleAccent}
                            </span>
                        </>
                    )}
                </h2>
                {/* Description */}
                <p
                    className={`text-sm md:text-[15px] leading-relaxed max-w-110 mb-6 transition-all duration-700 ${isActive ? 'animate-slide-up' : 'opacity-0 md:animate-slide-up'
                        }`}
                    style={{
                        color: 'rgba(250, 245, 235, 0.72)',
                        animationDelay: '0.5s',
                        animationFillMode: 'both',
                    }}
                >
                    {slide.description}
                </p>
                {/* Features Pills */}
                {slide.features && (
                    <div className={`flex flex-wrap gap-2 mb-7 transition-all duration-700 ${isActive ? 'animate-slide-up' : 'opacity-0 md:animate-slide-up'}`}
                        style={{
                            animationDelay: '0.6s',
                            animationFillMode: 'both',
                        }}
                    >
                        {slide.features.map((feature) => (
                            <span
                                key={feature}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] md:text-xs font-medium tracking-wide backdrop-blur-sm"
                                style={{
                                    background: 'rgba(250, 245, 235, 0.08)',
                                    border: '1px solid rgba(250, 245, 235, 0.12)',
                                    color: 'rgba(250, 245, 235, 0.80)',
                                }}
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {/* Decorative accent line */}
            <div
                className="absolute bottom-0 left-0 h-0.75 transition-all duration-1000"
                style={{
                    width: isActive ? '100%' : '0%',
                    background: `linear-gradient(90deg, transparent, ${slide.accentColor}, transparent)`,
                }}
            />

        </div>
    )
}

interface HeroSlideCardProps {
    slide: HeroSlide;
    isActive: boolean;
    index: number;
}

export interface HeroSlide {
    id: number;
    variant: 'brand-story' | 'craftsmanship' | 'leather-quality' | 'd2c-value' | 'collection';
    badge?: string;
    tagline: string;
    title: string;
    titleAccent?: string;
    description: string;
    features?: string[];
    cta: {
        primary: { text: string; href: string };
        secondary?: { text: string; href: string };
    };
    image: string;
    imageAlt: string;
    overlayGradient: string;
    accentColor: string;
}

const variantIcons: Record<HeroSlide['variant'], React.ReactNode> = {
    'brand-story': <Sparkles className="w-4 h-4" />,
    'craftsmanship': <Scissors className="w-4 h-4" />,
    'leather-quality': <Shield className="w-4 h-4" />,
    'd2c-value': <DollarSign className="w-4 h-4" />,
    'collection': <ShoppingBag className="w-4 h-4" />,
};

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        variant: 'brand-story',
        badge: 'EST. 2019 · NEW YORK',
        tagline: 'The Atelier',
        title: 'Where Heritage Meets',
        titleAccent: 'Modern Edge',
        description: 'Born in New York, crafted for the world. Maison Cuir bridges old-world tanneries and contemporary design — bringing you leather pieces that tell a story of passion, precision, and timeless elegance.',
        features: ['Designed in New York', 'European Tanneries', 'Direct to You'],
        cta: {
            primary: { text: 'Explore Our Story', href: '#story' },
            secondary: { text: 'Watch the Film', href: '#film' },
        },
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=1600&fit=crop&q=80',
        imageAlt: 'Artisan working on premium leather jacket in atelier workshop',
        overlayGradient: 'linear-gradient(135deg, rgba(20,15,10,0.92) 0%, rgba(45,30,18,0.78) 40%, rgba(60,40,22,0.45) 100%)',
        accentColor: '#C4956A',
    },
    {
        id: 2,
        variant: 'craftsmanship',
        badge: 'HANDCRAFTED EXCELLENCE',
        tagline: 'The Process',
        title: 'Every Stitch Tells',
        titleAccent: 'A Story',
        description: 'Over 120 hours of meticulous handwork goes into every jacket. Our master artisans — trained in Florence and Milan — hand-cut, hand-stitch, and hand-finish each piece to perfection.',
        features: ['120+ Hours Per Piece', 'Hand-Cut Patterns', 'Italian Finishing'],
        cta: {
            primary: { text: 'See the Craft', href: '#craftsmanship' },
            secondary: { text: 'Meet Our Artisans', href: '#artisans' },
        },
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=1600&fit=crop&q=80',
        imageAlt: 'Close-up of hand stitching premium leather with traditional tools',
        overlayGradient: 'linear-gradient(160deg, rgba(18,12,8,0.94) 0%, rgba(40,28,16,0.80) 45%, rgba(55,38,20,0.50) 100%)',
        accentColor: '#D4A574',
    },
    {
        id: 3,
        variant: 'leather-quality',
        badge: 'FULL-GRAIN · VEGETABLE TANNED',
        tagline: 'The Material',
        title: 'Premium Leather,',
        titleAccent: 'Uncompromised',
        description: 'We source only the finest full-grain, vegetable-tanned hides from century-old tanneries across Tuscany and Andalusia. Each hide is selected by hand — only the top 5% make the cut.',
        features: ['Top 5% Hides', 'Vegetable Tanned', 'Ages Beautifully'],
        cta: {
            primary: { text: 'Discover Materials', href: '#materials' },
            secondary: { text: 'Leather Guide', href: '#guide' },
        },
        image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1200&h=1600&fit=crop&q=80',
        imageAlt: 'Premium full-grain leather hide showing natural patina and texture',
        overlayGradient: 'linear-gradient(145deg, rgba(22,14,8,0.93) 0%, rgba(50,32,18,0.76) 42%, rgba(65,42,22,0.42) 100%)',
        accentColor: '#B8845A',
    },
    {
        id: 4,
        variant: 'd2c-value',
        badge: 'DIRECT TO YOU',
        tagline: 'The Promise',
        title: 'Luxury Without the',
        titleAccent: 'Markup',
        description: 'By cutting out middlemen and selling directly to you, we deliver the same quality as $2,000+ designer labels — at a fraction of the price. No retail markups. No compromises. Just exceptional leather.',
        features: ['60% Below Retail', 'No Middlemen', 'Same Quality'],
        cta: {
            primary: { text: 'Shop the Collection', href: '#shop' },
            secondary: { text: 'Compare Prices', href: '#compare' },
        },
        image:
            'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1200&h=1600&fit=crop&q=80',
        imageAlt: 'Stylish woman wearing premium leather jacket in urban setting',
        overlayGradient: 'linear-gradient(140deg, rgba(16,12,8,0.93) 0%, rgba(35,25,15,0.82) 40%, rgba(50,35,20,0.48) 100%)',
        accentColor: '#C9A87C',
    },
    {
        id: 5,
        variant: 'collection',
        badge: 'AUTUMN / WINTER 2025',
        tagline: 'The Collection',
        title: 'Redefining',
        titleAccent: 'Leather Luxury',
        description: 'From tailored blazers to signature biker jackets, our AW25 collection celebrates the art of leather in all its forms. Timeless silhouettes reimagined for the modern wardrobe.',
        features: ['Jackets & Coats', 'Blazers & Skirts', 'Pants & Accessories'],
        cta: {
            primary: { text: 'Shop AW25', href: '#aw25' },
            secondary: { text: 'View Lookbook', href: '#lookbook' },
        },
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=1600&fit=crop&q=80',
        imageAlt: 'Model showcasing premium leather collection pieces',
        overlayGradient: 'linear-gradient(155deg, rgba(14,10,6,0.94) 0%, rgba(38,26,14,0.80) 38%, rgba(55,38,22,0.46) 100%)',
        accentColor: '#D9B88F',
    },
];