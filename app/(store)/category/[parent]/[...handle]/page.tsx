import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import ProductListingClient from "@/module/category/templates/product-listing-client"
import { getCategoryByHandle } from "@/lib/action/category"
import { StoreProductCategory } from "@medusajs/types"
import { getSizesForHandle } from "@/data/category-page"
import { listProductsWithSort } from "@/lib/action/product"
import { SortOptions } from "@/types/common"

/* ─── Params & SearchParams ───────────────────────────────────────── */
type SearchParams = {
    sort?: SortOptions
    page?: string
    size?: string | string[]
    color?: string | string[]
    minPrice?: string
    maxPrice?: string
}

type GetProductsProps = {
    sort: SortOptions
    page: number
    sizes: string[]
    colors: string[]
    minPrice?: number
    maxPrice?: number
}

/* ─── Helpers ─────────────────────────────────────────────────────── */
function toArray(v: string | string[] | undefined): string[] {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
}

async function getProducts(category_id: string, { sort, page }: GetProductsProps) {
    console.log(category_id)
    return await listProductsWithSort({
        page,
        queryParams: {
            category_id,
        },
        sortBy: sort,
        countryCode: 'us'
    })

}

/* ─── Metadata ────────────────────────────────────────────────────── */
export async function generateMetadata({ params, }: PageProps<"/category/[parent]/[...handle]">): Promise<Metadata> {
    const { parent, handle } = await params
    const fullHandle = [parent, ...handle].join("/")
    console.log({ parent, handle, fullHandle })
    const category = await getCategoryByHandle(fullHandle)
    const name = category?.name ?? handle.at(-1) ?? "Collection"

    return {
        title: `${name} | Nocturne Leather`,
        description:
            category?.description ??
            `Shop our premium ${name.toLowerCase()} leather collection.`,
        openGraph: {
            images: category?.metadata?.thumbnail ? [category.metadata.thumbnail as string] : [],
        },
    }
}

/* ─── Page (Server Component) ─────────────────────────────────────── */
export default async function Page({ params, searchParams }: PageProps<"/category/[parent]/[...handle]">) {
    const { parent, handle } = await params
    const sp = await searchParams as SearchParams
    const fullHandle = [parent, ...handle].join("/")

    // ── Category ──
    const category = await getCategoryByHandle(fullHandle)
    if (!category) notFound()

    // ── Query params ──
    const sort = sp.sort ?? "created_at"
    const page = Math.max(1, parseInt(sp.page ?? "1", 10))
    const sizes = toArray(sp.size)
    const colors = toArray(sp.color)
    const minPrice = sp.minPrice ? parseInt(sp.minPrice, 10) : undefined
    const maxPrice = sp.maxPrice ? parseInt(sp.maxPrice, 10) : undefined

    // ── Products ──
    const { response: { products, count }, limit } = await getProducts(category.id, {
        sort, page, sizes, colors, minPrice, maxPrice,
    })

    // ── Sizes config ──
    const sizes_for_category = getSizesForHandle(fullHandle)

    // ── Breadcrumbs ──
    const crumbs = buildCrumbs(parent, handle, category)

    return (
        <main
            className="min-h-screen"
            style={{ background: "var(--color-brand-bg)" }}
        >
            {/* ── Category hero ──────────────────────────────────────────── */}
            <ProductCategoryHero category={category} crumbs={crumbs} />

            {/* ── Listing ────────────────────────────────────────────────── */}
            <section className="px-5 sm:px-10 lg:px-20 pb-20 sm:pb-28">
                <Suspense fallback={<GridSkeleton />}>
                    <ProductListingClient
                        products={products}
                        count={count}
                        currentPage={page}
                        limit={limit}
                        sort={sort}
                        category={category}
                        sizes={sizes_for_category}
                        activeFilters={{ sizes, colors, minPrice: sp.minPrice ?? "", maxPrice: sp.maxPrice ?? "" }}
                    />
                </Suspense>
            </section>
        </main>
    )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function ProductCategoryHero({
    category,
    crumbs,
}: {
    category: StoreProductCategory
    crumbs: { label: string; href: string }[]
}) {
    return (
        <section
            className="relative px-5 sm:px-10 lg:px-20 pt-6 pb-12 sm:pb-16 overflow-hidden grain"
            style={{ background: "var(--color-brand-surface)" }}
        >
            {/* Ambient light */}
            <div
                className="absolute top-0 right-0 w-100 h-62.5 rounded-full opacity-8 blur-[100px] pointer-events-none"
                style={{ background: "var(--color-accent)" }}
                aria-hidden="true"
            />

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 flex-wrap text-xs" style={{ color: "var(--color-brand-text-faint)" }}>
                    {crumbs.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                            {i === crumbs.length - 1 ? (
                                <span style={{ color: "var(--color-brand-text-soft)" }}>{c.label}</span>
                            ) : (
                                <Link href={c.href} className="hover:text-accent transition-colors">
                                    {c.label}
                                </Link>
                            )}
                            <span aria-hidden="true">/</span>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
                <div>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-3"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        {category.name}
                    </h1>
                    {category.description && (
                        <p
                            className="text-sm sm:text-base leading-relaxed max-w-xl"
                            style={{ color: "var(--color-brand-text-soft)" }}
                        >
                            {category.description}
                        </p>
                    )}
                </div>
                {category.metadata?.thumbnail as string && (
                    <div
                        className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full border"
                        style={{
                            background: "var(--color-brand-elevated)",
                            border: "1px solid var(--color-brand-border)",
                        }}
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image src={category.metadata?.thumbnail as string} alt="" fill className="object-cover" sizes="32px" />
                        </div>
                        <span className="text-xs pr-1" style={{ color: "var(--color-brand-text-soft)" }}>
                            {category.name}
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}

/* ─── Breadcrumb builder ──────────────────────────────────────────── */
function buildCrumbs(
    parent: string,
    handle: string[],
    leaf: StoreProductCategory
): { label: string; href: string }[] {
    const crumbs: { label: string; href: string }[] = [
        { label: "Category", href: "/category" },
        { label: toTitleCase(parent), href: `/category/${parent}` },
    ]

    handle.forEach((seg, i) => {
        const isLast = i === handle.length - 1
        const href = `/category/${parent}/${handle.slice(0, i + 1).join("/")}`
        crumbs.push({
            label: isLast ? leaf.name : toTitleCase(seg),
            href,
        })
    })

    return crumbs
}

function toTitleCase(str: string) {
    return str
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

/* ─── Loading skeleton ────────────────────────────────────────────── */
function GridSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div
                        className="rounded-xl aspect-3/4 mb-3"
                        style={{ background: "var(--color-brand-elevated)" }}
                    />
                    <div
                        className="h-2.5 rounded-full w-2/3 mb-2"
                        style={{ background: "var(--color-brand-border)" }}
                    />
                    <div
                        className="h-2 rounded-full w-1/2"
                        style={{ background: "var(--color-brand-border)" }}
                    />
                </div>
            ))}
        </div>
    )
}