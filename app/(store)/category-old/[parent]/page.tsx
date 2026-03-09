/**
 * app/category/[parent]/page.tsx
 *
 * Shows the parent category hero + all first-level child categories
 * in an editorial, interactive, fully responsive layout.
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getCategoryByHandle } from "@/lib/action/category"
import { StoreProductCategory } from "@medusajs/types"

/* ─── Params ──────────────────────────────────────────────────────── */
interface PageParams {
    params: Promise<{ parent: string }>
}

/* ─── Metadata ────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { parent } = await params
    const category = await getCategoryByHandle(parent)
    if (!category) return { title: "Not Found" }

    return {
        title: `${category.name} | Nocturne Leather`,
        description:
            category.description ??
            `Explore our premium ${category.name.toLowerCase()} collection.`,
        openGraph: {
            images: category.metadata?.thumbnail ? [category.metadata?.thumbnail as string] : [],
        },
    }
}

export default async function Page({ params }: PageProps<'/category/[parent]'>) {
    const { parent } = await params
    const category = await getCategoryByHandle(parent)

    if (!category) notFound()

    const child: StoreProductCategory[] = category.category_children ?? []

    return (
        <main
            className="min-h-screen"
            style={{ background: "var(--color-brand-bg)" }}
        >
            {/* ── Breadcrumb ──────────────────────────────────────────────── */}
            <nav
                className="px-5 sm:px-10 lg:px-20 pt-6 pb-0"
                aria-label="Breadcrumb"
            >
                <ol className="flex items-center gap-2 text-xs" style={{ color: "var(--color-brand-text-faint)" }}>
                    <li>
                        <Link href="/category" className="hover:text-accent transition-colors">
                            Category
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li style={{ color: "var(--color-brand-text-soft)" }}>{category.name}</li>
                </ol>
            </nav>

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <CategoryHero category={category} childCount={child.length} />

            {/* ── Children grid ───────────────────────────────────────────── */}
            {child.length > 0 && (
                <section className="px-5 sm:px-10 lg:px-20 pb-20 sm:pb-28">
                    <div className="mb-10">
                        <p
                            className="text-[10px] font-medium tracking-[0.2em] uppercase mb-2"
                            style={{ color: "var(--color-accent)" }}
                        >
                            Browse by type
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl font-light"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-brand-text)",
                            }}
                        >
                            Shop {category.name}
                        </h2>
                    </div>

                    <ChildrenGrid parent={parent} child={child} />
                </section>
            )}

            {/* ── No children: redirect prompt ────────────────────────────── */}
            {child.length === 0 && (
                <div className="px-5 sm:px-10 lg:px-20 pb-20 text-center pt-8">
                    <Link
                        href={`/category/${parent}/${category.handle}`}
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-200 hover:opacity-90"
                        style={{ background: "var(--color-accent)", color: "#0e0c0a" }}
                    >
                        View Products
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            )}

            {/* ── Brand strip ─────────────────────────────────────────────── */}
            <BrandStrip />
        </main>
    )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function CategoryHero({
    category,
    childCount,
}: {
    category: StoreProductCategory
    childCount: number
}) {
    return (
        <section className="relative px-5 sm:px-10 lg:px-20 pt-10 pb-16 sm:pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Text */}
                <div className="order-2 lg:order-1">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[10px] font-medium tracking-widest uppercase"
                        style={{
                            background: "var(--color-accent-glow)",
                            color: "var(--color-accent)",
                            border: "1px solid var(--color-accent-dark)",
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--color-accent)" }}
                        />
                        {childCount} categories
                    </div>

                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-5"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        {category.name}
                    </h1>

                    {category.description && (
                        <p
                            className="text-base sm:text-lg leading-relaxed max-w-lg mb-8"
                            style={{ color: "var(--color-brand-text-soft)" }}
                        >
                            {category.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4">
                        <Link
                            href={`/category/${category.handle.split("/")[0]}/${category.handle}`}
                            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-200 hover:opacity-90"
                            style={{ background: "var(--color-accent)", color: "#0e0c0a" }}
                        >
                            Shop All
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link
                            href="/category"
                            className="text-sm transition-colors hover:text-accent"
                            style={{ color: "var(--color-brand-text-soft)" }}
                        >
                            ← All categories
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="order-1 lg:order-2 relative">
                    <div
                        className="relative rounded-2xl overflow-hidden aspect-4/5 sm:aspect-16/10 lg:aspect-4/5"
                        style={{ background: "var(--color-brand-elevated)" }}
                    >
                        {category.metadata?.thumbnail ? (
                            <Image
                                src={category.metadata.thumbnail as string}
                                alt={category.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <PlaceholderImage />
                        )}

                        {/* Overlay gradient */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(14,12,10,0.6) 0%, transparent 60%)",
                            }}
                            aria-hidden="true"
                        />

                        {/* Category name watermark */}
                        <div className="absolute bottom-5 left-6 right-6">
                            <p
                                className="text-2xl sm:text-3xl font-light"
                                style={{
                                    fontFamily: "var(--font-display)",
                                    color: "var(--color-brand-text)",
                                }}
                            >
                                {category.name}
                            </p>
                        </div>
                    </div>

                    {/* Decorative accent dot */}
                    <div
                        className="absolute -top-3 -right-3 w-12 h-12 rounded-full opacity-40 blur-lg"
                        style={{ background: "var(--color-accent)" }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    )
}

/* ─── Children grid ───────────────────────────────────────────────── */
function ChildrenGrid({
    parent,
    child,
}: {
    parent: string
    child: StoreProductCategory[]
}) {
    // First child gets a "featured" (wide) treatment; rest are standard cards
    const [featured, ...rest] = child

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Featured — full width on mobile, 2 cols on sm, 2 cols on lg */}
            {featured && (
                <ChildCard
                    category={featured}
                    parent={parent}
                    featured
                    className="col-span-2 sm:col-span-3 lg:col-span-2 row-span-2"
                />
            )}

            {/* Rest */}
            {rest.map((child) => (
                <ChildCard
                    key={child.id}
                    category={child}
                    parent={parent}
                    className="col-span-1"
                />
            ))}
        </div>
    )
}

/* ─── Child category card ─────────────────────────────────────────── */
function ChildCard({
    category,
    parent,
    featured = false,
    className = "",
}: {
    category: StoreProductCategory
    parent: string
    featured?: boolean
    className?: string
}) {
    const segments = category.handle.split("/")
    const rest = segments.slice(1)
    const href = rest.length === 0 ? `/category/${parent}` : `/category/${parent}/${rest.join("/")}`

    return (
        <Link
            href={href}
            className={`group relative rounded-xl overflow-hidden block ${className}`}
            style={{ background: "var(--color-brand-elevated)" }}
        >
            <div className={`relative w-full ${featured ? "aspect-4/3 sm:aspect-16/10" : "aspect-3/4"}`}>
                {category.metadata?.thumbnail ? (
                    <Image
                        src={category.metadata.thumbnail as string}
                        alt={category.name}
                        fill
                        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <PlaceholderImage />
                )}

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(14,12,10,0.85) 0%, rgba(14,12,10,0.1) 60%, transparent 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Hover accent glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, var(--color-accent-glow) 0%, transparent 60%)",
                    }}
                    aria-hidden="true"
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3
                        className={`font-light leading-tight transition-colors duration-200 group-hover:text-accent ${featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                            }`}
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        {category.name}
                    </h3>

                    {featured && category.description && (
                        <p
                            className="mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2"
                            style={{ color: "var(--color-brand-text-soft)" }}
                        >
                            {category.description}
                        </p>
                    )}

                    <div
                        className="mt-3 flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
                        style={{ color: "var(--color-accent)" }}
                    >
                        <span>Explore</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Top label chip */}
                <div
                    className="absolute top-3 left-3"
                >
                    <span
                        className="px-2 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full"
                        style={{
                            background: "rgba(14,12,10,0.6)",
                            backdropFilter: "blur(8px)",
                            color: "var(--color-brand-text-soft)",
                            border: "1px solid var(--color-brand-border)",
                        }}
                    >
                        {category.name}
                    </span>
                </div>
            </div>
        </Link>
    )
}

/* ─── Brand strip ─────────────────────────────────────────────────── */
function BrandStrip() {
    const attributes = [
        "Full-Grain Leather",
        "Hand-Stitched",
        "Ethically Sourced",
        "10-Year Guarantee",
        "Free Returns",
    ]

    return (
        <div
            className="overflow-x-auto scrollbar-hide py-5"
            style={{
                borderTop: "1px solid var(--color-brand-border)",
                borderBottom: "1px solid var(--color-brand-border)",
                background: "var(--color-brand-surface)",
            }}
        >
            <div
                className="flex items-center gap-0 whitespace-nowrap"
                style={{ minWidth: "max-content" }}
            >
                {[...attributes, ...attributes].map((a, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-4 px-8 text-xs font-medium tracking-widest uppercase"
                        style={{ color: "var(--color-brand-text-faint)" }}
                    >
                        {a}
                        <span
                            className="w-1 h-1 rounded-full"
                            style={{ background: "var(--color-accent)" }}
                        />
                    </span>
                ))}
            </div>
        </div>
    )
}

/* ─── Placeholder image ───────────────────────────────────────────── */
function PlaceholderImage() {
    return (
        <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: "var(--color-brand-border-light)" }}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-12 h-12">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>
        </div>
    )
}