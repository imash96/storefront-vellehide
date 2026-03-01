import { product_categories } from "./category";

export const MEGA_MENU = ["Men", "Women",] as const
export type MegaMenu = typeof MEGA_MENU[number]

export function getMegaCategories() {
    return product_categories.filter(c => (MEGA_MENU as readonly string[]).includes(c.name));
}

export const NAV_LINKS = [
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Best Sellers', href: '/best-sellers' },
    { label: 'Sale', href: '/sale' },
] as const;

export type MenuSection = {
    id: string;
    name: string;
    handle: string;
    thumbnail: string;
    alt: string;
};

export const featuredCollections = [
    { name: "Winter Essentials", handle: "/collections/winter", tag: "Trending" },
    { name: "Heritage Collection", handle: "/collections/heritage", tag: "New" },
    { name: "Signature Series", handle: "/collections/signature", tag: "Limited" },
    { name: "Custom Orders", handle: "/custom", tag: "Bespoke" },
];


// Images for mega menu hero/featured areas - using placeholder images
export const categoryImages: Record<string, { src: string; alt: string; title: string; subtitle: string }> = {
    "men/outerwear": {
        src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        alt: "Men's Leather Outerwear Collection",
        title: "Outerwear",
        subtitle: "Timeless leather outerwear crafted for the modern man",
    },
    "men/outerwear/jackets": {
        src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=800&fit=crop",
        alt: "Men's Leather Jackets",
        title: "Leather Jackets",
        subtitle: "From biker to bomber — find your signature style",
    },
    "men/outerwear/coats": {
        src: "https://images.unsplash.com/photo-1544923246-77307dd270b1?w=600&h=800&fit=crop",
        alt: "Men's Leather Coats",
        title: "Leather Coats",
        subtitle: "Sophisticated protection for every season",
    },
    "men/outerwear/blazers": {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
        alt: "Men's Leather Blazers",
        title: "Leather Blazers",
        subtitle: "Elevate your formal wardrobe",
    },
    "men/tops": {
        src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=800&fit=crop",
        alt: "Men's Leather Tops",
        title: "Tops",
        subtitle: "Premium leather shirts, tees & vests",
    },
    "men/bottoms": {
        src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
        alt: "Men's Leather Bottoms",
        title: "Bottoms",
        subtitle: "Tailored leather pants & shorts",
    },
    "women/outerwear": {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
        alt: "Women's Leather Outerwear",
        title: "Outerwear",
        subtitle: "Chic leather outerwear designed for her",
    },
    "women/outerwear/jackets": {
        src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        alt: "Women's Leather Jackets",
        title: "Leather Jackets",
        subtitle: "Edgy, elegant, and effortlessly cool",
    },
    "women/outerwear/coats": {
        src: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
        alt: "Women's Leather Coats",
        title: "Leather Coats",
        subtitle: "Luxurious warmth, refined silhouettes",
    },
    "women/outerwear/blazers": {
        src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
        alt: "Women's Leather Blazers",
        title: "Leather Blazers",
        subtitle: "Polish meets edge",
    },
    "women/tops": {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
        alt: "Women's Leather Tops",
        title: "Tops",
        subtitle: "Unique leather shirts, tees & vests",
    },
    "women/bottoms": {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
        alt: "Women's Leather Bottoms",
        title: "Bottoms",
        subtitle: "Skirts, pants & shorts in premium leather",
    },
    "women/dresses": {
        src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
        alt: "Women's Leather Dresses",
        title: "Dresses",
        subtitle: "Statement leather dresses for every occasion",
    },
    // Default fallback
    default: {
        src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
        alt: "Velle Hide Leather Collection",
        title: "Explore Collection",
        subtitle: "Handcrafted genuine leather",
    },
};

export const features: Record<MegaMenu, MenuSection[]> = {
    "Men": [
        {
            id: 'men-co1-01',
            name: 'New Arrivals',
            handle: 'new-arrivals-men',
            thumbnail: '/images/col_thumb/col_selling.webp',
            alt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
            id: 'men-co1-02',
            name: 'Best Sellers',
            handle: 'best-sellers-men',
            thumbnail: '/images/col_thumb/col_summer.webp',
            alt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        }
    ],

    "Women": [
        {
            id: 'women-col-01',
            name: 'New Arrivals',
            handle: 'new-arrivals-women',
            thumbnail: '/images/col_thumb/col_trending.webp',
            alt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
            id: 'women-col-02',
            name: 'Best Sellers',
            handle: 'best-sellers-women',
            thumbnail: '/images/col_thumb/col_winter.webp',
            alt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        }
    ],
}

export const navLinks = [
    {
        label: 'Kids',
        href: '/category/kids',
    },
    {
        label: 'Accessories',
        href: '/category/accessories',
    },
    {
        label: 'Home Decor',
        href: '/category/home-decor',
        badge: "New"
    },
    {
        label: 'Gifting',
        href: '/category/gifting',
    },
];