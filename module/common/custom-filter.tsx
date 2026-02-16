'use client';

import { useState } from 'react';

export interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

export interface FilterSection {
    id: string;
    title: string;
    type: 'checkbox' | 'radio' | 'range' | 'color';
    options?: FilterOption[];
    min?: number;
    max?: number;
    colors?: Array<{ name: string; hex: string; value: string }>;
}

export interface FilterPanelProps {
    sections: FilterSection[];
    values: Record<string, any>;
    onChange: (sectionId: string, value: any) => void;
    onReset?: () => void;
    showReset?: boolean;
    variant?: 'sidebar' | 'horizontal';
    className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    sections,
    values,
    onChange,
    onReset,
    showReset = true,
    variant = 'sidebar',
    className = '',
}) => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(sections.map((s) => s.id))
    );

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => {
            const next = new Set(prev);
            if (next.has(sectionId)) {
                next.delete(sectionId);
            } else {
                next.add(sectionId);
            }
            return next;
        });
    };

    const handleCheckboxChange = (sectionId: string, optionValue: string) => {
        const currentValues = values[sectionId] || [];
        const newValues = currentValues.includes(optionValue)
            ? currentValues.filter((v: string) => v !== optionValue)
            : [...currentValues, optionValue];
        onChange(sectionId, newValues);
    };

    const renderSection = (section: FilterSection) => {
        const isExpanded = expandedSections.has(section.id);

        return (
            <div key={section.id} className="border-b border-border last:border-b-0">
                {/* Section Header */}
                <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                >
                    <span className="font-semibold text-text-primary">{section.title}</span>
                    <svg
                        className={`w-5 h-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {/* Section Content */}
                {isExpanded && (
                    <div className="pb-4">
                        {section.type === 'checkbox' && section.options && (
                            <div className="space-y-2">
                                {section.options.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(values[section.id] || []).includes(option.value)}
                                            onChange={() => handleCheckboxChange(section.id, option.value)}
                                            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                                        />
                                        <span className="flex-1 text-text-secondary group-hover:text-text-primary transition-colors">
                                            {option.label}
                                        </span>
                                        {option.count !== undefined && (
                                            <span className="text-sm text-text-tertiary">
                                                ({option.count})
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}

                        {section.type === 'radio' && section.options && (
                            <div className="space-y-2">
                                {section.options.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            name={section.id}
                                            checked={values[section.id] === option.value}
                                            onChange={() => onChange(section.id, option.value)}
                                            className="w-4 h-4 border-border text-primary focus:ring-2 focus:ring-primary/20"
                                        />
                                        <span className="flex-1 text-text-secondary group-hover:text-text-primary transition-colors">
                                            {option.label}
                                        </span>
                                        {option.count !== undefined && (
                                            <span className="text-sm text-text-tertiary">
                                                ({option.count})
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}

                        {section.type === 'range' && section.min !== undefined && section.max !== undefined && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-secondary">
                                        ${values[section.id]?.[0] || section.min}
                                    </span>
                                    <span className="text-text-secondary">
                                        ${values[section.id]?.[1] || section.max}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={section.min}
                                    max={section.max}
                                    value={values[section.id]?.[1] || section.max}
                                    onChange={(e) =>
                                        onChange(section.id, [
                                            values[section.id]?.[0] || section.min,
                                            Number(e.target.value),
                                        ])
                                    }
                                    className="w-full"
                                />
                            </div>
                        )}

                        {section.type === 'color' && section.colors && (
                            <div className="flex flex-wrap gap-2">
                                {section.colors.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => {
                                            const currentValues = values[section.id] || [];
                                            const newValues = currentValues.includes(color.value)
                                                ? currentValues.filter((v: string) => v !== color.value)
                                                : [...currentValues, color.value];
                                            onChange(section.id, newValues);
                                        }}
                                        className={`
                                            relative w-10 h-10 rounded-full border-2 transition-all
                                            ${(values[section.id] || []).includes(color.value)
                                                ? 'border-primary ring-4 ring-primary/20'
                                                : 'border-border hover:border-primary'
                                            }
                                        `}
                                        title={color.name}
                                    >
                                        <span
                                            className="absolute inset-1 rounded-full"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        {(values[section.id] || []).includes(color.value) && (
                                            <svg
                                                className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                viewBox="0 0 24 24"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (variant === 'horizontal') {
        return (
            <div className={`flex flex-wrap gap-4 ${className}`}>
                {sections.map((section) => (
                    <div key={section.id} className="min-w-50">
                        {renderSection(section)}
                    </div>
                ))}
                {showReset && onReset && (
                    <button
                        onClick={onReset}
                        className="px-4 py-2 text-sm font-medium text-error hover:underline"
                    >
                        Reset Filters
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={`bg-surface rounded-lg border border-border ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                <h3 className="font-display font-semibold text-text-primary">Filters</h3>
                {showReset && onReset && (
                    <button
                        onClick={onReset}
                        className="text-sm font-medium text-error hover:underline"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Sections */}
            <div className="px-4">
                {sections.map(renderSection)}
            </div>
        </div>
    );
};

// Active Filters Display
export interface ActiveFiltersProps {
    filters: Record<string, any>;
    sections: FilterSection[];
    onRemove: (sectionId: string, value?: any) => void;
    onClearAll?: () => void;
    className?: string;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
    filters,
    sections,
    onRemove,
    onClearAll,
    className = '',
}) => {
    const getFilterLabel = (sectionId: string, value: any) => {
        const section = sections.find((s) => s.id === sectionId);
        if (!section) return value;

        if (section.type === 'color') {
            const color = section.colors?.find((c) => c.value === value);
            return color?.name || value;
        }

        const option = section.options?.find((o) => o.value === value);
        return option?.label || value;
    };

    const activeFilters: Array<{ sectionId: string; value: any; label: string }> = [];

    Object.entries(filters).forEach(([sectionId, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => {
                activeFilters.push({
                    sectionId,
                    value: v,
                    label: getFilterLabel(sectionId, v),
                });
            });
        } else if (value) {
            activeFilters.push({
                sectionId,
                value,
                label: getFilterLabel(sectionId, value),
            });
        }
    });

    if (activeFilters.length === 0) return null;

    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            <span className="text-sm text-text-secondary">Active filters:</span>
            {activeFilters.map((filter, index) => (
                <button
                    key={index}
                    onClick={() => onRemove(filter.sectionId, filter.value)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                    <span>{filter.label}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            ))}
            {onClearAll && (
                <button
                    onClick={onClearAll}
                    className="text-sm font-medium text-error hover:underline ml-2"
                >
                    Clear all
                </button>
            )}
        </div>
    );
};