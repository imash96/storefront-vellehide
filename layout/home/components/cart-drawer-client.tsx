"use client"

import { ShoppingBag, X } from "lucide-react"
import { useDrawer } from "@lib/context/drawer-context";
import { Drawer } from "@/ui/drawer";
import { div as Div } from "motion/react-client";

export default function CartDrawerClient({ children }: React.PropsWithChildren) {
    const { isCartDrawerOpen, toggleCartDrawer } = useDrawer();
    return (
        <Drawer
            isOpen={isCartDrawerOpen}
            onClose={toggleCartDrawer}
            direction="right"
            size="md"
            showCloseButton={false} // Custom header
        >
            <div className="flex flex-col h-full w-full bg-background">
                {/* Custom Header */}
                <Div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-divider shrink-0 bg-surface"
                >
                    <div className="flex items-center gap-2.5">
                        <ShoppingBag className="w-5 h-5 text-accent" strokeWidth={1.5} />
                        <h2 className="font-heading font-semibold text-lg text-foreground tracking-tight">
                            Shopping Cart
                        </h2>
                    </div>

                    <button
                        className="p-2 rounded-md text-foreground-secondary hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring hover:scale-110 active:scale-95"
                        onClick={toggleCartDrawer}
                        aria-label="Close cart drawer"
                    >
                        <X className="h-5 w-5" strokeWidth={2} />
                    </button>
                </Div>

                {/* Content */}
                {children}
            </div>
        </Drawer>
    )
}