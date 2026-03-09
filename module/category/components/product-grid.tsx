"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { convertToLocale } from "@/lib/util/money"
import { StoreProduct } from "@medusajs/types"

interface ProductGridProps {
    products: StoreProduct[]
    count: number
    currentPage: number
    limit: number
    sort: string
    onFilterOpen: () => void
    activeFilterCount: number
}

const SORT_OPTIONS = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low–High", value: "price_asc" },
    { label: "Price: High–Low", value: "price_desc" },
    { label: "Name A–Z", value: "name_asc" },
]

export default function ProductGrid({
    products,
    count,
    currentPage,
    limit,
    sort,
    onFilterOpen,
    activeFilterCount,
}: ProductGridProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const totalPages = Math.ceil(count / limit)

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) params.set(key, value)
        else params.delete(key)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            {/* Toolbar */}
            <div
                className="flex items-center justify-between gap-3 mb-8 pb-5"
                style={{ borderBottom: "1px solid var(--color-brand-border)" }}
            >
                <div className="flex items-center gap-3">
                    {/* Filter button */}
                    <button
                        onClick={onFilterOpen}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg border transition-all duration-150"
                        style={{
                            borderColor:
                                activeFilterCount > 0
                                    ? "var(--color-accent)"
                                    : "var(--color-brand-border-light)",
                            color:
                                activeFilterCount > 0
                                    ? "var(--color-accent)"
                                    : "var(--color-brand-text-soft)",
                            background:
                                activeFilterCount > 0 ? "var(--color-accent-glow)" : "transparent",
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M7 12h10M11 19.5h2" />
                        </svg>
                        <span>Filter</span>
                        {activeFilterCount > 0 && (
                            <span
                                className="flex items-center justify-center w-5 h-5 text-[10px] font-semibold rounded-full"
                                style={{ background: "var(--color-accent)", color: "#0e0c0a" }}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {/* Product count */}
                    <span className="text-sm hidden sm:block" style={{ color: "var(--color-brand-text-faint)" }}>
                        {count.toLocaleString()} {count === 1 ? "piece" : "pieces"}
                    </span>
                </div>

                {/* Sort */}
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => {
                            setParam("sort", e.target.value)
                            setParam("page", "")
                        }}
                        className="appearance-none pl-4 pr-9 py-2.5 text-sm rounded-lg border outline-none cursor-pointer transition-all"
                        style={{
                            background: "var(--color-brand-elevated)",
                            border: "1px solid var(--color-brand-border-light)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                        style={{ color: "var(--color-brand-muted)" }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Grid */}
            {products.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isHovered={hoveredId === product.id}
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={(p) => setParam("page", String(p))}
                />
            )}
        </div>
    )
}

/* ── Product Card ────────────────────────────────────────────────── */
function ProductCard({
    product,
    isHovered,
    onMouseEnter,
    onMouseLeave,
}: {
    product: StoreProduct
    isHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
}) {
    const variant = product.variants?.[0]
    const price = variant?.calculated_price
    const secondImg = product.images?.[1]?.url
    const firstImg = product.thumbnail ?? product.images?.[0]?.url

    return (
        <Link
            href={`/products/${product.handle}`}
            className="group block"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Image */}
            <div
                className="relative overflow-hidden rounded-xl mb-3 aspect-3/4"
                style={{ background: "var(--color-brand-elevated)" }}
            >
                {firstImg && (
                    <Image
                        src={isHovered && secondImg ? secondImg : firstImg}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-all duration-700"
                        style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
                    />
                )}
                {!firstImg && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span style={{ color: "var(--color-brand-border-light)" }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </span>
                    </div>
                )}

                {/* Quick action — wishlist */}
                <button
                    className="absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                    style={{
                        background: "rgba(14,12,10,0.6)",
                        backdropFilter: "blur(8px)",
                        color: "var(--color-brand-text)",
                    }}
                    onClick={(e) => e.preventDefault()}
                    aria-label="Wishlist"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Info */}
            <div>
                <p
                    className="text-xs mb-1 uppercase tracking-widest"
                    style={{ color: "var(--color-brand-text-faint)" }}
                >
                    {product.collection?.title ?? "Nocturne"}
                </p>
                <h3
                    className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-150"
                    style={{ color: "var(--color-brand-text)" }}
                >
                    {product.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                    {price ? convertToLocale({ amount: price.calculated_amount!, currency_code: price.currency_code! }) : "Price on request"}
                </p>
            </div>
        </Link>
    )
}

/* ── Pagination ─────────────────────────────────────────────────── */
function Pagination({
    currentPage,
    totalPages,
    onChange,
}: {
    currentPage: number
    totalPages: number
    onChange: (p: number) => void
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const visible = pages.filter(
        (p) =>
            p === 1 ||
            p === totalPages ||
            Math.abs(p - currentPage) <= 2
    )

    return (
        <div className="flex items-center justify-center gap-2 mt-14">
            <PaginationBtn
                disabled={currentPage <= 1}
                onClick={() => onChange(currentPage - 1)}
                aria-label="Previous"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </PaginationBtn>

            {visible.reduce<(number | "…")[]>((acc, p, i) => {
                if (i > 0 && p - (visible[i - 1] as number) > 1) acc.push("…")
                acc.push(p)
                return acc
            }, []).map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="text-sm px-2" style={{ color: "var(--color-brand-muted)" }}>…</span>
                ) : (
                    <PaginationBtn
                        key={p}
                        active={p === currentPage}
                        onClick={() => onChange(p as number)}
                    >
                        {p}
                    </PaginationBtn>
                )
            )}

            <PaginationBtn
                disabled={currentPage >= totalPages}
                onClick={() => onChange(currentPage + 1)}
                aria-label="Next"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </PaginationBtn>
        </div>
    )
}

function PaginationBtn({
    children,
    active,
    disabled,
    onClick,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
    disabled?: boolean
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="min-w-9 h-9 flex items-center justify-center px-3 text-sm rounded-lg border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
                borderColor: active ? "var(--color-accent)" : "var(--color-brand-border-light)",
                background: active ? "var(--color-accent)" : "transparent",
                color: active ? "#0e0c0a" : "var(--color-brand-text-soft)",
            }}
            {...rest}
        >
            {children}
        </button>
    )
}

/* ── Empty state ────────────────────────────────────────────────── */
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: "var(--color-brand-elevated)" }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-7 h-7" style={{ color: "var(--color-brand-muted)" }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
            </div>
            <h3
                className="text-2xl mb-2"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-brand-text)" }}
            >
                No pieces found
            </h3>
            <p className="text-sm max-w-sm" style={{ color: "var(--color-brand-text-soft)" }}>
                Try adjusting your filters or browse other categories to discover our collection.
            </p>
        </div>
    )
}