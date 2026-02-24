import CartDrawerClient from "../components/cart-drawer-client"
import CartFooter from "../components/cart-footer"
import { li as Li } from "motion/react-client"
import { QuntityButton, RemoveButton } from "../components/cart-buttons";
import Image from "next/image";
import { retrieveCart } from "@/lib/action/cart"
import Link from "next/link";
import { convertToLocale } from "@/lib/util/money";
import EmptyCart from "@/ui/empty-cart";
import { Minus, Plus, Trash } from "lucide-react";

export default async function CartDrawer() {
    const cart = await retrieveCart()
    const sortedItems = cart?.items?.sort(
        (a, b) =>
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
    );
    return (
        <CartDrawerClient>
            {cart && cart.items?.length ? (
                <>
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                        <ul className="divide-y divide-divider">
                            {sortedItems?.map((item, index) => {
                                const adjustmentsSum = (item.adjustments || []).reduce(
                                    (acc, adjustment) => adjustment.amount + acc,
                                    0
                                );
                                const currentPrice = item.total! - adjustmentsSum;
                                return (
                                    <Li
                                        key={item.id}
                                        className="flex gap-3 sm:gap-4 py-4 text-foreground"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.2,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-16 h-20 overflow-hidden rounded-md border border-border shrink-0 bg-white group">
                                            <Image
                                                src={item.thumbnail || "/svg/placeholder.svg"}
                                                alt={item.title || "Product image"}
                                                sizes="(min-width: 640px) 6rem, 5rem"
                                                className="size-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                                                height={65}
                                                width={55}
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <Link href={`/product/${item.product_handle}`}>
                                                <h3 className="text-sm leading-tight line-clamp-2">{item.title}</h3>
                                            </Link>
                                            <div className="text-xs text-foreground-tertiary mt-1">
                                                {item.variant?.title && <span>Size: {item.variant?.title}</span>}<br />
                                                {item.variant_sku && <span>{item.variant_sku}</span>}<br />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between items-center w-20">
                                            <span className="font-semibold text-foreground">
                                                {convertToLocale({
                                                    amount: currentPrice,
                                                    currency_code: cart.currency_code,
                                                })}
                                            </span>
                                            {/* {adjustmentsSum > 0 && (
                                                <span className="text-xs text-foreground-tertiary line-through">
                                                    {convertToLocale({
                                                        amount: item.total!,
                                                        currency_code:
                                                            cart.currency_code || "USD",
                                                    })}
                                                </span>
                                            )} */}
                                            {item.quantity > 1 && <RemoveButton itemId={item.id} />}
                                            <div className="flex items-center border rounded-md bg-btn-primary text-btn-primary-foreground">
                                                <QuntityButton itemId={item.id} quantity={item.quantity - 1}>
                                                    {item.quantity === 1 ? <Trash className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                                </QuntityButton>
                                                <span className="px-2 py-1 text-xs font-medium min-w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <QuntityButton itemId={item.id} quantity={item.quantity + 1}>
                                                    <Plus className="w-3 h-3" />
                                                </QuntityButton>
                                            </div>
                                        </div>
                                    </Li>
                                );
                            })}
                        </ul>
                    </div>
                    {/* Cart Footer */}
                    <CartFooter cart={cart} />
                </>
            ) : (<EmptyCart className="min-h-full" />)}
        </CartDrawerClient>
    )
}

