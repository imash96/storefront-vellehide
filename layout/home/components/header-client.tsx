"use client"

import Logo from "@/icon/logo"
import { User, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ThemeButton from "./button-theme"
import CartDrawerButton from "./button-cart-drawer"
import MobileDrawer from "../templates/mobile-drawer"
import Container from "@/ui/container"
import { SearchModal } from "../templates/search-modal"
import { useMenuDrawer } from "@/lib/store/useDrawerStore"


type HeaderClientProps = {
    initialTheme: 'light' | 'dark'
    totalItems: number;
} & React.PropsWithChildren

export default function HeaderClient({ initialTheme, totalItems, children }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false)


    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { isOpen: isMenuOpen, open: openMenu } = useMenuDrawer()

    return (
        <>
            {/* Main Header */}
            <header aria-label="Main Navigation" className={`sticky top-0 z-50 transition-all duration-300 ease-out bg-surface/98 ${isScrolled ? "backdrop-blur-xl text-foreground shadow-md" : "bg-transparent"}`}>
                <Container className="relative flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="Home"
                        className="transition-opacity hover:opacity-80 duration-300 z-10"
                    >
                        <Logo className="text-primary w-18 lg:w-22" />
                    </Link>
                    {/* Desktop Navigation */}
                    {children}
                    {/* Right Actions */}
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
                            onClick={openMenu}
                            className="lg:hidden p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                        >
                            <Menu className="w-6 h-6" strokeWidth={1.5} aria-hidden />
                        </button>
                    </div>
                </Container>
                {/* Progress Bar on Scroll */}
                {isScrolled && (
                    <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent opacity-50"
                        aria-hidden="true"
                    />
                )}
            </header>
            {/* Mobile Menu Overlay */}
            <MobileDrawer />
        </>
    )
}