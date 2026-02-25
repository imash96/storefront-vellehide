import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "../components/section-header"
import { product_categories } from "@/lib/constant/category"
import "@/css/category.css"

/**
 * Category Section - Premium Responsive Design
 * ─────────────────────────────────────────────
 * Unified single-component responsive category grid:
 * - Mobile: 2-column grid with square aspect ratio
 * - Tablet: 3-column grid with 3:4 aspect ratio
 * - Desktop: Asymmetric magazine layout (2 hero + 2×2 cluster)
 * - Premium overlays, smooth animations, optimized for conversion
 * - Zero separate component variants - responsive via Tailwind modifiers
 */
export default async function Category() {
    const cats = product_categories.slice(0, 6)

    return (
        <SectionHeader
            title="Shop by Category"
            desc="Discover our exclusive collections of premium leather goods carefully curated for discerning customers."
            sectionName="category"
            eyebrow="Collections"
        >
            {/* Unified Responsive Grid Container */}
            <div className="grid gap-3 md:gap-4 lg:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-none h-auto lg:h-[600px]">
                {/* Desktop: Two hero cards on the left */}
                <div className="hidden lg:flex flex-col gap-4 col-span-1">
                    {cats.slice(0, 2).map((cat, idx) => (
                        <CategoryCard key={cat.id} category={cat} priority={idx === 0} isHero />
                    ))}
                </div>

                {/* Unified responsive grid - handles mobile, tablet, and desktop compact cards */}
                <div className="col-span-2 md:col-span-3 lg:col-span-2 grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-2 h-auto lg:h-full">
                    {cats.map((cat, idx) => (
                        <CategoryCard 
                            key={cat.id} 
                            category={cat} 
                            priority={idx === 0}
                            isHero={false}
                        />
                    ))}
                </div>
            </div>
        </SectionHeader>
    )
}

// ─── Premium Category Card Component ────────────────────────────────────────

interface CategoryCardProps {
    category: (typeof import("@/lib/constant/category").product_categories)[number]
    priority?: boolean
    isHero?: boolean
}

function CategoryCard({ category, priority = false, isHero = false }: CategoryCardProps) {
    return (
        <Link
            href={`/category/${category.handle}`}
            className={`
                group relative overflow-hidden rounded-xl bg-surface transition-all duration-500 
                hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                ${isHero ? 'aspect-auto h-full' : 'aspect-square md:aspect-[3/4]'}
            `}
        >
            {/* Premium Image Layer with parallax effect */}
            <Image
                src={(category.metadata?.thumbnail as string) ?? ""}
                alt={category.name}
                fill
                priority={priority}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Multi-layer Sophisticated Overlay */}
            <div className="absolute inset-0 transition-all duration-500">
                {/* Base overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-[1.15]"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.8) 100%)",
                    }}
                />
                {/* Accent overlay on hover */}
                <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 60%)",
                    }}
                />
            </div>

            {/* Content Container - Premium Positioning */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-500">
                {/* Top Section - Badge & Corner Accent */}
                <div className="flex justify-between items-start">
                    <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/95 bg-white/12 backdrop-blur-md rounded-full border border-white/25 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/50 group-hover:shadow-lg">
                        Explore
                    </span>
                    {/* Corner accent - reveals on hover */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-t border-r border-white/20 transition-all duration-500 group-hover:w-7 group-hover:h-7 group-hover:border-white/60" />
                </div>

                {/* Bottom Section - Title & CTA */}
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    {/* Category Title with animated underline */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <h3 className="font-heading font-bold text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-tight transition-colors duration-300 group-hover:text-white/98 drop-shadow-md">
                            {category.name}
                        </h3>
                        {/* Animated underline - premium detail */}
                        <div className="h-0.5 w-0 bg-gradient-to-r from-white/70 to-white/40 rounded-full transition-all duration-500 group-hover:w-10 sm:group-hover:w-12" />
                    </div>

                    {/* Premium CTA Button */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-black/90 hover:text-black rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 group-hover:gap-3 group-hover:pr-5 w-fit hover:bg-white/95 active:scale-95 shadow-lg group-hover:shadow-xl">
                        <span>Shop Now</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
