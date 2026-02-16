'use client';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted';
    thickness?: 'thin' | 'medium' | 'thick';
    spacing?: 'sm' | 'md' | 'lg';
    label?: string;
    labelPosition?: 'left' | 'center' | 'right';
}

export default function Divider({
    orientation = 'horizontal',
    variant = 'solid',
    thickness = 'thin',
    spacing = 'md',
    label,
    labelPosition = 'center',
    className = '',
    ...props
}: DividerProps) {
    const thicknessClasses = {
        thin: orientation === 'horizontal' ? 'h-px' : 'w-px',
        medium: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
        thick: orientation === 'horizontal' ? 'h-1' : 'w-1',
    };

    const spacingClasses = {
        sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
        md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
        lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    };

    const variantClasses = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
    };

    if (label && orientation === 'horizontal') {
        const labelAlignClasses = {
            left: 'justify-start',
            center: 'justify-center',
            right: 'justify-end',
        };

        return (
            <div
                className={`
                        flex items-center gap-4
                        ${spacingClasses[spacing]}
                        ${labelAlignClasses[labelPosition]}
                        ${className}
                    `}
            >
                {labelPosition !== 'left' && (
                    <hr
                        className={`
                                flex-1 border-t bg-divider
                                ${thicknessClasses[thickness]}
                                ${variantClasses[variant]}
                            `}
                        {...props}
                    />
                )}

                <span className="text-sm text-text-secondary font-medium whitespace-nowrap">
                    {label}
                </span>

                {labelPosition !== 'right' && (
                    <hr
                        className={`
                                flex-1 border-t bg-divider
                                ${thicknessClasses[thickness]}
                                ${variantClasses[variant]}
                            `}
                    />
                )}
            </div>
        );
    }

    return (
        <hr
            className={`
                    ${orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l'}
                    bg-divider
                    ${thicknessClasses[thickness]}
                    ${spacingClasses[spacing]}
                    ${variantClasses[variant]}
                    ${className}
                `}
            {...props}
        />
    );
};

Divider.displayName = 'Divider';

// Section Divider (with gradient)
export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    gradient?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
    spacing = 'lg',
    gradient = false,
    className = '',
    ...props
}) => {
    const spacingClasses = {
        sm: 'my-6',
        md: 'my-8',
        lg: 'my-12',
        xl: 'my-16',
    };

    return (
        <div className={`${spacingClasses[spacing]} ${className}`} {...props}>
            <div
                className={`
                    h-px w-full
                    ${gradient
                        ? 'bg-linear-to-r from-transparent via-divider to-transparent'
                        : 'bg-divider'
                    }
                `}
            />
        </div>
    );
};

// Content Divider (with icon or ornament)
export interface ContentDividerProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    spacing?: 'sm' | 'md' | 'lg';
}

export const ContentDivider: React.FC<ContentDividerProps> = ({
    icon,
    spacing = 'md',
    className = '',
    ...props
}) => {
    const spacingClasses = {
        sm: 'my-4',
        md: 'my-6',
        lg: 'my-8',
    };

    const defaultIcon = (
        <svg
            className="w-4 h-4 text-text-tertiary"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <circle cx="10" cy="10" r="2" />
            <circle cx="4" cy="10" r="1" />
            <circle cx="16" cy="10" r="1" />
        </svg>
    );

    return (
        <div className={`flex items-center ${spacingClasses[spacing]} ${className}`} {...props}>
            <div className="flex-1 h-px bg-divider" />
            <div className="px-4">{icon || defaultIcon}</div>
            <div className="flex-1 h-px bg-divider" />
        </div>
    );
};