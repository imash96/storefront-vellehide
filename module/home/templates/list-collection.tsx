import { fetchProductsByCollection } from "@/lib/action/product"
import ProductSection from "../components/product-section"
import { product_collections } from "@/data/collection"
import { ProductSectionClassic } from "../components/product-section-final"

export async function NewArrival({ region_id }: { region_id: string }) {
    const collection = product_collections[12]
    const products = await fetchProductsByCollection({
        regionId: region_id,
        collectionId: collection.id,
    })

    return (
        <ProductSectionClassic
            title={collection.title}
            desc={(collection.metadata as any)?.description ?? ""}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
            eyebrow="Popular"
        />
    )
}

// ─── col-on-sale.tsx ──────────────────────────────────────────────────────────

export async function OnSale({ region_id }: { region_id: string }) {
    const collection = product_collections[6]
    const products = await fetchProductsByCollection({
        collectionId: collection.id,
        regionId: region_id,
    })

    return (
        <ProductSection
            title={collection.title}
            desc={(collection.metadata as any)?.description ?? ""}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
        />
    )
}

// ─── col-trending-now.tsx ─────────────────────────────────────────────────────

export async function TrendingNow({ region_id }: { region_id: string }) {
    const collection = product_collections[9]
    const products = await fetchProductsByCollection({
        regionId: region_id,
        collectionId: collection.id,
    })

    return (
        <ProductSection
            title={collection.title}
            desc={(collection.metadata as any)?.description ?? ""}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
        />
    )
}
