"use client"

import Logo from "@/icon/logo"
import { Search, User, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ThemeButton from "./button-theme"
import CartDrawerButton from "./button-cart-drawer"
import { useDrawer } from "@lib/context/drawer-context"
import MobileDrawer from "../templates/mobile-drawer"

const HOME_REGEX = /^\/?$/

type HeaderClientProps = {
    initialTheme: 'light' | 'dark'
    totalItems: number;
} & React.PropsWithChildren

export default function HeaderClient({ initialTheme, totalItems, children }: HeaderClientProps) {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)

    const isHome = HOME_REGEX.test(pathname)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40)
        }
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const shouldSolid = isScrolled || !isHome //|| activeCategory

    const { toggleMobileDrawer, isMobileDrawerOpen } = useDrawer();

    return (
        <>
            {/* Main Header */}
            <header aria-label="Main Navigation" className={`sticky top-0 z-50 transition-all border-border duration-300 ease-out ${shouldSolid ? "bg-surface/98 backdrop-blur-xl text-foreground border-b shadow-md" : "bg-transparent text-white"}`}>
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            aria-label="Home"
                            className="transition-opacity hover:opacity-80 duration-300 z-10"
                        >
                            <Logo className="w-20 lg:w-24" />
                        </Link>
                        {/* Desktop Navigation */}
                        {children}
                        {/* Right Actions */}
                        <div className="flex items-center gap-2 lg:gap-4">
                            {/* Search Button */}
                            <button
                                className="p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" strokeWidth={1.5} />
                            </button>

                            {/* Theme Toggle */}
                            <ThemeButton
                                initialTheme={initialTheme}
                                className="p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                            />

                            {/* Account Link - Hidden on mobile */}
                            <Link
                                href="/account"
                                className="hidden md:flex p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                                aria-label="Account"
                            >
                                <User className="w-5 h-5" strokeWidth={1.5} />
                            </Link>

                            {/* Cart Button */}
                            <CartDrawerButton
                                totalItems={totalItems}
                                className="relative p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                            />
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileDrawer}
                                className="lg:hidden p-2 rounded-md hover:bg-muted/10 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                                aria-label="Open menu"
                                aria-expanded={isMobileDrawerOpen}
                            >
                                <Menu className="w-6 h-6" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Progress Bar on Scroll */}
                {isScrolled && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent opacity-50 animate-in fade-in duration-300" aria-hidden="true" />
                )}
            </header>
            {/* Spacer to prevent content jump */}
            <div className="h-16 lg:h-20" />

            {/* Mobile Menu Overlay */}
            <MobileDrawer />
        </>
    )
}