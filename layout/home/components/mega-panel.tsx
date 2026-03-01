import { features, MegaMenu } from "@/data/header";
import clx from "@/lib/util/clx";
import { ProductCategory } from "@/types/common";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";


export default function MegaPanel({ category, onClose }: { category: ProductCategory; onClose: () => void }) {
    const subcats = category.category_children ?? [];
    const feats = features[category.name as MegaMenu] ?? [];
    const [hoveredSub, setHoveredSub] = useState<ProductCategory | null>(null);

    const heroImage = hoveredSub ? feats[subcats.indexOf(hoveredSub) % feats.length]?.thumbnail : (category.metadata?.thumbnail as string | undefined) ?? feats[0]?.thumbnail;

    const heroLabel = hoveredSub?.name ?? category.name;
    const heroDesc = hoveredSub?.description ?? category.description ?? "";

    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-full z-50"
        >
            {/* gold line */}
            <div className="h-0.5 bg-linear-to-r from-transparent via-accent to-transparent" />

            <div className="bg-background-secondary border-b border-border shadow-2xl">
                <div className="max-w-330 mx-auto flex">

                    {/* LEFT: Hero image */}
                    <div className="w-85 shrink-0 relative overflow-hidden min-h-85">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={heroImage}
                                src={heroImage}
                                alt={heroLabel}
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.04 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-linear-to-r from-neutral-950/60 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={heroLabel}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-accent mb-1">
                                        {hoveredSub ? "Category" : "Collection"}
                                    </p>
                                    <h3 className="text-xl font-bold text-white font-heading mb-2 leading-tight">
                                        {heroLabel}
                                    </h3>
                                    {heroDesc && (
                                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                                            {heroDesc.slice(0, 90)}…
                                        </p>
                                    )}
                                    <a
                                        href={`/${hoveredSub?.handle ?? category.handle}`}
                                        onClick={onClose}
                                        className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors group"
                                    >
                                        Shop Now
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Category grid */}
                    <div className="flex-1 p-7">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                                Shop {category.name}
                            </p>
                            <a
                                href={`/${category.handle}`}
                                onClick={onClose}
                                className="flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors group"
                            >
                                View All
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-x-6">
                            {subcats.map((sub) => (
                                <div
                                    key={sub.id || sub.handle}
                                    onMouseEnter={() => setHoveredSub(sub)}
                                    onMouseLeave={() => setHoveredSub(null)}
                                >
                                    <a
                                        href={`/${sub.handle}`}
                                        onClick={onClose}
                                        className={clx(
                                            "block text-sm font-semibold mb-3 transition-colors duration-150 font-heading group",
                                            hoveredSub?.id === sub.id ? "text-accent" : "text-neutral-200 hover:text-accent"
                                        )}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {sub.name}
                                            {hoveredSub?.id === sub.id && (
                                                <motion.span
                                                    layoutId="d-dot"
                                                    className="w-1 h-1 rounded-full bg-accent"
                                                    transition={{ duration: 0.15 }}
                                                />
                                            )}
                                        </span>
                                    </a>
                                    {sub.category_children && (
                                        <ul className="space-y-1.5 mb-5">
                                            {sub.category_children.map((child) => (
                                                <li key={child.id || child.handle}>
                                                    <a
                                                        href={`/${child.handle}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-2 text-[12.5px] text-neutral-500 hover:text-neutral-200 transition-colors duration-150 group/c"
                                                    >
                                                        <span className="w-3 h-px bg-neutral-700 group-hover/c:bg-accent group-hover/c:w-4 transition-all duration-200" />
                                                        <span className="group-hover/c:translate-x-0.5 transition-transform duration-150">
                                                            {child.name}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Featured collection pills */}
                        <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center gap-3 flex-wrap">
                            {feats.map((f) => (
                                <a
                                    key={f.id}
                                    href={`/${f.handle}`}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 text-[11px] font-medium text-neutral-300 hover:border-accent hover:text-accent transition-all duration-150"
                                >
                                    {f.name}
                                    <ArrowRight className="w-3 h-3" />
                                </a>
                            ))}
                            <a
                                href="/sale"
                                onClick={onClose}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-badge-sale text-[11px] font-medium text-badge-sale hover:bg-badge-sale hover:text-badge-sale-foreground transition-all duration-150"
                            >
                                Sale
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}