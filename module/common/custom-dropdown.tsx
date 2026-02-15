'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Fragment } from 'react/jsx-runtime';

import "@/css/dropdown.css"

export interface DropdownMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    onSelect?: () => void;
    disabled?: boolean;
    variant?: 'default' | 'danger';
}

export interface DropdownMenuSection {
    id: string;
    label?: string;
    items: DropdownMenuItem[];
}

export interface CustomDropdownMenuProps {
    trigger: React.ReactNode;
    sections?: DropdownMenuSection[];
    items?: DropdownMenuItem[];
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
}

export const CustomDropdownMenu: React.FC<CustomDropdownMenuProps> = ({
    trigger,
    sections,
    items,
    align = 'end',
    sideOffset = 8,
    className = '',
}) => {
    // Normalize input - either sections or items
    const normalizedSections: DropdownMenuSection[] = sections || (items ? [{ id: 'main', items }] : []);

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                {trigger}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={`dropdown-content ${className}`}
                    align={align}
                    sideOffset={sideOffset}
                >
                    {normalizedSections.map((section, sectionIndex) => (
                        <Fragment key={section.id}>
                            {section.label && (
                                <DropdownMenu.Label className="dropdown-label">
                                    {section.label}
                                </DropdownMenu.Label>
                            )}

                            {section.items.map((item) => (
                                <DropdownMenu.Item
                                    key={item.id}
                                    className={`dropdown-item ${item.variant === 'danger' ? 'dropdown-item-danger' : ''
                                        }`}
                                    onSelect={item.onSelect}
                                    disabled={item.disabled}
                                >
                                    <div className="dropdown-item-content">
                                        {item.icon && (
                                            <span className="dropdown-item-icon">{item.icon}</span>
                                        )}
                                        <span
                                            className="dropdown-item-label"
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    {item.shortcut && (
                                        <span
                                            className="dropdown-item-shortcut"
                                        >
                                            {item.shortcut}
                                        </span>
                                    )}
                                </DropdownMenu.Item>
                            ))}

                            {sectionIndex < normalizedSections.length - 1 && (
                                <DropdownMenu.Separator className="dropdown-separator" />
                            )}
                        </Fragment>
                    ))}

                    <DropdownMenu.Arrow className="dropdown-arrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

// Checkbox Menu Item
export interface DropdownCheckboxItemProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    disabled?: boolean;
}

export const DropdownCheckboxItem: React.FC<DropdownCheckboxItemProps> = ({
    checked,
    onCheckedChange,
    label,
    disabled,
}) => {
    return (
        <DropdownMenu.CheckboxItem
            className="dropdown-item dropdown-checkbox-item"
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
        >
            <DropdownMenu.ItemIndicator className="dropdown-item-indicator">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </DropdownMenu.ItemIndicator>
            <span
                className="dropdown-item-label"
            >
                {label}
            </span>
        </DropdownMenu.CheckboxItem>
    );
};

// Radio Menu Items
export interface DropdownRadioGroupProps {
    value: string;
    onValueChange: (value: string) => void;
    items: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
}

export const DropdownRadioGroup: React.FC<DropdownRadioGroupProps> = ({
    value,
    onValueChange,
    items,
}) => {
    return (
        <DropdownMenu.RadioGroup value={value} onValueChange={onValueChange}>
            {items.map((item) => (
                <DropdownMenu.RadioItem
                    key={item.value}
                    value={item.value}
                    className="dropdown-item dropdown-radio-item"
                    disabled={item.disabled}
                >
                    <DropdownMenu.ItemIndicator className="dropdown-item-indicator">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="6" />
                        </svg>
                    </DropdownMenu.ItemIndicator>
                    <span
                        className="dropdown-item-label"
                    >
                        {item.label}
                    </span>
                </DropdownMenu.RadioItem>
            ))}
        </DropdownMenu.RadioGroup>
    );
};

// Sub Menu
export interface DropdownSubMenuProps {
    trigger: string;
    items: DropdownMenuItem[];
}

export const DropdownSubMenu: React.FC<DropdownSubMenuProps> = ({
    trigger,
    items,
}) => {
    return (
        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="dropdown-item dropdown-sub-trigger">
                <span
                    className="dropdown-item-label"
                >
                    {trigger}
                </span>
                <svg
                    className="dropdown-sub-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
                <DropdownMenu.SubContent className="dropdown-content" sideOffset={8}>
                    {items.map((item) => (
                        <DropdownMenu.Item
                            key={item.id}
                            className={`dropdown-item ${item.variant === 'danger' ? 'dropdown-item-danger' : ''
                                }`}
                            onSelect={item.onSelect}
                            disabled={item.disabled}
                        >
                            <div className="dropdown-item-content">
                                {item.icon && (
                                    <span className="dropdown-item-icon">{item.icon}</span>
                                )}
                                <span
                                    className="dropdown-item-label"
                                >
                                    {item.label}
                                </span>
                            </div>
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
        </DropdownMenu.Sub>
    );
};