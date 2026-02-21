'use client';

import { useCallback, useEffect } from 'react';
import { AnimatePresence, type Transition } from 'motion/react';
import { div as Div } from "motion/react-client";

import "@/css/drawer.css"
import { X } from 'lucide-react';

export type DrawerDirection = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DrawerProps extends React.PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    direction?: DrawerDirection;
    size?: DrawerSize;
    title?: string;
    showCloseButton?: boolean;
    className?: string;
    overlayClassName?: string;
}

// -------------------- SIZE CONFIGURATION --------------------

const sizeClasses: Record<DrawerSize, string> = {
    sm: 'w-full max-w-xs sm:max-w-sm',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-xl',
    full: 'w-full',
};

// -------------------- ANIMATION VARIANTS --------------------

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const slideVariants = {
    left: {
        hidden: { x: '-100%' },
        visible: { x: 0 },
        exit: { x: '-100%' },
    },
    right: {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' },
    },
};

// Optimized spring config for smooth, snappy animations
const springTransition = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 40,
    mass: 1,
};

const overlayTransition: Transition = {
    duration: 0.25,
    ease: [0.4, 0, 0.2, 1], // ease-out
};

export function Drawer({
    isOpen,
    onClose,
    direction = 'right',
    size = 'md',
    children,
    title,
    showCloseButton = true,
    className = '',
    overlayClassName = '',
}: DrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen]);

    // Close on escape key
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);

    // Close on escape key
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <AnimatePresence mode="wait">
            {/* Overlay */}
            <Div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={overlayTransition}
                onClick={onClose}
                className={`fixed inset-0 z-50 bg-overlay backdrop-blur-sm ${overlayClassName}`}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <Div
                variants={slideVariants[direction]}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={springTransition}
                className={`fixed top-0 bottom-0 z-50 flex flex-col bg-surface shadow-2xl ${direction === 'left' ? 'left-0 border-r' : 'right-0 border-l'} border-border ${sizeClasses[size]} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-label={title || 'Drawer'}
                data-drawer-content
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <Div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                        className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-divider shrink-0 bg-surface"
                    >
                        {title && (
                            <h2 className="text-lg font-semibold text-foreground font-heading tracking-tight">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="ml-auto p-2 rounded-md text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring hover:scale-110 active:scale-95"
                                aria-label="Close drawer"
                            >
                                <X size={20} strokeWidth={2} />
                            </button>
                        )}
                    </Div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <Div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.25 }}
                    >
                        {children}
                    </Div>
                </div>
            </Div>
        </AnimatePresence>
    );
}