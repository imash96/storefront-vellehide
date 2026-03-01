"use client"

import Logo from "@/icon/logo";
import Container from "@/ui/container";
import dynamic from "next/dynamic";
import Link from "next/link";
import ThemeButton from "./button-theme";
import CartDrawerButton from "./button-cart-drawer";
import { ChevronDown, Menu, User } from "lucide-react";
import { useMenuDrawer } from "@/lib/store/useDrawerStore";
import { AnimatePresence, motion } from "motion/react";
import { useMegaMenu } from "@/lib/store/useMegaMenu";
import { product_categories } from "@/data/category";
import { MEGA_MENU, MegaMenu, navLinks } from "@/data/header";
import MegaPanel from "./mega-panel";
import { useEffect, useState } from "react";
import clx from "@/lib/util/clx";

const SearchModal = dynamic(
    () => import("../templates/search-modal").then(m => m.SearchModal),
    { ssr: false }
)


export default function HeaderClient({ initialTheme, totalItems }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const { isOpen: isMenuOpen, open: openMenuX } = useMenuDrawer()
    const megaCats = product_categories.filter((c) => MEGA_MENU.includes(c.name as MegaMenu));

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { activeMenu, setActiveMenu, cancelClose, scheduleClose, openMenu } = useMegaMenu()
    return (
        <>
            <header aria-label="Main Navigation" className="sticky top-0 z-40 bg-surface/98 backdrop-blur-xl text-foreground shadow-md transition-all duration-300">
                <Container size="2xl" className="relative flex items-center justify-between h-16.5 lg:h-20 gap-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="Home"
                        className="transition-opacity hover:opacity-80 duration-300"
                    >
                        <Logo className="text-primary w-18 lg:w-22" />
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
                        {megaCats.map((cat) => (
                            <div
                                key={cat.id}
                                className="relative"
                                onMouseEnter={() => openMenu(cat.name)}
                                onMouseLeave={scheduleClose}
                            >
                                <button
                                    className={clx(
                                        "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-150 group",
                                        activeMenu === cat.name ? "text-accent" : "text-neutral-300 hover:text-white"
                                    )}
                                    aria-expanded={activeMenu === cat.name}
                                >
                                    {cat.name}
                                    <ChevronDown
                                        className={clx(
                                            "w-3.5 h-3.5 transition-transform duration-200",
                                            activeMenu === cat.name ? "rotate-180 text-accent" : "text-neutral-600"
                                        )}
                                        strokeWidth={2}
                                    />
                                    {activeMenu === cat.name && (
                                        <motion.span
                                            layoutId="d-underline"
                                            className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </button>
                            </div>
                        ))}

                        <div className="w-px h-4 bg-neutral-800 mx-2" />

                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-150"
                            >
                                {link.label}
                                {link.badge && (
                                    <span className={clx(
                                        "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded",
                                        link.badge === "Sale" ? "bg-badge-sale text-badge-sale-foreground" : "bg-badge-new text-badge-new-foreground"
                                    )}>
                                        {link.badge}
                                    </span>
                                )}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Search Button */}
                        <SearchModal />

                        {/* Theme Toggle */}
                        <ThemeButton
                            initialTheme={initialTheme}
                            className="p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        />

                        {/* Account Link - Hidden on mobile */}
                        <Link
                            href="/account"
                            className="hidden md:flex p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                            aria-label="Account"
                        >
                            <User className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                        </Link>

                        {/* Cart Button */}
                        <CartDrawerButton
                            totalItems={totalItems}
                            className="relative p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        />
                        {/* Mobile Menu Button */}
                        <button
                            onClick={openMenuX}
                            className="lg:hidden p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                        >
                            <Menu className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                        </button>
                    </div>
                </Container>
                {/* Mega Panels */}
                <div
                    className="relative"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                >
                    <AnimatePresence>
                        {activeMenu && megaCats.map((cat) =>
                            cat.name === activeMenu ? (
                                <MegaPanel key={cat.id} category={cat} onClose={() => setActiveMenu(null)} />
                            ) : null
                        )}
                    </AnimatePresence>
                </div>
                {/* Progress Bar on Scroll */}
                {isScrolled && (
                    <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent opacity-50"
                        aria-hidden="true"
                    />
                )}
            </header>
            <AnimatePresence>
                {activeMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-30 bg-overlay/40 backdrop-blur-[2px]"
                        onClick={() => setActiveMenu(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

type HeaderClientProps = {
    initialTheme: 'light' | 'dark'
    totalItems: number;
}