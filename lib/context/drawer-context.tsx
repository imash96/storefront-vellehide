"use client"

import { createContext, useContext, useState } from "react";
import { useToggleState } from "../hook/use-toggle-state";

type DrawerContextValue = {
    isCartDrawerOpen: boolean;
    toggleCartDrawer: () => void;
    isMobileDrawerOpen: boolean;
    toggleMobileDrawer: () => void;
    activeCategory: string | null;
    setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const useDrawer = (): DrawerContextValue => {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
    return ctx;
};

export const DrawerProvider = ({ children }: React.PropsWithChildren) => {
    const { state: isCartDrawerOpen, toggle: toggleCartDrawer } = useToggleState();
    const { state: isMobileDrawerOpen, toggle: toggleMobileDrawer } = useToggleState();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const value: DrawerContextValue = {
        isCartDrawerOpen,
        toggleCartDrawer,
        isMobileDrawerOpen,
        toggleMobileDrawer,
        activeCategory,
        setActiveCategory,
    };

    return <DrawerContext.Provider value={value}>
        <main className="pb-14 lg:pb-0">{children}</main>
    </DrawerContext.Provider>;
};