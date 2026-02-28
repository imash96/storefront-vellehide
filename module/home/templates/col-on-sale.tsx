import { fetchProductsByCollection } from "@/lib/action/product";
import ProductSection from "../components/product-section-new";
import { product_collections } from "@/data/collection";

export default async function OnSale({ region_id, }: { region_id: string }) {
    const collection = product_collections[6]
    const products = await fetchProductsByCollection({
        collection_id: collection.id,
        regionId: region_id,
    },
        // `${collection.handle}-${region_id}`
    )
    return (
        <ProductSection
            title={collection.title}
            desc={collection.metadata.description}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
        />
    )
}