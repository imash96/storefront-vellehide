import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "../components/section-header"
import { product_categories } from "@/lib/constant/category"
import "@/css/category.css"

/**
 * Category Section
 * ─────────────────
 * High-conversion category grid with:
 * - Asymmetric magazine layout on desktop (2 hero cards + 2×2 cluster)
 * - Responsive 2/3-column grid on tablet/mobile
 * - Sophisticated overlays with smooth interactions
 * - Prominent CTA buttons for maximum engagement
 */
export default async function Category() {
    const cats = product_categories.slice(0, 6)

    return (
        <SectionHeader
            title="Shop by Category"
            desc="Discover curated collections of premium leather goods tailored to your lifestyle."
            sectionName="category"
            eyebrow="Collections"
        >
            {/* ── Desktop: Asymmetric Magazine Grid ── */}
            <div className="hidden lg:grid grid-cols-3 gap-4 h-[600px]">
                {/* Two tall hero cards on the left */}
                <div className="col-span-1 space-y-4">
                    {cats.slice(0, 2).map((cat, idx) => (
                        <CategoryCard key={cat.id} category={cat} variant="tall" priority={idx === 0} />
                    ))}
                </div>

                {/* 2×2 cluster on the right */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                    {cats.slice(2, 6).map((cat) => (
                        <CategoryCard key={cat.id} category={cat} variant="compact" />
                    ))}
                </div>
            </div>

            {/* ── Tablet: 3-Column Grid ── */}
            <div className="hidden md:grid lg:hidden grid-cols-3 gap-4">
                {cats.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} variant="tablet" />
                ))}
            </div>

            {/* ── Mobile: 2-Column Grid ── */}
            <div className="md:hidden grid grid-cols-2 gap-3">
                {cats.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} variant="mobile" />
                ))}
            </div>
        </SectionHeader>
    )
}

// ─── Category Card Component ────────────────────────────────────────────────

interface CategoryCardProps {
    category: (typeof import("@/lib/constant/category").product_categories)[number]
    variant: "tall" | "compact" | "tablet" | "mobile"
    priority?: boolean
}

function CategoryCard({ category, variant, priority = false }: CategoryCardProps) {
    const heightMap = {
        tall: "h-full",
        compact: "aspect-[3/4]",
        tablet: "aspect-[3/4]",
        mobile: "aspect-square",
    }

    return (
        <Link
            href={`/category/${category.handle}`}
            className={`group relative overflow-hidden rounded-xl bg-surface transition-all duration-500 hover:shadow-xl ${heightMap[variant]}`}
        >
            {/* Image Layer */}
            <Image
                src={(category.metadata?.thumbnail as string) ?? ""}
                alt={category.name}
                fill
                priority={priority}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                    variant === "tall"
                        ? "(max-width: 1024px) 50vw, 25vw"
                        : variant === "compact"
                            ? "(max-width: 1024px) 50vw, 33vw"
                            : variant === "tablet"
                                ? "33vw"
                                : "50vw"
                }
            />

            {/* Sophisticated Overlay Gradient */}
            <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-[1]">
                <div
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.75) 100%)",
                    }}
                    className="absolute inset-0 transition-all duration-500 group-hover:opacity-110"
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 lg:p-6">
                {/* Top Accent */}
                <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-md rounded-full border border-white/25 transition-all duration-300 group-hover:bg-white/25 group-hover:border-white/50">
                        Explore
                    </span>
                    {/* Corner detail on hover */}
                    <div className="size-6 border-t border-r border-white/0 transition-all duration-500 group-hover:border-white/40 group-hover:size-8" />
                </div>

                {/* Bottom Content */}
                <div className="flex flex-col gap-3">
                    {/* Category Title */}
                    <div>
                        <h3 className="font-heading font-semibold text-white text-lg md:text-xl lg:text-2xl leading-tight transition-colors duration-300 group-hover:text-white/95">
                            {category.name}
                        </h3>
                        <div className="h-0.5 w-0 bg-white/70 rounded-full transition-all duration-500 group-hover:w-12 mt-2" />
                    </div>

                    {/* CTA Button */}
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-full font-semibold text-sm transition-all duration-300 group-hover:gap-3 group-hover:pr-5 w-fit hover:bg-white/95 active:scale-95">
                        <span>Shop Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </Link>
    )
}
