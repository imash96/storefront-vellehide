'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import "@/css/accordion.css"

export interface AccordionItemData {
    id?: string;
    value: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
}

export interface CustomAccordionProps {
    items: AccordionItemData[];
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
    variant?: 'default' | 'bordered' | 'separated';
    className?: string;
}

const variantClasses = {
    default: 'accordion-default',
    bordered: 'accordion-bordered',
    separated: 'accordion-separated',
};

const AccordionItemComponent = ({ value, title, content, disabled }: AccordionItemData) => (
    <Accordion.Item value={value} disabled={disabled} className="accordion-item">
        <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
                <span className="accordion-trigger-text text-sm sm:text-base">{title}</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="accordion-content">
            <div className="accordion-content-inner text-sm sm:text-base">{content}</div>
        </Accordion.Content>
    </Accordion.Item>
);

export default function CustomAccordion({
    items,
    type = 'single',
    defaultValue,
    value,
    onValueChange,
    collapsible = true,
    variant = 'default',
    className = '',
}: CustomAccordionProps) {
    const rootProps = type === 'single'
        ? {
            type: 'single' as const,
            collapsible,
            defaultValue: defaultValue as string,
            value: value as string,
            onValueChange: onValueChange as (value: string) => void,
        }
        : {
            type: 'multiple' as const,
            defaultValue: defaultValue as string[],
            value: value as string[],
            onValueChange: onValueChange as (value: string[]) => void,
        };

    return (
        <Accordion.Root {...rootProps} className={`accordion-root ${variantClasses[variant]} ${className}`}>
            {items.map((item) => (
                <AccordionItemComponent
                    key={item.id || item.value}
                    value={item.value}
                    title={item.title}
                    content={item.content}
                    disabled={item.disabled}
                />
            ))}
        </Accordion.Root>
    );
};

// Convenience component for FAQ-style accordions
export interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

export interface FAQAccordionProps {
    items: FAQItem[];
    variant?: 'default' | 'bordered' | 'separated';
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
    items,
    variant = 'separated',
    className = '',
}) => {
    const accordionItems: AccordionItemData[] = items.map((item, index) => ({
        id: `faq-${index}`,
        value: `faq-${index}`,
        title: item.question,
        content: typeof item.answer === 'string'
            ? <p className="text-text-primary leading-relaxed text-sm sm:text-base">{item.answer}</p>
            : item.answer,
    }));

    return (
        <div className={className}>
            <CustomAccordion items={accordionItems} type="single" collapsible variant={variant} />
        </div>
    );
};

// ProductDetailsAccordion Component
export interface ProductDetailsSection {
    title: string;
    content: React.ReactNode;
}

export interface ProductDetailsAccordionProps {
    sections: ProductDetailsSection[];
    className?: string;
}

export const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({
    sections,
    className = '',
}) => {
    const accordionItems: AccordionItemData[] = sections.map((section, index) => ({
        id: `section-${index}`,
        value: `section-${index}`,
        title: section.title,
        content: section.content,
    }));

    return (
        <CustomAccordion
            items={accordionItems}
            type="multiple"
            variant="default"
            className={className}
        />
    );
};

// Single Accordion Item for more granular control
export interface AccordionItemProps {
    value: string;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    value,
    title,
    children,
    disabled,
}) => {
    return (
        <Accordion.Item value={value} disabled={disabled} className="accordion-item">
            <Accordion.Header className="accordion-header">
                <Accordion.Trigger className="accordion-trigger">
                    <span className="accordion-trigger-text text-sm sm:text-base">{title}</span>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="accordion-content">
                <div className="accordion-content-inner text-sm sm:text-base">{children}</div>
            </Accordion.Content>
        </Accordion.Item>
    );
};