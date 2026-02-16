'use client';

export interface ProgressBarProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'error' | 'warning';
    showLabel?: boolean;
    label?: string;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    label,
    className = '',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const variantClasses = {
        default: 'bg-primary',
        success: 'bg-success',
        error: 'bg-error',
        warning: 'bg-warning',
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                        {label || 'Progress'}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${variantClasses[variant]}`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
};

// Stepped Progress (for checkout, multi-step forms)
export interface Step {
    label: string;
    description?: string;
}

export interface SteppedProgressProps {
    steps: Step[];
    currentStep: number;
    completed?: number[];
    variant?: 'dots' | 'lines' | 'numbers';
    className?: string;
}

export const SteppedProgress: React.FC<SteppedProgressProps> = ({
    steps,
    currentStep,
    completed = [],
    variant = 'numbers',
    className = '',
}) => {
    const isCompleted = (index: number) => completed.includes(index) || index < currentStep;
    const isCurrent = (index: number) => index === currentStep;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex-1 flex items-center">
                        {/* Step Circle/Number */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    flex items-center justify-center
                                    w-10 h-10 rounded-full
                                    font-semibold text-sm
                                    transition-all duration-300
                                    ${isCompleted(index)
                                        ? 'bg-primary text-primary-foreground'
                                        : isCurrent(index)
                                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                                            : 'bg-muted text-text-secondary'
                                    }
                                `}
                            >
                                {variant === 'numbers' && <span>{index + 1}</span>}
                                {variant === 'dots' && (
                                    <span className={`w-3 h-3 rounded-full ${isCompleted(index) ? 'bg-primary-foreground' : 'bg-text-secondary'}`} />
                                )}
                                {variant === 'lines' && isCompleted(index) && (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>

                            {/* Step Label */}
                            <div className="mt-2 text-center max-w-25">
                                <div
                                    className={`
                                        text-xs font-medium
                                        ${isCurrent(index) ? 'text-text-primary' : 'text-text-secondary'}
                                    `}
                                >
                                    {step.label}
                                </div>
                                {step.description && (
                                    <div className="text-xs text-text-tertiary mt-0.5">
                                        {step.description}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 mb-6">
                                <div
                                    className={`
                                        h-full transition-all duration-500
                                        ${isCompleted(index) ? 'bg-primary' : 'bg-muted'}
                                    `}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Circular Progress
export interface CircularProgressProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    variant?: 'default' | 'success' | 'error' | 'warning';
    showLabel?: boolean;
    className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    variant = 'default',
    showLabel = true,
    className = '',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const variantColors = {
        default: 'stroke-primary',
        success: 'stroke-success',
        error: 'stroke-error',
        warning: 'stroke-warning',
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className="stroke-muted"
                    strokeWidth={strokeWidth}
                />

                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={`${variantColors[variant]} transition-all duration-500`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Label */}
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-text-primary">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
};