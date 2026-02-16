'use client';

import { useState } from 'react';

export interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    formatLabel?: (value: number) => string;
    showLabels?: boolean;
    showTooltip?: boolean;
    className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
    min,
    max,
    step = 1,
    value: controlledValue,
    defaultValue = [min, max],
    onChange,
    formatLabel = (val) => val.toString(),
    showLabels = true,
    showTooltip = true,
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState<[number, number]>(controlledValue || defaultValue);
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

    const value = controlledValue || internalValue;
    const [minValue, maxValue] = value;

    const getPercentage = (val: number) => {
        return ((val - min) / (max - min)) * 100;
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), maxValue - step);
        const newValue: [number, number] = [newMin, maxValue];
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), minValue + step);
        const newValue: [number, number] = [minValue, newMax];
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Labels */}
            {showLabels && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-text-secondary mb-1">Min</span>
                        <span className="text-sm font-semibold text-text-primary">
                            {formatLabel(minValue)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-text-secondary mb-1">Max</span>
                        <span className="text-sm font-semibold text-text-primary">
                            {formatLabel(maxValue)}
                        </span>
                    </div>
                </div>
            )}

            {/* Slider Container */}
            <div className="relative h-2">
                {/* Track Background */}
                <div className="absolute inset-0 bg-muted rounded-full" />

                {/* Active Track */}
                <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{
                        left: `${getPercentage(minValue)}%`,
                        right: `${100 - getPercentage(maxValue)}%`,
                    }}
                />

                {/* Min Thumb */}
                <div className="relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minValue}
                        onChange={handleMinChange}
                        onMouseDown={() => setIsDragging('min')}
                        onMouseUp={() => setIsDragging(null)}
                        onTouchStart={() => setIsDragging('min')}
                        onTouchEnd={() => setIsDragging(null)}
                        className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
                    />
                    {showTooltip && isDragging === 'min' && (
                        <div
                            className="absolute -top-10 left-0 px-2 py-1 bg-tooltip text-tooltip-foreground text-xs rounded whitespace-nowrap shadow-lg"
                            style={{ left: `${getPercentage(minValue)}%`, transform: 'translateX(-50%)' }}
                        >
                            {formatLabel(minValue)}
                        </div>
                    )}
                </div>

                {/* Max Thumb */}
                <div className="relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxValue}
                        onChange={handleMaxChange}
                        onMouseDown={() => setIsDragging('max')}
                        onMouseUp={() => setIsDragging(null)}
                        onTouchStart={() => setIsDragging('max')}
                        onTouchEnd={() => setIsDragging(null)}
                        className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
                    />
                    {showTooltip && isDragging === 'max' && (
                        <div
                            className="absolute -top-10 left-0 px-2 py-1 bg-tooltip text-tooltip-foreground text-xs rounded whitespace-nowrap shadow-lg"
                            style={{ left: `${getPercentage(maxValue)}%`, transform: 'translateX(-50%)' }}
                        >
                            {formatLabel(maxValue)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Price Range Slider (specialized for prices)
export interface PriceRangeSliderProps {
    min: number;
    max: number;
    value?: [number, number];
    onChange?: (value: [number, number]) => void;
    currency?: string;
    locale?: string;
    className?: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
    min,
    max,
    value,
    onChange,
    currency = 'USD',
    locale = 'en-US',
    className = '',
}) => {
    const formatPrice = (val: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <RangeSlider
            min={min}
            max={max}
            step={10}
            value={value}
            onChange={onChange}
            formatLabel={formatPrice}
            showLabels={true}
            showTooltip={true}
            className={className}
        />
    );
};