/**
 * Type Definitions for Homepage Components
 * Premium Leather Clothing Brand
 */

export interface AnnouncementItem {
    id: string;
    message: string;
    link?: string;
}

export interface NavLink {
    label: string;
    href?: string;
    megaMenu?: MegaMenuData;
}

export interface MegaMenuData {
    categories: MegaMenuCategory[];
    featured?: {
        image: string;
        title: string;
        description: string;
        link: string;
    };
}

export interface MegaMenuCategory {
    title: string;
    links: {
        label: string;
        href: string;
        badge?: string;
    }[];
}

export interface HeroSlide {
    id: string;
    image: string;
    mobileImage?: string;
    heading: string;
    description: string;
    cta: {
        label: string;
        href: string;
    };
    theme?: 'light' | 'dark'; // Text color theme for overlay
}

export interface FeatureHighlight {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    productCount?: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    images: {
        primary: string;
        secondary?: string;
    };
    price: {
        current: number;
        original?: number;
        currency: string;
    };
    badge?: {
        text: string;
        type: 'new' | 'sale' | 'limited';
    };
    rating?: {
        average: number;
        count: number;
    };
    isNew?: boolean;
    isFeatured?: boolean;
}

export interface Testimonial {
    id: string;
    author: {
        name: string;
        avatar?: string;
        verified?: boolean;
    };
    rating: number;
    quote: string;
    date?: string;
    product?: string;
}

export interface FooterColumn {
    title: string;
    links: {
        label: string;
        href: string;
    }[];
}

export interface SocialLink {
    platform: string;
    href: string;
    icon: React.ReactNode;
}

export interface NewsletterFormData {
    email: string;
}