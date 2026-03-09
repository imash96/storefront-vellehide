"use client"

/**
 * app/category/[parent]/[...handle]/ProductListingClient.tsx
 *
 * Client boundary that owns the filter drawer toggle state
 * and wires together <FilterDrawer> + <ProductGrid>.
 */

import { useState } from "react"
import FilterDrawer from "../components/filter-drawer"
import ProductGrid from "../components/product-grid"
import { StoreProductCategory, StoreProduct } from "@medusajs/types"

interface ProductListingClientProps {
    products: StoreProduct[]
    count: number
    currentPage: number
    limit: number
    sort: string
    category: StoreProductCategory | null
    sizes: string[] | null
    activeFilters: {
        sizes: string[]
        colors: string[]
        minPrice: string
        maxPrice: string
    }
}

export default function ProductListingClient({
    products,
    count,
    currentPage,
    limit,
    sort,
    category,
    sizes,
    activeFilters,
}: ProductListingClientProps) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const activeFilterCount =
        activeFilters.sizes.length +
        activeFilters.colors.length +
        (activeFilters.minPrice || activeFilters.maxPrice ? 1 : 0)

    return (
        <div className="pt-8">
            <FilterDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                currentCategory={category}
                sizes={sizes}
                activeFilters={activeFilters}
            />

            <ProductGrid
                products={products}
                count={count}
                currentPage={currentPage}
                limit={limit}
                sort={sort}
                onFilterOpen={() => setDrawerOpen(true)}
                activeFilterCount={activeFilterCount}
            />
        </div>
    )
}