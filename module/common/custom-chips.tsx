'use client';

import Image from 'next/image';
import { useState } from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    onRemove?: () => void;
    variant?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    avatar?: string;
    clickable?: boolean;
}

export const Chip = ({
    label,
    onRemove,
    variant = 'default',
    size = 'md',
    icon,
    avatar,
    clickable = false,
    className = '',
    onClick,
    ...props
}: ChipProps) => {
    const variantClasses = {
        default: 'bg-muted text-text-primary border-border',
        primary: 'bg-primary text-primary-foreground border-primary',
        success: 'bg-success text-success-foreground border-success',
        error: 'bg-error text-error-foreground border-error',
        warning: 'bg-warning text-warning-foreground border-warning',
        outline: 'bg-transparent text-text-primary border-border',
    };

    const sizeClasses = {
        sm: 'h-6 px-2 text-xs gap-1',
        md: 'h-8 px-3 text-sm gap-1.5',
        lg: 'h-10 px-4 text-base gap-2',
    };

    return (
        <div
            className={`
                    inline-flex items-center
                    rounded-full border
                    font-medium
                    transition-all
                    ${variantClasses[variant]}
                    ${sizeClasses[size]}
                    ${clickable || onClick ? 'cursor-pointer hover:opacity-80' : ''}
                    ${className}
                `}
            onClick={onClick}
            {...props}
        >
            {/* Avatar */}
            {avatar && (
                <Image
                    src={avatar}
                    alt=""
                    className={`
                            rounded-full object-cover
                            ${size === 'sm' ? 'w-4 h-4 -ml-1' : size === 'md' ? 'w-5 h-5 -ml-1.5' : 'w-6 h-6 -ml-2'}
                        `}
                />
            )}

            {/* Icon */}
            {icon && !avatar && (
                <span className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}>
                    {icon}
                </span>
            )}

            {/* Label */}
            <span>{label}</span>

            {/* Remove Button */}
            {onRemove && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className={`
                            rounded-full
                            hover:bg-black/10 transition-colors
                            ${size === 'sm' ? 'w-3 h-3 -mr-1' : size === 'md' ? 'w-4 h-4 -mr-1' : 'w-5 h-5 -mr-1.5'}
                        `}
                    aria-label="Remove"
                >
                    <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
};

// Filter Chip (for product filtering)
export interface FilterChipProps extends React.HTMLAttributes<HTMLButtonElement> {
    label: string;
    onRemove?: () => void;
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    avatar?: string;
    clickable?: boolean;
    active?: boolean;
    count?: number;
}

export function FilterChip({
    label,
    active = false,
    count,
    onClick,
    className = '',
    ...props
}: FilterChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                inline-flex items-center gap-2
                h-10 px-4 rounded-full
                border-2 font-medium text-sm
                transition-all
                ${active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-transparent text-text-primary hover:border-primary hover:bg-primary-subtle'
                }
                ${className}
            `}
            {...props}
        >
            <span>{label}</span>
            {count !== undefined && (
                <span
                    className={`
                        px-1.5 py-0.5 rounded-full text-xs font-bold
                        ${active ? 'bg-primary-foreground text-primary' : 'bg-muted text-text-secondary'}
                    `}
                >
                    {count}
                </span>
            )}
        </button>
    );
};

// Tag Input (for adding multiple tags)
export interface TagInputProps {
    tags: string[];
    onAdd?: (tag: string) => void;
    onRemove?: (index: number) => void;
    placeholder?: string;
    maxTags?: number;
    className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
    tags,
    onAdd,
    onRemove,
    placeholder = 'Add tag...',
    maxTags,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!maxTags || tags.length < maxTags) {
                onAdd?.(inputValue.trim());
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            onRemove?.(tags.length - 1);
        }
    };

    return (
        <div
            className={`
                flex flex-wrap items-center gap-2
                p-3 rounded-lg border border-border
                bg-input-background
                focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20
                transition-all
                ${className}
            `}
        >
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    size="sm"
                    onRemove={() => onRemove?.(index)}
                />
            ))}

            {(!maxTags || tags.length < maxTags) && (
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 min-w-30 outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                />
            )}
        </div>
    );
};

// Category Tag (for product categories)
export interface CategoryTagProps {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
    label,
    icon,
    href,
    onClick,
    className = '',
}) => {
    const content = (
        <span className="flex items-center gap-2">
            {icon && <span className="w-4 h-4">{icon}</span>}
            <span>{label}</span>
        </span>
    );

    const baseClasses = `
        inline-flex items-center gap-2
        px-4 py-2 rounded-lg
        bg-surface border border-border
        text-sm font-medium text-text-primary
        hover:border-primary hover:bg-primary-subtle
        transition-all
        ${className}
    `;

    if (href) {
        return (
            <a href={href} className={baseClasses}>
                {content}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={baseClasses}>
            {content}
        </button>
    );
};