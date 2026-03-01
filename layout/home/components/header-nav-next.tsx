"use client"

import { product_categories } from "@/data/category";
import { features, MEGA_MENU, MegaMenu, navLinks } from "@/data/header";
import clx from "@/lib/util/clx";
import { ProductCategory } from "@/types/common";
import Container from "@/ui/container";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function HeaderNav() {
    const megaCats = product_categories.filter((c) => MEGA_MENU.includes(c.name as MegaMenu));
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    const handleMouseEnter = (name: string) => { clearTimeout(timeoutRef.current); setActiveMenu(name); };
    const handleMouseLeave = () => { timeoutRef.current = window.setTimeout(() => { setActiveMenu(null); }, 150); };
    return (
        <nav className="hidden lg:flex items-center gap-1 xl:gap-x-2" aria-label="Main navigation">
            {megaCats.map((cat) => (
                <div
                    key={`nav-${cat.handle}`}
                    onMouseEnter={() => handleMouseEnter(cat.name)}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={clx(
                            "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
                            activeMenu === cat.name ? "text-accent" : "text-foreground-secondary hover:text-foreground"
                        )}
                    >
                        {cat.name}
                        <ChevronDown
                            className={clx(
                                "size-3.5 transition-transform duration-200",
                                activeMenu === cat.name ? "rotate-180 text-accent" : "text-foreground-tertiary group-hover:text-foreground-secondary"
                            )}
                            strokeWidth={2}
                        />
                        {/* Active underline */}
                        {activeMenu === cat.name && (
                            <motion.span
                                layoutId="nav-underline"
                                className="absolute -bottom-px left-3 right-3 h-px bg-accent"
                                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                            />
                        )}
                    </button>
                    <AnimatePresence>
                        {cat.name === activeMenu && <MegaPanel
                            key={cat.id}
                            category={cat}
                            onClose={() => setActiveMenu(null)}
                        />}
                    </AnimatePresence>
                </div>
            ))}

            <div className="w-px h-4 bg-divider mx-2" />

            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-150"
                >
                    {link.label}
                    {link.badge && <span className="text-[8px] px-1 py-0.5 bg-accent text-accent-foreground rounded font-bold">{link.badge}</span>}
                </Link>
            ))}
        </nav>
    )
}

function MegaPanel({ category, onClose }: { category: ProductCategory; onClose: () => void }) {
    const subCategories = category?.category_children || [];
    const feats = features[category.name as MegaMenu] ?? [];
    const [hoveredSub, setHoveredSub] = useState<ProductCategory | null>(null);
    const heroImage = hoveredSub ? feats[subCategories.indexOf(hoveredSub) % feats.length]?.thumbnail : (category.metadata?.thumbnail as string | undefined) ?? feats[0]?.thumbnail;
    const heroLabel = hoveredSub?.name ?? category.name;
    const heroDesc = hoveredSub?.description ?? category.description ?? "";
    const heroHref = `/${hoveredSub?.handle ?? category.handle}`;
    const heroBadge = hoveredSub ? "Category" : "Collection";
    return (
        <motion.div
            aria-label={`${category.name} mega menu`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className={clx("absolute inset-x-0 top-full z-50 transition-all duration-300 ease-out opacity-100 pointer-events-auto")} onMouseLeave={onClose}>
            <div
                aria-hidden
                className="h-px"
                style={{
                    background: "linear-gradient(to right, transparent, var(--accent) 30%, var(--accent) 70%, transparent)"
                }}
            />
            <div className="bg-popover shadow-2xl border-b border-border">
                <Container size="2xl">
                    <div className="grid grid-cols-12 gap-0 min-h-100">
                        <div className="col-span-3 relative overflow-hidden">
                            <HeroPanelImage
                                src={heroImage}
                                label={heroLabel}
                                description={heroDesc}
                                href={heroHref}
                                badge={heroBadge}
                                onClose={onClose}
                            />
                        </div>
                        <div className="col-span-9 py-8 px-6">
                            <div className="flex h-full">
                                {subCategories.map((sub) => (
                                    <div key={sub.handle} className="flex-1 px-6 first:pl-2">
                                        <MegaColumn category={sub} onHover={() => setHoveredSub(sub)} isActive={hoveredSub?.handle === sub.handle || (!hoveredSub && sub.handle === subCategories[0]?.handle)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-border/50 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold text-foreground-tertiary uppercase tracking-[0.15em]">Featured Collections</span>
                            <div className="w-px h-3 bg-divider" />
                            {features[category.name as MegaMenu]?.map((fc) => (
                                <a
                                    key={fc.id}
                                    href={`/${fc.handle}`}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 text-[11px] font-medium text-foreground-secondary hover:text-accent transition-colors hover:border-accent duration-150"
                                >
                                    {fc.name}
                                    <ArrowRight className="w-3 h-3" />
                                </a>
                            ))}
                        </div>
                        <a href={`/${category?.handle}`} onClick={(e) => e.preventDefault()} className="text-[13px] font-semibold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 group">
                            View All {category.name} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </Container>
            </div>
        </motion.div>
    )
}

/* ─── Hero image pane ──────────────────────────────────────────────────────── */
function HeroPanelImage({
    src,
    label,
    description,
    href,
    badge,
    onClose,
}: {
    src?: string;
    label: string;
    description?: string;
    href: string;
    badge: string;
    onClose: () => void;
}) {
    return (
        <div className="relative w-[clamp(220px,22vw,300px)] shrink-0 overflow-hidden self-stretch min-h-65 size-full">
            {/* Image */}
            <AnimatePresence mode="wait">
                {src && (
                    <motion.img
                        key={src}
                        src={src}
                        alt={label}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent" />

            {/* Text content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="text-white"
                    >
                        <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-accent mb-1.5">
                            {badge}
                        </p>
                        <h3 className="text-base font-bold font-heading text-accent leading-tight mb-1">
                            {label}
                        </h3>
                        {description && (
                            <p className="text-xs line-clamp-2 leading-relaxed mb-3">
                                {description.slice(0, 80)}{description.length > 80 ? "…" : ""}
                            </p>
                        )}
                        <a
                            href={href}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors group"
                        >
                            Shop Now
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function MegaColumn({ category, onHover, isActive }: { category: ProductCategory; onHover: () => void; isActive: boolean }) {
    const children = category.category_children || [];
    return (
        <div onMouseEnter={onHover} className="size-full">
            <a href={`/${category.handle}`} onClick={(e) => e.preventDefault()} className="block mb-4 group">
                <div className="flex items-center justify-between">
                    <h3 className={clx("font-heading font-bold text-sm uppercase tracking-wider transition-colors", isActive ? "text-accent" : "text-foreground group-hover:text-accent")}>{category.name}</h3>
                    <ArrowRight className={clx("w-3.5 h-3.5 transition-all", isActive ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-50")} />
                </div>
                <div className={clx("h-px mt-2 transition-all duration-300", isActive ? "bg-accent" : "bg-border")} />
            </a>
            {children.length > 0 && (
                <ul className="space-y-2.5">
                    {children.map((child) => (
                        <li key={child.id || child.handle}>
                            <a
                                href={`/${child.handle}`}
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
    );
}