import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { listParentCategories } from "@/lib/action/category"
import { StoreProductCategory } from "@medusajs/types"

export const metadata: Metadata = {
    title: "Collections | Nocturne Leather",
    description:
        "Explore our full range of premium leather collections — outerwear, tops, bottoms, bags, accessories and home decor.",
}
/** Recursively collect leaf nodes (categories without children). */
function collectLeaves(cat: StoreProductCategory): StoreProductCategory[] {
    const kids = cat.category_children ?? []
    if (kids.length === 0) return [cat]
    return kids.flatMap(collectLeaves)
}

export default async function Page() {
    const parents = await listParentCategories()

    return (
        <main
            className="min-h-screen"
            style={{ background: "var(--color-brand-bg)" }}
        >
            {/* ── Hero banner ────────────────────────────────────────────── */}
            <section
                className="relative px-5 sm:px-10 lg:px-20 py-20 sm:py-28 overflow-hidden grain"
                style={{ background: "var(--color-brand-surface)" }}
            >
                {/* Ambient light */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full opacity-10 blur-[120px] pointer-events-none"
                    style={{ background: "var(--color-accent)" }}
                    aria-hidden="true"
                />

                <div className="relative z-10 max-w-4xl">
                    <p
                        className="text-[10px] font-medium tracking-[0.25em] uppercase mb-4"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Our Collections
                    </p>
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        Every stitch,{" "}
                        <em className="italic" style={{ color: "var(--color-accent)" }}>
                            intentional.
                        </em>
                    </h1>
                    <p
                        className="mt-5 text-base sm:text-lg max-w-xl leading-relaxed"
                        style={{ color: "var(--color-brand-text-soft)" }}
                    >
                        Discover our curated range of full-grain and nappa leather pieces —
                        from architectural outerwear to refined everyday accessories.
                    </p>
                </div>
            </section>

            {/* ── Category sections ──────────────────────────────────────── */}
            <div className="px-5 sm:px-10 lg:px-20 py-16 sm:py-24 space-y-20 sm:space-y-28">
                {parents.map((parent) => {
                    const leaves = collectLeaves(parent)

                    return (
                        <CategorySection
                            key={parent.id}
                            parent={parent}
                            leaves={leaves}
                        />
                    )
                })}
            </div>

            {/* ── Footer CTA ─────────────────────────────────────────────── */}
            <section
                className="mx-5 sm:mx-10 lg:mx-20 mb-16 rounded-2xl overflow-hidden relative grain"
                style={{ background: "var(--color-brand-elevated)" }}
            >
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(45deg, var(--color-accent) 0, var(--color-accent) 1px, transparent 0, transparent 50%)",
                        backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                />
                <div className="relative z-10 px-8 sm:px-16 py-14 sm:py-20 text-center max-w-2xl mx-auto">
                    <h2
                        className="text-4xl sm:text-5xl font-light mb-4"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        Can&apos;t decide?
                    </h2>
                    <p
                        className="text-base mb-8"
                        style={{ color: "var(--color-brand-text-soft)" }}
                    >
                        Browse the complete Nocturne collection and let the leather speak.
                    </p>
                    <Link
                        href="/category"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-200 hover:opacity-90"
                        style={{ background: "var(--color-accent)", color: "#0e0c0a" }}
                    >
                        Shop All
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    )
}

/* ─── Section component ───────────────────────────────────────────── */
function CategorySection({ parent, leaves, }: { parent: StoreProductCategory, leaves: StoreProductCategory[] }) {
    const parentHandle = parent.handle
    const firstSegment = parentHandle.split("/")[0]

    return (
        <section>
            {/* Section header */}
            <div
                className={`flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-10 mb-10 pb-6`}
                style={{ borderBottom: "1px solid var(--color-brand-border)" }}
            >
                <div className="flex-1">
                    <p
                        className="text-[10px] font-medium tracking-[0.2em] uppercase mb-2"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Collection
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-brand-text)",
                        }}
                    >
                        {parent.name}
                    </h2>
                    {parent.description && (
                        <p
                            className="mt-3 text-sm leading-relaxed max-w-xl"
                            style={{ color: "var(--color-brand-text-soft)" }}
                        >
                            {parent.description}
                        </p>
                    )}
                </div>

                <Link
                    href={`/category/${firstSegment}`}
                    className="self-start sm:self-auto flex items-center gap-2 text-sm group whitespace-nowrap"
                    style={{ color: "var(--color-brand-text-soft)" }}
                >
                    <span className="group-hover:text-accent transition-colors">
                        View all
                    </span>
                    <span
                        className="block w-8 h-px group-hover:w-12 transition-all duration-300"
                        style={{ background: "var(--color-accent)" }}
                    />
                </Link>
            </div>

            {/* Horizontal scroll row of leaf categories */}
            <div className="relative">
                {/* Fade gradient for scroll indication */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
                    style={{
                        background: `linear-gradient(to left, var(--color-brand-bg), transparent)`,
                    }}
                    aria-hidden="true"
                />

                <div className="overflow-x-auto scrollbar-hide -mx-5 sm:mx-0 px-5 sm:px-0">
                    <div className="flex gap-5 sm:gap-6 pb-2" style={{ minWidth: "max-content" }}>
                        {leaves.map((leaf) => (
                            <LeafCategoryCard key={leaf.id} category={leaf} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ─── Leaf category card ──────────────────────────────────────────── */
function LeafCategoryCard({ category }: { category: StoreProductCategory }) {
    const segments = category.handle.split("/")
    const [parentSeg, ...rest] = segments
    const href = rest.length === 0 ? `/category/${parentSeg}` : `/category/${parentSeg}/${rest.join("/")}`

    return (
        <Link
            href={href}
            className="group flex flex-col items-center gap-3 shrink-0"
        >
            {/* Circle image */}
            <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 transition-all duration-300"
                style={{
                    borderColor: "var(--color-brand-border)",
                    background: "var(--color-brand-elevated)",
                }}
            >
                {category.metadata?.thumbnail ? (
                    <Image
                        src={category.metadata.thumbnail as string}
                        alt={category.name}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ color: "var(--color-brand-border-light)" }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-8 h-8">
                            <rect x="3" y="3" width="18" height="18" rx="9" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                )}

                {/* Hover ring */}
                <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        boxShadow: `inset 0 0 0 2px var(--color-accent)`,
                    }}
                    aria-hidden="true"
                />
            </div>

            {/* Label */}
            <span
                className="text-xs font-medium text-center leading-snug max-w-28 group-hover:text-accent transition-colors duration-150"
                style={{ color: "var(--color-brand-text-soft)" }}
            >
                {category.name}
            </span>
        </Link>
    )
}