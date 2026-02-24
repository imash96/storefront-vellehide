import { cookies } from "next/headers";
import TempCart from "../temp-cart-button";
import { sdk } from "@lib/sdk";
import { BannerSlide } from "@/types/homepage";
import BannerCarousel from "@/module/home/templates/banner";
import IconGridSection from "@/module/home/templates/icon-grid-section";
import { podData, uspData } from "@/module/home/components/icon-with-text";
import GalleryWall from "@/module/home/templates/gallery-wall";
import Blog from "@/module/home/templates/blog";

export default async function Page() {
  const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
  const products = await listProductVariant();
  return (
    <>
      <BannerCarousel slides={DEMO_SLIDES} />
      <IconGridSection items={uspData} />
      <TempCart countryCode={countryCode} products={products} />
      <GalleryWall />
      <Blog />
      <IconGridSection items={podData} />
    </>
  );
}

const listProductVariant = async () => {
  const { products } = await sdk.store.product.list()
  return products
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

export const DEMO_SLIDES: BannerSlide[] = [
  {
    id: "slide-1",
    image: {
      src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=90",
      alt: "Leather jacket lifestyle",
    },
    heading: "Shades of Noir",
    subheading: "New season. Unapologetic edge.",
    cta: { label: "Shop the Edit", href: "/collections/new-arrivals" },
    align: "left",
  },
  {
    id: "slide-2",
    image: {
      src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=90",
      alt: "Premium leather coat",
    },
    heading: "Craft in Every Detail",
    subheading: "Full-grain leather. Zero compromise.",
    cta: { label: "Shop Coats", href: "/collections/coats" },
    align: "center",
  },
  {
    id: "slide-3",
    image: {
      src: "https://images.unsplash.com/photo-1711560955660-6a91f7f2f194?w=1600&q=90",
      alt: "Leather blazer editorial",
    },
    heading: "Power, Refined",
    subheading: "Tailored for those who lead.",
    cta: { label: "Shop Blazers", href: "/collections/blazers" },
    align: "right",
  },
]