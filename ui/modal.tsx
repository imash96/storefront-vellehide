'use client';

import { ModalSize } from "@/types/common";
import { Dialog, DialogPortal, DialogTrigger, DialogClose as DialogClosePri, DialogOverlay as DialogOverlayPri, DialogContent as DialogContentPri, DialogTitle as DialogTitlePri, DialogDescription as DialogDescriptionPri } from "@radix-ui/react-dialog"
import { X } from "lucide-react";

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
};

function DialogOverlay(props: React.ComponentPropsWithoutRef<typeof DialogOverlayPri>) {
    return (
        <DialogOverlayPri
            className="fixed inset-0 bg-overlay-heavy backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50"
            {...props}
        />
    )
}

function DialogContent({ className = "", children, size = 'md', rounded = true, ...props }: React.ComponentPropsWithoutRef<typeof DialogContentPri> & { size?: ModalSize, rounded?: boolean }) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogContentPri
                onCloseAutoFocus={(e) => e.preventDefault()}
                aria-modal="true"
                className={`fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full ${sizeClasses[size]} max-h-[90vh] sm:max-h-[85vh] bg-surface border border-border rounded-lg shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] flex flex-col ${className}`}
                {...props}
            >
                {children}
            </DialogContentPri>
        </DialogPortal>
    )
}

function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-start justify-between p-4 ${className}`} {...props} />
}

function DialogTitle({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogTitlePri>) {
    return <DialogTitlePri className={`text-lg sm:text-xl font-semibold text-text-primary ${className}`} {...props} />
}

function DialogDescription({ className = "", ...props }: React.ComponentPropsWithoutRef<typeof DialogDescriptionPri>) {
    return <DialogDescriptionPri className={`mt-1 sm:mt-2 text-sm text-text-secondary ${className}`} {...props} />
}

function DialogClose({ className = "", children, ...props }: React.ComponentPropsWithoutRef<typeof DialogClosePri>) {
    return <DialogClosePri aria-label="Close dialog" className={`shrink-0 rounded-lg p-2 hover:bg-muted transition-colors min-w-11 min-h-11 flex items-center justify-center sm:min-w-0 sm:min-h-0 ${className}`} {...props} >
        {children ? children : <X className="w-5 h-5" />}
    </DialogClosePri>
}

export {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
}

