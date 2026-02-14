'use client';

import { useEffect, useId, useRef } from 'react';

export interface CustomCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label: string;
    description?: string;
    error?: boolean;
    checkboxSize?: 'sm' | 'md' | 'lg';
    indeterminate?: boolean;
}

export default function CustomCheckbox({
    label,
    description,
    error,
    checkboxSize = 'md',
    indeterminate = false,
    className = '',
    disabled,
    checked,
    ...props
}: CustomCheckboxProps) {
    const id = useId();
    const checkboxId = props.id || id;
    const inputRef = useRef<HTMLInputElement>(null);

    // Set indeterminate state
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const sizeClasses = {
        sm: {
            checkbox: 'w-4 h-4',
            label: 'text-sm',
            description: 'text-xs',
            icon: 'w-3 h-3',
        },
        md: {
            checkbox: 'w-5 h-5',
            label: 'text-base',
            description: 'text-sm',
            icon: 'w-3.5 h-3.5',
        },
        lg: {
            checkbox: 'w-6 h-6',
            label: 'text-lg',
            description: 'text-base',
            icon: 'w-4 h-4',
        },
    };

    return (
        <div className={`flex items-start ${className}`}>
            <div className="flex items-center h-6">
                {/* Hidden native checkbox input */}
                <input
                    ref={inputRef}
                    type="checkbox"
                    id={checkboxId}
                    disabled={disabled}
                    checked={checked}
                    className="sr-only peer"
                    {...props}
                />

                {/* Custom Checkbox */}
                <label
                    htmlFor={checkboxId}
                    className={`${sizeClasses[checkboxSize].checkbox} relative flex items-center justify-center rounded border-2 transition-all cursor-pointer ${disabled ? 'border-stone-300 bg-stone-100 cursor-not-allowed' : error ? 'border-semantic-error' : 'border-stone-400'} peer-checked:border-gold-600 peer-checked:bg-gold-600 peer-indeterminate:border-gold-600 peer-indeterminate:bg-gold-600 peer-focus-visible:ring-4 peer-focus-visible:ring-gold-500/15 peer-disabled:border-stone-300 peer-disabled:bg-stone-100 peer-disabled:cursor-not-allowed ${!disabled && !error && 'hover:border-gold-500'}`}
                >
                    {/* Check Icon */}
                    <svg
                        className={`${sizeClasses[checkboxSize].icon} text-white transition-all absolute ${checked && !indeterminate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${disabled && 'text-stone-400'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>

                    {/* Indeterminate Icon (horizontal line) */}
                    <svg
                        className={`${sizeClasses[checkboxSize].icon} text-white transition-all absolute ${indeterminate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${disabled && 'text-stone-400'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </label>
            </div>

            {/* Label and Description */}
            <div className="ml-3 flex-1">
                <label
                    htmlFor={checkboxId}
                    className={`${sizeClasses[checkboxSize].label} font-body font-medium block cursor-pointer transition-colors ${disabled ? 'text-stone-500 cursor-not-allowed' : error ? 'text-semantic-error' : 'text-leather-900'} ${!disabled && 'hover:text-gold-700'}`}
                >
                    {label}
                </label>

                {description && (
                    <p
                        className={`${sizeClasses[checkboxSize].description} mt-0.5 font-body transition-colors ${disabled ? 'text-stone-400' : 'text-stone-600'}`}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};