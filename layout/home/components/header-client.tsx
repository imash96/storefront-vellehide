"use client"

import Logo from "@/icon/logo"
import { Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ThemeButton from "./button-theme"
import CartDrawerButton from "./button-cart-drawer"
// import { useDrawer } from "@lib/context/drawer-context"

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

    return (
        <nav aria-label="Primary Navigation" className={`sticky top-0 z-40 transition-all border-border duration-300 ease-out ${shouldSolid ? "bg-surface/95 backdrop-blur-md text-foreground border-b shadow-md" : "bg-transparent text-white"}`}>
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" aria-label="Home">
                        <Logo className="w-20" />
                    </Link>
                    {/* Desktop Navigation */}
                    {children}
                    {/* Right Actions */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        <button
                            className="p-2 rounded-md hover:bg-muted transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <ThemeButton
                            initialTheme={initialTheme}
                            className="p-2 rounded-md hover:bg-muted transition-colors"
                        />

                        <Link
                            href="/account"
                            className="hidden md:flex p-2 rounded-md hover:bg-muted transition-colors"
                            aria-label="Account"
                        >
                            <User className="w-5 h-5" />
                        </Link>

                        <CartDrawerButton totalItems={totalItems} className="relative p-2 rounded-md hover:bg-muted transition-colors" />
                    </div>
                </div>
            </div>
        </nav>
    )
}