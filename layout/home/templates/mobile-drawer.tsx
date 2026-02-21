"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { div as Div } from "motion/react-client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
            <div className="flex flex-col h-full">
                {/* Header */}
                <Div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex items-center justify-between px-4 py-4 border-b border-divider shrink-0 bg-surface"
                >
                    {navigationStack.length > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                            aria-label="Go back"
                        >
                            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                            <span className="font-medium text-sm">Back</span>
                        </button>
                    ) : (
                        <h2 className="font-heading font-semibold text-lg text-foreground tracking-tight">
                            Menu
                        </h2>
                    )}

                    <button
                        onClick={handleClose}
                        className="p-2 rounded-md text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring hover:scale-110 active:scale-95"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" strokeWidth={2} />
                    </button>
                </Div>

                {/* Breadcrumb */}
                {currentNav.breadcrumb.length > 0 && (
                    <Div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-3 border-b border-divider bg-muted/30"
                    >
                        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                            <span>Shop</span>
                            {currentNav.breadcrumb.map((cat, index) => (
                                <div key={cat.id} className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                                    <span className={index === currentNav.breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>
                                        {cat.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Div>
                )}
                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto ">
                    <AnimatePresence mode="wait">
                        <Div
                            key={currentNav.level}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="p-4 space-y-1"
                        >
                            {(currentNav.category && currentNav.level === 1) && <MobileMenuPromotion name={currentNav.category.name} thumbnail={currentNav.category.metadata?.thumbnail as string} />}
                            {getCurrentCategories().map((cat, index) => {
                                const hasChildren = cat.category_children && cat.category_children.length > 0;
                                const href = `/${cat.handle}`;

                                return (
                                    <Div
                                        key={cat.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {hasChildren ? (
                                            <button
                                                onClick={() => handleCategoryClick(cat)}
                                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-md text-foreground font-medium hover:bg-muted transition-all duration-200 group"
                                            >
                                                <span>{cat.name}</span>
                                                <ChevronRight
                                                    className="w-5 h-5 text-foreground-tertiary  group-hover:text-accent  group-hover:translate-x-1 transition-all duration-200"
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                href={href}
                                                onClick={handleClose}
                                                className="block w-full px-4 py-3.5 rounded-md text-foreground font-medium hover:bg-muted transition-all duration-200"
                                            >
                                                {cat.name}
                                            </Link>
                                        )}
                                    </Div>
                                )
                            })}
                        </Div>
                    </AnimatePresence>
                </div>
            </div>
        </Drawer>
    );
}

type NavigationState = {
    level: number;
    category: ProductCategory | null;
    breadcrumb: ProductCategory[];
};
