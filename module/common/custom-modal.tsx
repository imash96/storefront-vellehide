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
                            <Dialog.Title
                                className="modal-title"
                            >
                                {title}
                            </Dialog.Title>
                            {description && (
                                <Dialog.Description
                                    className="modal-description"
                                >
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
                    <div
                        className="modal-body"
                    >
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
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="modal-button modal-button-secondary"
                >
                    {cancelText}
                </button>
            )}

            {onConfirm && (
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`modal-button ${confirmVariant === 'danger'
                        ? 'modal-button-danger'
                        : 'modal-button-primary'
                        }`}
                >
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
                </button>
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
            <p
                className="text-leather-800 leading-relaxed"
            >
                {message}
            </p>
        </CustomModal>
    );
};