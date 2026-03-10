import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionHeader from "../components/section-header"
import { product_categories } from "@/data/category"
import { ProductCategory } from "@/types/common"

export default async function Category() {
    const cats = product_categories.slice(0, 6)

    return (
        <SectionHeader
            title="Explore Our Collections"
            desc="Explore our complete range of handcrafted genuine leather goods."
            eyebrow="Shop by Category"
            sectionName="Category"
            action={<CategoryAction />}
        >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[230px] lg:auto-rows-[270px]">
                {cats.map((cat, index) => {
                    const isHero = index === 0
                    const isWide = index === 5

                    return (
                        <CategoryCard
                            key={cat.id}
                            category={cat}
                            isHero={isHero}
                            priority={index < 2}
                            className={isHero ? "col-span-2 lg:row-span-2" : isWide ? "col-span-2 md:col-span-3 lg:col-span-1" : ""}
                        />
                    )
                })}
            </div>
        </SectionHeader>
    )
}

// ─── CategoryCard ─────────────────────────────────────────────────────────────

function CategoryCard({ category, isHero, className = "", priority = false, }: CategoryCardProps) {
    const thumb = getThumb(category)

    return (
        <Link
            href={`/category/${category.handle}`}
            className={`group relative overflow-hidden border border-border-subtle bg-muted ring-1 ring-border/0 hover:ring-border/60 transition-all duration-300 ease-(--ease-spring) hover:shadow-primary active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
        >
            <Image
                src={thumb}
                alt={category.name}
                fill
                priority={priority}
                className="object-cover object-top transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-[1.06] will-change-transform"
                sizes={isHero ? "(max-width:768px) 100vw, (max-width:1024px) 66vw, 50vw" : "(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"}
            />

            {/* Scrim */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background: "linear-gradient(to top, var(--scrim) 0%, transparent 70%)",
                }}
            />

            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 z-10 p-4 md:p-5 lg:p-6 flex items-end justify-between">
                <div className="space-y-1 min-w-0">
                    <h3
                        className={`font-heading text-white truncate transition-transform duration-300 group-hover:translate-x-0.5 ${isHero ? "text-xl md:text-2xl lg:text-3xl font-semibold" : "text-base md:text-lg font-medium"}`}
                    >
                        {category.name}
                    </h3>

                    {isHero && category.description && (
                        <p className="hidden md:block text-xs text-white/60 line-clamp-2 max-w-md leading-relaxed">
                            {category.description}
                        </p>
                    )}

                    <span className="flex items-center gap-1.5 text-xs font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                        Discover Collection
                        <ArrowRight className="size-3 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    )
}

const CategoryAction = () => (
    <Link
        href="/category"
        className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-hover transition-colors group"
    >
        View All
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
)

// ─── Helpers (module scope — not recreated per render) ────────────────────────

function getThumb(cat: ProductCategory): string {
    return (cat.metadata?.thumbnail as string) ?? "/images/placeholder-category.webp"
}

type CategoryCardProps = {
    category: ProductCategory
    isHero?: boolean
    className?: string
    priority?: boolean
}