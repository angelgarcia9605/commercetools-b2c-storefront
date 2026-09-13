import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/commercetools/products';
import { Product } from '@/lib/commercetools/products';

export const metadata = {
  title: 'StoreFront | B2C E-commerce',
  description: 'Shop quality products at unbeatable prices with StoreFront',
};

export default async function HomePage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    console.log('HomePage: fetching products from commercetools');
    const response = await getProducts(4, 0);
    console.log('HomePage: response from getProducts', response);
    
    if (response && response.results && response.results.length > 0) {
      products = response.results;
      console.log('HomePage: loaded', products.length, 'products');
    } else {
      console.log('HomePage: no products returned');
    }
  } catch (err: any) {
    console.error('HomePage: error fetching products:', err);
    error = err.message;
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 mb-12 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StoreFront</h1>
          <p className="text-lg md:text-xl mb-8">
            Discover amazing products with the best prices
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-8">Featured Products</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            Error loading products: {error}
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="text-xl font-bold text-primary mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-primary mb-2">Best Prices</h3>
          <p className="text-gray-600">Guaranteed lowest prices</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-primary mb-2">Quality Assured</h3>
          <p className="text-gray-600">100% authentic products</p>
        </div>
      </section>
    </div>
  );
}
