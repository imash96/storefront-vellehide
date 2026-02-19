"use client"

import { NavLink } from "@/types/homepage";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function HeaderServer({ links }: NavigationProps) {
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const pathname = usePathname();
    return (
        <div className="hidden lg:flex items-center space-x-8">
            {links.map((link) => {
                if (link.href)
                    return (
                        <div
                            key={link.label}
                            className=""
                        >
                            <Link
                                href={link.href}
                                className={`text-sm font-medium flex items-center gap-1 transition-colors ${pathname === link.href ? 'text-accent' : 'text-foreground hover:text-accent'} ${link.megaMenu && "h-full"}`}
                            >
                                {link.label}
                                {link.megaMenu && <ChevronDown className="w-4 h-4 opacity-60" />}
                            </Link>
                        </div>
                    )
                return (
                    <div
                        key={link.label}
                        className=""
                        onMouseEnter={() =>
                            link.megaMenu && setActiveMegaMenu(link.label)
                        }
                        onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                        <button
                            className={`text-sm font-medium flex items-center gap-1 transition-colors ${pathname === link.href ? 'text-accent' : 'text-foreground hover:text-accent'} ${link.megaMenu && "h-full"}`}
                        >
                            {link.label}
                            {link.megaMenu && <ChevronDown className="w-4 h-4 opacity-60" />}
                        </button>

                        {/* Mega Menu */}
                        {link.megaMenu && activeMegaMenu === link.label && (
                            <div className="absolute top-full left-0 w-screen max-w-4xl">
                                <div className="bg-popover border border-popover-border rounded-lg shadow-lg p-8 animate-in slide-in-from-top-1">
                                    <div className="grid grid-cols-4 gap-8">
                                        {/* Categories */}
                                        {link.megaMenu.categories.map((category) => (
                                            <div key={category.title}>
                                                <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-4">
                                                    {category.title}
                                                </h3>

                                                <ul className="space-y-2.5">
                                                    {category.links.map((catLink) => (
                                                        <li key={catLink.label}>
                                                            <Link
                                                                href={catLink.href}
                                                                className="text-sm text-foreground-secondary hover:text-accent transition-colors flex items-center gap-2"
                                                            >
                                                                {catLink.label}
                                                                {catLink.badge && (
                                                                    <span className="badge-new text-[10px] px-1.5 py-0.5">
                                                                        {catLink.badge}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        {/* Featured Item */}
                                        {link.megaMenu.featured && (
                                            <Link
                                                href={link.megaMenu.featured.link}
                                                className="relative overflow-hidden rounded-lg group"
                                            >
                                                <Image
                                                    src={link.megaMenu.featured.image}
                                                    fill
                                                    alt={link.megaMenu.featured.title}
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-overlay-heavy to-transparent p-6 flex flex-col justify-end">
                                                    <h4 className="font-heading font-bold text-white text-lg mb-1">
                                                        {link.megaMenu.featured.title}
                                                    </h4>
                                                    <p className="text-white/90 text-sm">
                                                        {link.megaMenu.featured.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
};

type NavigationProps = {
    links: NavLink[];
}