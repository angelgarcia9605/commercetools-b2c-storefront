'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/lib/commercetools/search';
import { Product } from '@/lib/commercetools/products';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await searchProducts({
          text: searchQuery,
          limit: 20,
        });
        if (response.data && response.data.results) {
          setProducts(response.data.results);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Search Products</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results */}
      {searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Results for "{searchQuery}"
          </h2>

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Searching products...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          )}

          {!loading && products.length > 0 && (
            <>
              <p className="text-gray-600 mb-4">
                Found {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your search</p>
              <p className="text-gray-500 mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {!searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Enter a search query to find products</p>
        </div>
      )}
    </div>
  );
}
