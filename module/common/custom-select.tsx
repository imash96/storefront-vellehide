'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useId, useRef, useEffect } from 'react';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface FloatingLabelSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label: string;
    options: SelectOption[];
    error?: string;
    helperText?: string;
    variant?: 'default' | 'filled';
    selectSize?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    placeholder?: string;
}

export default function CustomSelect({
    label,
    options,
    error,
    helperText,
    variant = 'default',
    selectSize = 'md',
    fullWidth = false,
    placeholder,
    className = '',
    disabled,
    value,
    defaultValue,
    ...props
}: FloatingLabelSelectProps) {
    const id = useId();
    const selectId = props.id || id;
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const hasValue = value !== undefined ? String(value).length > 0 : String(selectedValue).length > 0;
    const isFloating = isFocused || isOpen || hasValue;

    const selectedOption = options.find(opt => opt.value === (value || selectedValue));
    const displayText = selectedOption?.label || placeholder || '';

    const sizeClasses = {
        sm: 'h-11 text-sm',
        md: 'h-12 text-base',
        lg: 'h-14 text-lg',
    };

    const labelSizeClasses = {
        sm: {
            default: 'text-sm',
            floating: 'text-xs',
            top: 'top-3',
            floatingTop: 'top-1.5',
        },
        md: {
            default: 'text-base',
            floating: 'text-xs',
            top: 'top-3.5',
            floatingTop: 'top-2',
        },
        lg: {
            default: 'text-lg',
            floating: 'text-sm',
            top: 'top-4',
            floatingTop: 'top-2.5',
        },
    };

    const optionSizeClasses = {
        sm: 'py-2 text-sm',
        md: 'py-2.5 text-base',
        lg: 'py-3 text-lg',
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                setIsOpen(!isOpen);
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) setIsOpen(true);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) setIsOpen(true);
                break;
        }
    };

    const handleOptionClick = (option: SelectOption) => {
        if (option.disabled) return;

        setSelectedValue(option.value);
        setIsOpen(false);

        // Create and dispatch change event
        if (selectRef.current) {
            selectRef.current.value = option.value;
            const event = new Event('change', { bubbles: true });
            selectRef.current.dispatchEvent(event);
        }

        props.onChange?.({
            target: { value: option.value },
        } as React.ChangeEvent<HTMLSelectElement>);
    };

    return (
        <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${className}`} ref={containerRef}>
            <div className="relative">
                {/* Hidden native select for form submission and accessibility */}
                <select
                    id={selectId}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom Select Button */}
                <button
                    type="button"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-labelledby={`${selectId}-label`}
                    aria-controls={`${selectId}-listbox`}
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    className={`${sizeClasses[selectSize]} ${fullWidth ? 'w-full' : 'w-auto'} px-4 pr-10 pt-5 pb-1 rounded-md border font-body text-left transition-all outline-none ${variant === 'filled' ? 'bg-stone-100' : 'bg-white'} ${error ? 'border-semantic-error focus:border-semantic-error' : disabled ? 'border-stone-300 bg-stone-50 cursor-not-allowed' : isFocused || isOpen ? 'border-gold-500 ring-4 ring-gold-500/15' : 'border-stone-300 hover:border-stone-400'} ${disabled ? 'text-stone-500' : hasValue ? 'text-leather-900' : 'text-stone-500'} `}                >
                    <span className="block truncate">{displayText}</span>

                    {/* Chevron Icon */}
                    <span className={` absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} ${disabled ? 'text-stone-400' : 'text-stone-600'}`}
                    >
                        <ChevronDown />
                    </span>
                </button>

                {/* Floating Label */}
                <label
                    id={`${selectId}-label`}
                    className={`absolute left-4 pointer-events-none transition-all font-body origin-left ${isFloating ? `${labelSizeClasses[selectSize].floating} ${labelSizeClasses[selectSize].floatingTop} scale-90` : `${labelSizeClasses[selectSize].default} ${labelSizeClasses[selectSize].top} scale-100`} ${error ? 'text-semantic-error' : disabled ? 'text-stone-500' : isFloating ? 'text-gold-600' : 'text-stone-600'}`}
                >
                    {label}
                </label>

                {/* Dropdown Options */}
                {isOpen && !disabled && (
                    <div
                        id={`${selectId}-listbox`}
                        role="listbox"
                        className={`absolute z-50 w-full mt-1 bg-white border border-stone-300 rounded-md shadow-lg max-h-60 overflow-auto animate-in fade-in slide-in-from-top-1`}
                    >
                        {options.map((option) => {
                            const isSelected = (value || selectedValue) === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    disabled={option.disabled}
                                    onClick={() => handleOptionClick(option)}
                                    className={`w-full px-4 ${optionSizeClasses[selectSize]} text-left font-body transition-colors ${option.disabled ? 'text-stone-400 cursor-not-allowed' : isSelected ? 'bg-gold-50 text-leather-900' : 'text-leather-900 hover:bg-stone-50'}`}
                                >
                                    <span className="flex items-center justify-between">
                                        <span className="truncate">{option.label}</span>
                                        {isSelected && (
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-gold-600 ml-2 shrink-0"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Error or Helper Text */}
            {(error || helperText) && (
                <p
                    id={error ? `${selectId}-error` : `${selectId}-helper`}
                    className={`mt-1.5 text-xs font-body transition-colors ${error ? 'text-semantic-error' : 'text-stone-600'}`}
                    role={error ? 'alert' : undefined}
                >
                    {error || helperText}
                </p>
            )}
        </div>
    );
};