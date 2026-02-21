"use client"

import type { StoreCart } from "@medusajs/types"
// import Button from "@module/common/custom-button"
import { convertToLocale } from "@lib/util/money"
import { useDrawer } from "@lib/context/drawer-context";

export default function CartFooter({ cart }: { cart: StoreCart }) {
    const { toggleCartDrawer } = useDrawer();
    return (
        <div className="w-full p-4">
            <div className="flex w-full justify-between text-lg">
                <h2 className="font-semibold">SUBTOTAL</h2>
                <span className="font-normal">
                    {convertToLocale({
                        amount: cart.subtotal,
                        currency_code: cart.currency_code,
                    })}
                </span>
            </div>

            <p className="text-xs mt-2 text-foreground-muted">Shipping, taxes, and discounts calculated at checkout.</p>

            <button
                // variant="solid"
                // onClick={toggleCartDrawer}
                // href="/cart"
                className="w-full mt-6"
            >
                Go to Cart
            </button>
        </div>
    )
}