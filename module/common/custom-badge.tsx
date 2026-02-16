'use client';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'new' | 'sale' | 'limited' | 'success' | 'error' | 'warning' | 'info' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
}

export function Badge({ variant = 'default', size = 'md', dot = false, className = '', children, ...props }: BadgeProps) {

    const variantClasses = {
        default: 'bg-muted text-text-primary',
        new: 'bg-badge-new text-badge-new-foreground',
        sale: 'bg-badge-sale text-badge-sale-foreground',
        limited: 'bg-badge-limited text-badge-limited-foreground',
        success: 'bg-success text-success-foreground',
        error: 'bg-error text-error-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
        outline: 'bg-transparent border-2 border-border text-text-primary',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span className={` inline-flex items-center gap-1.5 font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {dot && (
                <span
                    className={`
                            w-1.5 h-1.5 rounded-full
                            ${variant === 'outline' ? 'bg-text-primary' : 'bg-current'}
                        `}
                />
            )}
            {children}
        </span>
    );
};

// Notification Badge (for cart count, etc.)
export interface NotificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    count: number;
    max?: number;
    showZero?: boolean;
    variant?: 'default' | 'error' | 'success';
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
    count,
    max = 99,
    showZero = false,
    variant = 'error',
    position = 'top-right',
    className = '',
    ...props
}) => {
    const displayCount = count > max ? `${max}+` : count;

    if (count === 0 && !showZero) return null;

    const variantClasses = {
        default: 'bg-primary text-primary-foreground',
        error: 'bg-error text-error-foreground',
        success: 'bg-success text-success-foreground',
    };

    const positionClasses = {
        'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
        'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
        'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
        'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    };

    return (
        <span
            className={`absolute inline-flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold rounded-full ${variantClasses[variant]} ${positionClasses[position]} ${className}`}
            {...props}
        >
            {displayCount}
        </span>
    );
};

// Status Badge (for order status, stock status, etc.)
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge = ({
    status,
    size = 'md',
    className = '',
    ...props
}: StatusBadgeProps) => {
    const statusConfig = {
        'in-stock': {
            label: 'In Stock',
            color: 'bg-success text-success-foreground',
            dotColor: 'bg-success',
        },
        'low-stock': {
            label: 'Low Stock',
            color: 'bg-warning text-warning-foreground',
            dotColor: 'bg-warning',
        },
        'out-of-stock': {
            label: 'Out of Stock',
            color: 'bg-error text-error-foreground',
            dotColor: 'bg-error',
        },
        'pending': {
            label: 'Pending',
            color: 'bg-warning text-warning-foreground',
            dotColor: 'bg-warning',
        },
        'processing': {
            label: 'Processing',
            color: 'bg-info text-info-foreground',
            dotColor: 'bg-info',
        },
        'shipped': {
            label: 'Shipped',
            color: 'bg-info text-info-foreground',
            dotColor: 'bg-info',
        },
        'delivered': {
            label: 'Delivered',
            color: 'bg-success text-success-foreground',
            dotColor: 'bg-success',
        },
        'cancelled': {
            label: 'Cancelled',
            color: 'bg-error text-error-foreground',
            dotColor: 'bg-error',
        },
    };

    const config = statusConfig[status];

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <div
            className={`
                inline-flex items-center gap-2 rounded-full font-medium
                ${config.color}
                ${sizeClasses[size]}
                ${className}
            `}
            {...props}
        >
            <span className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`} />
            {config.label}
        </div>
    );
};

// Size Badge (for clothing sizes)
export interface SizeBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size: string;
    selected?: boolean;
    disabled?: boolean;
}

export const SizeBadge = ({
    size: sizeLabel,
    selected = false,
    disabled = false,
    className = '',
    ...props
}: SizeBadgeProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`
                min-w-10 h-10 px-3
                border-2 rounded-lg
                font-semibold text-sm
                transition-all duration-200
                ${selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : disabled
                        ? 'border-border-subtle bg-input-disabled-background text-text-disabled cursor-not-allowed'
                        : 'border-border bg-transparent text-text-primary hover:border-primary hover:bg-primary-subtle'
                }
                ${!disabled && 'active:scale-95'}
                ${className}
            `}
            {...props}
        >
            {sizeLabel}
        </button>
    );
};

// Color Badge (for color selection)
export interface ColorBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
    colorName?: string;
    selected?: boolean;
    disabled?: boolean;
}

export const ColorBadge = ({
    color,
    colorName,
    selected = false,
    disabled = false,
    className = '',
    ...props
}: ColorBadgeProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            className={`
                relative w-10 h-10 rounded-full
                border-2 transition-all duration-200
                ${selected
                    ? 'border-primary ring-4 ring-primary/20'
                    : disabled
                        ? 'border-border-subtle opacity-40 cursor-not-allowed'
                        : 'border-border hover:border-primary'
                }
                ${!disabled && 'active:scale-95'}
                ${className}
            `}
            title={colorName}
            {...props}
        >
            <span
                className="absolute inset-1 rounded-full"
                style={{ backgroundColor: color }}
            />
            {selected && (
                <svg
                    className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
        </button>
    );
};