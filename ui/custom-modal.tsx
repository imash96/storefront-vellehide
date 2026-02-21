import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./modal";

export interface CustomModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showClose?: boolean;
    closeOnOverlayClick?: boolean;
    className?: string;
}

export default function CustomModal({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    size = 'md',
    showClose = true,
    closeOnOverlayClick = true,
    className = '',
}: CustomModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}


            <DialogContent
                onPointerDownOutside={(e) => {
                    if (!closeOnOverlayClick) {
                        e.preventDefault();
                    }
                }}
            >
                {/* Header */}
                {(title || description || showClose) && (
                    <div className="flex items-start justify-between p-4 sm:p-6 border-b border-border">
                        <div className="flex-1 pr-8">
                            {title && (
                                <DialogTitle className="text-lg sm:text-xl font-semibold text-text-primary">
                                    {title}
                                </DialogTitle>
                            )}
                            {description && (
                                <DialogDescription className="mt-1 sm:mt-2 text-sm text-text-secondary">
                                    {description}
                                </DialogDescription>
                            )}
                        </div>

                        {showClose && (
                            <DialogClose />
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-4 sm:p-6 border-t border-border">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    children: React.ReactNode;
}

const variantClasses = {
    primary: 'bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover',
    secondary: 'bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover',
    outline: 'bg-transparent text-text-primary border-2 border-border hover:bg-muted',
    ghost: 'bg-transparent text-text-primary hover:bg-muted',
    danger: 'bg-button-destructive text-button-destructive-foreground hover:bg-button-destructive-hover',
};

export function ModalButton({ variant = 'primary', children, className = '', ...props }: ModalButtonProps) {
    return (
        <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold transition-all min-h-11 sm:min-h-10 text-sm sm:text-base ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}