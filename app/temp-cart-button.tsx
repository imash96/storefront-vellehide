// "use client";

// import { startTransition } from "react";
// import { addToCart } from "@/lib/action/cart";
// import { ArrowRight } from "lucide-react";
// import Button from "@/ui/button";
// import { StoreProduct } from "@medusajs/types";

// export default function TempCart({ countryCode, products, label }: { countryCode: string, products: StoreProduct[], label?: string }) {

//     const localVarArray = products.flatMap((product) =>
//         product.variants?.map((variant) => variant.id) ?? []
//     );

//     const handleAddToCart = () => {
//         const selectedVariant = localVarArray[Math.floor(Math.random() * localVarArray.length)];
//         startTransition(() =>
//             addToCart({
//                 variantId: selectedVariant,
//                 quantity: 1,
//                 countryCode,
//             })
//         );
//     };


//     return (
//         <Button
//             onClick={handleAddToCart}
//             className={`inline-flex items-center gap-2 bg-button-accent text-button-accent-foreground hover:bg-button-accent-hover px-6 py-3 text-xs tracking-wide uppercase transition-all duration-200 active:scale-95 ${ctaSelfClass} ${isActive ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-100 translate-y-3"}`}
//             icon={<ArrowRight className="size-4" />}
//             iconPosition="right"
//         >
//             {label || "Add to Cart"}
//         </Button>
//     );
// }