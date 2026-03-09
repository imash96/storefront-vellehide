import { getLeafCategories } from "@/data/category-page";
import { getCategoryByHandle } from "@/lib/action/category";
import Container from "@/ui/container";
import { StoreProductCategory } from "@medusajs/types";
import { ChevronRight, ArrowRight, Layers } from "lucide-react";

// ── Featured Child Card ───────────────────────────────────────────────────
function ChildCategoryCard({ category, index }: { category: StoreProductCategory; index: number }) {
    const categoryCount = category.category_children?.length;
    const subCategories = category.category_children;
    const isLarge = index === 0;

    return (
        <button
            className={`group relative overflow-hidden border border-border bg-card hover:bg-card-hover transition-all duration-500 cursor-pointer text-left ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
        >
            {/* Image */}
            <div className={`relative overflow-hidden ${isLarge ? "aspect-[4/3] md:aspect-[3/2]" : "aspect-[4/3]"}`}>
                <img
                    src={getCategoryImage(category.handle, isLarge ? 800 : 500, isLarge ? 600 : 400)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    {/* Product count badge */}
                    <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <Layers className="size-3" />
                            {categoryCount} {categoryCount === 1 ? "category" : "categories"}
                        </span>
                    </div>

                    <h3 className={`font-heading font-semibold text-white mb-1.5 tracking-tight ${isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                        {category.name}
                    </h3>

                    <p className={`text-white/75 leading-relaxed mb-4 line-clamp-2 ${isLarge ? "text-sm md:text-base max-w-md" : "text-xs md:text-sm"}`}>
                        {category.description}
                    </p>

                    {/* Subcategories preview */}
                    {subCategories?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {subCategories.slice(0, isLarge ? 6 : 3).map((sub) => (
                                <span key={sub.id} className="text-[10px] font-medium text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                    {sub.name}
                                </span>
                            ))}
                            {subCategories.length > (isLarge ? 6 : 3) && (
                                <span className="text-[10px] font-medium text-white/50 px-1">
                                    +{subCategories.length - (isLarge ? 6 : 3)} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-accent transition-colors">
                        Explore Collection
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </button>
    );
}

// ── Popular Subcategories ─────────────────────────────────────────────────
function PopularSubcategories({ parent }: { parent: StoreProductCategory }) {
    const leaves = getLeafCategories(parent.category_children).slice(0, 8);
    if (leaves.length === 0) return null;

    return (
        <section className="py-10 md:py-14">
            <div className="mb-8">
                <p className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.30em] uppercase text-accent mb-3">
                    <span className="block h-px w-7 bg-accent" aria-hidden="true" />
                    Popular in {parent.name}
                </p>
                <h2 className="font-heading text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
                    Browse Specific Styles
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {leaves.map((leaf) => (
                    <button
                        key={leaf.id}
                        className="group relative overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer text-left"
                    >
                        <div className="aspect-[3/2] overflow-hidden">
                            <img
                                src={getCategoryImage(leaf.handle, 400, 270)}
                                alt={leaf.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-3 md:p-4">
                            <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate">
                                {leaf.name}
                            </h4>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default async function Page({ params }: PageProps<"/category/[parent]">) {
    const { parent } = await params
    const category = await getCategoryByHandle(parent);

    if (!category) {
        return (
            <Container size="2xl" className="py-20 text-center">
                <h1 className="font-heading text-2xl text-text-primary mb-2">Category Not Found</h1>
                <p className="text-text-secondary mb-6">The category you’re looking for doesn’t exist.</p>
                <button className="text-primary hover:text-primary-hover text-sm font-medium cursor-pointer">
                    ← Back to Categories
                </button>
            </Container>
        );
    }

    const children = category.category_children;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero banner */}
            <div className="relative overflow-hidden bg-gradient-hero text-white">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <img
                        src={getCategoryImage(category.handle, 1400, 500)}
                        alt={category.name}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30" />
                </div>

                <Container size="2xl" className="relative py-14 md:py-20 lg:py-24">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6">
                        <button className="hover:text-white transition-colors cursor-pointer">Home</button>
                        <ChevronRight className="size-3" />
                        <button className="hover:text-white transition-colors cursor-pointer">Categories</button>
                        <ChevronRight className="size-3" />
                        <span className="text-white font-medium">{category.name}</span>
                    </nav>

                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.30em] uppercase text-accent mb-4">
                            <span className="block h-px w-7 bg-accent" aria-hidden="true" />
                            {(category.metadata?.gender as string) || "Collection"}
                        </p>
                        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                            {category.name}
                        </h1>
                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg mb-6">
                            {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                            <span>{children.length} Collections</span>
                            <span className="size-1 rounded-full bg-neutral-600" />
                        </div>
                    </div>
                </Container>
            </div>

            {/* Child Categories Grid */}
            <Container size="2xl" className="py-10 md:py-14">
                {children.length > 0 ? (
                    <>
                        <div className="mb-8">
                            <h2 className="font-heading text-lg md:text-xl font-semibold text-text-primary tracking-tight">
                                Explore {category.name}’s Collections
                            </h2>
                        </div>

                        {/* Responsive grid: first item large on md+ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {children.map((child, idx) => (
                                <ChildCategoryCard
                                    key={child.id}
                                    category={child}
                                    index={idx}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    /* If no children (leaf category like Dresses), show a CTA to browse products */
                    <div className="text-center py-12">
                        <p className="text-text-secondary mb-6">Explore our {category.name.toLowerCase()} collection</p>
                        <button
                            className="inline-flex items-center gap-2 bg-button-primary text-button-primary-foreground px-6 py-3 text-sm font-medium hover:bg-button-primary-hover transition-colors cursor-pointer"
                        >
                            Browse Products
                            <ArrowRight className="size-4" />
                        </button>
                    </div>
                )}
            </Container>

            {/* Popular subcategories */}
            {children.length > 0 && (
                <div className="border-t border-divider bg-background-secondary">
                    <Container size="2xl">
                        <PopularSubcategories parent={category} />
                    </Container>
                </div>
            )}
        </div>
    );
}

export function getCategoryImage(handle: string, width = 400, height = 400): string {
    const seed = handle.replace(/\//g, "-");
    return `https://picsum.photos/seed/leather-${seed}/${width}/${height}`;
}