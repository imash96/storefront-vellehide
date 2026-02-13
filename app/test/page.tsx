/**
 * Enhanced Test Page - Comprehensive Color & Component Showcase
 * 
 * This page demonstrates all color tokens, components, and interactive states
 * from your premium leather brand theme.
 */

import { Star, Heart, ShoppingCart, Check, X, AlertCircle, Info, ChevronRight } from 'lucide-react';

export default function EnhancedTestPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container-custom py-16 space-y-16">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-text-primary">
            Premium Leather Brand - Design System
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            A comprehensive showcase of all color tokens, components, and interactive states
            in both light and dark themes.
          </p>
        </header>

        {/* Color Palette Section */}
        <section className="space-y-8">
          <SectionHeader title="Color Palette" subtitle="Primary brand colors and variants" />

          {/* Primary Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Primary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ColorSwatch name="Primary" color="bg-primary" textColor="text-primary-foreground" />
              <ColorSwatch name="Primary Hover" color="bg-primary-hover" textColor="text-primary-foreground" />
              <ColorSwatch name="Primary Active" color="bg-primary-active" textColor="text-primary-foreground" />
              <ColorSwatch name="Primary Subtle" color="bg-primary-subtle" textColor="text-primary" />
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Secondary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ColorSwatch name="Secondary" color="bg-secondary" textColor="text-secondary-foreground" />
              <ColorSwatch name="Secondary Hover" color="bg-secondary-hover" textColor="text-secondary-foreground" />
              <ColorSwatch name="Secondary Active" color="bg-secondary-active" textColor="text-secondary-foreground" />
              <ColorSwatch name="Secondary Subtle" color="bg-secondary-subtle" textColor="text-secondary" />
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Accent Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ColorSwatch name="Accent" color="bg-accent" textColor="text-accent-foreground" />
              <ColorSwatch name="Accent Hover" color="bg-accent-hover" textColor="text-accent-foreground" />
              <ColorSwatch name="Accent Active" color="bg-accent-active" textColor="text-accent-foreground" />
              <ColorSwatch name="Accent Subtle" color="bg-accent-subtle" textColor="text-accent" />
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Semantic Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorSwatch name="Success" color="bg-success" textColor="text-success-foreground" />
              <ColorSwatch name="Destructive" color="bg-destructive" textColor="text-destructive-foreground" />
              <ColorSwatch name="Warning" color="bg-warning" textColor="text-warning-foreground" />
              <ColorSwatch name="Info" color="bg-info" textColor="text-info-foreground" />
            </div>
          </div>

          {/* Background & Surface Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Backgrounds & Surfaces</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ColorSwatch name="Background" color="bg-background" textColor="text-foreground" border />
              <ColorSwatch name="Surface" color="bg-surface" textColor="text-surface-foreground" border />
              <ColorSwatch name="Muted" color="bg-muted" textColor="text-muted-foreground" border />
              <ColorSwatch name="Card" color="bg-card" textColor="text-card-foreground" border />
            </div>
          </div>

          {/* Text Hierarchy */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Text Hierarchy</h3>
            <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
              <p className="text-text-primary text-lg">Primary Text - Main content and headings</p>
              <p className="text-text-secondary text-lg">Secondary Text - Supporting information</p>
              <p className="text-text-tertiary text-lg">Tertiary Text - Less important details</p>
              <p className="text-text-disabled text-lg">Disabled Text - Inactive elements</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-8">
          <SectionHeader title="Buttons" subtitle="All button variants and states" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Primary</h4>
              <button className="btn-primary w-full">Primary Button</button>
              <button className="btn-primary w-full" disabled>Disabled</button>
            </div>

            {/* Secondary Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Secondary</h4>
              <button className="btn-secondary w-full">Secondary Button</button>
              <button className="btn-secondary w-full opacity-50 cursor-not-allowed">Disabled</button>
            </div>

            {/* Accent Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Accent</h4>
              <button className="btn-accent w-full">Accent Button</button>
              <button className="btn-accent w-full opacity-50 cursor-not-allowed">Disabled</button>
            </div>

            {/* Outline Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Outline</h4>
              <button className="btn-outline w-full">Outline Button</button>
              <button className="btn-outline w-full opacity-50 cursor-not-allowed">Disabled</button>
            </div>

            {/* Ghost Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Ghost</h4>
              <button className="btn-ghost w-full">Ghost Button</button>
              <button className="btn-ghost w-full opacity-50 cursor-not-allowed">Disabled</button>
            </div>

            {/* Destructive Button */}
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Destructive</h4>
              <button className="bg-destructive text-destructive-foreground hover:bg-destructive-hover px-6 py-3 rounded-md font-medium w-full">
                Delete
              </button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary">Icon Buttons</h4>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-destructive text-destructive-foreground hover:bg-destructive-hover px-6 py-3 rounded-md font-medium flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="btn-accent flex items-center gap-2">
                Proceed
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Input Fields */}
        <section className="space-y-8">
          <SectionHeader title="Input Fields" subtitle="Form elements and states" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-primary">Default Input</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="input w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-primary">Disabled Input</label>
              <input
                type="text"
                placeholder="Disabled field"
                disabled
                className="bg-input-disabled-background text-input-disabled-text border border-input-disabled-border px-4 py-2.5 rounded-md w-full cursor-not-allowed"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-primary">Textarea</label>
              <textarea
                placeholder="Enter your message"
                rows={4}
                className="input w-full resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-primary">Select</label>
              <select className="input w-full">
                <option>Choose an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          {/* Input with Error */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">Input with Error</label>
            <input
              type="email"
              placeholder="invalid@email"
              className="input w-full border-destructive focus:border-destructive"
            />
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="w-4 h-4" />
              Please enter a valid email address
            </p>
          </div>

          {/* Input with Success */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">Input with Success</label>
            <input
              type="email"
              placeholder="valid@email.com"
              className="input w-full border-success focus:border-success"
            />
            <p className="text-sm text-success flex items-center gap-1">
              <Check className="w-4 h-4" />
              Email is valid
            </p>
          </div>
        </section>

        {/* Cards & Surfaces */}
        <section className="space-y-8">
          <SectionHeader title="Cards & Surfaces" subtitle="Container components" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Default Card</h3>
              <p className="text-text-secondary">Standard card with border and padding.</p>
            </div>

            <div className="card hover:bg-card-hover transition-colors cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Hover Card</h3>
              <p className="text-text-secondary">Card with hover state effect.</p>
            </div>

            <div className="bg-surface border border-card-border rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
              <p className="text-text-secondary">Card with shadow elevation.</p>
            </div>
          </div>

          {/* Popover */}
          <div className="bg-popover border border-popover-border rounded-lg p-4 shadow-xl max-w-sm">
            <h4 className="font-semibold text-popover-foreground mb-2">Popover Component</h4>
            <p className="text-sm text-text-secondary">
              This is a popover with elevated surface styling.
            </p>
          </div>
        </section>

        {/* Alerts & Notifications */}
        <section className="space-y-8">
          <SectionHeader title="Alerts & Notifications" subtitle="Semantic messaging components" />

          <div className="space-y-4">
            <div className="bg-success-subtle border border-success text-success rounded-lg p-4 flex items-start gap-3">
              <Check className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Success</h4>
                <p className="text-sm opacity-90">Your order has been placed successfully!</p>
              </div>
            </div>

            <div className="bg-destructive-subtle border border-destructive text-destructive rounded-lg p-4 flex items-start gap-3">
              <X className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Error</h4>
                <p className="text-sm opacity-90">There was an error processing your payment.</p>
              </div>
            </div>

            <div className="bg-warning-subtle border border-warning text-warning rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Warning</h4>
                <p className="text-sm opacity-90">Your session will expire in 5 minutes.</p>
              </div>
            </div>

            <div className="bg-info-subtle border border-info text-info rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Information</h4>
                <p className="text-sm opacity-90">Free shipping on orders over $150.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-8">
          <SectionHeader title="Badges" subtitle="Label and tag components" />

          <div className="flex flex-wrap gap-3">
            <span className="badge-new">New Arrival</span>
            <span className="badge-sale">Sale -30%</span>
            <span className="badge-limited">Limited Edition</span>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Primary Badge
            </span>
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Secondary Badge
            </span>
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
              Accent Badge
            </span>
          </div>

          {/* Product Badges */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary">Product Status Badges</h4>
            <div className="flex flex-wrap gap-3">
              <span className="text-xs font-medium text-success px-2 py-1 bg-success-subtle border border-success rounded">
                In Stock
              </span>
              <span className="text-xs font-medium text-destructive px-2 py-1 bg-destructive-subtle border border-destructive rounded">
                Out of Stock
              </span>
              <span className="text-xs font-medium text-warning px-2 py-1 bg-warning-subtle border border-warning rounded">
                Low Stock
              </span>
              <span className="text-xs font-medium text-info px-2 py-1 bg-info-subtle border border-info rounded">
                Pre-Order
              </span>
            </div>
          </div>
        </section>

        {/* Borders & Dividers */}
        <section className="space-y-8">
          <SectionHeader title="Borders & Dividers" subtitle="Separators and boundaries" />

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Border Subtle</p>
              <div className="h-16 border border-border-subtle rounded-lg" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Border Default</p>
              <div className="h-16 border border-border rounded-lg" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Border Strong</p>
              <div className="h-16 border-2 border-border-strong rounded-lg" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Divider</p>
              <div className="h-px bg-divider" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Divider Strong</p>
              <div className="h-px bg-divider-strong" />
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="space-y-8">
          <SectionHeader title="Links" subtitle="Navigation and clickable text" />

          <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-link hover:text-link-hover underline">Default Link</a>
              <a href="#" className="text-link-visited underline">Visited Link</a>
              <a href="#" className="text-link-active underline">Active Link</a>
            </div>

            <div className="flex items-center gap-2">
              <a href="#" className="text-primary hover:text-primary-hover flex items-center gap-1">
                Shop Now
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Rating Stars */}
        <section className="space-y-8">
          <SectionHeader title="Rating Stars" subtitle="Product rating display" />

          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= rating
                          ? 'fill-rating-filled text-rating-filled'
                          : 'fill-rating-empty text-rating-empty'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">({rating} stars)</span>
              </div>
            ))}
          </div>
        </section>

        {/* Focus States */}
        <section className="space-y-8">
          <SectionHeader title="Focus States" subtitle="Keyboard navigation indicators" />

          <div className="space-y-4">
            <p className="text-text-secondary text-sm">Tab through these elements to see focus states:</p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary ring-focus-ring">Focus Me</button>
              <input type="text" placeholder="Tab here" className="input max-w-xs" />
              <a href="#" className="text-link underline ring-focus-ring">Focus Link</a>
            </div>
          </div>
        </section>

        {/* Overlays */}
        <section className="space-y-8">
          <SectionHeader title="Overlays" subtitle="Modal and backdrop layers" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-40 bg-linear-to-br from-primary to-accent rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-overlay flex items-center justify-center">
                <p className="text-white font-semibold">Overlay</p>
              </div>
            </div>

            <div className="relative h-40 bg-linear-to-br from-secondary to-accent rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-overlay-light flex items-center justify-center">
                <p className="text-text-primary font-semibold">Overlay Light</p>
              </div>
            </div>

            <div className="relative h-40 bg-linear-to-br from-accent to-primary rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-overlay-heavy flex items-center justify-center">
                <p className="text-white font-semibold">Overlay Heavy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="space-y-8">
          <SectionHeader title="Shadows" subtitle="Elevation and depth" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-6 rounded-lg shadow-sm">
              <p className="font-semibold text-text-primary">Shadow SM</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow">
              <p className="font-semibold text-text-primary">Shadow</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-md">
              <p className="font-semibold text-text-primary">Shadow MD</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-lg">
              <p className="font-semibold text-text-primary">Shadow LG</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-xl">
              <p className="font-semibold text-text-primary">Shadow XL</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-2xl">
              <p className="font-semibold text-text-primary">Shadow 2XL</p>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-inner">
              <p className="font-semibold text-text-primary">Shadow Inner</p>
            </div>
          </div>
        </section>

        {/* Price Display */}
        <section className="space-y-8">
          <SectionHeader title="Price Display" subtitle="Product pricing components" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Regular Price</p>
                <p className="text-3xl font-bold text-price-current">$299.00</p>
              </div>
            </div>

            <div className="card">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">Sale Price</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-price-sale">$199.00</p>
                  <p className="text-lg line-through text-price-original">$299.00</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">You Save</p>
                <p className="text-3xl font-bold text-price-save">$100.00</p>
                <p className="text-sm text-success">33% off</p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="space-y-8">
          <SectionHeader title="Loading States" subtitle="Skeleton screens and indicators" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card space-y-4">
              <div className="skeleton w-full h-48 rounded-lg" />
              <div className="skeleton h-6 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
            </div>

            <div className="card space-y-4">
              <div className="skeleton w-full h-48 rounded-lg" />
              <div className="skeleton h-6 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
            </div>

            <div className="card space-y-4">
              <div className="skeleton w-full h-48 rounded-lg" />
              <div className="skeleton h-6 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
            </div>
          </div>
        </section>

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

function ColorSwatch({
  name,
  color,
  textColor,
  border = false
}: {
  name: string;
  color: string;
  textColor: string;
  border?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`${color} ${textColor} ${border ? 'border border-border' : ''} h-24 rounded-lg flex items-center justify-center font-medium shadow-sm`}
      >
        {name}
      </div>
      <p className="text-xs text-text-tertiary text-center">{color}</p>
    </div>
  );
}