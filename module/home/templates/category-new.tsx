import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "../components/section-header"
import { product_categories } from "@/lib/constant/category"

/**
 * Category
 * ─────────
 * Asymmetric magazine grid: 2 tall hero cards on the left, 4 smaller
 * cards stacked in 2×2 on the right — creating a distinctive editorial layout.
 * 
 * On mobile: simple 2-column grid.
 */
export default async function Category() {
    const cats = product_categories.slice(0, 6)

    return (
        <SectionHeader
            title="Shop by Category"
            desc="Discover your style — navigate by category for effortless shopping."
            sectionName="category"
            eyebrow="Collections"
        >
            {/* ── Desktop: asymmetric grid ── */}
            <div className="hidden lg:grid grid-cols-3 gap-3 h-[580px]">
                {/* Two tall hero cards */}
                {cats.slice(0, 2).map((cat) => (
                    <CategoryCard key={cat.id} category={cat} tall />
                ))}
                {/* 2×2 cluster */}
                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                    {cats.slice(2, 6).map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>
            </div>

            {/* ── Mobile / tablet: uniform 2-col grid ── */}
            <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-3">
                {cats.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} />
                ))}
            </div>
        </SectionHeader>
    )
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function CategoryCard({
    category,
    tall = false,
}: {
    category: (typeof import("@/lib/constant/category").product_categories)[number]
    tall?: boolean
}) {
    return (
        <Link
            href={`/category/${category.handle}`}
            className={`group relative overflow-hidden block ${tall ? "h-full" : "aspect-[4/4.5]"} bg-muted`}
        >
            {/* Image */}
            <Image
                src={(category.metadata?.thumbnail as string) ?? ""}
                alt={category.name}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Gradient scrim */}
            <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.10) 50%, transparent 100%)",
                }}
            />

            {/* Text content */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between">
                <div>
                    <h3 className="font-heading font-medium text-white text-base md:text-lg leading-tight">
                        {category.name}
                    </h3>
                    <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1 transition-all duration-300 group-hover:text-white/90">
                        Shop now
                        <ArrowRight
                            className="size-3 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </p>
                </div>
            </div>

            {/* Corner accent — appears on hover */}
            <div className="absolute top-3 right-3 size-5 border-t border-r border-white/0 transition-all duration-300 group-hover:border-white/50 group-hover:size-6" />
        </Link>
    )
}