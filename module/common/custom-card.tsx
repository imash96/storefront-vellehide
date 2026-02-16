'use client';

import Image from "next/image";


export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
    default: 'bg-surface border border-border',
    outlined: 'bg-transparent border-2 border-border',
    elevated: 'bg-surface shadow-lg border border-border',
    ghost: 'bg-transparent border-none',
};

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export default function Card({ variant = 'default', hoverable = false, padding = 'md', className = '', children, ...props }: CardProps) {


    return (
        <div className={`rounded-lg transition-all duration-300 ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Card Sub-components
export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`mb-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

CardHeader.displayName = 'CardHeader';

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={`text-xl font-display font-semibold text-text-primary ${className}`}
            {...props}
        >
            {children}
        </h3>
    );
};

export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={`text-sm text-text-secondary mt-1 ${className}`}
            {...props}
        >
            {children}
        </p>
    );
};

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`mt-4 pt-4 border-t border-border ${className}`} {...props}>
            {children}
        </div>
    );
};

// Product Card - Specialized for e-commerce
export interface ProductCardProps {
    image: string;
    width: number;
    imageAlt: string;
    title: string;
    price: number;
    originalPrice?: number;
    badge?: string;
    badgeVariant?: 'new' | 'sale' | 'limited';
    rating?: number;
    onCardClick?: () => void;
    onAddToCart?: () => void;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    image,
    width,
    imageAlt,
    title,
    price,
    originalPrice,
    badge,
    badgeVariant = 'new',
    rating,
    onCardClick,
    onAddToCart,
    className = '',
}) => {
    const badgeColors = {
        new: 'bg-badge-new text-badge-new-foreground',
        sale: 'bg-badge-sale text-badge-sale-foreground',
        limited: 'bg-badge-limited text-badge-limited-foreground',
    };

    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <Card hoverable padding="none" className={className}>
            {/* Image Container */}
            <div className="relative aspect-3/4 overflow-hidden rounded-t-lg bg-muted" onClick={onCardClick}>
                <Image
                    src={image}
                    alt={imageAlt}
                    width={width}
                    height={700}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Badge */}
                {badge && (
                    <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[badgeVariant]}`}>
                            {badge}
                        </span>
                    </div>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-bold">
                            -{discount}%
                        </span>
                    </div>
                )}

                {/* Quick Add Button (appears on hover) */}
                {onAddToCart && (
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart();
                            }}
                            className="w-full bg-button-primary text-button-primary-foreground py-2 rounded-lg font-semibold hover:bg-button-primary-hover transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4">
                <h3
                    className="font-display font-semibold text-text-primary mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={onCardClick}
                >
                    {title}
                </h3>

                {/* Rating */}
                {rating !== undefined && (
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'text-rating-filled' : 'text-rating-empty'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-xs text-text-secondary ml-1">({rating}.0)</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-price-current">
                        ${price.toFixed(2)}
                    </span>
                    {originalPrice && (
                        <span className="text-sm line-through text-price-original">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </Card>
    );
};