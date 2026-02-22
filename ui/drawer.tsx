'use client';

import { useCallback, useEffect } from 'react';
import { AnimatePresence, type Transition } from 'motion/react';
import { div as Div } from "motion/react-client";
import { X } from 'lucide-react';

import "@/css/drawer.css"

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

// Optimized spring config for quick, smooth animations
const springTransition: Transition = {
    type: 'spring',
    stiffness: 500,
    damping: 35,
    mass: 0.8,
};

const overlayTransition: Transition = {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
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

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Overlay */}
                    <Div
                        key="drawer-overlay"
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
                        key="drawer-panel"
                        variants={slideVariants[direction]}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={springTransition}
                        className={`fixed top-0 bottom-0 z-50 flex flex-col bg-surface shadow-2xl ${direction === 'left' ? 'left-0 border-r' : 'right-0 border-l'} border-border ${sizeClasses[size]} ${className}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title || 'Drawer'}
                    >
                        <div className="flex h-full flex-col">
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-divider shrink-0 bg-surface">
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
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 overflow-hidden">
                                {children}
                            </div>
                        </div>
                    </Div>
                </>
            )}
        </AnimatePresence>
    );
}