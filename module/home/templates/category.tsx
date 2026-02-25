import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "../components/section-header"
import { product_categories } from "@/lib/constant/category"
import { ProductCategory } from "@/types/common"

export default async function Category() {
    const cats = product_categories.slice(0, 6)

    return (
        <SectionHeader
            title="Explore Our Collections"
            desc="Handcrafted leather essentials designed for confidence and longevity."
            eyebrow="Shop by Category"
            sectionName="Category"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]">
                {cats.map((cat, index) => {
                    const isHero = index === 0
                    const isPromo = index === 5

                    return (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            isHero
                            priority={index < 2}
                            className={`${isHero ? "col-span-2 lg:row-span-2" : isPromo ? "col-span-2 md:col-span-3 lg:col-span-1" : ""}`}
                        />
                    )
                })}
            </div>
        </SectionHeader>
    )
}


function CategoryCard({ category, isHero, className = "", priority = false, }: { category: ProductCategory, isHero?: boolean, className?: string, priority?: boolean }) {

    return (
        <Link
            href={`/category/${category.handle}`}
            className={`group relative overflow-hidden rounded-md border border-border-subtle bg-muted transition-all duration-300 ease-(--ease-spring) hover:shadow-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
        >
            {/* Image */}
            <Image
                src={(category.metadata?.thumbnail as string) ?? ""}
                alt={category.name}
                fill
                priority={priority}
                className="object-cover object-center transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-[1.06]"
                sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
            />

            {/* Premium Scrim */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, var(--scrim) 0%, transparent 65%)",
                }}
            />

            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 z-10 p-4 md:p-5 lg:p-6 flex items-end justify-between">
                <div className="space-y-1 min-w-0">
                    <h3
                        className={` font-heading text-white truncate ${isHero ? "text-xl md:text-2xl lg:text-3xl" : ""} ${!isHero ? "text-base md:text-lg" : ""}`}
                    >
                        {category.name}
                    </h3>

                    <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/75 group-hover:text-white transition-all duration-200">
                        Discover Collection
                        <ArrowRight className="size-3 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                </div>

                {(category as any).products_count != null && (
                    <span className="text-xs text-white/60 tabular-nums shrink-0">
                        {(category as any).products_count} pcs
                    </span>
                )}
            </div>
        </Link>
    )
}