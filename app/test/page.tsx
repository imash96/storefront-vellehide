/**
 * Interactive Design System Showcase - Premium Leather Brand
 * 
 * A comprehensive, interactive demonstration of all color tokens, components,
 * and states with live hover, active, and focus demonstrations.
 */

"use client";

import { useState } from 'react';
import { Star, Heart, ShoppingCart, Check, X, AlertCircle, Info, ChevronRight, Search, Package, Truck, CreditCard, Eye, Trash2, Plus, Minus, Grid, List, MapPin, Phone, Mail, User } from 'lucide-react';

export default function InteractiveTestPage() {
  const [activeTab, setActiveTab] = useState<'colors' | 'components' | 'ecommerce'>('colors');

  return (
    <main className="bg-background min-h-screen">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-text-primary">Design System Showcase</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('colors')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === 'colors'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
              >
                Colors
              </button>
              <button
                onClick={() => setActiveTab('components')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === 'components'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
              >
                Components
              </button>
              <button
                onClick={() => setActiveTab('ecommerce')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === 'ecommerce'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
              >
                E-Commerce
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-custom py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h2 className="text-5xl font-bold text-text-primary">
            Interactive Design System
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Explore all colors, components, and interactive states. Hover, click, and interact with elements to see them in action.
          </p>
        </header>

        {/* Color Palette Tab */}
        {activeTab === 'colors' && (
          <>
            {/* Interactive Color Swatches */}
            <section className="space-y-8">
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
                <h3 className="text-xl font-semibold text-text-primary">Neutral Scale (50-950)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-3">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                    <InteractiveColorSwatch
                      key={shade}
                      name={`${shade}`}
                      bg={`bg-neutral-${shade}`}
                      text={shade >= 500 ? 'text-neutral-50' : 'text-neutral-950'}
                    />
                  ))}
                  <InteractiveColorSwatch
                    key={50}
                    name="50"
                    bg="bg-neutral-50"
                    text='text-neutral-950'
                  />
                  <InteractiveColorSwatch
                    key={500}
                    name="500"
                    bg="bg-neutral-500"
                    text='text-neutral-50'
                  />
                  <InteractiveColorSwatch
                    key={950}
                    name="950"
                    bg="bg-neutral-950"
                    text='text-neutral-50'
                  />
                </div>
              </div>

              {/* Text Hierarchy with Interactive Examples */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Text Hierarchy</h3>
                <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-text-primary text-lg font-semibold">Primary Text</p>
                    <p className="text-text-primary">Main content and headings. Use for primary information that users need to see first.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-text-secondary text-lg font-semibold">Secondary Text</p>
                    <p className="text-text-secondary">Supporting information and descriptions. Use for additional context.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-text-tertiary text-lg font-semibold">Tertiary Text</p>
                    <p className="text-text-tertiary">Less important details like timestamps, metadata, and helper text.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-text-disabled text-lg font-semibold">Disabled Text</p>
                    <p className="text-text-disabled">Inactive or unavailable elements that cannot be interacted with.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Gradients */}
            <section className="space-y-8">
              <SectionHeader title="Gradients" subtitle="Background gradients for premium aesthetics" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 rounded-lg p-6 flex items-end" style={{ background: 'var(--gradient-primary)' }}>
                  <p className="text-primary-foreground font-semibold">Primary Gradient</p>
                </div>
                <div className="h-40 rounded-lg p-6 flex items-end" style={{ background: 'var(--gradient-accent)' }}>
                  <p className="text-accent-foreground font-semibold">Accent Gradient</p>
                </div>
                <div className="h-40 rounded-lg p-6 flex items-end" style={{ background: 'var(--gradient-warm)' }}>
                  <p className="text-text-primary font-semibold">Warm Gradient</p>
                </div>
              </div>
            </section>

            {/* Shadows */}
            <section className="space-y-8">
              <SectionHeader title="Shadow Elevation" subtitle="Hover to see shadow depth in action" />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {['sm', '', 'md', 'lg', 'xl', '2xl', 'inner'].map((size) => (
                  <div
                    key={size}
                    className={`bg-surface p-6 rounded-lg shadow-${size} hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <p className="font-semibold text-text-primary text-sm">
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
            <section className="space-y-8">
              <SectionHeader title="Interactive Buttons" subtitle="Hover and click to see all states" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-semibold text-text-primary">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-primary text-xs px-3 py-1.5">Small</button>
                  <button className="btn-primary text-sm px-4 py-2">Default</button>
                  <button className="btn-primary px-6 py-3">Large</button>
                  <button className="btn-primary text-lg px-8 py-4">Extra Large</button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Buttons with Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="btn-accent flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </button>
                  <button className="btn-outline flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Quick View
                  </button>
                  <button className="btn-ghost flex items-center gap-2">
                    Continue Shopping
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Icon-only Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Icon-Only Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-hover transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="p-3 border border-border text-text-primary rounded-md hover:bg-muted transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                  <button className="p-3 text-destructive hover:bg-destructive-subtle rounded-md transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
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
            <section className="space-y-8">
              <SectionHeader title="Loading States" subtitle="Skeleton screens and animations" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card space-y-4">
                    <div className="skeleton w-full h-48 rounded-lg" />
                    <div className="skeleton h-6 w-3/4 rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-5/6 rounded" />
                    <div className="flex gap-2">
                      <div className="skeleton h-10 w-24 rounded-md" />
                      <div className="skeleton h-10 flex-1 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pulse Animation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Pulse Animation</h3>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-primary rounded-lg pulse" />
                  <div className="w-16 h-16 bg-accent rounded-lg pulse" />
                  <div className="w-16 h-16 bg-success rounded-lg pulse" />
                </div>
              </div>
            </section>
          </>
        )}

        {/* E-Commerce Components Tab */}
        {activeTab === 'ecommerce' && (
          <>
            {/* Product Cards */}
            <section className="space-y-8">
              <SectionHeader title="Product Cards" subtitle="Interactive product displays with hover effects" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <section className="space-y-8">
              <SectionHeader title="Cart Items" subtitle="Interactive cart components" />

              <div className="space-y-4 max-w-3xl">
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
            </section>

            {/* Filter Sidebar */}
            <section className="space-y-8">
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
            </section>

            {/* Footer */}
            <section className="space-y-8">
              <SectionHeader title="Footer Components" subtitle="Site footer with links and information" />

              <div className="bg-surface border border-border rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-text-primary text-lg">Artisan Hide</h3>
                    <p className="text-sm text-text-secondary">
                      Premium leather goods crafted with excellence since 2020.
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all">
                        <span className="sr-only">Facebook</span>
                        📘
                      </a>
                      <a href="#" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all">
                        <span className="sr-only">Instagram</span>
                        📷
                      </a>
                      <a href="#" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all">
                        <span className="sr-only">Twitter</span>
                        🐦
                      </a>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Shop</h4>
                    <ul className="space-y-2">
                      {['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Support</h4>
                    <ul className="space-y-2">
                      {['Contact Us', 'Shipping Info', 'Returns', 'FAQ'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Contact</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        123 Leather St, NY 10001
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        +1 (555) 123-4567
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        hello@artisanhide.com
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="h-px bg-divider mb-6" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-text-tertiary">
                    © 2026 Artisan Hide. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <a href="#" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

/* Helper Components */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-divider pb-4">
      <h2 className="text-3xl font-bold text-text-primary mb-1">{title}</h2>
      <p className="text-text-secondary">{subtitle}</p>
    </div>
  );
}

function ColorSection({ title, colors }: {
  title: string;
  colors: Array<{ name: string; bg: string; text: string }>
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        className={`${bg} ${text} h-24 rounded-lg flex items-center justify-center font-medium shadow-sm transition-all duration-300 ${isHovered ? 'scale-105 shadow-lg' : ''
          }`}
      >
        {name}
      </div>
      <p className="text-xs text-text-tertiary text-center transition-colors">
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
      case 'destructive': return 'bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active px-6 py-3 rounded-md font-medium transition-all';
    }
  };

  return (
    <div className="card space-y-4">
      <div>
        <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <div className="space-y-3">
        <button className={`${getButtonClass()} w-full`}>Normal</button>
        <button className={`${getButtonClass()} w-full`} disabled>Disabled</button>
      </div>
      <p className="text-xs text-text-tertiary">Hover and click to see states</p>
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
    <div className={`${getStyles()} border rounded-lg p-4 flex items-start gap-3 transition-all hover:shadow-md`}>
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
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
      className="card p-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-muted aspect-3/4">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/20" />
        {badge && (
          <span className={`absolute top-4 left-4 z-10 ${badge === 'New' ? 'badge-new' : badge === 'Sale' ? 'badge-sale' : 'badge-limited'
            }`}>
            {badge}
          </span>
        )}
        <div className={`absolute top-4 right-4 z-10 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
          <button className="p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-surface/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-text-primary line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= rating ? 'fill-rating-filled text-rating-filled' : 'fill-rating-empty text-rating-empty'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-text-tertiary">({reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-text-primary">${price}</span>
          {originalPrice && (
            <span className="text-sm line-through text-text-tertiary">${originalPrice}</span>
          )}
        </div>
        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
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
    <div className="card flex gap-4 hover:shadow-md transition-shadow">
      <div className="w-24 h-24 bg-muted rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-text-primary">{name}</h4>
            <p className="text-sm text-text-secondary">Size: {size} | Color: {color}</p>
          </div>
          <button className="p-1 text-destructive hover:bg-destructive-subtle rounded transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-1 border border-border rounded hover:border-primary transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-1 border border-border rounded hover:border-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-lg font-bold text-text-primary">${(price * qty).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}