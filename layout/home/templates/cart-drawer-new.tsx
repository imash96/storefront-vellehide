import CartDrawerClient from "../components/cart-drawer-client";
import CartFooter from "../components/cart-footer";
import { li as Li } from "motion/react-client";
import { QuntityButton, RemoveButton } from "../components/cart-buttons";
import Image from "next/image";
import { retrieveCart } from "@lib/action/cart";
import Link from "next/link";
import { convertToLocale } from "@lib/util/money";
import EmptyCart from "@/ui/empty-cart";

export default async function CartDrawer() {
    const cart = await retrieveCart();
    const sortedItems = cart?.items?.sort(
        (a, b) =>
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
    );

    return (
        <CartDrawerClient>
            {cart && cart.items?.length ? (
                <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                        <ul className="divide-y divide-divider py-4">
                            {sortedItems?.map((item, index) => {
                                const adjustmentsSum = (item.adjustments || []).reduce(
                                    (acc, adjustment) => adjustment.amount + acc,
                                    0
                                );
                                const currentPrice = item.total! - adjustmentsSum;

                                return (
                                    <Li
                                        key={`cart-item-${item.id}`}
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
                                        <Link
                                            href={`/products/${item.variant?.product?.handle}`}
                                            className="relative w-20 h-24 sm:w-24 sm:h-28 overflow-hidden rounded-md border border-border shrink-0 bg-muted group"
                                        >
                                            <Image
                                                src={
                                                    item.thumbnail ||
                                                    "/svg/placeholder.svg"
                                                }
                                                alt={item.title || "Product image"}
                                                fill
                                                sizes="(min-width: 640px) 6rem, 5rem"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            {/* Title and Price */}
                                            <div className="space-y-1">
                                                <Link
                                                    href={`/products/${item.variant?.product?.handle}`}
                                                    className="font-medium text-sm sm:text-base text-foreground hover:text-accent transition-colors duration-200 line-clamp-2"
                                                >
                                                    {item.title}
                                                </Link>

                                                {/* Variant Info */}
                                                {item.variant?.title &&
                                                    item.variant.title !== "Default Title" && (
                                                        <p className="text-xs text-foreground-tertiary">
                                                            {item.variant.title}
                                                        </p>
                                                    )}

                                                {/* Price */}
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-semibold text-foreground">
                                                        {convertToLocale({
                                                            amount: currentPrice,
                                                            currency_code:
                                                                cart.currency_code || "USD",
                                                        })}
                                                    </span>
                                                    {adjustmentsSum > 0 && (
                                                        <span className="text-xs text-foreground-tertiary line-through">
                                                            {convertToLocale({
                                                                amount: item.total!,
                                                                currency_code:
                                                                    cart.currency_code || "USD",
                                                            })}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity and Remove */}
                                            <div className="flex items-center justify-between gap-2 mt-2">
                                                <QuntityButton
                                                    quantity={item.quantity - 1}
                                                    itemId={item.id}
                                                />
                                                <RemoveButton
                                                    itemId={item.id}
                                                />
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
            ) : (
                <EmptyCart />
            )}
        </CartDrawerClient>
    );
}