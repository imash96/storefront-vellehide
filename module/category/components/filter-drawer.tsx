"use client"

import { StoreProductCategory } from "@medusajs/types"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState, useTransition } from "react"

interface FilterDrawerProps {
    isOpen: boolean
    onClose: () => void
    currentCategory: StoreProductCategory | null
    sizes: string[] | null
    activeFilters: {
        sizes: string[]
        colors: string[]
        minPrice: string
        maxPrice: string
    }
}

const COLORS = [
    { label: "Black", value: "black", hex: "#1a1a1a" },
    { label: "Brown", value: "brown", hex: "#6b3f1a" },
    { label: "Cognac", value: "cognac", hex: "#c4813c" },
    { label: "Camel", value: "camel", hex: "#c19a6b" },
    { label: "White", value: "white", hex: "#f5f0e8" },
    { label: "Burgundy", value: "burgundy", hex: "#6b1a2b" },
    { label: "Navy", value: "navy", hex: "#1a2b4a" },
    { label: "Olive", value: "olive", hex: "#4a4a1a" },
]

export default function FilterDrawer({
    isOpen,
    onClose,
    currentCategory,
    sizes,
    activeFilters,
}: FilterDrawerProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition()

    const [localSizes, setLocalSizes] = useState<string[]>(activeFilters.sizes)
    const [localColors, setLocalColors] = useState<string[]>(activeFilters.colors)
    const [localMinPrice, setLocalMinPrice] = useState(activeFilters.minPrice)
    const [localMaxPrice, setLocalMaxPrice] = useState(activeFilters.maxPrice)

    const toggleItem = (arr: string[], val: string) =>
        arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]

    const applyFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())

        // Reset pagination when filters change
        params.delete("page")

        // Sizes
        params.delete("size")
        localSizes.forEach((s) => params.append("size", s))

        // Colors
        params.delete("color")
        localColors.forEach((c) => params.append("color", c))

        // Price
        if (localMinPrice) params.set("minPrice", localMinPrice)
        else params.delete("minPrice")
        if (localMaxPrice) params.set("maxPrice", localMaxPrice)
        else params.delete("maxPrice")

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
            onClose()
        })
    }, [localSizes, localColors, localMinPrice, localMaxPrice, pathname, router, searchParams, onClose])

    const clearAll = () => {
        setLocalSizes([])
        setLocalColors([])
        setLocalMinPrice("")
        setLocalMaxPrice("")
    }

    const children = currentCategory?.category_children ?? []
    const parent = currentCategory?.parent_category

    const navigateToCategory = (handle: string) => {
        // Navigate to the category page
        const segments = handle.split("/")
        const [parentSeg, ...rest] = segments
        if (rest.length === 0) {
            router.push(`/category/${parentSeg}`)
        } else {
            router.push(`/category/${parentSeg}/${rest.join("/")}`)
        }
        onClose()
    }

    const totalActive =
        localSizes.length +
        localColors.length +
        (localMinPrice || localMaxPrice ? 1 : 0)

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                style={{ background: "var(--color-overlay)" }}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Filter products"
                className={`fixed top-0 left-0 z-50 h-full w-full max-w-88 flex flex-col
          transition-transform duration-400 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{
                    background: "var(--color-brand-surface)",
                    borderRight: "1px solid var(--color-brand-border)",
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: "1px solid var(--color-brand-border)" }}
                >
                    <div>
                        <h2
                            className="text-lg tracking-wide"
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-brand-text)",
                            }}
                        >
                            Filters
                        </h2>
                        {totalActive > 0 && (
                            <p className="text-xs mt-0.5" style={{ color: "var(--color-accent)" }}>
                                {totalActive} active
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {totalActive > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-xs underline underline-offset-2 transition-opacity hover:opacity-70"
                                style={{ color: "var(--color-brand-text-soft)" }}
                            >
                                Clear all
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-md transition-colors"
                            style={{ color: "var(--color-brand-text-soft)" }}
                            aria-label="Close filters"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-8">

                    {/* ── Back to parent category ── */}
                    {parent && (
                        <section>
                            <button
                                onClick={() => navigateToCategory(parent.handle)}
                                className="flex items-center gap-2 text-sm group"
                                style={{ color: "var(--color-brand-text-soft)" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to {parent.name}
                            </button>
                        </section>
                    )}

                    {/* ── Sub-categories ── */}
                    {children.length > 0 && (
                        <FilterSection title="Browse">
                            <div className="flex flex-col gap-1">
                                {children.map((child) => (
                                    <button
                                        key={child.id}
                                        onClick={() => navigateToCategory(child.handle)}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-left transition-colors"
                                        style={{
                                            color: "var(--color-brand-text)",
                                            background:
                                                currentCategory?.handle === child.handle
                                                    ? "var(--color-brand-elevated)"
                                                    : "transparent",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.background = "var(--color-brand-elevated)")
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                            currentCategory?.handle === child.handle
                                                ? "var(--color-brand-elevated)"
                                                : "transparent")
                                        }
                                    >
                                        <span>{child.name}</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 opacity-40">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </FilterSection>
                    )}

                    {/* ── Size ── */}
                    {sizes && (
                        <FilterSection title="Size">
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size) => {
                                    const active = localSizes.includes(size)
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => setLocalSizes(toggleItem(localSizes, size))}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-150"
                                            style={{
                                                borderColor: active ? "var(--color-accent)" : "var(--color-brand-border-light)",
                                                background: active ? "var(--color-accent-glow)" : "transparent",
                                                color: active ? "var(--color-accent)" : "var(--color-brand-text-soft)",
                                            }}
                                        >
                                            {size}
                                        </button>
                                    )
                                })}
                            </div>
                        </FilterSection>
                    )}

                    {/* ── Color ── */}
                    <FilterSection title="Color">
                        <div className="flex flex-wrap gap-2.5">
                            {COLORS.map(({ label, value, hex }) => {
                                const active = localColors.includes(value)
                                return (
                                    <button
                                        key={value}
                                        onClick={() => setLocalColors(toggleItem(localColors, value))}
                                        title={label}
                                        className="flex flex-col items-center gap-1.5 group"
                                    >
                                        <span
                                            className="w-7 h-7 rounded-full border-2 transition-all"
                                            style={{
                                                background: hex,
                                                borderColor: active ? "var(--color-accent)" : "var(--color-brand-border-light)",
                                                boxShadow: active ? `0 0 0 2px var(--color-accent-glow)` : "none",
                                            }}
                                        />
                                        <span
                                            className="text-[10px] leading-none"
                                            style={{ color: active ? "var(--color-accent)" : "var(--color-brand-text-faint)" }}
                                        >
                                            {label}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </FilterSection>

                    {/* ── Price range ── */}
                    <FilterSection title="Price Range">
                        <div className="flex items-center gap-3">
                            <PriceInput
                                placeholder="Min"
                                value={localMinPrice}
                                onChange={setLocalMinPrice}
                            />
                            <span style={{ color: "var(--color-brand-muted)" }} className="text-sm">—</span>
                            <PriceInput
                                placeholder="Max"
                                value={localMaxPrice}
                                onChange={setLocalMaxPrice}
                            />
                        </div>
                    </FilterSection>

                </div>

                {/* Footer */}
                <div
                    className="px-6 py-5"
                    style={{ borderTop: "1px solid var(--color-brand-border)" }}
                >
                    <button
                        onClick={applyFilters}
                        className="w-full py-3 text-sm font-medium tracking-widest uppercase rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                        style={{
                            background: "var(--color-accent)",
                            color: "#0e0c0a",
                        }}
                    >
                        Apply Filters
                    </button>
                </div>
            </aside>
        </>
    )
}

/* ── Sub-components ───────────────────────────────────────────────── */

function FilterSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section>
            <h3
                className="text-[10px] font-medium uppercase tracking-widest mb-3"
                style={{ color: "var(--color-brand-text-faint)" }}
            >
                {title}
            </h3>
            {children}
        </section>
    )
}

function PriceInput({
    placeholder,
    value,
    onChange,
}: {
    placeholder: string
    value: string
    onChange: (v: string) => void
}) {
    return (
        <div className="relative flex-1">
            <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
                style={{ color: "var(--color-brand-muted)" }}
            >
                $
            </span>
            <input
                type="number"
                min={0}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-6 pr-3 py-2.5 text-xs rounded-lg border outline-none transition-all"
                style={{
                    background: "var(--color-brand-elevated)",
                    border: "1px solid var(--color-brand-border-light)",
                    color: "var(--color-brand-text)",
                }}
                onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-accent)")
                }
                onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--color-brand-border-light)")
                }
            />
        </div>
    )
}