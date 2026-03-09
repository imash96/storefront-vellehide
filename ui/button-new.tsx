import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────
export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "destructive" | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "square" | "pill";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
    fullWidth?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    isLoading?: boolean;
    href?: string;
    children?: ReactNode;
}

// ── Size system ───────────────────────────────────────────────────────
const sizeClasses: Record<ButtonSize, string> = {
    xs: "px-2.5 py-1 text-[10px] min-h-[28px] gap-1",
    sm: "px-3.5 py-1.5 text-xs min-h-[32px] gap-1.5",
    md: "px-5 py-2.5 text-sm min-h-[40px] gap-2",
    lg: "px-7 py-3 text-base min-h-[48px] gap-2.5",
    xl: "px-9 py-4 text-lg min-h-[56px] gap-3",
};

const iconOnlySizes: Record<ButtonSize, string> = {
    xs: "p-1.5 min-h-[28px] min-w-[28px]",
    sm: "p-2 min-h-[32px] min-w-[32px]",
    md: "p-2.5 min-h-[40px] min-w-[40px]",
    lg: "p-3 min-h-[48px] min-w-[48px]",
    xl: "p-4 min-h-[56px] min-w-[56px]",
};

const iconSizes: Record<ButtonSize, string> = {
    xs: "size-3",
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
    xl: "size-6",
};

// ── Shape system ──────────────────────────────────────────────────────
const shapeClasses: Record<ButtonShape, string> = {
    rounded: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full",
};

// ── Color variants (token-based) ──────────────────────────────────────
const colorVariants: Record<ButtonVariant, string> = {
    primary: "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover active:bg-button-primary-active shadow-sm hover:shadow-md",
    secondary: "bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover active:bg-button-secondary-active",
    accent: "bg-button-accent text-button-accent-foreground hover:bg-button-accent-hover active:bg-button-accent-active shadow-sm hover:shadow-md",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:opacity-90",
    ghost: "bg-button-ghost text-button-ghost-foreground hover:bg-button-ghost-hover active:bg-button-ghost-active",
    outline: "bg-button-outline text-button-outline-foreground border-2 border-button-outline-border hover:bg-button-outline-hover hover:text-button-outline-hover-foreground hover:border-transparent",
};

// ═══════════════════════════════════════════════════════════════════════
// BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function Button({
    variant = "primary",
    size = "md",
    shape = "rounded",
    fullWidth = false,
    icon,
    iconPosition = "left",
    isLoading = false,
    disabled = false,
    className = "",
    children,
    ...rest
}: ButtonProps) {
    const isIconOnly = icon && !children;
    const isDisabled = disabled || isLoading;

    const classes = `inline-flex items-center justify-center font-body transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl shadow-lg hover:shadow-xl font-semibold hover:scale-[1.02] active:scale-[0.98] ${!isDisabled && "active:scale-[0.97]"} ${fullWidth ? "w-full" : "w-auto"} ${isIconOnly ? iconOnlySizes[size] : sizeClasses[size]} ${shapeClasses[shape]} ${colorVariants[variant]} ${className}`;

    const renderIcon = () => {
        if (!icon) return null;
        return <span className={`inline-flex shrink-0 ${iconSizes[size]}`}>{icon}</span>;
    };

    const content = (
        <>
            {isLoading && <Loader2 className={`animate-spin shrink-0 ${iconSizes[size]}`} strokeWidth={2} />}
            {!isLoading && iconPosition === "left" && !isIconOnly && renderIcon()}
            {!isIconOnly && (
                <span className={`inline-block ${isLoading && "opacity-70"}`}>{children}</span>
            )}
            {!isLoading && iconPosition === "right" && !isIconOnly && renderIcon()}
            {isIconOnly && !isLoading && renderIcon()}
        </>
    );
    // -------------------- LINK VARIANT --------------------
    if ("href" in rest && rest.href) {
        if (isDisabled) {
            return (
                <span className={classes} aria-disabled="true" {...(rest as React.ComponentPropsWithoutRef<'span'>)}>
                    {content}
                </span>
            )
        }
        return (
            <Link className={classes} {...(rest as React.ComponentPropsWithoutRef<typeof Link>)}>
                {content}
            </Link>
        );
    }
    // -------------------- BUTTON VARIANT --------------------
    return (
        <button type="button" disabled={isDisabled} className={classes} {...rest}>
            {content}
        </button>
    );
};