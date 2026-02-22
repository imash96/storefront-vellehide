import { cookies } from "next/headers";
import TempCart from "../temp-cart-button";
import { sdk } from "@lib/sdk";

export default async function Page() {
  const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
  const products = await listProductVariant();
  return (
    <div className="flex justify-center items-center h-screen">
      <TempCart countryCode={countryCode} products={products} />
    </div>
  );
}

const listProductVariant = async () => {
  const { products } = await sdk.store.product.list()
  return products
}
