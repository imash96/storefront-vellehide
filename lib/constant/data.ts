/**
 * Dummy Data for Homepage
 * Premium Leather Clothing Brand
 */

import type {
    NavLink,
    HeroSlide,
    Category,
    Product,
    Testimonial,
    FooterColumn,
} from '@/types/homepage';

export const navLinks: NavLink[] = [
    {
        label: 'Men',
        megaMenu: {
            categories: [
                {
                    title: 'Jackets & Coats',
                    links: [
                        { label: 'Leather Jackets', href: '/men/jackets/leather' },
                        { label: 'Blazers', href: '/men/blazers' },
                        { label: 'Bomber Jackets', href: '/men/jackets/bomber' },
                        { label: 'Motorcycle Jackets', href: '/men/jackets/moto', badge: 'Bestseller' },
                    ],
                },
                {
                    title: 'Bottoms',
                    links: [
                        { label: 'Leather Pants', href: '/men/pants/leather' },
                        { label: 'Chinos', href: '/men/pants/chinos' },
                    ],
                },
                {
                    title: 'Accessories',
                    links: [
                        { label: 'Belts', href: '/men/accessories/belts' },
                        { label: 'Wallets', href: '/men/accessories/wallets' },
                        { label: 'Bags', href: '/men/accessories/bags' },
                    ],
                },
            ],
            featured: {
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
                title: 'Men\'s Essentials',
                description: 'Timeless leather pieces designed for the modern gentleman',
                link: '/collections/men-essentials',
            },
        },
    },
    {
        label: 'Women',
        megaMenu: {
            categories: [
                {
                    title: 'Jackets & Coats',
                    links: [
                        { label: 'Leather Jackets', href: '/women/jackets/leather' },
                        { label: 'Blazers', href: '/women/blazers' },
                        { label: 'Trench Coats', href: '/women/coats/trench', badge: 'New' },
                        { label: 'Bomber Jackets', href: '/women/jackets/bomber' },
                    ],
                },
                {
                    title: 'Bottoms',
                    links: [
                        { label: 'Leather Pants', href: '/women/pants/leather' },
                        { label: 'Leather Skirts', href: '/women/skirts/leather' },
                        { label: 'Shorts', href: '/women/shorts' },
                    ],
                },
                {
                    title: 'Accessories',
                    links: [
                        { label: 'Belts', href: '/women/accessories/belts' },
                        { label: 'Gloves', href: '/women/accessories/gloves' },
                        { label: 'Bags', href: '/women/accessories/bags', badge: 'Popular' },
                    ],
                },
            ],
            featured: {
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
                title: 'Women\'s Spring Collection',
                description: 'Discover our latest leather pieces crafted for elegance and comfort',
                link: '/collections/women-spring',
            },
        },
    },
    {
        label: 'Footwear',
        href: '/sale',
    },
    {
        label: 'Accessories',
        href: '/about',
    },
    {
        label: 'Home Decor',
        href: '/about',
    },
];

export const heroSlides: HeroSlide[] = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&h=900&fit=crop',
        mobileImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1200&fit=crop',
        heading: 'Timeless Elegance',
        description: 'Discover our curated collection of premium leather jackets',
        cta: {
            label: 'Shop Women',
            href: '/collections/women',
        },
        theme: 'dark',
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1600&h=900&fit=crop',
        mobileImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1200&fit=crop',
        heading: 'Modern Craftsmanship',
        description: 'Expertly crafted leather pieces for the modern gentleman',
        cta: {
            label: 'Shop Men',
            href: '/collections/men',
        },
        theme: 'light',
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1520367745676-56196632073f?w=1600&h=900&fit=crop',
        mobileImage: 'https://images.unsplash.com/photo-1520367745676-56196632073f?w=800&h=1200&fit=crop',
        heading: 'Spring Collection',
        description: 'Light textures and timeless designs for the new season',
        cta: {
            label: 'Explore Collection',
            href: '/collections/spring-2024',
        },
        theme: 'dark',
    },
];

