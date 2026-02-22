"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { div as Div } from "motion/react-client";
import { ChevronLeft, ChevronRight, Home, MenuIcon, X } from "lucide-react";
import { useDrawer } from "@lib/context/drawer-context";
import { ProductCategory } from "@/types/common";
import { Drawer } from "@/ui/drawer";
import MobileMenuPromotion from "../components/mobile-menu-promotion";
import { product_categories } from "@lib/constant/category";

export default function MobileDrawer() {
    const { isMobileDrawerOpen, toggleMobileDrawer } = useDrawer();

    const [navigationStack, setNavigationStack] = useState<NavigationState[]>([
        { level: 0, category: null, breadcrumb: [] },
    ]);

    const currentNav = navigationStack[navigationStack.length - 1];

    const handleCategoryClick = (category: ProductCategory) => {
        if (category.category_children?.length) {
            setNavigationStack((prev) => [
                ...prev,
                {
                    level: currentNav.level + 1,
                    category,
                    breadcrumb: [...currentNav.breadcrumb, category],
                },
            ]);
        }
    };

    const handleBack = () => {
        if (navigationStack.length > 1) {
            setNavigationStack((prev) => prev.slice(0, -1));
        }
    };

    const handleClose = () => {
        setNavigationStack([{ level: 0, category: null, breadcrumb: [] }]);
        toggleMobileDrawer();
    };

    const getCurrentCategories = () => currentNav.level === 0 ? product_categories : currentNav.category?.category_children || [];

    return (
        <Drawer
            isOpen={isMobileDrawerOpen}
            onClose={handleClose}
            direction="left"
            size="sm"
            showCloseButton={false}
        >
            <div className="flex flex-col h-full bg-background">
                {/* Header */}
                <Div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-between px-4 py-4 border-b border-divider shrink-0 bg-surface sticky top-0 z-10"
                >
                    {navigationStack.length > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-foreground hover:text-accent transition-all duration-200 group"
                            aria-label="Go back"
                        >
                            <ChevronLeft className="size-5 group-hover:-translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
                            <span className="font-medium text-sm">Back</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <MenuIcon
                                className="size-5 text-accent"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />
                            <h2 className="font-heading font-semibold text-lg text-foreground tracking-tight">
                                Menu
                            </h2>
                        </div>
                    )}

                    <button
                        className="p-2 rounded-md text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring hover:scale-110 active:scale-95"
                        onClick={handleClose}
                        aria-label="Close mobile menu"
                    >
                        <X className="size-5" strokeWidth={2} />
                    </button>
                </Div>

                {/* Breadcrumb */}
                {currentNav.breadcrumb.length > 0 && (
                    <Div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.05 }}
                        className="px-4 py-3 bg-muted/50 border-b border-divider"
                    >
                        <div className="flex items-center gap-2 text-sm overflow-x-auto no-scrollbar">
                            <Home className="w-4 h-4 text-foreground-tertiary shrink-0" />
                            {currentNav.breadcrumb.map((cat, index) => (
                                <div key={`breadcrumb-${cat.id || cat.handle}-${index}`} className="flex items-center gap-2 shrink-0">
                                    <ChevronRight className="w-3.5 h-3.5 text-foreground-tertiary" />
                                    <span className={index === currentNav.breadcrumb.length - 1 ? "text-foreground font-medium" : "text-foreground-secondary"}>
                                        {cat.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Div>
                )}
                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <Div
                            key={`nav-level-${currentNav.level}`}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="p-4 space-y-1"
                        >
                            {/* Featured Image for Level 1 */}
                            {currentNav.category && currentNav.level === 1 && (
                                <MobileMenuPromotion
                                    name={currentNav.category.name}
                                    thumbnail={
                                        currentNav.category.metadata?.thumbnail as string
                                    }
                                />
                            )}

                            {/* Category Links */}
                            {getCurrentCategories().map((cat, index) => {
                                const hasChildren =
                                    cat.category_children && cat.category_children.length > 0;
                                const href = `/${cat.handle}`;

                                return (
                                    <Div
                                        key={`category-${cat.id || cat.handle}-${index}`}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.03,
                                            duration: 0.15,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                    >
                                        {hasChildren ? (
                                            <button
                                                onClick={() => handleCategoryClick(cat)}
                                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-foreground font-medium hover:bg-muted transition-all duration-200 group active:scale-[0.98]"
                                            >
                                                <span className="text-left">{cat.name}</span>
                                                <ChevronRight
                                                    className="w-5 h-5 text-foreground-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={href}
                                                onClick={handleClose}
                                                className="block w-full px-4 py-3.5 rounded-lg text-foreground font-medium hover:bg-muted transition-all duration-200 active:scale-[0.98]"
                                            >
                                                {cat.name}
                                            </Link>
                                        )}
                                    </Div>
                                );
                            })}
                        </Div>
                    </AnimatePresence>
                </div>
                {/* Footer - Quick Links */}
                {currentNav.level === 0 && (
                    <Div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="border-t border-divider p-4 bg-surface"
                    >
                        <div className="space-y-1">
                            <Link
                                href="/account"
                                onClick={handleClose}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200"
                            >
                                My Account
                            </Link>
                            <Link
                                href="/orders"
                                onClick={handleClose}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200"
                            >
                                Track Order
                            </Link>
                            <Link
                                href="/contact"
                                onClick={handleClose}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </Div>
                )}
            </div>
        </Drawer>
    );
}

type NavigationState = {
    level: number;
    category: ProductCategory | null;
    breadcrumb: ProductCategory[];
};
