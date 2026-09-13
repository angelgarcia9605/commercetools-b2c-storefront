'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/commercetools/products';
import { mockProducts } from '@/lib/commercetools/mockProducts';

interface ProductsPageProps {
  initialProducts?: Product[];
}

export default function ProductsClient({ initialProducts = [] }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts.length > 0 ? initialProducts : mockProducts);
  const [loading, setLoading] = useState(!initialProducts || initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
    }
  }, [initialProducts]);

  const handleSort = (value: string) => {
    setSortBy(value);
    // Implement sorting logic here
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Products</h1>
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="best-sellers">Best Sellers</option>
        </select>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}
