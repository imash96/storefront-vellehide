/**
 * Type Definitions for Homepage Components
 * Premium Leather Clothing Brand
 */

import { StoreProduct } from "@medusajs/types";

export interface AnnouncementItem {
    id: string;
    message: string;
    link?: string;
}

export type NavLink = {
    label: string;
    href: string;
    megaMenu?: never; // prevents coexistence
} | {
    label: string;
    megaMenu: MegaMenuData;
    href?: never; // prevents coexistence
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

export type ProductSectionProps = {
    products: StoreProduct[];
    title: string;
    desc: string;
    sectionName: string;
    buttonLink?: string;
    buttonText?: string;
    eyebrow?: string;
};


export type SectionHeaderProps = {
    title: string;
    desc?: string;
    sectionName: string;
    className?: string;
    align?: 'left' | 'center';
    eyebrow?: string;
    action?: React.ReactNode;
    children?: React.ReactNode;
};

export interface MegaMenuCategory {
    title: string;
    links: {
        label: string;
        href: string;
        badge?: string;
    }[];
}

export type BannerSlide = {
    id: string
    image: { src: string; alt: string }
    heading: string
    subheading?: string
    desc?: string
    cta: { label: string; href: string }
    ctaSecondary?: { label: string; href: string }
    align: "left" | "center" | "right"
    badge?: string
    price?: { current: string; original?: string }
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