export const categories: Category[] = [
    {
        id: '1',
        name: 'Leather Jackets',
        slug: 'leather-jackets',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
        productCount: 45,
    },
    {
        id: '2',
        name: 'Blazers',
        slug: 'blazers',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        productCount: 28,
    },
    {
        id: '3',
        name: 'Leather Pants',
        slug: 'leather-pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
        productCount: 32,
    },
    {
        id: '4',
        name: 'Coats',
        slug: 'coats',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
        productCount: 22,
    },
    {
        id: '5',
        name: 'Skirts',
        slug: 'skirts',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop',
        productCount: 18,
    },
    {
        id: '6',
        name: 'Accessories',
        slug: 'accessories',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop',
        productCount: 56,
    },
];

export const newArrivals: Product[] = [
    {
        id: '1',
        name: 'Classic Leather Biker Jacket',
        slug: 'classic-leather-biker-jacket',
        description: 'Timeless design with premium lambskin leather',
        images: {
            primary: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop',
        },
        price: {
            current: 599,
            currency: 'USD',
        },
        badge: {
            text: 'New',
            type: 'new',
        },
        rating: {
            average: 4.8,
            count: 127,
        },
        isNew: true,
    },
    {
        id: '2',
        name: 'Tailored Leather Blazer',
        slug: 'tailored-leather-blazer',
        images: {
            primary: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
        },
        price: {
            current: 449,
            original: 599,
            currency: 'USD',
        },
        badge: {
            text: 'Sale',
            type: 'sale',
        },
        rating: {
            average: 4.9,
            count: 89,
        },
    },
    {
        id: '3',
        name: 'Vintage Bomber Jacket',
        slug: 'vintage-bomber-jacket',
        images: {
            primary: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=600&h=800&fit=crop',
        },
        price: {
            current: 529,
            currency: 'USD',
        },
        rating: {
            average: 4.7,
            count: 64,
        },
        isNew: true,
    },
    {
        id: '4',
        name: 'Leather Midi Skirt',
        slug: 'leather-midi-skirt',
        images: {
            primary: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=600&h=800&fit=crop',
        },
        price: {
            current: 299,
            currency: 'USD',
        },
        badge: {
            text: 'New',
            type: 'new',
        },
        rating: {
            average: 4.6,
            count: 42,
        },
        isNew: true,
    },
    {
        id: '5',
        name: 'High-Waist Leather Pants',
        slug: 'high-waist-leather-pants',
        images: {
            primary: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop',
        },
        price: {
            current: 379,
            currency: 'USD',
        },
        rating: {
            average: 4.8,
            count: 98,
        },
    },
    {
        id: '6',
        name: 'Classic Trench Coat',
        slug: 'classic-trench-coat',
        images: {
            primary: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=600&h=800&fit=crop',
        },
        price: {
            current: 699,
            original: 899,
            currency: 'USD',
        },
        badge: {
            text: 'Limited',
            type: 'limited',
        },
        rating: {
            average: 4.9,
            count: 156,
        },
        isFeatured: true,
    },
    {
        id: '7',
        name: 'Cropped Leather Jacket',
        slug: 'cropped-leather-jacket',
        images: {
            primary: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=600&h=800&fit=crop',
        },
        price: {
            current: 469,
            currency: 'USD',
        },
        badge: {
            text: 'New',
            type: 'new',
        },
        rating: {
            average: 4.7,
            count: 73,
        },
        isNew: true,
    },
    {
        id: '8',
        name: 'Leather Shoulder Bag',
        slug: 'leather-shoulder-bag',
        images: {
            primary: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1564222195116-8763dac3476f?w=600&h=800&fit=crop',
        },
        price: {
            current: 249,
            currency: 'USD',
        },
        rating: {
            average: 4.8,
            count: 211,
        },
    },
];

