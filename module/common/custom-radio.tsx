'use client';

import { useId } from 'react';

export interface CustomRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label: string;
    description?: string;
    error?: boolean;
    radioSize?: 'sm' | 'md' | 'lg';
}

export default function CustomRadio({
    label,
    description,
    error,
    radioSize = 'md',
    className = '',
    disabled,
    checked,
    ...props
}: CustomRadioProps) {
    const id = useId();
    const radioId = props.id || id;

    const sizeClasses = {
        sm: {
            radio: 'w-4 h-4',
            dot: 'w-1.5 h-1.5',
            label: 'text-sm',
            description: 'text-xs',
        },
        md: {
            radio: 'w-5 h-5',
            dot: 'w-2 h-2',
            label: 'text-base',
            description: 'text-sm',
        },
        lg: {
            radio: 'w-6 h-6',
            dot: 'w-2.5 h-2.5',
            label: 'text-lg',
            description: 'text-base',
        },
    };

    return (
        <div className={`flex items-start ${className}`}>
            <div className="flex items-center h-6">
                {/* Hidden native radio input */}
                <input
                    type="radio"
                    id={radioId}
                    disabled={disabled}
                    checked={checked}
                    className="sr-only peer"
                    {...props}
                />

                {/* Custom Radio Button */}
                <label
                    htmlFor={radioId}
                    className={`${sizeClasses[radioSize].radio} relative flex items-center justify-center rounded-full border-2 transition-all cursor-pointer ${disabled ? 'border-stone-300 bg-stone-100 cursor-not-allowed' : error ? 'border-semantic-error' : 'border-stone-400'} peer-checked:border-gold-600 peer-checked:bg-gold-50 peer-focus-visible:ring-4 peer-focus-visible:ring-gold-500/15 peer-disabled:border-stone-300 peer-disabled:bg-stone-100 peer-disabled:cursor-not-allowed ${!disabled && !error && 'hover:border-gold-500 hover:bg-gold-50/50'}`}
                >
                    {/* Inner dot */}
                    <span
                        className={`${sizeClasses[radioSize].dot} rounded-full bg-gold-600 transition-all ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${disabled && 'bg-stone-400'}`}
                    />
                </label>
            </div>

            {/* Label and Description */}
            <div className="ml-3 flex-1">
                <label
                    htmlFor={radioId}
                    className={`${sizeClasses[radioSize].label} font-body font-medium block cursor-pointer transition-colors ${disabled ? 'text-stone-500 cursor-not-allowed' : error ? 'text-semantic-error' : 'text-leather-900'} ${!disabled && 'hover:text-gold-700'}`}
                >
                    {label}
                </label>

                {description && (
                    <p
                        className={`${sizeClasses[radioSize].description} mt-0.5 font-body transition-colors ${disabled ? 'text-stone-400' : 'text-stone-600'} `}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};