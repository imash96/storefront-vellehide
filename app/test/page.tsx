/**
 * Interactive Design System Showcase - Premium Leather Brand
 * 
 * A comprehensive, interactive demonstration of all color tokens, components,
 * and states with live hover, active, and focus demonstrations.
 */

"use client";

import { useState } from 'react';
import { Star, Heart, ShoppingCart, Check, X, AlertCircle, Info, ChevronRight, Search, Menu, User, Package, Truck, CreditCard, Eye, Trash2, Plus, Minus, Grid, List, MapPin, Phone, Mail } from 'lucide-react';

export default function InteractiveTestPage() {
    const [activeTab, setActiveTab] = useState<'colors' | 'components' | 'ecommerce' | 'fonts'>('colors');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const neutralBg: Record<number, string> = {
        50: "bg-neutral-50",
        100: "bg-neutral-100",
        200: "bg-neutral-200",
        300: "bg-neutral-300",
        400: "bg-neutral-400",
        500: "bg-neutral-500",
        600: "bg-neutral-600",
        700: "bg-neutral-700",
        800: "bg-neutral-800",
        900: "bg-neutral-900",
        950: "bg-neutral-950",
    };

    return (
        <main className="bg-background min-h-screen">
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <h1 className="text-base sm:text-lg md:text-xl font-bold text-text-primary">
                            Design System
                        </h1>

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
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'colors'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                Colors
                            </button>
                            <button
                                onClick={() => setActiveTab('components')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'components'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                Components
                            </button>
                            <button
                                onClick={() => setActiveTab('ecommerce')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'ecommerce'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                E-Commerce
                            </button>
                            <button
                                onClick={() => setActiveTab('fonts')}
                                className={`px-4 py-2 rounded-md font-medium transition-all text-sm lg:text-base ${activeTab === 'fonts'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                Fonts
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
                            <button
                                onClick={() => {
                                    setActiveTab('colors');
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full px-4 py-3 rounded-md font-medium transition-all text-left ${activeTab === 'colors'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                Colors
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('components');
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full px-4 py-3 rounded-md font-medium transition-all text-left ${activeTab === 'components'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                Components
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('ecommerce');
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full px-4 py-3 rounded-md font-medium transition-all text-left ${activeTab === 'ecommerce'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                                    }`}
                            >
                                E-Commerce
                            </button>
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
                {activeTab === 'colors' && (
                    <>
                        {/* Interactive Color Swatches */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Interactive Color Palette"
                                subtitle="Hover over swatches to see color information. Click to copy hex value."
                            />

                            {/* Primary Colors */}
                            <ColorSection title="Primary Colors" colors={[
                                { name: 'Primary', bg: 'bg-primary', text: 'text-primary-foreground' },
                                { name: 'Primary Hover', bg: 'bg-primary-hover', text: 'text-primary-foreground' },
                                { name: 'Primary Active', bg: 'bg-primary-active', text: 'text-primary-foreground' },
                                { name: 'Primary Subtle', bg: 'bg-primary-subtle', text: 'text-primary' },
                            ]} />

                            {/* Secondary Colors */}
                            <ColorSection title="Secondary Colors" colors={[
                                { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary-foreground' },
                                { name: 'Secondary Hover', bg: 'bg-secondary-hover', text: 'text-secondary-foreground' },
                                { name: 'Secondary Active', bg: 'bg-secondary-active', text: 'text-secondary-foreground' },
                                { name: 'Secondary Subtle', bg: 'bg-secondary-subtle', text: 'text-secondary' },
                            ]} />

                            {/* Accent Colors */}
                            <ColorSection title="Accent Colors" colors={[
                                { name: 'Accent', bg: 'bg-accent', text: 'text-accent-foreground' },
                                { name: 'Accent Hover', bg: 'bg-accent-hover', text: 'text-accent-foreground' },
                                { name: 'Accent Active', bg: 'bg-accent-active', text: 'text-accent-foreground' },
                                { name: 'Accent Subtle', bg: 'bg-accent-subtle', text: 'text-accent' },
                            ]} />

                            {/* Semantic Colors */}
                            <ColorSection title="Semantic Colors" colors={[
                                { name: 'Success', bg: 'bg-success', text: 'text-success-foreground' },
                                { name: 'Destructive', bg: 'bg-destructive', text: 'text-destructive-foreground' },
                                { name: 'Warning', bg: 'bg-warning', text: 'text-warning-foreground' },
                                { name: 'Info', bg: 'bg-info', text: 'text-info-foreground' },
                            ]} />

                            {/* Neutral Scale */}
                            <div className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Neutral Scale (50-950)</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2 sm:gap-3">
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                                        <InteractiveColorSwatch
                                            key={shade}
                                            name={`${shade}`}
                                            bg={neutralBg[shade]}
                                            text={shade >= 500 ? "text-neutral-50" : "text-neutral-950"}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Text Hierarchy with Interactive Examples */}
                            <div className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Text Hierarchy</h3>
                                <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-text-primary text-base sm:text-lg font-semibold">Primary Text</p>
                                        <p className="text-text-primary text-sm sm:text-base">Main content and headings. Use for primary information that users need to see first.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-text-secondary text-base sm:text-lg font-semibold">Secondary Text</p>
                                        <p className="text-text-secondary text-sm sm:text-base">Supporting information and descriptions. Use for additional context.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-text-tertiary text-base sm:text-lg font-semibold">Tertiary Text</p>
                                        <p className="text-text-tertiary text-sm sm:text-base">Less important details like timestamps, metadata, and helper text.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-text-disabled text-base sm:text-lg font-semibold">Disabled Text</p>
                                        <p className="text-text-disabled text-sm sm:text-base">Inactive or unavailable elements that cannot be interacted with.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Form Elements */}
                        <section className="space-y-8">
                            <SectionHeader title="Form Elements" subtitle="Interactive input fields with all states" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Default Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-primary">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="input w-full"
                                    />
                                    <p className="text-xs text-text-tertiary">We&apos;ll never share your email.</p>
                                </div>

                                {/* Input with Icon */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-primary">Search Products</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="input w-full pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Success State */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-primary">Valid Input</label>
                                    <input
                                        type="text"
                                        defaultValue="john@example.com"
                                        className="input w-full border-success focus:border-success focus:ring-success/20"
                                        readOnly
                                    />
                                    <p className="text-sm text-success flex items-center gap-1">
                                        <Check className="w-4 h-4" />
                                        Email verified successfully
                                    </p>
                                </div>

                                {/* Error State */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-primary">Invalid Input</label>
                                    <input
                                        type="email"
                                        defaultValue="invalid-email"
                                        className="input w-full border-destructive focus:border-destructive focus:ring-destructive/20"
                                    />
                                    <p className="text-sm text-destructive flex items-center gap-1">
                                        <X className="w-4 h-4" />
                                        Please enter a valid email address
                                    </p>
                                </div>

                                {/* Disabled Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-disabled">Disabled Field</label>
                                    <input
                                        type="text"
                                        placeholder="Cannot edit"
                                        disabled
                                        className="bg-input-disabled-background text-input-disabled-text border border-input-disabled-border px-4 py-2.5 rounded-md w-full cursor-not-allowed"
                                    />
                                </div>

                                {/* Select */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-text-primary">Category</label>
                                    <select className="input w-full">
                                        <option>All Categories</option>
                                        <option>Leather Jackets</option>
                                        <option>Coats</option>
                                        <option>Blazers</option>
                                        <option>Pants</option>
                                    </select>
                                </div>

                                {/* Textarea */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-text-primary">Product Review</label>
                                    <textarea
                                        placeholder="Share your thoughts..."
                                        rows={4}
                                        className="input w-full resize-none"
                                    />
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-2"
                                    />
                                    <label htmlFor="terms" className="text-sm text-text-secondary">
                                        I agree to the terms and conditions and privacy policy
                                    </label>
                                </div>

                                {/* Radio Buttons */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-text-primary">Shipping Method</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                id="standard"
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                                defaultChecked
                                            />
                                            <label htmlFor="standard" className="text-sm text-text-secondary">
                                                Standard Shipping (3-5 days)
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                id="express"
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor="express" className="text-sm text-text-secondary">
                                                Express Shipping (1-2 days)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Cards */}
                        <section className="space-y-8">
                            <SectionHeader title="Cards & Surfaces" subtitle="Hover to see interactive states" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                                    <p className="text-text-secondary text-sm">On orders over $150</p>
                                </div>

                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mb-4">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
                                    <p className="text-text-secondary text-sm">30-day return policy</p>
                                </div>

                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                                    <p className="text-text-secondary text-sm">SSL encrypted checkout</p>
                                </div>
                            </div>
                        </section>
                        {/* Alerts */}
                        <section className="space-y-8">
                            <SectionHeader title="Alerts & Notifications" subtitle="Semantic messaging components" />

                            <div className="space-y-4">
                                <AlertComponent
                                    type="success"
                                    title="Order Confirmed"
                                    message="Your order #12345 has been confirmed and will ship within 24 hours."
                                    icon={<Check className="w-5 h-5" />}
                                />
                                <AlertComponent
                                    type="error"
                                    title="Payment Failed"
                                    message="There was an error processing your payment. Please try again or use a different payment method."
                                    icon={<X className="w-5 h-5" />}
                                />
                                <AlertComponent
                                    type="warning"
                                    title="Low Stock Alert"
                                    message="Only 3 items remaining in stock. Order soon to avoid missing out!"
                                    icon={<AlertCircle className="w-5 h-5" />}
                                />
                                <AlertComponent
                                    type="info"
                                    title="New Collection"
                                    message="Explore our latest winter collection with exclusive leather designs."
                                    icon={<Info className="w-5 h-5" />}
                                />
                            </div>
                        </section>

                        {/* Badges */}
                        <section className="space-y-8">
                            <SectionHeader title="Badges & Labels" subtitle="Status indicators and tags" />

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-text-primary">Product Badges</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="badge-new">New Arrival</span>
                                        <span className="badge-sale">Sale -40%</span>
                                        <span className="badge-limited">Limited Edition</span>
                                        <span className="px-3 py-1 bg-info text-info-foreground rounded-full text-xs font-semibold uppercase">
                                            Best Seller
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-text-primary">Status Badges</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="text-xs font-medium text-success px-3 py-1.5 bg-success-subtle border border-success rounded-md">
                                            In Stock
                                        </span>
                                        <span className="text-xs font-medium text-destructive px-3 py-1.5 bg-destructive-subtle border border-destructive rounded-md">
                                            Out of Stock
                                        </span>
                                        <span className="text-xs font-medium text-warning px-3 py-1.5 bg-warning-subtle border border-warning rounded-md">
                                            Low Stock
                                        </span>
                                        <span className="text-xs font-medium text-info px-3 py-1.5 bg-info-subtle border border-info rounded-md">
                                            Pre-Order
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-text-primary">Size Badges (Interactive)</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                            <button
                                                key={size}
                                                className="px-4 py-2 border-2 border-border text-text-primary rounded-md hover:border-primary hover:text-primary transition-all font-medium"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Rating Stars */}
                        <section className="space-y-8">
                            <SectionHeader title="Rating Display" subtitle="Customer review ratings" />

                            <div className="space-y-4">
                                {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((rating) => (
                                    <div key={rating} className="flex items-center gap-4">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 transition-colors ${star <= Math.floor(rating)
                                                        ? 'fill-rating-filled text-rating-filled'
                                                        : star - 0.5 === rating
                                                            ? 'fill-rating-filled text-rating-filled opacity-50'
                                                            : 'fill-rating-empty text-rating-empty'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-text-secondary min-w-24">{rating} stars</span>
                                        <div className="flex-1 bg-muted rounded-full h-2 max-w-xs">
                                            <div
                                                className="bg-rating-filled h-2 rounded-full transition-all"
                                                style={{ width: `${(rating / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Loading States */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Loading States" subtitle="Skeleton screens and animations" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="card space-y-3 sm:space-y-4">
                                        <div className="skeleton w-full h-40 sm:h-48 rounded-lg" />
                                        <div className="skeleton h-5 sm:h-6 w-3/4 rounded" />
                                        <div className="skeleton h-3 sm:h-4 w-full rounded" />
                                        <div className="skeleton h-3 sm:h-4 w-5/6 rounded" />
                                        <div className="flex gap-2">
                                            <div className="skeleton h-8 sm:h-10 w-20 sm:w-24 rounded-md" />
                                            <div className="skeleton h-8 sm:h-10 flex-1 rounded-md" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pulse Animation */}
                            <div className="space-y-4">
                                <h3 className="text-base sm:text-lg font-semibold text-text-primary">Pulse Animation</h3>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-lg pulse" />
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-lg pulse" />
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-success rounded-lg pulse" />
                                </div>
                            </div>
                        </section>

                        {/* Gradients */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Gradients" subtitle="Background gradients for premium aesthetics" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="h-32 sm:h-40 rounded-lg p-4 sm:p-6 flex items-end" style={{ background: 'var(--linear-primary)' }}>
                                    <p className="text-primary-foreground font-semibold text-sm sm:text-base">Primary Gradient</p>
                                </div>
                                <div className="h-32 sm:h-40 rounded-lg p-4 sm:p-6 flex items-end" style={{ background: 'var(--linear-accent)' }}>
                                    <p className="text-accent-foreground font-semibold text-sm sm:text-base">Accent Gradient</p>
                                </div>
                                <div className="h-32 sm:h-40 rounded-lg p-4 sm:p-6 flex items-end sm:col-span-2 md:col-span-1" style={{ background: 'var(--linear-warm)' }}>
                                    <p className="text-text-primary font-semibold text-sm sm:text-base">Warm Gradient</p>
                                </div>
                            </div>
                        </section>

                        {/* Shadows */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Shadow Elevation" subtitle="Hover to see shadow depth in action" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
                                {['sm', '', 'md', 'lg', 'xl', '2xl', 'inner'].map((size) => (
                                    <div
                                        key={size}
                                        className={`bg-surface p-4 sm:p-6 rounded-lg shadow-${size} hover:scale-105 transition-all duration-300 cursor-pointer`}
                                    >
                                        <p className="font-semibold text-text-primary text-xs sm:text-sm">
                                            {size === '' ? 'Default' : size.toUpperCase()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Components Tab */}
                {activeTab === 'components' && (
                    <>
                        {/* Interactive Buttons */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Interactive Buttons" subtitle="Hover and click to see all states" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <ButtonShowcase
                                    title="Primary Button"
                                    description="Main call-to-action buttons"
                                    variant="primary"
                                />
                                <ButtonShowcase
                                    title="Secondary Button"
                                    description="Secondary actions"
                                    variant="secondary"
                                />
                                <ButtonShowcase
                                    title="Accent Button"
                                    description="Highlighted actions"
                                    variant="accent"
                                />
                                <ButtonShowcase
                                    title="Outline Button"
                                    description="Subtle actions"
                                    variant="outline"
                                />
                                <ButtonShowcase
                                    title="Ghost Button"
                                    description="Minimal actions"
                                    variant="ghost"
                                />
                                <ButtonShowcase
                                    title="Destructive Button"
                                    description="Dangerous actions"
                                    variant="destructive"
                                />
                            </div>

                            {/* Button Sizes */}
                            <div className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Button Sizes</h3>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                    <button className="btn-primary text-xs px-3 py-1.5">Small</button>
                                    <button className="btn-primary text-sm px-4 py-2">Default</button>
                                    <button className="btn-primary px-6 py-3">Large</button>
                                    <button className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">Extra Large</button>

                                </div>
                            </div>

                            {/* Icon Buttons */}
                            <div className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Buttons with Icons</h3>
                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    <button className="btn-primary flex items-center gap-2 text-sm sm:text-base">
                                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="hidden xs:inline">Add to Cart</span>
                                        <span className="xs:hidden">Cart</span>
                                    </button>
                                    <button className="btn-accent flex items-center gap-2 text-sm sm:text-base">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="hidden xs:inline">Add to Wishlist</span>
                                        <span className="xs:hidden">Wishlist</span>
                                    </button>
                                    <button className="btn-outline flex items-center gap-2 text-sm sm:text-base">
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Quick View
                                    </button>
                                    <button className="btn-ghost flex items-center gap-2 text-sm sm:text-base">
                                        <span className="hidden sm:inline">Continue Shopping</span>
                                        <span className="sm:hidden">Continue</span>
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Icon-only Buttons */}
                            <div className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Icon-Only Buttons</h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    <button className="p-2.5 sm:p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors">
                                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button className="p-2.5 sm:p-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-hover transition-colors">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button className="p-2.5 sm:p-3 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors">
                                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button className="p-2.5 sm:p-3 border border-border text-text-primary rounded-md hover:bg-muted transition-colors">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button className="p-2.5 sm:p-3 text-destructive hover:bg-destructive-subtle rounded-md transition-colors">
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Form Elements */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Form Elements" subtitle="Interactive input fields with all states" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Default Input */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="input w-full text-sm sm:text-base"
                                    />
                                    <p className="text-xs text-text-tertiary">We&apos;ll never share your email.</p>
                                </div>

                                {/* Input with Icon */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Search Products</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-tertiary" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="input w-full pl-9 sm:pl-10 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Success State */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Valid Input</label>
                                    <input
                                        type="text"
                                        defaultValue="john@example.com"
                                        className="input w-full border-success focus:border-success focus:ring-success/20 text-sm sm:text-base"
                                        readOnly
                                    />
                                    <p className="text-xs sm:text-sm text-success flex items-center gap-1">
                                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Email verified successfully
                                    </p>
                                </div>

                                {/* Error State */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Invalid Input</label>
                                    <input
                                        type="email"
                                        defaultValue="invalid-email"
                                        className="input w-full border-destructive focus:border-destructive focus:ring-destructive/20 text-sm sm:text-base"
                                    />
                                    <p className="text-xs sm:text-sm text-destructive flex items-center gap-1">
                                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Please enter a valid email address
                                    </p>
                                </div>

                                {/* Disabled Input */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-disabled">Disabled Field</label>
                                    <input
                                        type="text"
                                        placeholder="Cannot edit"
                                        disabled
                                        className="bg-input-disabled-background text-input-disabled-text border border-input-disabled-border px-4 py-2.5 rounded-md w-full cursor-not-allowed text-sm sm:text-base"
                                    />
                                </div>

                                {/* Select */}
                                <div className="space-y-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Category</label>
                                    <select className="input w-full text-sm sm:text-base">
                                        <option>All Categories</option>
                                        <option>Leather Jackets</option>
                                        <option>Coats</option>
                                        <option>Blazers</option>
                                        <option>Pants</option>
                                    </select>
                                </div>

                                {/* Textarea */}
                                <div className="space-y-2 sm:col-span-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Product Review</label>
                                    <textarea
                                        placeholder="Share your thoughts..."
                                        rows={4}
                                        className="input w-full resize-none text-sm sm:text-base"
                                    />
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-2"
                                    />
                                    <label htmlFor="terms" className="text-xs sm:text-sm text-text-secondary">
                                        I agree to the terms and conditions and privacy policy
                                    </label>
                                </div>

                                {/* Radio Buttons */}
                                <div className="space-y-3 sm:col-span-2">
                                    <label className="block text-xs sm:text-sm font-medium text-text-primary">Shipping Method</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                id="standard"
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                                defaultChecked
                                            />
                                            <label htmlFor="standard" className="text-xs sm:text-sm text-text-secondary">
                                                Standard Shipping (3-5 days)
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="shipping"
                                                id="express"
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <label htmlFor="express" className="text-xs sm:text-sm text-text-secondary">
                                                Express Shipping (1-2 days)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Cards */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Cards & Surfaces" subtitle="Hover to see interactive states" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Free Shipping</h3>
                                    <p className="text-text-secondary text-xs sm:text-sm">On orders over $150</p>
                                </div>

                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 text-success rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Easy Returns</h3>
                                    <p className="text-text-secondary text-xs sm:text-sm">30-day return policy</p>
                                </div>

                                <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer sm:col-span-2 md:col-span-1">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Secure Payment</h3>
                                    <p className="text-text-secondary text-xs sm:text-sm">SSL encrypted checkout</p>
                                </div>
                            </div>
                        </section>

                        {/* Alerts */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Alerts & Notifications" subtitle="Semantic messaging components" />

                            <div className="space-y-3 sm:space-y-4">
                                <AlertComponent
                                    type="success"
                                    title="Order Confirmed"
                                    message="Your order #12345 has been confirmed and will ship within 24 hours."
                                    icon={<Check className="w-4 h-4 sm:w-5 sm:h-5" />}
                                />
                                <AlertComponent
                                    type="error"
                                    title="Payment Failed"
                                    message="There was an error processing your payment. Please try again or use a different payment method."
                                    icon={<X className="w-4 h-4 sm:w-5 sm:h-5" />}
                                />
                                <AlertComponent
                                    type="warning"
                                    title="Low Stock Alert"
                                    message="Only 3 items remaining in stock. Order soon to avoid missing out!"
                                    icon={<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                                />
                                <AlertComponent
                                    type="info"
                                    title="New Collection"
                                    message="Explore our latest winter collection with exclusive leather designs."
                                    icon={<Info className="w-4 h-4 sm:w-5 sm:h-5" />}
                                />
                            </div>
                        </section>

                        {/* Badges */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Badges & Labels" subtitle="Status indicators and tags" />

                            <div className="space-y-4 sm:space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-text-primary">Product Badges</h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <span className="badge-new text-xs">New Arrival</span>
                                        <span className="badge-sale text-xs">Sale -40%</span>
                                        <span className="badge-limited text-xs">Limited Edition</span>
                                        <span className="px-2.5 sm:px-3 py-1 bg-info text-info-foreground rounded-full text-xs font-semibold uppercase">
                                            Best Seller
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-text-primary">Status Badges</h3>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <span className="text-xs font-medium text-success px-2.5 sm:px-3 py-1.5 bg-success-subtle border border-success rounded-md">
                                            In Stock
                                        </span>
                                        <span className="text-xs font-medium text-destructive px-2.5 sm:px-3 py-1.5 bg-destructive-subtle border border-destructive rounded-md">
                                            Out of Stock
                                        </span>
                                        <span className="text-xs font-medium text-warning px-2.5 sm:px-3 py-1.5 bg-warning-subtle border border-warning rounded-md">
                                            Low Stock
                                        </span>
                                        <span className="text-xs font-medium text-info px-2.5 sm:px-3 py-1.5 bg-info-subtle border border-info rounded-md">
                                            Pre-Order
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-text-primary">Size Badges (Interactive)</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                            <button
                                                key={size}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-border text-text-primary rounded-md hover:border-primary hover:text-primary transition-all font-medium text-sm"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Rating Stars */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Rating Display" subtitle="Customer review ratings" />

                            <div className="space-y-3 sm:space-y-4">
                                {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((rating) => (
                                    <div key={rating} className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${star <= Math.floor(rating)
                                                        ? 'fill-rating-filled text-rating-filled'
                                                        : star - 0.5 === rating
                                                            ? 'fill-rating-filled text-rating-filled opacity-50'
                                                            : 'fill-rating-empty text-rating-empty'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs sm:text-sm text-text-secondary min-w-16 sm:min-w-24">{rating} stars</span>
                                        <div className="flex-1 bg-muted rounded-full h-1.5 sm:h-2 max-w-xs">
                                            <div
                                                className="bg-rating-filled h-1.5 sm:h-2 rounded-full transition-all"
                                                style={{ width: `${(rating / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* E-Commerce Components Tab */}
                {activeTab === 'ecommerce' && (
                    <>
                        {/* Product Cards */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Product Cards" subtitle="Interactive product displays with hover effects" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <ProductCard
                                    image="/men2.jpg"
                                    badge="New"
                                    title="Premium Leather Jacket"
                                    price={299.99}
                                    originalPrice={449.99}
                                    rating={4.5}
                                    reviews={128}
                                />
                                <ProductCard
                                    image="/men2.jpg"
                                    badge="Sale"
                                    title="Classic Leather Coat"
                                    price={399.99}
                                    originalPrice={599.99}
                                    rating={5}
                                    reviews={256}
                                />
                                <ProductCard
                                    image="/men2.jpg"
                                    badge="Limited"
                                    title="Designer Leather Blazer"
                                    price={549.99}
                                    rating={4}
                                    reviews={89}
                                />
                            </div>
                        </section>

                        {/* Shopping Cart Item */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Cart Items" subtitle="Interactive cart components" />

                            <div className="space-y-3 sm:space-y-4 max-w-3xl">
                                <CartItem
                                    name="Premium Leather Jacket"
                                    size="L"
                                    color="Black"
                                    price={299.99}
                                    quantity={1}
                                />
                                <CartItem
                                    name="Classic Leather Coat"
                                    size="M"
                                    color="Brown"
                                    price={399.99}
                                    quantity={2}
                                />
                            </div>
                        </section>

                        {/* Navigation Menu */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Navigation Components" subtitle="Interactive navigation elements" />

                            <div className="bg-surface border border-border rounded-lg p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 sm:mb-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
                                        <h2 className="text-lg sm:text-xl font-bold text-text-primary">Artisan Hide</h2>
                                        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                                            {['New Arrivals', 'Jackets', 'Coats', 'Blazers', 'Sale'].map((item) => (
                                                <a
                                                    key={item}
                                                    href="#"
                                                    className="text-text-secondary hover:text-text-primary transition-colors font-medium text-sm"
                                                >
                                                    {item}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                                            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors relative">
                                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-primary-foreground text-[10px] sm:text-xs rounded-full flex items-center justify-center font-medium">
                                                3
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Filter Sidebar */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Filter Components" subtitle="Product filtering interface" />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                                <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                                    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-text-primary text-sm sm:text-base">Filters</h3>
                                            <button className="text-xs sm:text-sm text-primary hover:text-primary-hover">Clear All</button>
                                        </div>

                                        <div className="space-y-3 sm:space-y-4">
                                            <h4 className="font-medium text-text-primary text-sm">Category</h4>
                                            <div className="space-y-2">
                                                {['All Products', 'Jackets', 'Coats', 'Blazers', 'Pants'].map((cat) => (
                                                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                                        <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                                                        <span className="text-xs sm:text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                            {cat}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px bg-divider" />

                                        <div className="space-y-3 sm:space-y-4">
                                            <h4 className="font-medium text-text-primary text-sm">Price Range</h4>
                                            <div className="space-y-3">
                                                <input type="range" className="w-full" min="0" max="1000" />
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        className="input w-full text-xs sm:text-sm py-1.5 sm:py-2"
                                                    />
                                                    <span className="text-text-tertiary text-xs sm:text-sm">-</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Max"
                                                        className="input w-full text-xs sm:text-sm py-1.5 sm:py-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px bg-divider" />

                                        <div className="space-y-3 sm:space-y-4">
                                            <h4 className="font-medium text-text-primary text-sm">Size</h4>
                                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                                    <button
                                                        key={size}
                                                        className="py-1.5 sm:py-2 border border-border text-xs sm:text-sm hover:border-primary hover:text-primary transition-all rounded"
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-3">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <p className="text-text-secondary text-xs sm:text-sm">Showing 1-12 of 48 products</p>
                                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                                            <button className="p-1.5 sm:p-2 border border-border rounded hover:border-primary transition-colors">
                                                <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                            <button className="p-1.5 sm:p-2 border border-border rounded hover:border-primary transition-colors">
                                                <List className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                            <select className="input py-1.5 sm:py-2 text-xs sm:text-sm flex-1 sm:flex-initial">
                                                <option>Sort by: Featured</option>
                                                <option>Price: Low to High</option>
                                                <option>Price: High to Low</option>
                                                <option>Newest First</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="skeleton h-80 sm:h-96 rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Navigation Menu */}
                        <section className="space-y-8">
                            <SectionHeader title="Navigation Components" subtitle="Interactive navigation elements" />

                            <div className="bg-surface border border-border rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-8">
                                        <h2 className="text-xl font-bold text-text-primary">Artisan Hide</h2>
                                        <nav className="hidden md:flex items-center gap-6">
                                            {['New Arrivals', 'Jackets', 'Coats', 'Blazers', 'Sale'].map((item) => (
                                                <a
                                                    key={item}
                                                    href="#"
                                                    className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                                                >
                                                    {item}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                                            <Search className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                                            <User className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-text-secondary hover:text-text-primary transition-colors relative">
                                            <ShoppingCart className="w-5 h-5" />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                                3
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section >

                        {/* Filter Sidebar */}
                        < section className="space-y-8" >
                            <SectionHeader title="Filter Components" subtitle="Product filtering interface" />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-text-primary">Filters</h3>
                                            <button className="text-sm text-primary hover:text-primary-hover">Clear All</button>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium text-text-primary">Category</h4>
                                            <div className="space-y-2">
                                                {['All Products', 'Jackets', 'Coats', 'Blazers', 'Pants'].map((cat) => (
                                                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                                        <input type="checkbox" className="w-4 h-4 text-primary" />
                                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                            {cat}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px bg-divider" />

                                        <div className="space-y-4">
                                            <h4 className="font-medium text-text-primary">Price Range</h4>
                                            <div className="space-y-3">
                                                <input type="range" className="w-full" min="0" max="1000" />
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        className="input w-full text-sm"
                                                    />
                                                    <span className="text-text-tertiary">-</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Max"
                                                        className="input w-full text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px bg-divider" />

                                        <div className="space-y-4">
                                            <h4 className="font-medium text-text-primary">Size</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                                    <button
                                                        key={size}
                                                        className="py-2 border border-border text-sm hover:border-primary hover:text-primary transition-all rounded"
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-3">
                                    <div className="flex items-center justify-between mb-6">
                                        <p className="text-text-secondary">Showing 1-12 of 48 products</p>
                                        <div className="flex items-center gap-4">
                                            <button className="p-2 border border-border rounded hover:border-primary transition-colors">
                                                <Grid className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 border border-border rounded hover:border-primary transition-colors">
                                                <List className="w-5 h-5" />
                                            </button>
                                            <select className="input py-2">
                                                <option>Sort by: Featured</option>
                                                <option>Price: Low to High</option>
                                                <option>Price: High to Low</option>
                                                <option>Newest First</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="skeleton h-96 rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section >

                        {/* Footer */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader title="Footer Components" subtitle="Site footer with links and information" />

                            <div className="bg-surface border border-border rounded-lg p-6 sm:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="font-bold text-text-primary text-base sm:text-lg">Artisan Hide</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary">
                                            Premium leather goods crafted with excellence since 2020.
                                        </p>
                                        <div className="flex gap-2 sm:gap-3">
                                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all text-sm sm:text-base">
                                                <span className="sr-only">Facebook</span>
                                                📘
                                            </a>
                                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all text-sm sm:text-base">
                                                <span className="sr-only">Instagram</span>
                                                📷
                                            </a>
                                            <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all text-sm sm:text-base">
                                                <span className="sr-only">Twitter</span>
                                                🐦
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="font-semibold text-text-primary text-sm sm:text-base">Shop</h4>
                                        <ul className="space-y-1.5 sm:space-y-2">
                                            {['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="font-semibold text-text-primary text-sm sm:text-base">Support</h4>
                                        <ul className="space-y-1.5 sm:space-y-2">
                                            {['Contact Us', 'Shipping Info', 'Returns', 'FAQ'].map((item) => (
                                                <li key={item}>
                                                    <a href="#" className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors">
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="font-semibold text-text-primary text-sm sm:text-base">Contact</h4>
                                        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-text-secondary">
                                            <li className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                123 Leather St, NY 10001
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                +1 (555) 123-4567
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                hello@artisanhide.com
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="h-px bg-divider mb-4 sm:mb-6" />

                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                                    <p className="text-xs sm:text-sm text-text-tertiary text-center sm:text-left">
                                        © 2026 Artisan Hide. All rights reserved.
                                    </p>
                                    <div className="flex gap-4 sm:gap-6">
                                        <a href="#" className="text-xs sm:text-sm text-text-tertiary hover:text-text-primary transition-colors">
                                            Privacy Policy
                                        </a>
                                        <a href="#" className="text-xs sm:text-sm text-text-tertiary hover:text-text-primary transition-colors">
                                            Terms of Service
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* Fonts Tab Component - Typography Showcase */}
                {activeTab === 'fonts' && (
                    <>
                        {/* Typography Hero - Bricolage Introduction */}
                        <section className="space-y-6 sm:space-y-8">
                            <div className="text-center space-y-4 py-8 sm:py-12">
                                <p className="text-sm font-medium text-accent tracking-wider uppercase font-body">Typography System</p>
                                <h1 className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tighter text-text-primary">
                                    Bricolage Grotesque
                                </h1>
                                <p className="font-heading text-2xl sm:text-3xl font-semibold text-text-secondary">
                                    & Inter
                                </p>
                                <p className="font-body text-base sm:text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto px-4">
                                    A distinctive pairing designed for modern artisan brands. Bricolage Grotesque brings characterful personality to headlines with its optical sizing, while Inter ensures crystal-clear readability for all body content.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 pt-4">
                                    <span className="px-4 py-2 bg-accent-subtle text-accent text-sm font-semibold rounded-full font-body">
                                        Modern Craft
                                    </span>
                                    <span className="px-4 py-2 bg-success-subtle text-success text-sm font-semibold rounded-full font-body">
                                        Optical Sizing
                                    </span>
                                    <span className="px-4 py-2 bg-info-subtle text-info text-sm font-semibold rounded-full font-body">
                                        Distinctive Character
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Font Families Showcase */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Font Families"
                                subtitle="Distinctive display grotesque meets modern sans-serif"
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Bricolage Grotesque */}
                                <div className="card space-y-4 bg-linear-to-br from-accent-subtle to-background">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Bricolage Grotesque</h3>
                                            <p className="text-sm text-text-tertiary font-body">Primary — Headings, Titles, Brand Voice</p>
                                        </div>
                                        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full font-body">
                                            NEW
                                        </span>
                                    </div>

                                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 space-y-1">
                                        <p className="text-xs font-semibold text-accent uppercase tracking-wide font-body">Special Feature</p>
                                        <p className="text-sm text-text-secondary font-body leading-relaxed">
                                            <strong className="text-text-primary">Optical Sizing:</strong> Characters adapt based on size.
                                            Large sizes show personality with quirky details; small sizes stay clean and professional.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Regular (400)</p>
                                            <p className="font-heading text-xl sm:text-2xl font-normal">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Medium (500)</p>
                                            <p className="font-heading text-xl sm:text-2xl font-medium">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">SemiBold (600)</p>
                                            <p className="font-heading text-xl sm:text-2xl font-semibold">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Bold (700)</p>
                                            <p className="font-heading text-xl sm:text-2xl font-bold">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">ExtraBold (800)</p>
                                            <p className="font-heading text-xl sm:text-2xl font-extrabold">The quick brown fox jumps</p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-divider">
                                        <p className="text-xs text-text-tertiary font-body">
                                            <strong className="text-text-primary">Character:</strong> Distinctive, warm, playful at large sizes /
                                            Professional, neutral at small sizes
                                        </p>
                                    </div>
                                </div>

                                {/* Inter */}
                                <div className="card space-y-4">
                                    <div>
                                        <h3 className="font-body text-2xl sm:text-3xl font-bold mb-2">Inter</h3>
                                        <p className="text-sm text-text-tertiary font-body">Secondary — Body Text, UI, Descriptions</p>
                                    </div>

                                    <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                                        <p className="text-xs font-semibold text-primary uppercase tracking-wide font-body">Why Inter?</p>
                                        <p className="text-sm text-text-secondary font-body leading-relaxed">
                                            {"Optimized for screen reading with excellent legibility. Pairs beautifully with Bricolage's"}
                                            distinctive character by providing clean, functional contrast.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Light (300)</p>
                                            <p className="font-body text-xl sm:text-2xl font-light">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Regular (400)</p>
                                            <p className="font-body text-xl sm:text-2xl font-normal">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Medium (500)</p>
                                            <p className="font-body text-xl sm:text-2xl font-medium">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">SemiBold (600)</p>
                                            <p className="font-body text-xl sm:text-2xl font-semibold">The quick brown fox jumps</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-text-tertiary font-body">Bold (700)</p>
                                            <p className="font-body text-xl sm:text-2xl font-bold">The quick brown fox jumps</p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-divider">
                                        <p className="text-xs text-text-tertiary font-body">
                                            <strong className="text-text-primary">Character:</strong> Clean, modern, highly readable /
                                            Professional sans-serif for all body content
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Optical Sizing Demonstration - Bricolage's Superpower */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Optical Sizing Magic"
                                subtitle="Bricolage Grotesque adapts its character based on size"
                            />

                            <div className="card bg-linear-to-br from-primary-subtle via-background to-accent-subtle space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-primary bg-primary-subtle px-2 py-1 rounded font-body">
                                            LARGE SIZE (72px)
                                        </span>
                                        <span className="text-xs text-text-tertiary font-body">Quirky, distinctive, personality shows</span>
                                    </div>
                                    <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-none">
                                        PREMIUM LEATHER
                                    </h1>
                                    <p className="text-sm text-text-secondary font-body max-w-2xl">
                                        At large sizes, Bricolage Grotesque reveals its playful character: rounded corners,
                                        unique letterforms, and distinctive personality. Perfect for headlines that grab attention.
                                    </p>
                                </div>

                                <div className="h-px bg-divider"></div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-success bg-success-subtle px-2 py-1 rounded font-body">
                                            MEDIUM SIZE (24px)
                                        </span>
                                        <span className="text-xs text-text-tertiary font-body">Balanced personality + readability</span>
                                    </div>
                                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold">
                                        Premium Leather Jacket Collection
                                    </h3>
                                    <p className="text-sm text-text-secondary font-body max-w-2xl">
                                        At medium sizes, the font maintains character while becoming more readable.
                                        Ideal for product titles and section headers.
                                    </p>
                                </div>

                                <div className="h-px bg-divider"></div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-info bg-info-subtle px-2 py-1 rounded font-body">
                                            SMALL SIZE (16px)
                                        </span>
                                        <span className="text-xs text-text-tertiary font-body">Clean, professional, functional</span>
                                    </div>
                                    <p className="font-heading text-base font-medium leading-relaxed max-w-3xl">
                                        At smaller sizes, Bricolage Grotesque becomes more neutral and professional,
                                        ensuring excellent readability while maintaining subtle character. This adaptive
                                        behavior means you get personality in headlines without sacrificing function in UI elements.
                                    </p>
                                    <p className="text-sm text-text-secondary font-body max-w-2xl">
                                        For body text, we use Inter (shown here) which provides optimal readability and pairs
                                        {"beautifully with Bricolage's distinctive headlines."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Type Scale with Bricolage */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Type Scale (Fluid Typography)"
                                subtitle="How Bricolage Grotesque scales across your site"
                            />

                            <div className="card space-y-6">
                                <div className="space-y-4">
                                    <div className="border-l-4 border-accent pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-6xl (60-72px) - Hero Headlines</p>
                                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter">
                                            Winter Collection 2026
                                        </h1>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Maximum personality, distinctive character
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-primary pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-5xl (48-60px) - Page Titles</p>
                                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                                            Premium Italian Leather
                                        </h2>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Strong presence with character
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-secondary pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-4xl (36-48px) - Section Headers</p>
                                        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                                            Handcrafted Excellence
                                        </h3>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Balanced personality and professionalism
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-muted pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-3xl (30-36px) - Product Titles</p>
                                        <h4 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold">
                                            Classic Bomber Jacket
                                        </h4>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Distinctive yet readable
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-border pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-2xl (24-30px) - Card Headers</p>
                                        <h5 className="font-heading text-lg sm:text-xl md:text-2xl font-semibold">
                                            Featured Products
                                        </h5>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Subtle character, high readability
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-border-subtle pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-xl (20-24px) - Small Headings</p>
                                        <h6 className="font-heading text-base sm:text-lg md:text-xl font-semibold">
                                            Product Details
                                        </h6>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Neutral, functional
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-divider pl-4 sm:pl-6">
                                        <p className="text-xs text-text-tertiary mb-2 font-body">text-base (16-17px) - Body Text (Inter)</p>
                                        <p className="font-body text-sm sm:text-base leading-relaxed text-text-secondary">
                                            For body content, we use Inter for optimal readability. Crafted from the finest Italian
                                            leather, this premium jacket combines timeless style with modern craftsmanship. Each piece
                                            is meticulously hand-finished by master artisans.
                                        </p>
                                        <p className="text-sm text-text-secondary mt-2 font-body">
                                            Clean Inter sans-serif for perfect readability
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Real E-Commerce Examples */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="E-Commerce in Action"
                                subtitle="How Bricolage Grotesque works across your store"
                            />

                            {/* Product Page Header */}
                            <div className="card space-y-6 sm:space-y-8 bg-linear-to-br from-background to-muted/30">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="badge-new font-body">New Arrival</span>
                                        <span className="badge-sale font-body">Sale -40%</span>
                                        <span className="px-3 py-1 bg-accent-subtle text-accent text-xs font-semibold rounded-full font-body">
                                            Limited Edition
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                            Premium Italian Leather Jacket
                                        </h1>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-rating-filled text-rating-filled" />
                                                ))}
                                            </div>
                                            <span className="text-sm text-text-tertiary font-body">(247 reviews)</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-baseline gap-3 flex-wrap">
                                            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-price-current tracking-tight">
                                                $449.99
                                            </span>
                                            <span className="font-body text-lg sm:text-xl line-through text-price-original">
                                                $749.99
                                            </span>
                                            <span className="px-3 py-1 bg-success-subtle text-success font-semibold text-sm rounded-full font-body">
                                                Save $300
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-tertiary font-body">
                                            Tax included. Free shipping on orders over $150.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-heading text-xl sm:text-2xl font-semibold">Description</h3>
                                        <p className="font-body text-sm sm:text-base leading-relaxed text-text-secondary">
                                            Crafted from the finest Italian leather, this premium jacket combines timeless style
                                            with modern craftsmanship. Each piece is meticulously hand-finished by master artisans
                                            in Florence, ensuring unparalleled quality and attention to detail. The supple leather
                                            develops a beautiful patina over time, making each jacket uniquely yours.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-heading text-lg sm:text-xl font-semibold">Key Features</h3>
                                        <ul className="space-y-2 font-body text-sm sm:text-base">
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                                                <span className="text-text-secondary">100% genuine Italian leather from certified tanneries</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                                                <span className="text-text-secondary">YKK premium metal zippers for durability</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                                                <span className="text-text-secondary">Quilted satin lining for comfort and insulation</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                                                <span className="text-text-secondary">Hand-finished by master artisans in Florence</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="font-body text-sm font-medium text-text-primary">
                                            Size: <span className="font-semibold">Medium</span>
                                        </label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                                                <button
                                                    key={size}
                                                    className={`px-4 py-2 border-2 font-body font-medium text-sm rounded transition-all ${size === 'M'
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : 'border-border hover:border-primary'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 flex-wrap">
                                        <button className="btn-primary flex-1 min-w-50 flex items-center justify-center gap-2 font-body">
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Cart
                                        </button>
                                        <button className="p-3 border-2 border-border hover:border-primary rounded-md transition-all">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-divider">
                                    <p className="text-xs text-text-tertiary font-body">
                                        <strong className="text-text-primary">Typography Note:</strong> Headlines use Bricolage Grotesque
                                        for distinctive character. Body text, labels, and buttons use Inter for optimal readability.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Product Card Grid */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Product Cards"
                                subtitle="Bricolage Grotesque in card layouts"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { name: 'Classic Bomber', price: 449.99, badge: 'New' },
                                    { name: 'Heritage Jacket', price: 599.99, badge: 'Sale' },
                                    { name: 'Designer Coat', price: 749.99, badge: 'Limited' }
                                ].map((product, idx) => (
                                    <div key={idx} className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                        <div className="relative bg-muted aspect-3/4 flex items-center justify-center">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className={`${product.badge === 'New' ? 'badge-new' :
                                                    product.badge === 'Sale' ? 'badge-sale' :
                                                        'badge-limited'
                                                    } font-body`}>
                                                    {product.badge}
                                                </span>
                                            </div>
                                            <p className="text-6xl sm:text-7xl font-bold text-muted-foreground/20 font-heading">
                                                {idx + 1}
                                            </p>
                                        </div>
                                        <div className="p-4 sm:p-5 space-y-3">
                                            <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-4 h-4 fill-rating-filled text-rating-filled" />
                                                ))}
                                                <span className="text-xs sm:text-sm text-text-tertiary ml-2 font-body">(128)</span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                                                    ${product.price}
                                                </span>
                                            </div>
                                            <button className="btn-primary w-full text-sm sm:text-base font-body">
                                                Quick Add
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Typography Comparison */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Compare with Other Options"
                                subtitle="See how Bricolage Grotesque compares to alternatives"
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Option 1: Montserrat */}
                                <div className="card space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-body text-lg font-bold">Option 1: Montserrat</h3>
                                        <span className="px-2 py-1 bg-muted text-text-tertiary text-xs font-semibold rounded font-body">
                                            Default
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-2xl sm:text-3xl font-extrabold tracking-tighter">
                                            PREMIUM LEATHER
                                        </p>
                                        <p className="text-xs text-text-secondary font-body">
                                            Geometric, modern, professional. Like Apple or Tesla.
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-divider space-y-1">
                                        <p className="text-xs font-semibold text-text-primary font-body">Best For:</p>
                                        <p className="text-xs text-text-tertiary font-body">
                                            Broad appeal, tech-forward brands, $100-500
                                        </p>
                                    </div>
                                </div>

                                {/* Option 3: Playfair Display */}
                                <div className="card space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-body text-lg font-bold">Option 3: Playfair Display</h3>
                                        <span className="px-2 py-1 bg-secondary-subtle text-secondary text-xs font-semibold rounded font-body">
                                            Luxury
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-2xl sm:text-3xl font-extrabold">
                                            Premium Leather
                                        </p>
                                        <p className="text-xs text-text-secondary font-body">
                                            Elegant serif, traditional. Like Hermès or Vogue.
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-divider space-y-1">
                                        <p className="text-xs font-semibold text-text-primary font-body">Best For:</p>
                                        <p className="text-xs text-text-tertiary font-body">
                                            Heritage brands, ultra-luxury, $500+
                                        </p>
                                    </div>
                                </div>

                                {/* Option 4: Bricolage Grotesque (Current) */}
                                <div className="card space-y-4 border-2 border-accent bg-accent-subtle/30">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-body text-lg font-bold">Option 4: Bricolage Grotesque</h3>
                                        <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded font-body">
                                            ACTIVE
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tighter">
                                            PREMIUM LEATHER
                                        </p>
                                        <p className="text-xs text-text-secondary font-body">
                                            Distinctive, characterful. Like Ace Hotel or Kinfolk.
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-divider space-y-1">
                                        <p className="text-xs font-semibold text-text-primary font-body">Best For:</p>
                                        <p className="text-xs text-text-tertiary font-body">
                                            Modern artisan brands, craft focus, $200-600
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Best Practices */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Bricolage Grotesque Best Practices"
                                subtitle="Guidelines for using this distinctive typeface effectively"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {/* DO */}
                                <div className="card bg-success-subtle border-success">
                                    <h4 className="font-heading text-lg sm:text-xl font-semibold text-success mb-4 flex items-center gap-2">
                                        <Check className="w-5 h-5" />
                                        DO ✓
                                    </h4>
                                    <ul className="space-y-2 font-body text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Use Bricolage for all headings (H1-H6)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Use Inter for all body text and UI elements</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Let optical sizing work its magic (font-optical-sizing: auto)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Use tighter tracking (-0.025em to -0.05em) for large headlines</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Leverage ExtraBold (800) for maximum impact on heroes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Pair bold Bricolage headlines with clean Inter body</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>Test on actual devices to see optical sizing in action</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-success mt-0.5">✓</span>
                                            <span>{"Embrace the personality - it's what makes it special!"}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* DON'T */}
                                <div className="card bg-destructive-subtle border-destructive">
                                    <h4 className="font-heading text-lg sm:text-xl font-semibold text-destructive mb-4 flex items-center gap-2">
                                        <X className="w-5 h-5" />
                                        {"DON'T ✗"}
                                    </h4>
                                    <ul className="space-y-2 font-body text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Use Bricolage for long body text (use Inter instead)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Mix with other display fonts (stick to the system)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>{"Disable optical sizing (you'll lose the magic)"}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Use too many different weights (3-4 max)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Make small UI text in Bricolage (Inter is better)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Pair with other quirky fonts (too much personality)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Use ultra-wide letter spacing (defeats the character)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-destructive mt-0.5">✗</span>
                                            <span>Question the personality - embrace it with confidence!</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Usage Examples */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Real-World Usage"
                                subtitle="How different elements use the typography system"
                            />

                            <div className="space-y-4 sm:space-y-6">
                                {/* Navigation */}
                                <div className="card">
                                    <h4 className="font-heading text-lg sm:text-xl font-semibold mb-4">Navigation</h4>
                                    <div className="bg-surface border border-border rounded-lg p-4">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <h2 className="font-heading text-xl sm:text-2xl font-bold">Artisan Hide</h2>
                                            <nav className="flex gap-4 sm:gap-6 font-body text-sm sm:text-base font-medium">
                                                <a href="#" className="text-text-primary hover:text-accent transition-colors">New</a>
                                                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Jackets</a>
                                                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Coats</a>
                                                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">Sale</a>
                                            </nav>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-tertiary mt-3 font-body">
                                        Brand name: Bricolage Grotesque Bold | Menu links: Inter Medium
                                    </p>
                                </div>

                                {/* Cart Summary */}
                                <div className="card">
                                    <h4 className="font-heading text-lg sm:text-xl font-semibold mb-4">Order Summary</h4>
                                    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 space-y-4">
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold">Order Summary</h3>
                                        <div className="space-y-2 font-body text-sm sm:text-base">
                                            <div className="flex justify-between">
                                                <span className="text-text-secondary">Subtotal</span>
                                                <span className="font-medium">$449.99</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-text-secondary">Shipping</span>
                                                <span className="font-medium text-success">Free</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-text-secondary">Tax</span>
                                                <span className="font-medium">$36.00</span>
                                            </div>
                                        </div>
                                        <div className="h-px bg-divider my-3"></div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="font-heading text-lg sm:text-xl font-semibold">Total</span>
                                            <span className="font-heading text-2xl sm:text-3xl font-bold text-primary">$485.99</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-tertiary mt-3 font-body">
                                        Headings: Bricolage Grotesque | Prices & details: Inter
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="card">
                                    <h4 className="font-heading text-lg sm:text-xl font-semibold mb-4">Footer</h4>
                                    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6 space-y-6">
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold">Artisan Hide</h3>
                                        <p className="font-body text-sm text-text-secondary max-w-md">
                                            Premium leather goods crafted with modern techniques and timeless soul.
                                            Handmade in Brooklyn since 2020.
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                                            <div className="space-y-2">
                                                <h4 className="font-heading text-sm font-semibold">Shop</h4>
                                                <ul className="space-y-1 font-body text-xs sm:text-sm text-text-secondary">
                                                    <li><a href="#">New</a></li>
                                                    <li><a href="#">Jackets</a></li>
                                                    <li><a href="#">Coats</a></li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-heading text-sm font-semibold">About</h4>
                                                <ul className="space-y-1 font-body text-xs sm:text-sm text-text-secondary">
                                                    <li><a href="#">Our Story</a></li>
                                                    <li><a href="#">Craft</a></li>
                                                    <li><a href="#">Materials</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-tertiary mt-3 font-body">
                                        Headings: Bricolage Grotesque | Links & body: Inter
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Quick Reference */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Quick Reference"
                                subtitle="At-a-glance typography usage guide"
                            />

                            <div className="card bg-linear-to-br from-primary-subtle to-accent-subtle">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-heading text-lg sm:text-xl font-bold text-primary">
                                            Use Bricolage Grotesque For:
                                        </h4>
                                        <ul className="space-y-2 font-body text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>All headings (H1 through H6)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Brand name / logo text</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Product titles and names</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Price displays (large & prominent)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Hero headlines and taglines</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Section headers and titles</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-primary mt-0.5">→</span>
                                                <span>Callouts and highlights</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-body text-lg sm:text-xl font-bold text-accent">
                                            Use Inter For:
                                        </h4>
                                        <ul className="space-y-2 font-body text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>All body text and paragraphs</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Product descriptions</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Navigation menu links</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Button text and CTAs</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Form labels and inputs</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Badges and labels</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-accent mt-0.5">→</span>
                                                <span>Footer links and legal text</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why This Works */}
                        <section className="space-y-6 sm:space-y-8">
                            <SectionHeader
                                title="Why Bricolage Grotesque + Inter Works"
                                subtitle="The perfect pairing for modern artisan brands"
                            />

                            <div className="card bg-linear-to-br from-accent-subtle via-background to-success-subtle space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">✨</span>
                                        </div>
                                        <h4 className="font-heading text-lg font-bold">Distinctive Identity</h4>
                                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                                            {"Bricolage Grotesque's unique character makes your brand instantly recognizable."}
                                            {"You won't look like every other modern e-commerce site."}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-success text-success-foreground rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                        <h4 className="font-heading text-lg font-bold">Perfect Balance</h4>
                                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                                            Headlines get personality through Bricolage, while Inter keeps body text
                                            supremely readable. The contrast creates perfect hierarchy.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">❤️</span>
                                        </div>
                                        <h4 className="font-heading text-lg font-bold">Human Touch</h4>
                                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                                            The optical sizing and quirky details communicate craftsmanship and care.
                                            Your brand feels made by real people, not a corporation.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-divider">
                                    <p className="font-body text-sm text-text-secondary text-center max-w-3xl mx-auto">
                                        <strong className="text-text-primary">The Result:</strong> A typography system that positions
                                        your brand as modern artisan leather goods with soul—not generic minimalism, not stuffy luxury,
                                        but contemporary craft with personality. Perfect for brands like yours.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </section>
        </main>
    )

}

/* Helper Components */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="border-b border-divider pb-3 sm:pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                {title}
            </h2>
            <p className="text-text-secondary text-sm sm:text-base">{subtitle}</p>
        </div>
    );
}

function ColorSection({ title, colors }: {
    title: string;
    colors: Array<{ name: string; bg: string; text: string }>
}) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {colors.map((color) => (
                    <InteractiveColorSwatch key={color.name} {...color} />
                ))}
            </div>
        </div>
    );
}

function InteractiveColorSwatch({ name, bg, text }: { name: string; bg: string; text: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="space-y-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`${bg} ${text} h-20 sm:h-24 rounded-lg flex items-center justify-center font-medium shadow-sm transition-all duration-300 text-xs sm:text-sm ${isHovered ? 'scale-105 shadow-lg' : ''
                    }`}
            >
                {name}
            </div>
            <p className="text-[10px] sm:text-xs text-text-tertiary text-center transition-colors">
                {bg}
            </p>
        </div>
    );
}

function ButtonShowcase({ title, description, variant }: {
    title: string;
    description: string;
    variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive'
}) {
    const getButtonClass = () => {
        switch (variant) {
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary';
            case 'accent': return 'btn-accent';
            case 'outline': return 'btn-outline';
            case 'ghost': return 'btn-ghost';
            case 'destructive': return 'bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all text-sm sm:text-base';
        }
    };

    return (
        <div className="card space-y-3 sm:space-y-4">
            <div>
                <h4 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">{title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary">{description}</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
                <button className={`${getButtonClass()} w-full text-sm sm:text-base`}>Normal</button>
                <button className={`${getButtonClass()} w-full text-sm sm:text-base`} disabled>Disabled</button>
            </div>
            <p className="text-[10px] sm:text-xs text-text-tertiary">Hover and click to see states</p>
        </div>
    );
}

function AlertComponent({ type, title, message, icon }: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    icon: React.ReactNode;
}) {
    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-success-subtle border-success text-success';
            case 'error':
                return 'bg-destructive-subtle border-destructive text-destructive';
            case 'warning':
                return 'bg-warning-subtle border-warning text-warning';
            case 'info':
                return 'bg-info-subtle border-info text-info';
        }
    };

    return (
        <div className={`${getStyles()} border rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 transition-all hover:shadow-md`}>
            <div className="mt-0.5 shrink-0">{icon}</div>
            <div className="flex-1">
                <h4 className="font-semibold mb-1 text-sm sm:text-base">{title}</h4>
                <p className="text-xs sm:text-sm opacity-90">{message}</p>
            </div>
        </div>
    );
}

function ProductCard({
    badge,
    title,
    price,
    originalPrice,
    rating,
    reviews
}: {
    image: string;
    badge: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card p-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden bg-muted aspect-3/4">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/20" />
                {badge && (
                    <span className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-xs ${badge === 'New' ? 'badge-new' : badge === 'Sale' ? 'badge-sale' : 'badge-limited'
                        }`}>
                        {badge}
                    </span>
                )}
                <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex gap-1.5 sm:gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}>
                    <button className="p-1.5 sm:p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="p-1.5 sm:p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <h3 className="font-semibold text-text-primary line-clamp-1 text-sm sm:text-base">{title}</h3>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= rating ? 'fill-rating-filled text-rating-filled' : 'fill-rating-empty text-rating-empty'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs sm:text-sm text-text-tertiary">({reviews})</span>
                </div>
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-text-primary">${price}</span>
                    {originalPrice && (
                        <span className="text-xs sm:text-sm line-through text-text-tertiary">${originalPrice}</span>
                    )}
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base py-2 sm:py-3">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

function CartItem({ name, size, color, price, quantity }: {
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
}) {
    const [qty, setQty] = useState(quantity);

    return (
        <div className="card flex gap-3 sm:gap-4 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-text-primary text-sm sm:text-base truncate">{name}</h4>
                        <p className="text-xs sm:text-sm text-text-secondary">Size: {size} | Color: {color}</p>
                    </div>
                    <button className="p-1 text-destructive hover:bg-destructive-subtle rounded transition-colors shrink-0">
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            className="p-1 border border-border rounded hover:border-primary transition-colors"
                        >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{qty}</span>
                        <button
                            onClick={() => setQty(qty + 1)}
                            className="p-1 border border-border rounded hover:border-primary transition-colors"
                        >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-text-primary">${(price * qty).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}