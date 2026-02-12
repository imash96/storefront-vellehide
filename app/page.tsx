import { Alert, Newsletter, ProductCard, ProductCardProps, ProductSkeleton } from "../modules/test";

export default function ProductsPage() {
  const products = [
    {
      id: '1',
      name: 'Classic Leather Jacket',
      description: 'Premium Italian leather with quilted lining and brass hardware',
      price: 499,
      originalPrice: 699,
      image: '/products/jacket-1.jpg',
      rating: 5,
      reviewCount: 124,
      badges: ['new', 'sale'],
      inStock: true,
    },
    {
      id: '2',
      name: 'Vintage Leather Coat',
      description: 'Handcrafted full-grain leather with wool collar',
      price: 899,
      image: '/products/coat-1.jpg',
      rating: 5,
      reviewCount: 87,
      badges: ['limited'],
      inStock: true,
    },
    {
      id: '3',
      name: 'Executive Leather Blazer',
      description: 'Tailored fit with soft lamb leather and silk lining',
      price: 649,
      image: '/products/blazer-1.jpg',
      rating: 4,
      reviewCount: 56,
      badges: [],
      inStock: false,
    },
  ] as ProductCardProps[];

  return (
    <main className="container-custom py-16">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Premium Leather Collection
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Discover our curated selection of handcrafted leather garments,
          each piece a testament to timeless craftsmanship and modern design.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Newsletter />
      <Alert title="hello" message="sdfhsj sdjfhkjhf kjshdfkjshd sdkfhkjhf" />
      <ProductSkeleton />
    </main>
  );
}