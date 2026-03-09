import { ArrowRight } from 'lucide-react';
import { SectionHeaderClassic, SectionHeaderCentered } from './section-header-final';
import { StoreProduct } from '@medusajs/types';
import Button from '@/ui/button-new';
import ProductCard from '@/ui/product-card';

type ProductSectionProps = {
    products: StoreProduct[];
    title: string;
    desc: string;
    sectionName: string;
    buttonLink?: string;
    buttonText?: string;
    eyebrow?: string;
};

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT 1 — Classic Grid
   Left-aligned header · mobile horizontal scroll · desktop 6-column grid
   ═══════════════════════════════════════════════════════════════════════════ */
export function ProductSectionClassic({
    products,
    title,
    desc,
    sectionName,
    buttonLink = '#',
    buttonText = 'View all',
    eyebrow,
}: ProductSectionProps) {
    const displayProducts = products.slice(0, 6);

    if (!displayProducts.length) {
        return (
            <SectionHeaderClassic title={title} desc={desc} sectionName={sectionName} eyebrow={eyebrow}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="aspect-3/4 skeleton rounded-sm" />
                    ))}
                </div>
            </SectionHeaderClassic>
        );
    }

    return (
        <SectionHeaderClassic
            title={title}
            desc={desc}
            sectionName={sectionName}
            eyebrow={eyebrow}
            action={
                <Button
                    href={buttonLink}
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="size-3.5" />}
                    iconPosition="right"
                    className="hidden! md:inline-flex!"
                >
                    {buttonText}
                </Button>
            }
        >
            {/* Mobile scroll strip */}
            <div className="md:hidden -mx-4 px-4 overflow-x-auto overscroll-x-contain scroll-smooth flex gap-3 pb-4 no-scrollbar">
                {displayProducts.map((product) => (
                    <div key={product.id} className="flex-[0_0_44%] min-w-0">
                        <ProductCard product={product} />
                    </div>
                ))}
                <div className="flex-[0_0_4%] shrink-0" aria-hidden />
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-5 flex justify-center md:hidden">
                <Button
                    href={buttonLink}
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="size-3.5" />}
                    iconPosition="right"
                >
                    {buttonText}
                </Button>
            </div>
        </SectionHeaderClassic>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT 2 — Centered Elegant
   Centered header with decorative dividers · 4-column grid on desktop
   ═══════════════════════════════════════════════════════════════════════════ */
export function ProductSectionElegant({
    products,
    title,
    desc,
    sectionName,
    buttonLink = '#',
    buttonText = 'Explore Collection',
    eyebrow,
}: ProductSectionProps) {
    const displayProducts = products.slice(0, 4);

    return (
        <SectionHeaderCentered
            title={title}
            desc={desc}
            sectionName={sectionName}
            eyebrow={eyebrow}
        >
            {/* 4-column grid with larger cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Center CTA */}
            <div className="mt-10 md:mt-12 flex justify-center">
                <Button
                    href={buttonLink}
                    variant="primary"
                    size="lg"
                    shape="pill"
                    icon={<ArrowRight className="size-4" />}
                    iconPosition="right"
                >
                    {buttonText}
                </Button>
            </div>
        </SectionHeaderCentered>
    );
}