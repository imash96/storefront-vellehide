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
    href?: never;
}

// Anchor element props
interface AnchorElementProps extends BaseButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a';
    type?: never;
}

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

    // Variant classes using CSS variables
    const variantClasses = {
        primary: `
            bg-button-primary text-button-primary-foreground
            border-2 border-button-primary
            hover:bg-button-primary-hover hover:border-button-primary-hover
            active:bg-button-primary-active active:border-button-primary-active
            focus:ring-focus-ring/30
            disabled:opacity-60 disabled:cursor-not-allowed
        `,
        secondary: `
            bg-button-secondary text-button-secondary-foreground
            border-2 border-button-secondary
            hover:bg-button-secondary-hover hover:border-button-secondary-hover
            active:bg-button-secondary-active active:border-button-secondary-active
            focus:ring-focus-ring/30
            disabled:opacity-60 disabled:cursor-not-allowed
        `,
        accent: `
            bg-button-accent text-button-accent-foreground
            border-2 border-button-accent
            hover:bg-button-accent-hover hover:border-button-accent-hover
            active:bg-button-accent-active active:border-button-accent-active
            focus:ring-focus-ring/30
            disabled:opacity-60 disabled:cursor-not-allowed
        `,
        ghost: `
            bg-button-ghost text-button-ghost-foreground
            border-2 border-transparent
            hover:bg-button-ghost-hover
            active:bg-button-ghost-active
            focus:ring-focus-ring/15
            disabled:opacity-60 disabled:cursor-not-allowed
            disabled:hover:bg-transparent
        `,
        destructive: `
            bg-button-destructive text-button-destructive-foreground
            border-2 border-button-destructive
            hover:bg-button-destructive-hover hover:border-button-destructive-hover
            active:bg-button-destructive-active active:border-button-destructive-active
            focus:ring-destructive/30
            disabled:opacity-60 disabled:cursor-not-allowed
        `,
        outline: `
            bg-button-outline text-button-outline-foreground
            border-2 border-button-outline-border
            hover:border-primary hover:text-primary-foreground hover:bg-primary-subtle
            active:bg-primary
            focus:ring-focus-ring/15
            disabled:opacity-60 disabled:cursor-not-allowed
            disabled:hover:bg-transparent disabled:hover:border-button-outline-border
        `,
    };

    // Check if button has only icon (no text)
    const isIconOnly = icon && !children;

    // Base classes
    const baseClasses = `
        inline-flex items-center justify-center 
        font-body font-semibold 
        transition-all duration-200
        focus:outline-none focus:ring-4 
        active:scale-95 
        disabled:active:scale-100
        ${fullWidth ? 'w-full' : 'w-auto'} 
        ${isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size]} 
        ${shapeClasses[shape]} 
        ${variantClasses[variant]} 
        ${isLoading || disabled ? 'pointer-events-none' : ''} 
        ${className}
    `;

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
}

// Icon Button - Convenience component for icon-only buttons
export interface IconButtonProps extends Omit<CustomButtonProps, 'children' | 'icon' | 'iconPosition'> {
    icon: React.ReactNode;
    'aria-label': string;
}

export function IconButton({ icon, ...props }: IconButtonProps) {
    return (
        <CustomButton icon={icon} {...(props as CustomButtonProps)}>
            {null}
        </CustomButton>
    );
}