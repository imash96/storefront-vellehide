import { product_categories } from "@/data/category"
import { ProductCategory } from "@/types/common"
import Container from "@/ui/container"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"

export default function Category({
    title = "Explore Our Collections",
    eyebrow = "Shop by Category",
    className,
}: CategoryProps) {

    const cats = useMemo(() => product_categories.slice(0, 6), [])

    return (
        <section aria-label="Category collections" className={`py-12 md:py-16 lg:py-20 ${className ?? ""}`}>
            <Container size="2xl">
                {/* Header */}
                <header className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                        {eyebrow && (
                            <p className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.30em] uppercase text-accent">
                                <span className="block h-px w-7 bg-accent" />
                                {eyebrow}
                            </p>
                        )}
                        <h2 className="font-heading font-light leading-[1.08] tracking-[-0.02em] text-text-primary text-balance text-[1.85rem] md:text-[2.25rem] lg:text-[2.6rem]">
                            {title}
                        </h2>
                        <p className="text-sm leading-relaxed font-light text-text-secondary">
                            Explore our complete range of handcrafted genuine leather goods.
                        </p>
                    </div>
                    <Link
                        href="/categories"
                        className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-hover transition-colors group"
                    >
                        View All
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </header>
                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]">
                    {cats.map((cat, i) => {
                        const thumb = getThumb(cat)
                        const childCount = countChildren(cat)
                        const isHero = i === 0
                        const isWide = i === 5

                        return (
                            <Link
                                key={cat.id ?? cat.handle}
                                href={`/${cat.handle}`}
                                className={`group relative overflow-hidden rounded-md border border-border-subtle bg-muted transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isHero ? "col-span-2 lg:row-span-2" : ""} ${isWide ? "col-span-2 md:col-span-3 lg:col-span-1" : ""}`}
                            >
                                {/* Image */}
                                <Image
                                    src={thumb}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                                    priority={i < 2}
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                />
                                {/* Scrim */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                                {/* Category count */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary-foreground bg-secondary backdrop-blur-md px-2.5 py-1 rounded-full">
                                        {childCount} {childCount === 1 ? "style" : "styles"}
                                    </span>
                                </div>
                                {/* Bottom Content */}
                                <div className="absolute bottom-0 inset-x-0 z-10 p-4 md:p-5 lg:p-6 flex items-end justify-between gap-3">
                                    <div className="space-y-1 min-w-0">
                                        <h3 className={`font-heading text-white truncate transition-transform duration-300 group-hover:translate-x-0.5 ${isHero ? "text-xl md:text-2xl lg:text-3xl font-semibold" : "text-base md:text-lg font-medium"}`}>
                                            {cat.name}
                                        </h3>
                                        {isHero && cat.description && (
                                            <p className="hidden md:block text-xs text-white/60 line-clamp-2 max-w-md leading-relaxed">
                                                {cat.description}
                                            </p>
                                        )}
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                                            Discover Collection
                                            <ArrowRight className="size-3 shrink-0 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                {/* Mobile CTA */}
                <div className="mt-6 flex justify-center sm:hidden">
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
                    >
                        View All Categories
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </Container>
        </section>
    )
}


function countChildren(cat: ProductCategory): number {
    return cat.category_children?.length ?? 0
}


function getThumb(cat: ProductCategory): string {
    return (
        (cat.metadata?.thumbnail as string) ||
        "/images/placeholder-category.webp"
    )
}


export interface CategoryProps {
    title?: string
    desc?: string
    eyebrow?: string
    onNavigate?: (handle: string) => void
    className?: string
}