export const bestSellers: Product[] = [
    {
        id: 'bs-1',
        name: 'Signature Moto Jacket',
        slug: 'signature-moto-jacket',
        images: {
            primary: 'https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
        },
        price: {
            current: 649,
            currency: 'USD',
        },
        rating: {
            average: 5.0,
            count: 342,
        },
        isFeatured: true,
    },
    {
        id: 'bs-2',
        name: 'Premium Leather Tote',
        slug: 'premium-leather-tote',
        images: {
            primary: 'https://images.unsplash.com/photo-1564222195116-8763dac3476f?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop',
        },
        price: {
            current: 329,
            currency: 'USD',
        },
        rating: {
            average: 4.9,
            count: 287,
        },
        isFeatured: true,
    },
    {
        id: 'bs-3',
        name: 'Essential Leather Pants',
        slug: 'essential-leather-pants',
        images: {
            primary: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
        },
        price: {
            current: 399,
            currency: 'USD',
        },
        rating: {
            average: 4.8,
            count: 198,
        },
        isFeatured: true,
    },
    {
        id: 'bs-4',
        name: 'Structured Leather Blazer',
        slug: 'structured-leather-blazer',
        images: {
            primary: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
            secondary: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        },
        price: {
            current: 549,
            currency: 'USD',
        },
        rating: {
            average: 4.9,
            count: 145,
        },
        isFeatured: true,
    },
];

export const testimonials: Testimonial[] = [
    {
        id: '1',
        author: {
            name: 'Sarah Mitchell',
            avatar: 'https://i.pravatar.cc/150?img=1',
            verified: true,
        },
        rating: 5,
        quote: 'The quality is exceptional! My leather jacket fits perfectly and feels incredibly luxurious. Worth every penny.',
        date: '2024-03-15',
        product: 'Classic Leather Biker Jacket',
    },
    {
        id: '2',
        author: {
            name: 'David Chen',
            avatar: 'https://i.pravatar.cc/150?img=12',
            verified: true,
        },
        rating: 5,
        quote: 'Best leather goods I\'ve ever purchased. The craftsmanship is outstanding and the customer service was excellent.',
        date: '2024-03-10',
        product: 'Signature Moto Jacket',
    },
    {
        id: '3',
        author: {
            name: 'Emma Rodriguez',
            avatar: 'https://i.pravatar.cc/150?img=5',
            verified: true,
        },
        rating: 4,
        quote: 'Beautiful design and high-quality materials. The fit is true to size and it looks even better in person!',
        date: '2024-03-08',
        product: 'Tailored Leather Blazer',
    },
    {
        id: '4',
        author: {
            name: 'Michael Park',
            avatar: 'https://i.pravatar.cc/150?img=8',
            verified: true,
        },
        rating: 5,
        quote: 'I\'m impressed by the attention to detail. This is now my go-to brand for premium leather clothing.',
        date: '2024-03-05',
        product: 'Vintage Bomber Jacket',
    },
    {
        id: '5',
        author: {
            name: 'Olivia Thompson',
            avatar: 'https://i.pravatar.cc/150?img=9',
            verified: true,
        },
        rating: 5,
        quote: 'Absolutely love my new leather skirt! The quality is amazing and it arrived faster than expected.',
        date: '2024-03-01',
        product: 'Leather Midi Skirt',
    },
];

export const footerColumns: FooterColumn[] = [
    {
        title: 'Shop',
        links: [
            { label: 'Women', href: '/collections/women' },
            { label: 'Men', href: '/collections/men' },
            { label: 'New Arrivals', href: '/collections/new-arrivals' },
            { label: 'Best Sellers', href: '/collections/best-sellers' },
            { label: 'Sale', href: '/sale' },
        ],
    },
    {
        title: 'Customer Care',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Shipping & Returns', href: '/shipping' },
            { label: 'Size Guide', href: '/size-guide' },
            { label: 'Track Order', href: '/track-order' },
            { label: 'FAQ', href: '/faq' },
        ],
    },
    {
        title: 'About',
        links: [
            { label: 'Our Story', href: '/about' },
            { label: 'Craftsmanship', href: '/craftsmanship' },
            { label: 'Sustainability', href: '/sustainability' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
        ],
    },
];