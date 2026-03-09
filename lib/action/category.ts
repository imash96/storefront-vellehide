"use server";

import type { FindParams, StoreProductCategory, StoreProductCategoryListParams, } from "@medusajs/types";
import { sdk } from "../sdk";
import { getAuthHeaders } from "./cookies";

const DEFAULT_LIMIT = 100;
const NAV_FIELDS = "*category_children,*parent_category";
const DETAIL_FIELDS = "*category_children,*parent_category,*parent_category.parent_category";

export async function fetchCategories(cacheTag: string, query?: (FindParams & StoreProductCategoryListParams)) {
    const headers = await getAuthHeaders()

    const next = { tags: [cacheTag] }

    return sdk.store.category.list(
        query,
        headers,
        next,
    )
}

export async function listCategories(query: StoreProductCategoryListParams & FindParams): Promise<StoreProductCategory[]> {
    const {
        fields: customFields,
        limit: customLimit,
        ...filterParams
    } = query;

    const { product_categories } = await fetchCategories(
        "categories",
        {
            fields: customFields ?? NAV_FIELDS,
            limit: customLimit ?? DEFAULT_LIMIT,
            ...filterParams,
        }
    );

    return product_categories;
}

export async function getCategoryByHandle(handle: string): Promise<StoreProductCategory | null> {
    if (!handle) return null;


    const { product_categories } = await fetchCategories(
        `category-${handle}`,
        {
            fields: DETAIL_FIELDS,
            handle,
            limit: 1,
        }
    );

    return product_categories[0] ?? null;
}

export async function listParentCategories(): Promise<StoreProductCategory[]> {
    return listCategories({
        parent_category_id: "null",
        include_descendants_tree: true,
    });
}