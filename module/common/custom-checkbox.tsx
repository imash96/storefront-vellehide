'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

export interface CustomCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label: string;
    description?: string;
    error?: boolean;
    checkboxSize?: 'sm' | 'md' | 'lg';
    indeterminate?: boolean;
}

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

const CheckIcon = ({ size, checked, disabled }: { size: string; checked?: boolean; disabled?: boolean }) => (
    <svg
        className={`${size} text-primary-foreground transition-all absolute ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${disabled && 'text-text-disabled'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const IndeterminateIcon = ({ size, indeterminate, disabled }: { size: string; indeterminate?: boolean; disabled?: boolean }) => (
    <svg
        className={`${size} text-primary-foreground transition-all absolute ${indeterminate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${disabled && 'text-text-disabled'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
    >
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

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
                    className={`${sizeClasses[checkboxSize].checkbox} relative flex items-center justify-center rounded border-2 transition-all cursor-pointer ${disabled ? 'border-border-subtle bg-input-disabled-background cursor-not-allowed' : error ? 'border-error' : 'border-border'} peer-checked:border-primary peer-checked:bg-primary peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-focus-ring/20 peer-disabled:border-border-subtle peer-disabled:bg-input-disabled-background peer-disabled:cursor-not-allowed ${!disabled && !error && 'hover:border-primary hover:bg-primary-subtle/50'}`}
                >
                    {/* Check Icon */}
                    <CheckIcon size={sizeClasses[checkboxSize].icon} checked={checked && !indeterminate} disabled={disabled} />
                    {/* Indeterminate Icon (horizontal line) */}
                    <IndeterminateIcon size={sizeClasses[checkboxSize].icon} indeterminate={indeterminate} disabled={disabled} />
                </label>
            </div>

            {/* Label and Description */}
            <div className="ml-3 flex-1">
                <label
                    htmlFor={checkboxId}
                    className={`${sizeClasses[checkboxSize].label} font-body font-medium block cursor-pointer transition-colors ${disabled ? 'text-text-disabled cursor-not-allowed' : error ? 'text-error' : 'text-text-primary'} ${!disabled && 'hover:text-primary'}`}
                >
                    {label}
                </label>
                {description && (
                    <p className={`${sizeClasses[checkboxSize].description} mt-0.5 font-body transition-colors ${disabled ? 'text-text-disabled' : 'text-text-secondary'}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

// CheckboxGroup Component with proper TypeScript typing
export interface CheckboxGroupProps {
    value?: string[];
    onChange?: (value: string[]) => void;
    children: React.ReactNode;
    layout?: 'vertical' | 'horizontal';
    label?: string;
    error?: string;
    className?: string;
}

const layoutClasses = {
    vertical: 'flex flex-col gap-3',
    horizontal: 'flex flex-row flex-wrap gap-4',
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    value = [],
    onChange,
    children,
    layout = 'vertical',
    label,
    error,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = (checkboxValue: string, isChecked: boolean) => {
        const newValue = isChecked ? [...internalValue, checkboxValue] : internalValue.filter((v) => v !== checkboxValue);
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    // Clone children and inject checked and onChange props with proper typing
    const checkboxes = React.Children.map(children, (child) => {
        // Type guard to check if child is a valid React element
        if (React.isValidElement(child)) {
            // Extract props safely with proper typing
            const childProps = child.props as { value?: string };
            const checkboxValue = childProps.value;

            if (checkboxValue !== undefined) {
                const currentValue = value.length > 0 ? value : internalValue;
                // Clone element with injected props
                return React.cloneElement(
                    child as React.ReactElement<CustomCheckboxProps>,
                    {
                        checked: currentValue.includes(checkboxValue),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(checkboxValue, e.target.checked);
                        },
                        error: !!error,
                    }
                );
            }
        }
        return child;
    });

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-text-primary mb-2">
                    {label}
                </label>
            )}
            <div className={layoutClasses[layout]} role="group">
                {checkboxes}
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};