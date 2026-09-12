'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Facets from '@/components/Facets';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/commercetools/products';
import { Product } from '@/lib/commercetools/products';

interface FacetOption {
  label: string;
  value: string;
  count?: number;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedFacets, setSelectedFacets] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState('-createdAt');

  const facets: Record<string, FacetOption[]> = {
    'Price Range': [
      { label: 'Under $50', value: '0-50' },
      { label: '$50 - $100', value: '50-100' },
      { label: '$100 - $200', value: '100-200' },
      { label: 'Over $200', value: '200-1000' },
    ],
    'Category': [
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
      { label: 'Home & Garden', value: 'home' },
      { label: 'Sports', value: 'sports' },
    ],
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters: string[] = [];
      Object.entries(selectedFacets).forEach(([facetName, values]) => {
        values.forEach((value) => {
          filters.push(`${facetName}:"${value}"`);
        });
      });

      const response = await getProducts({
        limit: 12,
        offset: page * 12,
        sort,
        filter: filters,
      });

      if (response.data && response.data.results) {
        setProducts(response.data.results);
        setTotal(response.data.total || 0);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, sort, selectedFacets]);

  const handleFacetChange = (facetName: string, value: string, checked: boolean) => {
    setPage(0);
    setSelectedFacets((prev) => {
      const current = prev[facetName] || [];
      if (checked) {
        return { ...prev, [facetName]: [...current, value] };
      } else {
        return { ...prev, [facetName]: current.filter((v) => v !== value) };
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Facets Sidebar */}
      <div className="lg:col-span-1">
        <Facets
          facets={facets}
          selectedFacets={selectedFacets}
          onFacetChange={handleFacetChange}
        />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        {/* Header with Sort */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Products</h1>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="-createdAt">Newest</option>
            <option value="name.en-US">Name (A-Z)</option>
            <option value="price asc">Price (Low to High)</option>
            <option value="price desc">Price (High to Low)</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error loading products: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {page + 1} of {Math.ceil(total / 12)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= Math.ceil(total / 12)}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
