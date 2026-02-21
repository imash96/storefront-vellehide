'use client'

import { Loader } from "lucide-react";
import Link from "next/link";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "primary" | "secondary" | "accent" | "ghost" | "destructive" | "outline";
type Shape = "rounded" | "square" | "pill";

type BaseButtonProps = {
    variant?: Variant;
    size?: Size;
    shape?: Shape;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

type ButtonElementProps = { href?: never } & BaseButtonProps & React.ComponentPropsWithoutRef<"button">

type AnchorElementProps = BaseButtonProps & React.ComponentPropsWithoutRef<typeof Link>

export type ButtonProps = ButtonElementProps | AnchorElementProps;

// -------------------- SIZE SYSTEM --------------------

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs min-h-[32px]",
    md: "px-4 py-2 text-sm min-h-[40px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
    xl: "px-8 py-4 text-lg min-h-[56px]",
}

const iconOnlySizeClasses: Record<Size, string> = {
    sm: "p-2 min-h-[32px] min-w-[32px]",
    md: "p-2.5 min-h-[40px] min-w-[40px]",
    lg: "p-3 min-h-[48px] min-w-[48px]",
    xl: "p-4 min-h-[56px] min-w-[56px]",
}

// -------------------- SHAPE --------------------

const shapeClasses: Record<Shape, string> = {
    rounded: "rounded-lg",
    square: "rounded-none",
    pill: "rounded-full",
}


// -------------------- VARIANTS (100% TOKEN BASED) --------------------

const variantClasses: Record<Variant, string> = {
    primary: "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover active:bg-button-primary-active",
    secondary: "bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover active:bg-button-secondary-active",
    accent: "bg-button-accent text-button-accent-foreground hover:bg-button-accent-hover active:bg-button-accent-active",
    destructive: "bg-button-destructive text-button-destructive-foreground hover:bg-button-destructive-hover active:bg-button-destructive-active",
    ghost: "bg-button-ghost text-button-ghost-foreground hover:bg-button-ghost-hover active:bg-button-ghost-active",
    outline: "bg-button-outline text-button-outline-foreground border border-button-outline-border hover:bg-button-outline-hover hover:text-button-outline-hover-foreground",
}

// -------------------- SPINNER --------------------

function LoadingSpinner({ size }: { size: Size }) {
    const spinnerSizeMap: Record<Size, string> = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
    }

    return (
        <Loader className={`animate-spin shrink-0 ${spinnerSizeMap[size]}`} />
    )
}

export default function Button({
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
}: ButtonProps) {
    const isIconOnly = icon && !children
    const isDisabled = disabled || isLoading

    // Base classes
    const baseClasses = `inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed ${!isDisabled && "active:scale-[0.97]"} ${fullWidth ? "w-full" : "w-auto"} ${isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size]}        ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`

    // Render icon with text or icon only
    const content = (
        <>
            {isLoading && <LoadingSpinner size={size} />}
            {!isIconOnly && (
                <span className={`${isLoading && "opacity-70"}`}>
                    {children}
                </span>
            )}
            {!isLoading && icon && iconPosition === "left" && !isIconOnly && icon}
            {!isLoading && icon && iconPosition === "right" && !isIconOnly && icon}
            {isIconOnly && !isLoading && icon}
        </>
    )

    // -------------------- LINK --------------------

    if ("href" in rest && rest.href) {
        if (isDisabled) {
            return (
                <span className={baseClasses} aria-disabled="true">
                    {content}
                </span>
            )
        }

        return (
            <Link {...rest} className={baseClasses}>
                {content}
            </Link>
        )
    }

    // -------------------- BUTTON --------------------

    return (
        <button
            type="button"
            disabled={isDisabled}
            className={baseClasses}
            {...(rest as any)}
        >
            {content}
        </button>
    )
}

// Icon Button - Convenience component for icon-only buttons
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
    icon: React.ReactNode;
    'aria-label': string;
}

export function IconButton({ icon, ...props }: Omit<ButtonProps, "children" | "iconPosition">) {
    return (
        <Button icon={icon} {...(props as ButtonProps)}>
            {null}
        </Button>
    );
}