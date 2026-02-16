'use client';

export interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
    amount: number;
    currency?: string;
    locale?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCurrency?: boolean;
    variant?: 'default' | 'sale' | 'original';
}

export const Price = ({
    amount,
    currency = 'USD',
    locale = 'en-US',
    size = 'md',
    variant = 'default',
    className = '',
    ...props
}: PriceProps) => {
    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-2xl',
    };

    const variantClasses = {
        default: 'text-price-current font-bold',
        sale: 'text-price-sale font-bold',
        original: 'text-price-original line-through font-normal',
    };

    const formattedPrice = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return (
        <div
            className={`
                    ${sizeClasses[size]}
                    ${variantClasses[variant]}
                    ${className}
                `}
            {...props}
        >
            {formattedPrice}
        </div>
    );
};

// Price Range (for product listing)
export interface PriceRangeProps {
    minPrice: number;
    maxPrice: number;
    currency?: string;
    locale?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
    minPrice,
    maxPrice,
    currency = 'USD',
    locale = 'en-US',
    size = 'md',
    className = '',
}) => {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    return (
        <div className={`font-semibold text-price-current ${sizeClasses[size]} ${className}`}>
            {formatPrice(minPrice)} - {formatPrice(maxPrice)}
        </div>
    );
};

// Price with Discount (shows both original and sale price)
export interface PriceWithDiscountProps {
    originalPrice: number;
    salePrice: number;
    currency?: string;
    locale?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showDiscount?: boolean;
    discountBadge?: boolean;
    className?: string;
}

export const PriceWithDiscount: React.FC<PriceWithDiscountProps> = ({
    originalPrice,
    salePrice,
    currency = 'USD',
    locale = 'en-US',
    size = 'md',
    showDiscount = true,
    discountBadge = false,
    className = '',
}) => {
    const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    return (
        <div className={`flex items-center gap-2 flex-wrap ${className}`}>
            <Price amount={salePrice} currency={currency} locale={locale} size={size} variant="sale" />
            <Price amount={originalPrice} currency={currency} locale={locale} size={size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'} variant="original" />
            {showDiscount && discountBadge && (
                <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-bold rounded">
                    -{discount}%
                </span>
            )}
        </div>
    );
};

// Installment Price (e.g., "or 4 payments of $X")
export interface InstallmentPriceProps {
    totalPrice: number;
    installments: number;
    currency?: string;
    locale?: string;
    className?: string;
}

export const InstallmentPrice: React.FC<InstallmentPriceProps> = ({
    totalPrice,
    installments,
    currency = 'USD',
    locale = 'en-US',
    className = '',
}) => {
    const installmentAmount = totalPrice / installments;

    const formattedAmount = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(installmentAmount);

    return (
        <div className={`text-sm text-text-secondary ${className}`}>
            or {installments} interest-free payments of <span className="font-semibold text-text-primary">{formattedAmount}</span>
        </div>
    );
};

// Savings Display (shows amount saved)
export interface SavingsDisplayProps {
    originalPrice: number;
    salePrice: number;
    currency?: string;
    locale?: string;
    variant?: 'amount' | 'percentage' | 'both';
    className?: string;
}

export const SavingsDisplay: React.FC<SavingsDisplayProps> = ({
    originalPrice,
    salePrice,
    currency = 'USD',
    locale = 'en-US',
    variant = 'both',
    className = '',
}) => {
    const savingsAmount = originalPrice - salePrice;
    const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);

    const formattedSavings = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(savingsAmount);

    return (
        <div className={`text-sm text-success font-semibold ${className}`}>
            Save{' '}
            {variant === 'amount' && formattedSavings}
            {variant === 'percentage' && `${savingsPercentage}%`}
            {variant === 'both' && `${formattedSavings} (${savingsPercentage}%)`}
        </div>
    );
};