/**
 * Interactive Design System Showcase - Premium Leather Brand
 * 
 * A comprehensive, interactive demonstration of all color tokens, components,
 * and states with live hover, active, and focus demonstrations.
 */

"use client";

import { useState } from 'react';
import { LightbulbOff, Lightbulb, Menu } from 'lucide-react';
import ColorTab from './color';
import { Tabs } from './common';
import ComponentTab from './component';
import EcommerceTab from './ecommerce';
import FontTab from './font';
import InputTab from './input';
import ButtonTab from './button';
import ExtraTab from './extra';

export default function InteractiveTestPage() {
    const [activeTab, setActiveTab] = useState<Tabs>('colors');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <main className="bg-background min-h-screen">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text-primary hover:bg-muted rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => setActiveTab('colors')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'colors' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}`}
                            >
                                Colors
                            </button>
                            <button
                                onClick={() => setActiveTab('components')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'components' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}`}
                            >
                                Components
                            </button>
                            <button
                                onClick={() => setActiveTab('ecommerce')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'ecommerce' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}`}
                            >
                                E-Commerce
                            </button>
                            <button
                                onClick={() => setActiveTab('fonts')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'fonts' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}`}
                            >
                                Fonts
                            </button>
                        </div>
                        <button onClick={() => {
                            setTheme((prevTheme) => {
                                const toggleTheme = prevTheme === "light" ? "dark" : "light"
                                document.documentElement.dataset.theme = toggleTheme;
                                return toggleTheme
                            });
                        }} className='rounded-md border p-2 border-border hover:text-accent-foreground hover:bg-accent transition-colors'>
                            {theme === "light" ? (
                                <LightbulbOff className="h-5 w-5" />
                            ) : (
                                <Lightbulb className="h-5 w-5" />
                            )}
                            <span className="sr-only">Theme Toggle</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
                            <TabButton activeTab={activeTab} onClick={() => { setActiveTab('colors'); setMobileMenuOpen(false); }} name='Colors' />
                            <TabButton activeTab={activeTab} onClick={() => { setActiveTab('components'); setMobileMenuOpen(false); }} name='Components' />
                            <TabButton activeTab={activeTab} onClick={() => { setActiveTab('ecommerce'); setMobileMenuOpen(false); }} name='E-Commerce' />
                            <TabButton activeTab={activeTab} onClick={() => { setActiveTab('fonts'); setMobileMenuOpen(false); }} name='Fonts' />
                        </div>
                    )}
                </div>
            </nav>
            <section className="container-custom py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-14 md:space-y-16">
                {/* Header */}
                <header className="text-center space-y-3 sm:space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary px-4">
                        Interactive Design System
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-3xl mx-auto px-4">
                        Explore all colors, components, and interactive states. Hover, click, and interact with elements to see them in action.
                    </p>
                </header>

                {/* Color Palette Tab */}
                {activeTab === 'colors' && (<ColorTab />)}

                {/* Components Tab */}
                {activeTab === 'components' && (<ComponentTab />)}

                {/* E-Commerce Components Tab */}
                {activeTab === 'ecommerce' && (<EcommerceTab />)}

                {/* Fonts Tab Component - Typography Showcase */}
                {activeTab === 'fonts' && (<FontTab />)}

                {/* Input Tab */}
                {activeTab === 'input' && (<InputTab />)}

                {/* Input Tab */}
                {activeTab === 'button' && (<ButtonTab />)}

                {/* Extra Tab */}
                {activeTab === 'extra' && (<ExtraTab />)}
            </section>
        </main>
    )

}

type TabButtonProps = {
    activeTab: Tabs,
    name: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function TabButton({ activeTab, name, className = '', ...props }: TabButtonProps) {
    return (
        <button className={`w-full px-4 py-3 rounded-md font-medium transition-all text-left ${activeTab === '' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'} ${className}`} {...props}>
            {name}
        </button>
    )
}

function NavButton({ activeTab, name, className = '', ...props }: TabButtonProps) {
    return (
        <button
            onClick={() => setActiveTab('colors')}
            className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'colors' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}`}
        >
            Colors
        </button>
    )
}