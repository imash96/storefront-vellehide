import { getProductPrice } from "@/lib/util/get-product-price";
import ProductThumbnail from "@/module/product/components/product-thumbnail";
import { StoreProduct } from "@medusajs/types";
import { Heart, ShoppingBag } from "lucide-react";
import RatingSystem from "./rating-system";

export const badgeConfig: Record<string, { bg: string; fg: string; label: string }> = {
    new: { bg: "bg-badge-new", fg: "text-badge-new-foreground", label: "New" },
    sale: { bg: "bg-badge-sale", fg: "text-badge-sale-foreground", label: "Sale" },
    limited: { bg: "bg-badge-limited", fg: "text-badge-limited-foreground", label: "Limited" },
};

export default function ProductCard({ product }: { product: StoreProduct }) {
    const { cheapestPrice: price } = getProductPrice({ product })
    const isSale = price?.price_type === "sale"

    return (
        <article className="group relative w-full">
            {/* ── Image ──────────────────────────────────────────── */}
            <div className="relative overflow-hidden border border-border bg-card cursor-pointer">
                <ProductThumbnail
                    src={product.images}
                    alt={product.title}
                />

                {/* Badges — top-left */}
                {/* {product.badge && badgeConfig[product.badge] && (
                    <span
                        className={`absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${badgeConfig[product.badge].bg} ${badgeConfig[product.badge].fg}`}
                    >
                        {badgeConfig[product.badge].label}
                    </span>
                )} */}

                <span
                    className={`absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${badgeConfig['sale'].bg} ${badgeConfig['sale'].fg}`}
                >
                    {badgeConfig['sale'].label}
                </span>

                {/* Percentage pill — top-right */}
                {isSale && price.percentage_diff && (
                    <span className="absolute top-3 right-3 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm tabular-nums">
                        -{price.percentage_diff}%
                    </span>
                )}

                {/* Wishlist button */}
                <button
                    aria-label={`Add ${product.title} to wishlist`}
                    className={`absolute top-2.5 z-10 size-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 shadow-sm border bg-button-wishlist border-white/60 text-button-wishlist-foreground hover:bg-button-wishlist-hover opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${isSale ? "right-2.5 top-9" : "right-2.5"}`}
                >
                    <Heart className="size-3.5" strokeWidth={1.75} />
                </button>

                {/* Quick-add overlay (desktop) */}
                <div
                    aria-hidden
                    className="hidden sm:flex absolute bottom-0 inset-x-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                >
                    <span className="w-full flex items-center justify-center gap-2 bg-foreground/90 backdrop-blur-sm text-background text-[11px] font-medium tracking-wider uppercase py-3.5 cursor-pointer hover:bg-foreground transition-colors">
                        <ShoppingBag className="size-3.5" />
                        Quick Add
                    </span>
                </div>
            </div>

            {/* ── Body ──────────────────────────────────────────── */}
            <div className="pt-3 pb-1 space-y-1.5">
                {/* Category */}
                {product.categories && (
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                        {product.categories[0].name}
                    </span>
                )}

                <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-text-primary group-hover:text-primary transition-colors duration-200 cursor-pointer">
                    {product.title}
                </h3>

                <RatingSystem
                    averageRating={4.4}
                    reviewCount={50}
                    size="xs"
                />

                {/* Price row */}
                <div className="flex items-baseline gap-2 pt-0.5">
                    {isSale ? (
                        <>
                            <span className="font-heading font-semibold text-[15px] text-price-sale leading-none">
                                {price.calculated_price}
                            </span>
                            <span className="text-xs text-price-original line-through leading-none">
                                {price.original_price}
                            </span>
                        </>
                    ) : (
                        <span className="font-heading font-semibold text-[15px] text-text-primary leading-none">
                            {price?.original_price}
                        </span>
                    )}
                </div>

                {/* Color swatches */}
                {/* {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                        {product.colors.map((color, i) => (
                            <span
                                key={i}
                                className="size-3.5 rounded-full border border-border shadow-sm cursor-pointer hover:scale-125 transition-transform"
                                style={{ backgroundColor: color }}
                                aria-label={`Color option ${i + 1}`}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </article>
    );
}
