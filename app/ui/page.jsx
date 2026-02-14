"use client"

import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ArrowRight,
  Grid,
  LayoutGrid,
  Eye,
  MousePointer,
  Layers,
} from "lucide-react";

export default function UXArchitecture() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeLayout, setActiveLayout] = useState("default");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const sections = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "layout", label: "Layout System", icon: LayoutGrid },
    { id: "components", label: "Component Hierarchy", icon: Layers },
    { id: "navigation", label: "Navigation Patterns", icon: Menu },
    { id: "interactions", label: "Interaction Patterns", icon: MousePointer },
    { id: "templates", label: "Page Templates", icon: Grid },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight">
                UX Architecture
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Premium Leather Clothing Brand
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                Next.js 16+
              </span>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
                Tailwind 4+
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full border border-purple-500/20">
                Medusa v2.13
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800 min-h-screen sticky top-18.25 self-start hidden lg:block">
          <nav className="p-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all mb-2 ${
                  activeSection === section.id
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm font-light">{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-5xl">
          {activeSection === "overview" && <OverviewSection />}
          {activeSection === "layout" && (
            <LayoutSection
              activeLayout={activeLayout}
              setActiveLayout={setActiveLayout}
            />
          )}
          {activeSection === "components" && <ComponentsSection />}
          {activeSection === "navigation" && <NavigationSection />}
          {activeSection === "interactions" && <InteractionsSection />}
          {activeSection === "templates" && <TemplatesSection />}
        </main>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          UX Architecture Overview
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          A sophisticated, editorial-inspired architecture designed for premium
          leather fashion. Emphasis on visual storytelling, craftsmanship, and
          luxurious user experience.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PrincipleCard
          title="Editorial First"
          description="Magazine-quality layouts with generous whitespace, large imagery, and refined typography creating an immersive browsing experience."
          color="amber"
        />
        <PrincipleCard
          title="Tactile Interactions"
          description="Subtle, sophisticated micro-interactions that evoke the feel of premium leather—smooth, responsive, and satisfying."
          color="zinc"
        />
        <PrincipleCard
          title="Content Hierarchy"
          description="Clear visual hierarchy guiding users from discovery to purchase with intentional information architecture."
          color="blue"
        />
        <PrincipleCard
          title="Performance & Speed"
          description="Optimized Next.js App Router with streaming, parallel routes, and server components for instant navigation."
          color="purple"
        />
      </div>

      {/* Key Features */}
      <div className="mt-12">
        <h3 className="text-2xl font-light mb-6">Key Features</h3>
        <div className="space-y-4">
          <FeatureItem
            label="Progressive Enhancement"
            description="Core functionality works without JS, enhanced experiences with client-side interactions"
          />
          <FeatureItem
            label="Immersive Product Stories"
            description="Full-screen product experiences with cinematic imagery and detailed craftsmanship narratives"
          />
          <FeatureItem
            label="Intelligent Search & Filtering"
            description="Faceted search with real-time updates, saved filters, and AI-powered recommendations"
          />
          <FeatureItem
            label="Seamless Cart Experience"
            description="Slide-out cart with live updates, persistent state, and one-click checkout integration"
          />
          <FeatureItem
            label="Accessibility First"
            description="WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and semantic HTML"
          />
        </div>
      </div>

      {/* Tech Stack Integration */}
      <div className="mt-12 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <h3 className="text-2xl font-light mb-6">Tech Stack Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TechCard
            title="Next.js App Router"
            items={[
              "Parallel Routes for modal experiences",
              "Server Components for fast initial loads",
              "Streaming for progressive rendering",
              "Route Groups for layout organization",
            ]}
          />
          <TechCard
            title="Tailwind CSS 4+"
            items={[
              "Custom design tokens",
              "Container queries for responsive components",
              "Dynamic variants for state management",
              "Custom plugins for brand patterns",
            ]}
          />
          <TechCard
            title="Medusa.js Backend"
            items={[
              "Product catalog with variants",
              "Cart & checkout workflows",
              "Customer accounts & orders",
              "Admin dashboard integration",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function LayoutSection({ activeLayout, setActiveLayout }) {
  const layouts = [
    { id: "default", name: "Default Grid", cols: 12 },
    { id: "editorial", name: "Editorial", cols: 6 },
    { id: "asymmetric", name: "Asymmetric", cols: 8 },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          Layout System
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Flexible grid system with editorial focus, supporting asymmetric
          layouts and generous spacing.
        </p>
      </div>

      {/* Layout Selector */}
      <div className="flex gap-4 mb-8">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => setActiveLayout(layout.id)}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeLayout === layout.id
                ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <div className="text-sm font-light">{layout.name}</div>
            <div className="text-xs text-zinc-500 mt-1">
              {layout.cols} columns
            </div>
          </button>
        ))}
      </div>

      {/* Layout Visualization */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Layout Structure</h3>

        {activeLayout === "default" && (
          <div className="space-y-8">
            <div className="grid grid-cols-12 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                <strong className="text-zinc-200">Container:</strong> max-w-7xl
                (1280px)
              </p>
              <p>
                <strong className="text-zinc-200">Gutters:</strong> 24px (px-6)
              </p>
              <p>
                <strong className="text-zinc-200">Gap:</strong> 16px default,
                24px for content sections
              </p>
              <p>
                <strong className="text-zinc-200">Breakpoints:</strong> sm:
                640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
              </p>
            </div>
          </div>
        )}

        {activeLayout === "editorial" && (
          <div className="space-y-8">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-4 aspect-4/3 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-zinc-500">
                Hero Image
              </div>
              <div className="col-span-2 space-y-4">
                <div className="h-24 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500">
                  Content
                </div>
                <div className="h-32 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500">
                  Metadata
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                <strong className="text-zinc-200">Purpose:</strong> Product
                detail pages, editorial content
              </p>
              <p>
                <strong className="text-zinc-200">Emphasis:</strong> Large
                imagery (4 cols) with supporting content (2 cols)
              </p>
              <p>
                <strong className="text-zinc-200">Spacing:</strong> Generous
                gaps (gap-6 to gap-8)
              </p>
            </div>
          </div>
        )}

        {activeLayout === "asymmetric" && (
          <div className="space-y-8">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-5 aspect-3/2 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-zinc-500">
                Primary Content
              </div>
              <div className="col-span-3 space-y-4">
                <div className="h-32 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500">
                  Sidebar
                </div>
                <div className="h-20 bg-zinc-800/50 rounded border border-zinc-700 flex items-center justify-center text-xs text-zinc-500">
                  Actions
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                <strong className="text-zinc-200">Purpose:</strong> Collection
                pages, search results
              </p>
              <p>
                <strong className="text-zinc-200">Ratio:</strong> 5:3 split for
                dynamic tension
              </p>
              <p>
                <strong className="text-zinc-200">Flexibility:</strong> Adapts
                to content without feeling rigid
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Spacing Scale */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Spacing Scale</h3>
        <div className="space-y-4">
          {[
            {
              size: "xs",
              value: "4px",
              usage: "Tight spacing, inline elements",
            },
            { size: "sm", value: "8px", usage: "Small gaps, compact layouts" },
            { size: "md", value: "16px", usage: "Default spacing, cards" },
            {
              size: "lg",
              value: "24px",
              usage: "Section spacing, content blocks",
            },
            {
              size: "xl",
              value: "32px",
              usage: "Large sections, page segments",
            },
            {
              size: "2xl",
              value: "48px",
              usage: "Major sections, hero spacing",
            },
            {
              size: "3xl",
              value: "64px",
              usage: "Editorial spacing, page breaks",
            },
          ].map((spacing) => (
            <div key={spacing.size} className="flex items-center gap-6">
              <div className="w-16 text-sm text-zinc-400">{spacing.size}</div>
              <div className="w-20 text-sm text-zinc-500">{spacing.value}</div>
              <div
                className="bg-amber-500/20 h-8 rounded"
                style={{ width: spacing.value }}
              />
              <div className="flex-1 text-sm text-zinc-400">
                {spacing.usage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          Component Hierarchy
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Modular component architecture organized by complexity and
          reusability.
        </p>
      </div>

      {/* Component Tree */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Component Structure</h3>
        <div className="space-y-8">
          {/* Atoms */}
          <ComponentLayer
            title="Atoms"
            description="Base building blocks with no dependencies"
            components={[
              { name: "Button", props: "variant, size, loading" },
              { name: "Input", props: "type, validation, error" },
              { name: "Badge", props: "variant, size" },
              { name: "Icon", props: "name, size, color" },
              { name: "Image", props: "src, alt, priority, fill" },
              { name: "Price", props: "amount, currency, discount" },
            ]}
            color="blue"
          />

          {/* Molecules */}
          <ComponentLayer
            title="Molecules"
            description="Simple combinations of atoms"
            components={[
              { name: "ProductCard", props: "product, variant, onQuickView" },
              { name: "SearchBar", props: "onSearch, suggestions" },
              { name: "CartItem", props: "item, onUpdate, onRemove" },
              { name: "FilterChip", props: "label, active, onToggle" },
              { name: "Breadcrumb", props: "items, separator" },
              { name: "Rating", props: "value, count, size" },
            ]}
            color="purple"
          />

          {/* Organisms */}
          <ComponentLayer
            title="Organisms"
            description="Complex sections with business logic"
            components={[
              { name: "Header", props: "cart, user, navigation" },
              { name: "ProductGrid", props: "products, loading, pagination" },
              { name: "FilterSidebar", props: "filters, onApply" },
              { name: "CartDrawer", props: "isOpen, onClose" },
              { name: "ProductGallery", props: "images, thumbnails" },
              { name: "CheckoutForm", props: "onSubmit, cart" },
            ]}
            color="amber"
          />

          {/* Templates */}
          <ComponentLayer
            title="Templates"
            description="Page-level layouts and compositions"
            components={[
              { name: "CollectionTemplate", props: "collection, products" },
              { name: "ProductTemplate", props: "product, recommendations" },
              { name: "AccountTemplate", props: "user, orders" },
              { name: "CheckoutTemplate", props: "cart, checkout" },
              { name: "HomeTemplate", props: "hero, featured, collections" },
            ]}
            color="green"
          />
        </div>
      </div>

      {/* Component Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatternCard
          title="Server Components"
          items={[
            "Product catalog fetching",
            "Collection listings",
            "Static content pages",
            "SEO metadata generation",
          ]}
          badge="Default"
          badgeColor="blue"
        />
        <PatternCard
          title="Client Components"
          items={[
            "Interactive filters",
            "Shopping cart state",
            "Form validation",
            "Modals and drawers",
          ]}
          badge="use client"
          badgeColor="purple"
        />
      </div>

      {/* File Organization */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">File Organization</h3>
        <pre className="text-sm text-zinc-400 font-mono leading-relaxed">
          {`src/
├── app/                      # Next.js App Router
│   ├── (shop)/              # Shop route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── collections/
│   │   └── products/
│   ├── (account)/           # Account route group
│   └── @modal/              # Parallel route for modals
├── components/
│   ├── atoms/               # Base components
│   ├── molecules/           # Composed components
│   ├── organisms/           # Complex sections
│   └── templates/           # Page layouts
├── lib/
│   ├── medusa/              # Medusa client & utils
│   ├── utils/               # Helper functions
│   └── hooks/               # Custom React hooks
└── styles/
    └── globals.css          # Tailwind directives`}
        </pre>
      </div>
    </div>
  );
}

function NavigationSection() {
  const [activeNav, setActiveNav] = useState("mega");

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          Navigation Patterns
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Multi-level navigation system optimized for product discovery and
          conversion.
        </p>
      </div>

      {/* Navigation Types */}
      <div className="flex gap-4">
        {["mega", "mobile", "footer"].map((nav) => (
          <button
            key={nav}
            onClick={() => setActiveNav(nav)}
            className={`px-6 py-3 rounded-lg capitalize transition-all ${
              activeNav === nav
                ? "bg-zinc-800 text-zinc-100"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900"
            }`}
          >
            {nav} Menu
          </button>
        ))}
      </div>

      {/* Mega Menu */}
      {activeNav === "mega" && (
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-light mb-6">Mega Menu Structure</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-light text-zinc-400 uppercase tracking-wider">
                  Women
                </div>
                <div className="space-y-2 text-sm text-zinc-500">
                  <div>Leather Jackets</div>
                  <div>Blazers</div>
                  <div>Coats</div>
                  <div>Skirts</div>
                  <div>Pants</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-light text-zinc-400 uppercase tracking-wider">
                  Men
                </div>
                <div className="space-y-2 text-sm text-zinc-500">
                  <div>Leather Jackets</div>
                  <div>Blazers</div>
                  <div>Coats</div>
                  <div>Pants</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-light text-zinc-400 uppercase tracking-wider">
                  Collections
                </div>
                <div className="space-y-2 text-sm text-zinc-500">
                  <div>New Arrivals</div>
                  <div>Bestsellers</div>
                  <div>Heritage</div>
                  <div>Limited Edition</div>
                </div>
              </div>
              <div className="aspect-square bg-zinc-800/50 rounded flex items-center justify-center text-zinc-500 text-xs">
                Featured Image
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-800 text-sm text-zinc-400">
              <strong className="text-zinc-200">Behavior:</strong> Appears on
              hover with 200ms delay, disappears on mouse leave with 150ms delay
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {activeNav === "mobile" && (
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-light mb-6">Mobile Menu Pattern</h3>
          <div className="space-y-4">
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
                <span className="text-sm">Women</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>
              <div className="bg-zinc-900/50 p-4 space-y-2 text-sm text-zinc-400">
                <div>Leather Jackets</div>
                <div>Blazers</div>
                <div>Coats</div>
              </div>
            </div>
            <div className="text-sm text-zinc-400 space-y-2">
              <p>
                <strong className="text-zinc-200">Pattern:</strong> Accordion
                with smooth height transitions
              </p>
              <p>
                <strong className="text-zinc-200">Animation:</strong> Slide +
                fade with stagger for items
              </p>
              <p>
                <strong className="text-zinc-200">Gesture:</strong> Swipe from
                left edge to open, swipe right to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      {activeNav === "footer" && (
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-light mb-6">Footer Navigation</h3>
          <div className="grid grid-cols-4 gap-8">
            {["Shop", "About", "Support", "Legal"].map((section) => (
              <div key={section} className="space-y-3">
                <div className="text-sm font-light uppercase tracking-wider text-zinc-400">
                  {section}
                </div>
                <div className="space-y-2 text-sm text-zinc-500">
                  <div>Link Item</div>
                  <div>Link Item</div>
                  <div>Link Item</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb Pattern */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Breadcrumb Navigation</h3>
        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-zinc-500">Home</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-500">Collections</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-500">Women</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-200">Leather Jackets</span>
        </div>
        <div className="text-sm text-zinc-400">
          <strong className="text-zinc-200">Purpose:</strong> Helps users
          understand their location in the site hierarchy and navigate back
          easily
        </div>
      </div>
    </div>
  );
}

function InteractionsSection() {
  const [activeInteraction, setActiveInteraction] = useState("hover");

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          Interaction Patterns
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Sophisticated micro-interactions that enhance the premium experience.
        </p>
      </div>

      {/* Interaction Types */}
      <div className="flex flex-wrap gap-4">
        {["hover", "click", "scroll", "cart", "quickview"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveInteraction(type)}
            className={`px-6 py-3 rounded-lg capitalize transition-all ${
              activeInteraction === type
                ? "bg-zinc-800 text-zinc-100"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Interaction Details */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        {activeInteraction === "hover" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light">Hover States</h3>
            <div className="space-y-4">
              <InteractionDetail
                title="Product Card Hover"
                behavior="Scale image to 105%, fade in secondary image, show quick actions"
                timing="duration-300 ease-out"
              />
              <InteractionDetail
                title="Button Hover"
                behavior="Lift with subtle shadow, shift background color"
                timing="duration-200 ease-in-out"
              />
              <InteractionDetail
                title="Link Hover"
                behavior="Underline animation from left to right"
                timing="duration-200 ease-out"
              />
            </div>
          </div>
        )}

        {activeInteraction === "click" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light">Click/Tap Interactions</h3>
            <div className="space-y-4">
              <InteractionDetail
                title="Add to Cart"
                behavior="Button morphs to success state, cart icon animates, toast notification"
                timing="Multi-stage: 150ms press, 300ms morph, 200ms bounce"
              />
              <InteractionDetail
                title="Favorite/Wishlist"
                behavior="Heart fill animation with scale bounce"
                timing="duration-300 with spring physics"
              />
              <InteractionDetail
                title="Filter Selection"
                behavior="Checkbox check with path animation, filter count badge updates"
                timing="duration-200 ease-out"
              />
            </div>
          </div>
        )}

        {activeInteraction === "scroll" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light">Scroll Behaviors</h3>
            <div className="space-y-4">
              <InteractionDetail
                title="Sticky Header"
                behavior="Header shrinks and adds backdrop blur on scroll down, expands on scroll up"
                timing="duration-300 ease-in-out"
              />
              <InteractionDetail
                title="Parallax Hero"
                behavior="Background image moves at 0.5x scroll speed, foreground content at 1x"
                timing="transform: translateY(scrollY * 0.5)"
              />
              <InteractionDetail
                title="Reveal Animations"
                behavior="Elements fade in and slide up when entering viewport"
                timing="Intersection Observer with stagger delay"
              />
            </div>
          </div>
        )}

        {activeInteraction === "cart" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light">Cart Interactions</h3>
            <div className="space-y-4">
              <InteractionDetail
                title="Cart Drawer Open"
                behavior="Slide in from right with backdrop fade, items animate in with stagger"
                timing="Drawer: 300ms ease-out, Items: 150ms stagger"
              />
              <InteractionDetail
                title="Quantity Update"
                behavior="Number morphs with scale animation, subtotal updates with color pulse"
                timing="duration-200 ease-in-out"
              />
              <InteractionDetail
                title="Item Remove"
                behavior="Slide out left with fade, other items animate up to fill space"
                timing="duration-300 ease-in"
              />
            </div>
          </div>
        )}

        {activeInteraction === "quickview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-light">Quick View Modal</h3>
            <div className="space-y-4">
              <InteractionDetail
                title="Modal Open"
                behavior="Backdrop fade in, modal scale from 0.95 to 1, content slides up"
                timing="duration-300 ease-out with spring"
              />
              <InteractionDetail
                title="Gallery Navigation"
                behavior="Image crossfade with thumbnail highlight, smooth slide transitions"
                timing="duration-400 ease-in-out"
              />
              <InteractionDetail
                title="Variant Selection"
                behavior="Color/size selector with ring animation, product image updates"
                timing="duration-200 ease-out"
              />
            </div>
          </div>
        )}
      </div>

      {/* Animation Principles */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Animation Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimationPrinciple
            title="Purposeful Motion"
            description="Every animation should have a clear purpose—guide attention, provide feedback, or create delight."
          />
          <AnimationPrinciple
            title="Natural Physics"
            description="Use easing curves that mimic real-world motion: ease-out for entrances, ease-in for exits."
          />
          <AnimationPrinciple
            title="Performance First"
            description="Prefer CSS transforms and opacity. Use GPU-accelerated properties for smooth 60fps."
          />
          <AnimationPrinciple
            title="Respect Preferences"
            description="Honor prefers-reduced-motion for accessibility. Disable decorative animations."
          />
        </div>
      </div>
    </div>
  );
}

function TemplatesSection() {
  const [activeTemplate, setActiveTemplate] = useState("home");

  const templates = [
    { id: "home", name: "Homepage" },
    { id: "collection", name: "Collection" },
    { id: "product", name: "Product Detail" },
    { id: "cart", name: "Cart & Checkout" },
    { id: "account", name: "Account" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-light tracking-tight mb-6">
          Page Templates
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          Comprehensive page structures optimized for conversion and user
          experience.
        </p>
      </div>

      {/* Template Selector */}
      <div className="flex flex-wrap gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setActiveTemplate(template.id)}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTemplate === template.id
                ? "bg-zinc-800 text-zinc-100"
                : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900"
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* Template Details */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        {activeTemplate === "home" && (
          <TemplateStructure
            title="Homepage Template"
            sections={[
              {
                name: "Hero Section",
                description:
                  "Full-screen cinematic hero with seasonal campaign, auto-playing video background",
              },
              {
                name: "Featured Categories",
                description:
                  "3-column grid showcasing main product categories with hover reveals",
              },
              {
                name: "New Arrivals",
                description:
                  "Horizontal scrolling product carousel with 4 items visible",
              },
              {
                name: "Brand Story",
                description:
                  "Split layout with craftsmanship imagery and heritage narrative",
              },
              {
                name: "Bestsellers",
                description: "4-column grid of top products with social proof",
              },
              {
                name: "Editorial Content",
                description:
                  "Magazine-style section with styling guides and lookbooks",
              },
              {
                name: "Instagram Feed",
                description: "Social proof with user-generated content grid",
              },
              {
                name: "Newsletter Signup",
                description:
                  "Minimal form with incentive (10% off first order)",
              },
            ]}
          />
        )}

        {activeTemplate === "collection" && (
          <TemplateStructure
            title="Collection Template"
            sections={[
              {
                name: "Collection Header",
                description:
                  "Hero banner with collection name, description, and product count",
              },
              {
                name: "Filter Sidebar",
                description:
                  "Persistent left sidebar with faceted filters (category, size, color, price, material)",
              },
              {
                name: "Sort & View Controls",
                description: "Dropdown for sorting, toggle for grid/list view",
              },
              {
                name: "Product Grid",
                description:
                  "Responsive grid (4 cols desktop, 2 cols tablet, 1 col mobile)",
              },
              {
                name: "Active Filters",
                description:
                  "Chip display of active filters with clear all option",
              },
              {
                name: "Pagination",
                description: "Load more button with infinite scroll option",
              },
              {
                name: "Empty State",
                description:
                  "Helpful message and suggested collections when no results",
              },
            ]}
          />
        )}

        {activeTemplate === "product" && (
          <TemplateStructure
            title="Product Detail Template"
            sections={[
              {
                name: "Product Gallery",
                description:
                  "60% width, vertical thumbnails, zoom on hover, 360° view option",
              },
              {
                name: "Product Info",
                description:
                  "40% width, sticky on scroll, title, price, rating, short description",
              },
              {
                name: "Variant Selector",
                description:
                  "Color swatches, size selector with size guide modal",
              },
              {
                name: "Add to Cart",
                description:
                  "Prominent CTA with quantity selector and wishlist toggle",
              },
              {
                name: "Product Details",
                description:
                  "Accordion tabs for description, materials, care, sizing",
              },
              {
                name: "Craftsmanship Story",
                description: "Rich media section showing manufacturing process",
              },
              {
                name: "Reviews & Ratings",
                description: "Verified purchases, photo reviews, helpful votes",
              },
              {
                name: "Recommendations",
                description:
                  "You may also like carousel based on AI recommendations",
              },
            ]}
          />
        )}

        {activeTemplate === "cart" && (
          <TemplateStructure
            title="Cart & Checkout Template"
            sections={[
              {
                name: "Cart Items",
                description:
                  "List of products with thumbnails, variant info, quantity, price, remove",
              },
              {
                name: "Cart Summary",
                description:
                  "Sticky sidebar with subtotal, shipping estimate, tax, total",
              },
              {
                name: "Promo Code",
                description:
                  "Input field with apply button, shows active discounts",
              },
              {
                name: "Shipping Calculator",
                description: "Zip code input for shipping cost estimation",
              },
              {
                name: "Continue Shopping",
                description: "Link back to collections with recently viewed",
              },
              {
                name: "Checkout CTA",
                description: "Prominent button to proceed to checkout",
              },
              {
                name: "Trust Signals",
                description:
                  "Security badges, return policy, customer service info",
              },
            ]}
          />
        )}

        {activeTemplate === "account" && (
          <TemplateStructure
            title="Account Template"
            sections={[
              {
                name: "Account Sidebar",
                description:
                  "Navigation for profile, orders, addresses, wishlist, settings",
              },
              {
                name: "Order History",
                description:
                  "Sortable table with order number, date, total, status, actions",
              },
              {
                name: "Order Details",
                description:
                  "Modal with complete order info, tracking, invoice download",
              },
              {
                name: "Address Book",
                description:
                  "Saved addresses with add/edit/delete, set default",
              },
              {
                name: "Profile Settings",
                description:
                  "Name, email, password change, communication preferences",
              },
              {
                name: "Wishlist",
                description: "Grid of saved products with quick add to cart",
              },
            ]}
          />
        )}
      </div>

      {/* Responsive Strategy */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-xl font-light mb-6">Responsive Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResponsiveBreakpoint
            device="Mobile"
            breakpoint="< 768px"
            changes={[
              "Single column layouts",
              "Hamburger menu",
              "Simplified filters (drawer)",
              "Bottom navigation bar",
              "Sticky add to cart",
            ]}
          />
          <ResponsiveBreakpoint
            device="Tablet"
            breakpoint="768px - 1024px"
            changes={[
              "Two column layouts",
              "Simplified mega menu",
              "Filter sidebar (collapsible)",
              "Standard navigation",
              "Optimized touch targets",
            ]}
          />
          <ResponsiveBreakpoint
            device="Desktop"
            breakpoint="> 1024px"
            changes={[
              "Full grid layouts",
              "Mega menu with images",
              "Persistent filter sidebar",
              "Hover interactions",
              "Larger product imagery",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function PrincipleCard({ title, description, color }) {
  const colors = {
    amber: "border-amber-500/20 bg-amber-500/5",
    zinc: "border-zinc-700 bg-zinc-800/30",
    blue: "border-blue-500/20 bg-blue-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
  };

  return (
    <div className={`p-6 rounded-xl border ${colors[color]}`}>
      <h3 className="text-lg font-light mb-3">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ label, description }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
      <div>
        <div className="text-zinc-200 font-light">{label}</div>
        <div className="text-sm text-zinc-500 mt-1">{description}</div>
      </div>
    </div>
  );
}

function TechCard({ title, items }) {
  return (
    <div>
      <h4 className="text-lg font-light mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
            <span className="text-amber-500 mt-1">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComponentLayer({ title, description, components, color }) {
  const colors = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-lg font-light">{title}</h4>
        <span
          className={`px-3 py-1 text-xs rounded-full border ${colors[color]}`}
        >
          {components.length} components
        </span>
      </div>
      <p className="text-sm text-zinc-500 mb-4">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {components.map((comp, i) => (
          <div
            key={i}
            className="p-3 bg-zinc-800/30 rounded border border-zinc-800 text-sm"
          >
            <div className="text-zinc-200 font-mono">{comp.name}</div>
            <div className="text-zinc-600 text-xs mt-1 font-mono">
              {comp.props}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatternCard({ title, items, badge, badgeColor }) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div className="p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-light">{title}</h4>
        <span
          className={`px-2 py-1 text-xs rounded border font-mono ${colors[badgeColor]}`}
        >
          {badge}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InteractionDetail({ title, behavior, timing }) {
  return (
    <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800">
      <h4 className="text-sm font-light text-zinc-200 mb-2">{title}</h4>
      <p className="text-sm text-zinc-400 mb-2">{behavior}</p>
      <code className="text-xs text-amber-400 font-mono">{timing}</code>
    </div>
  );
}

function AnimationPrinciple({ title, description }) {
  return (
    <div>
      <h4 className="text-sm font-light text-zinc-200 mb-2">{title}</h4>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}

function TemplateStructure({ title, sections }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-light">{title}</h3>
      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 shrink-0">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-light text-zinc-200">
                {section.name}
              </div>
              <div className="text-sm text-zinc-500 mt-1">
                {section.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponsiveBreakpoint({ device, breakpoint, changes }) {
  return (
    <div className="p-6 bg-zinc-800/30 rounded-xl border border-zinc-800">
      <h4 className="text-lg font-light mb-2">{device}</h4>
      <div className="text-xs text-zinc-500 mb-4 font-mono">{breakpoint}</div>
      <ul className="space-y-2">
        {changes.map((change, i) => (
          <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            {change}
          </li>
        ))}
      </ul>
    </div>
  );
}
