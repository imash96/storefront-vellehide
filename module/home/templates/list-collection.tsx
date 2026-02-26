import { fetchProductsByCollection } from "@/lib/action/product"
import ProductSection from "../components/product-section-new"
import { product_collections } from "@/lib/constant/collection"

export async function NewArrival({ region_id }: { region_id: string }) {
    const collection = product_collections[12]
    const products = await fetchProductsByCollection({
        regionId: region_id,
        collection_id: collection.id,
        handle: collection.handle,
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

// ─── col-on-sale.tsx ──────────────────────────────────────────────────────────

export async function OnSale({ region_id }: { region_id: string }) {
    const collection = product_collections[6]
    const products = await fetchProductsByCollection({
        collection_id: collection.id,
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
        collection_id: collection.id,
        handle: collection.handle,
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