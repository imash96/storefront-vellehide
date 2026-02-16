'use client';

import { useState } from 'react';

export interface QuantitySelectorProps {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    showInput?: boolean;
    className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    value: controlledValue,
    min = 1,
    max = 99,
    step = 1,
    onChange,
    size = 'md',
    disabled = false,
    showInput = false,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(controlledValue || min);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const sizeClasses = {
        sm: {
            button: 'w-7 h-7 text-sm',
            input: 'w-12 h-7 text-sm',
        },
        md: {
            button: 'w-9 h-9 text-base',
            input: 'w-14 h-9 text-base',
        },
        lg: {
            button: 'w-11 h-11 text-lg',
            input: 'w-16 h-11 text-lg',
        },
    };

    const handleIncrement = () => {
        if (value < max) {
            const newValue = Math.min(value + step, max);
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            const newValue = Math.max(value - step, min);
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <div className={`inline-flex items-center rounded-lg border border-border bg-surface ${className}`}>
            {/* Decrement Button */}
            <button
                type="button"
                onClick={handleDecrement}
                disabled={disabled || value <= min}
                className={`
                    ${sizeClasses[size].button}
                    flex items-center justify-center
                    border-r border-border
                    text-text-primary
                    transition-colors
                    ${disabled || value <= min
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-muted active:bg-muted-hover'
                    }
                `}
                aria-label="Decrease quantity"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>

            {/* Value Display or Input */}
            {showInput ? (
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    className={`
                        ${sizeClasses[size].input}
                        text-center font-semibold
                        bg-transparent
                        border-none outline-none
                        text-text-primary
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                    `}
                />
            ) : (
                <span
                    className={`
                        ${sizeClasses[size].input}
                        flex items-center justify-center
                        font-semibold text-text-primary
                    `}
                >
                    {value}
                </span>
            )}

            {/* Increment Button */}
            <button
                type="button"
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                className={`
                    ${sizeClasses[size].button}
                    flex items-center justify-center
                    border-l border-border
                    text-text-primary
                    transition-colors
                    ${disabled || value >= max
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-muted active:bg-muted-hover'
                    }
                `}
                aria-label="Increase quantity"
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
};

// Compact Quantity Selector (icon only)
export interface CompactQuantitySelectorProps extends QuantitySelectorProps {
    onRemove?: () => void;
}

export const CompactQuantitySelector: React.FC<CompactQuantitySelectorProps> = ({
    value: controlledValue,
    min = 0,
    max = 99,
    step = 1,
    onChange,
    onRemove,
    disabled = false,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(controlledValue || 1);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleIncrement = () => {
        if (value < max) {
            const newValue = value + step;
            setInternalValue(newValue);
            onChange?.(newValue);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            if (value - step <= 0 && onRemove) {
                onRemove();
            } else {
                const newValue = Math.max(value - step, min);
                setInternalValue(newValue);
                onChange?.(newValue);
            }
        }
    };

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <button
                type="button"
                onClick={handleDecrement}
                disabled={disabled}
                className={`
                    w-8 h-8 flex items-center justify-center
                    rounded-full border-2 border-border
                    text-text-primary
                    transition-all
                    ${disabled
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:border-primary hover:bg-primary-subtle active:scale-95'
                    }
                `}
                aria-label="Decrease quantity"
            >
                <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>

            <span className="min-w-8 text-center font-semibold text-text-primary">
                {value}
            </span>

            <button
                type="button"
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                className={`
                    w-8 h-8 flex items-center justify-center
                    rounded-full border-2 border-border
                    text-text-primary
                    transition-all
                    ${disabled || value >= max
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:border-primary hover:bg-primary-subtle active:scale-95'
                    }
                `}
                aria-label="Increase quantity"
            >
                <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
};