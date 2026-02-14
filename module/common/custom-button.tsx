'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "primary" | "secondary" | "accent" | "ghost" | "destructive" | "outline";
type Shape = "rounded" | "square" | "pill";

// Base button props
interface BaseButtonProps extends React.PropsWithChildren {
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    'aria-label'?: string;
}

// Button element props
interface ButtonElementProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as?: 'button';
    // ensure anchor-only props are not allowed on button
    href?: never;
}

// Anchor element props
interface AnchorElementProps extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a';
    // anchor must not have button-only 'type'
    type?: never;
}

// Union type for all button props
export type CustomButtonProps = ButtonElementProps | AnchorElementProps;

// Loading spinner component
const LoadingSpinner: React.FC<{ size: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size }) => {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
    };

    return (
        <svg
            className={`${sizeClasses[size]} animate-spin`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};

export default function CustomButton({
    as = "button",
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    isLoading = false,
    disabled = false,
    className = '',
    children,
    ...rest
}: CustomButtonProps) {
    // Size classes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2.5 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5',
        xl: 'px-8 py-4 text-xl gap-3',
    };

    // Icon-only size adjustments
    const iconOnlySizeClasses = {
        sm: 'p-1.5',
        md: 'p-2.5',
        lg: 'p-3',
        xl: 'p-4',
    };

    // Shape classes
    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
    };

    // Variant classes
    const variantClasses = {
        primary: `
        bg-gold-600 text-white
        border-2 border-gold-600
        hover:bg-gold-700 hover:border-gold-700
        active:bg-gold-800 active:border-gold-800
        focus:ring-gold-500/30
        disabled:bg-gold-400 disabled:border-gold-400
        disabled:cursor-not-allowed disabled:opacity-60
      `,
        secondary: `
        bg-leather-700 text-white
        border-2 border-leather-700
        hover:bg-leather-800 hover:border-leather-800
        active:bg-leather-900 active:border-leather-900
        focus:ring-leather-500/30
        disabled:bg-leather-400 disabled:border-leather-400
        disabled:cursor-not-allowed disabled:opacity-60
      `,
        accent: `
        bg-stone-900 text-white
        border-2 border-stone-900
        hover:bg-leather-900 hover:border-leather-900
        active:bg-leather-800 active:border-leather-800
        focus:ring-stone-500/30
        disabled:bg-stone-500 disabled:border-stone-500
        disabled:cursor-not-allowed disabled:opacity-60
      `,
        ghost: `
        bg-transparent text-leather-900
        border-2 border-transparent
        hover:bg-stone-100 hover:text-gold-700
        active:bg-stone-200
        focus:ring-gold-500/15
        disabled:text-stone-400
        disabled:cursor-not-allowed disabled:opacity-60
        disabled:hover:bg-transparent
      `,
        destructive: `
        bg-semantic-error text-white
        border-2 border-semantic-error
        hover:bg-semantic-error/90 hover:border-semantic-error/90
        active:bg-semantic-error/80 active:border-semantic-error/80
        focus:ring-semantic-error/30
        disabled:bg-semantic-error/50 disabled:border-semantic-error/50
        disabled:cursor-not-allowed disabled:opacity-60
      `,
        outline: `
        bg-transparent text-leather-900
        border-2 border-stone-300
        hover:border-gold-500 hover:text-gold-700 hover:bg-gold-50
        active:border-gold-600 active:bg-gold-100
        focus:ring-gold-500/15
        disabled:border-stone-300 disabled:text-stone-400
        disabled:cursor-not-allowed disabled:opacity-60
        disabled:hover:bg-transparent disabled:hover:border-stone-300
      `,
    };

    // Check if button has only icon (no text)
    const isIconOnly = icon && !children;

    // Base classes
    const baseClasses = `inline-flex items-center justify-center font-body font-semibold transition-all focus:outline-none focus:ring-4 active:scale-95 disabled:active:scale-100 ${fullWidth ? 'w-full' : 'w-auto'} ${isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size]} ${shapeClasses[shape]} ${variantClasses[variant]} ${isLoading || disabled ? 'pointer-events-none' : ''} ${className}`;

    // Render icon with text or icon only
    const renderContent = () => {
        if (isLoading) {
            return (
                <>
                    <LoadingSpinner size={size} />
                    {!isIconOnly && <span className="opacity-70">{children}</span>}
                </>
            );
        }

        if (isIconOnly) {
            return icon;
        }

        if (icon && iconPosition === 'left') {
            return (
                <>
                    {icon}
                    <span>{children}</span>
                </>
            );
        }

        if (icon && iconPosition === 'right') {
            return (
                <>
                    <span>{children}</span>
                    {icon}
                </>
            );
        }

        return <span>{children}</span>;
    };

    // Common props for both button and anchor
    const commonProps = {
        className: baseClasses,
        'aria-disabled': isLoading || disabled,
        'aria-busy': isLoading,
    };

    if (as === "a") {
        const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;
        return (
            <a {...commonProps} {...anchorProps}>
                {renderContent()}
            </a>
        );
    }

    const buttonProps = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;
    return (
        <button
            type={buttonProps.type || 'button'}
            disabled={disabled || isLoading}
            {...commonProps}
            {...buttonProps}
        >
            {renderContent()}
        </button>
    );
};

// Icon Button - Convenience component for icon-only buttons
export interface IconButtonProps extends Omit<CustomButtonProps, 'children' | 'icon' | 'iconPosition'> {
    icon: React.ReactNode;
    'aria-label': string;
}

export function IconButton({ icon, ...props }: IconButtonProps) {
    // children intentionally null for icon-only button
    return (
        // cast is safe because IconButtonProps is a subset of CustomButtonProps
        <CustomButton icon={icon} {...(props as CustomButtonProps)}>
            {null}
        </CustomButton>
    );
}
