"use server";

import type { FindParams, StoreProduct, StoreProductListParams, } from "@medusajs/types";
import type { SortOptions } from "@/types/common";
import { sdk } from "../sdk";
import { getAuthHeaders } from "./cookies";
import { getRegion, retrieveRegion } from "./region";
import { sortProducts } from "../util/sort-products";

const DEFAULT_LIMIT = 12;
const SORT_BATCH_LIMIT = 100;
const DEFAULT_FIELDS = "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags";
const SERVER_SORT_MAP: Partial<Record<SortOptions, string>> = {
    created_at: "-created_at",
};

function resolveRegion(countryCode?: string, regionId?: string) {
    if (countryCode) return getRegion(countryCode) ?? null;
    if (regionId) return retrieveRegion(regionId) ?? null;
    return null;
}

function isPriceSort(sortBy: SortOptions): boolean {
    return sortBy === "price_asc" || sortBy === "price_desc";
}

export async function listProducts({ pageParam = 1, queryParams, countryCode, regionId }: ListProductsProps, cacheKey?: string,): Promise<ListProductsResp> {
    if (!countryCode && !regionId) throw new Error("Country code or region ID is required")

    const region = resolveRegion(countryCode, regionId)

    if (!region) return { response: { products: [], count: 0 }, nextPage: null }

    const limit = queryParams?.limit ?? DEFAULT_LIMIT;
    const page = Math.max(pageParam, 1);
    const offset = (page - 1) * limit;
    const fields = queryParams?.fields ?? DEFAULT_FIELDS;

    const { limit: _l, offset: _o, fields: _f, ...filterParams } = queryParams ?? {};

    // Fetch auth headers and cache config
    const headers = await getAuthHeaders();
    const next = { tags: [cacheKey ?? `products-${region.id}`] };

    const { products, count } = await sdk.store.product.list(
        {
            ...filterParams,
            limit,
            offset,
            region_id: region.id,
            fields,
        },
        headers,
        next,
    );

    return {
        response: { products, count },
        nextPage: count > offset + limit ? page + 1 : null,
        queryParams,
    };
}

export async function listProductsWithSort({ page = 1, queryParams, sortBy = "created_at", countryCode }: ListProductsWithSortProps): Promise<ListProductsWithSortResp> {
    const limit = queryParams?.limit || DEFAULT_LIMIT
    const safePage = Math.max(page, 1)
    const offset = (safePage - 1) * limit

    // ── Fast path: server-side sort ──────────────────────────────────────────
    if (!isPriceSort(sortBy)) {
        const order = SERVER_SORT_MAP[sortBy] ?? `-${sortBy}`;

        const { response } = await listProducts({
            pageParam: safePage,
            queryParams: { ...queryParams, limit, order },
            countryCode,
        });

        const hasMore = response.count > offset + limit;

        return {
            response,
            nextPage: hasMore ? safePage + 1 : null,
            hasMore,
            limit,
            queryParams,
        };
    }

    // ── Slow path: client-side price sort ────────────────────────────────────
    const { response: { products, count } } = await listProducts({
        pageParam: 1,
        queryParams: { ...queryParams, limit: SORT_BATCH_LIMIT },
        countryCode,
    })

    const sorted = sortProducts(products, sortBy);
    const paginated = sorted.slice(offset, offset + limit);
    const hasMore = count > offset + limit;

    return {
        response: { products: paginated, count },
        nextPage: hasMore ? safePage + 1 : null,
        hasMore,
        limit,
        queryParams,
    }
}

export async function fetchProductsByCollection({ regionId, collectionId, limit = 6 }: FetchByCollectionProps): Promise<StoreProduct[]> {
    const { response: { products } } = await listProducts(
        {
            regionId,
            queryParams: {
                collection_id: [collectionId],
                limit,
                fields: "id,handle,title,*images,*variants.calculated_price",
            },
        },
        `collection-${collectionId}-${regionId}`
    );
    return products;
}

type ListProductsProps = {
    pageParam?: number
    queryParams?: FindParams & StoreProductListParams
    countryCode?: string
    regionId?: string
}

type ListProductsResp = {
    response: { products: StoreProduct[]; count: number }
    nextPage: number | null
    queryParams?: FindParams & StoreProductListParams
}

type ListProductsWithSortProps = {
    page?: number
    queryParams?: FindParams & StoreProductListParams
    sortBy?: SortOptions
    countryCode: string
}

type ListProductsWithSortResp = {
    response: { products: StoreProduct[]; count: number }
    nextPage: number | null
    limit: number
    queryParams?: FindParams & StoreProductListParams
    hasMore: boolean
}

type FetchByCollectionProps = {
    regionId: string;
    collectionId: string;
    limit: number
};