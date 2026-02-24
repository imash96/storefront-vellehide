import { fetchProductsByCollection } from "@/lib/action/product";
import ProductSection from "../components/product-section";
import { product_collections } from "@/lib/constant/collection";

export default async function NewArrival({ region_id }: { region_id: string }) {
    const collection = product_collections[12];
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