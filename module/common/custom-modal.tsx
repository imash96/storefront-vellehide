'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import "@/css/modal.css"

export interface CustomModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    className?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    className = '',
}) => {
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay className="modal-overlay" />

                {/* Content */}
                <Dialog.Content
                    className={`modal-content ${sizeClasses[size]} ${className}`}
                    onPointerDownOutside={(e) => {
                        if (!closeOnOverlayClick) {
                            e.preventDefault();
                        }
                    }}
                    onEscapeKeyDown={(e) => {
                        if (!closeOnOverlayClick) {
                            e.preventDefault();
                        }
                    }}
                >
                    {/* Header */}
                    <div className="modal-header">
                        <div className="flex-1">
                            <Dialog.Title className="modal-title">
                                {title}
                            </Dialog.Title>
                            {description && (
                                <Dialog.Description className="modal-description">
                                    {description}
                                </Dialog.Description>
                            )}
                        </div>

                        {showCloseButton && (
                            <Dialog.Close className="modal-close-button" aria-label="Close">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </Dialog.Close>
                        )}
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

// ModalButton Component - MISSING IN ORIGINAL
export interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    children: React.ReactNode;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const variantClasses = {
        primary: 'modal-button modal-button-primary',
        secondary: 'modal-button modal-button-secondary',
        outline: 'modal-button bg-transparent text-text-primary border-2 border-border hover:bg-muted focus:ring-focus-ring/30',
        ghost: 'modal-button bg-transparent text-text-primary hover:bg-muted focus:ring-focus-ring/30',
        danger: 'modal-button modal-button-danger',
    };

    return (
        <button
            type="button"
            className={`${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// AlertModal Component - MISSING IN ORIGINAL
export interface AlertModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    variant?: 'info' | 'warning' | 'danger' | 'success';
}

export const AlertModal: React.FC<AlertModalProps> = ({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'info',
}) => {
    const variantIcons = {
        info: (
            <svg className="w-12 h-12 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="8" r="1" fill="currentColor" />
            </svg>
        ),
        warning: (
            <svg className="w-12 h-12 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        danger: (
            <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        success: (
            <svg className="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
        ),
    };

    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange?.(false);
    };

    const handleCancel = () => {
        onCancel?.();
        onOpenChange?.(false);
    };

    return (
        <CustomModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size="sm"
            showCloseButton={false}
            closeOnOverlayClick={false}
        >
            <div className="flex flex-col items-center text-center py-4">
                <div className="mb-4">
                    {variantIcons[variant]}
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <ModalButton
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                >
                    {cancelLabel}
                </ModalButton>
                <ModalButton
                    variant={variant === 'danger' ? 'danger' : 'primary'}
                    onClick={handleConfirm}
                    className="flex-1"
                >
                    {confirmLabel}
                </ModalButton>
            </div>
        </CustomModal>
    );
};

// Preset Modal Actions for common use cases
export interface ModalActionsProps {
    onCancel?: () => void;
    onConfirm?: () => void;
    cancelText?: string;
    confirmText?: string;
    confirmVariant?: 'primary' | 'danger';
    isLoading?: boolean;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
    onCancel,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    confirmVariant = 'primary',
    isLoading = false,
}) => {
    return (
        <div className="flex items-center justify-end gap-3">
            {onCancel && (
                <ModalButton variant="secondary" onClick={onCancel} disabled={isLoading}>
                    {cancelText}
                </ModalButton>
            )}

            {onConfirm && (
                <ModalButton variant={confirmVariant} onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Loading...
                        </span>
                    ) : (
                        confirmText
                    )}
                </ModalButton>
            )}
        </div>
    );
};

// Convenience wrapper for confirmation modals
export interface ConfirmModalProps extends Omit<CustomModalProps, 'footer' | 'children'> {
    message: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    variant = 'primary',
    ...modalProps
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            modalProps.onOpenChange?.(false);
        } catch (error) {
            console.error('Confirmation error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        onCancel?.();
        modalProps.onOpenChange?.(false);
    };

    return (
        <CustomModal
            {...modalProps}
            footer={
                <ModalActions
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    cancelText={cancelText}
                    confirmText={confirmText}
                    confirmVariant={variant}
                    isLoading={isLoading}
                />
            }
        >
            <p className="text-text-primary leading-relaxed">
                {message}
            </p>
        </CustomModal>
    );
};