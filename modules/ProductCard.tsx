
// components/ProductCard.tsx
/**
 * Example Product Card Component
 * 
 * Demonstrates comprehensive usage of the premium leather brand theme:
 * - Semantic color tokens
 * - Hover/active states
 * - Responsive design
 * - Accessibility best practices
 */

import Image from 'next/image';
import { Star, Heart, ShoppingCart } from 'lucide-react';

export interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    badges?: Array<'new' | 'sale' | 'limited'>;
    inStock: boolean;
}

export function ProductCard({
    name,
    description,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    badges = [],
    inStock,
}: ProductCardProps) {
    const isSale = originalPrice && originalPrice > price;
    const discount = isSale
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <article className="card product-card-hover group relative">
            {/* Image Container with Hover Effect */}
            <div className="relative overflow-hidden rounded-lg mb-4 bg-muted">
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 gradient-overlay-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions - Appear on Hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-300">
                    <button
                        className="bg-surface/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-accent hover:text-accent-foreground focus-ring transition-colors"
                        aria-label="Add to wishlist"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                    <button
                        className="bg-surface/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-accent hover:text-accent-foreground focus-ring transition-colors"
                        aria-label="Quick view"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Badges */}
                {badges.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {badges.includes('new') && (
                            <span className="badge-new text-xs">New Arrival</span>
                        )}
                        {badges.includes('sale') && isSale && (
                            <span className="badge-sale text-xs font-bold">-{discount}%</span>
                        )}
                        {badges.includes('limited') && (
                            <span className="badge-limited text-xs">Limited Edition</span>
                        )}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-text-primary text-luxury group-hover:text-accent transition-colors">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary line-clamp-2">
                    {description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= rating
                                    ? 'fill-rating-filled text-rating-filled'
                                    : 'fill-rating-empty text-rating-empty'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-text-tertiary">
                        ({reviewCount} reviews)
                    </span>
                </div>

                {/* Price & Stock */}
                <div className="flex items-end justify-between pt-2 border-t border-border-subtle">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-price-current">
                            ${price}
                        </span>
                        {isSale && originalPrice && (
                            <span className="text-sm line-through text-price-original">
                                ${originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {inStock ? (
                        <span className="text-xs text-success font-medium">In Stock</span>
                    ) : (
                        <span className="text-xs text-destructive font-medium">Out of Stock</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    disabled={!inStock}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 focus-ring ${inStock
                        ? 'btn-primary'
                        : 'bg-input-disabled-background text-input-disabled-text cursor-not-allowed'
                        }`}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {inStock ? 'Add to Cart' : 'Sold Out'}
                </button>
            </div>
        </article>
    );
}

/* ========================================
   ADDITIONAL COMPONENT EXAMPLES
   ======================================== */

// Newsletter Signup Component
export function Newsletter() {
    return (
        <section className="bg-primary py-16">
            <div className="container-custom max-w-2xl text-center">
                <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                    Join Our Community
                </h2>
                <p className="text-primary-foreground/90 mb-8">
                    Get exclusive access to new releases, styling tips, and special offers.
                </p>
                <form className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input flex-1 bg-surface text-surface-foreground"
                    />
                    <button type="submit" className="btn-accent whitespace-nowrap">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}

// Alert/Notification Component
export function Alert({
    type = 'info',
    title,
    message
}: {
    type?: 'success' | 'destructive' | 'warning' | 'info';
    title: string;
    message: string;
}) {
    const styles = {
        success: 'bg-success-subtle border-success text-success',
        destructive: 'bg-destructive-subtle border-destructive text-destructive',
        warning: 'bg-warning-subtle border-warning text-warning',
        info: 'bg-info-subtle border-info text-info',
    };

    return (
        <div className={`border rounded-lg p-4 ${styles[type]}`}>
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm opacity-90">{message}</p>
        </div>
    );
}

// Loading Skeleton Component
export function ProductSkeleton() {
    return (
        <div className="card space-y-4">
            <div className="skeleton w-full h-80 rounded-lg" />
            <div className="skeleton h-6 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="flex items-center gap-2">
                <div className="skeleton h-4 w-24 rounded" />
            </div>
            <div className="skeleton h-12 w-full rounded-md" />
        </div>
    );
}