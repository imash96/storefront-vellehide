import { fetchProductsByCollection } from "@/lib/action/product";
import ProductSection from "../components/product-section";
import { product_collections } from "@/data/collection";

export default async function TrendingNow({
    region_id,
}: {
    region_id: string;
}) {
    const collection = product_collections[9];
    const products = await fetchProductsByCollection({
        regionId: region_id,
        collection_id: collection.id,
        handle: collection.handle,
    });

    return (
        <ProductSection
            title={collection.title}
            desc={collection.metadata.description}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
        />
    );
}
