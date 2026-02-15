'use client';

import * as Accordion from '@radix-ui/react-accordion';

import "@/css/accordion.css"

export interface AccordionItemData {
    id: string;
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

export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    items,
    type = 'single',
    defaultValue,
    value,
    onValueChange,
    collapsible = true,
    variant = 'default',
    className = '',
}) => {
    // Type-safe wrapper for Accordion.Root
    const AccordionRoot = type === 'single' ? Accordion.Root : Accordion.Root;

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

    const variantClasses = {
        default: 'accordion-default',
        bordered: 'accordion-bordered',
        separated: 'accordion-separated',
    };

    return (
        <AccordionRoot
            {...rootProps}
            className={`accordion-root ${variantClasses[variant]} ${className}`}
        >
            {items.map((item) => (
                <Accordion.Item
                    key={item.id}
                    value={item.id}
                    disabled={item.disabled}
                    className="accordion-item"
                >
                    <Accordion.Header className="accordion-header">
                        <Accordion.Trigger className="accordion-trigger">
                            <span
                                className="accordion-trigger-text"
                            >
                                {item.title}
                            </span>

                            <svg
                                className="accordion-chevron"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="accordion-content">
                        <div
                            className="accordion-content-inner"
                        >
                            {item.content}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </AccordionRoot>
    );
};

// Convenience component for FAQ-style accordions
export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQAccordionProps {
    faqs: FAQItem[];
    variant?: 'default' | 'bordered' | 'separated';
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
    faqs,
    variant = 'default',
    className = '',
}) => {
    const items: AccordionItemData[] = faqs.map((faq, index) => ({
        id: `faq-${index}`,
        title: faq.question,
        content: <p className="text-leather-800 leading-relaxed">{faq.answer}</p>,
    }));

    return (
        <CustomAccordion
            items={items}
            type="single"
            collapsible
            variant={variant}
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
                    <span
                        className="accordion-trigger-text"
                    >
                        {title}
                    </span>

                    <svg
                        className="accordion-chevron"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="accordion-content">
                <div
                    className="accordion-content-inner"
                >
                    {children}
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
};