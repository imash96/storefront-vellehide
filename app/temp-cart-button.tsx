"use client";

import { startTransition, useActionState } from "react";
import { addToCart } from "@lib/action/cart";
import { ShoppingCart } from "lucide-react";
import Button from "@/ui/button";
import Container from "@/module/common/create-section";
import { StoreProduct } from "@medusajs/types";

export default function TempCart({ countryCode, products }: { countryCode: string, products: StoreProduct[] }) {

    const localVarArray = products.flatMap((product) =>
        product.variants?.map((variant) => variant.id) ?? []
    );

    const handleAddToCart = () => {
        const selectedVariant =
            localVarArray[Math.floor(Math.random() * localVarArray.length)];
        startTransition(() =>
            addToCart({
                variantId: selectedVariant,
                quantity: 1,
                countryCode,
            })
        );
    };

    // async function addWishlistItem(formData: FormData) {
    //     const selectedProd = prodArray[Math.floor(Math.random() * prodArray.length)];
    //     await addToWishlist(selectedProd)
    // }

    // async function deleteWishlistItem(_: any, formData: FormData) {
    //     const product_id = formData.get("product_id") as string
    //     if (!product_id) return console.error("Product id not found")
    //     await deleteItemWishlist(product_id)
    // }

    // const [state, formAction, isPending] = useActionState(deleteWishlistItem, null);
    const [stateCart, formActionCart, isPendingCart] = useActionState(handleAddToCart, null);

    return (
        <Container>
            <div className="flex flex-col gap-y-4 mx-auto py-10 max-w-md">
                <form action={formActionCart} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            isLoading={isPendingCart}
                            className="shrink-0"
                            icon={<ShoppingCart />}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </form>
                {/* <form action={addWishlistItem} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="shrink-0"
                        >
                            Add to Wishlist
                        </Button>
                    </div>
                </form>

                <form action={formAction} className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2">
                        <Input label="Product Id" type="text" name="product_id" />
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="shrink-0"
                        >
                            Add to Wishlist
                        </Button>
                    </div>
                </form> */}
            </div>
        </Container>
    );
}