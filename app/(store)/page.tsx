import { cookies } from "next/headers";
import TempCart from "../temp-cart-button";
import { sdk } from "@lib/sdk";
import HeroBannerCarousel, { DEMO_SLIDES } from "@/module/home/templates/hero";

export default async function Page() {
  const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
  const products = await listProductVariant();
  return (
    <div className="flex justify-center items-center h-screen">
      <HeroBannerCarousel
        slides={[
          {
            id: "slide-1",
            image: { src: "/images/hero-1.jpg", alt: "..." },
            heading: "New Collection",
            subheading: "Full-grain leather.",
            cta: { label: "Shop Now", href: "/collections/new" },
            align: "left",
          },
        ]}
        autoplayDelay={5000}
      />
      <HeroBannerCarousel
        slides={DEMO_SLIDES}
        autoplayDelay={5000}
      />
      <TempCart countryCode={countryCode} products={products} />
    </div>
  );
}

const listProductVariant = async () => {
  const { products } = await sdk.store.product.list()
  return products
}
