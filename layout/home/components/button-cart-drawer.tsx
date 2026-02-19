"use client"

import { ShoppingBag } from "lucide-react"
import { useDrawer } from "@lib/context/drawer-context";

// TODO: mix cartbutton with cart drawer
export default function CartDrawerButton({ className, totalItems }: CartDrawerButtonProps) {
    const { toggleCartDrawer } = useDrawer();

    return (
        <button onClick={toggleCartDrawer} className={className}>
            <ShoppingBag className="w-5 h-5" />
            <span className="sr-only">items in cart, view bag</span>
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>
        </button>
    )
}

type CartDrawerButtonProps = {
    className: string;
    totalItems: number
}