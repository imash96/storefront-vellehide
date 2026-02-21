"use client"

import { LoaderCircle, Trash } from "lucide-react";
import { deleteLineItem, updateLineItem } from "@lib/action/cart";
import { useTransition } from "react";


export function QuntityButton({ itemId, quantity, children }: { itemId: string, quantity: number } & React.PropsWithChildren) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => (quantity <= 0) ? deleteLineItem(itemId) : updateLineItem({ lineId: itemId, quantity }));

    return (
        <button onClick={handleClick} className={`p-1 hover:bg-btn-primary-hover transition-colors rounded-r-md ${isPending ? "pointer-events-none" : ""}`}>
            {isPending ? <LoaderCircle className="w-3 h-3 animate-spin" /> : children}
        </button>
    )
}

export function RemoveButton({ itemId }: { itemId: string }) {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => startTransition(() => deleteLineItem(itemId));
    return (
        <button className={`text-xs text-btn-destructive hover:text-btn-destructive-hover flex items-center gap-1 font-extralight ${isPending ? "pointer-events-none" : ""}`} onClick={handleClick}>
            {isPending ? <LoaderCircle className="w-3 h-3 animate-spin" /> : <Trash className="w-3 h-3" />} Remove
        </button>
    )
}