'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/commercetools/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  const variant = product.masterVariant;
  const price = variant.prices[0];
  const image = variant.images[0];
  const slug = product.slug['en-US'];
  const name = product.name['en-US'];

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addItem(product.id, variant.id, 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Product Image */}
      <Link href={`/products/${slug}`}>
        <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
          {image && (
            <Image
              src={image.url}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition"
            />
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="text-lg font-semibold text-primary hover:text-secondary transition truncate">
            {name}
          </h3>
        </Link>

        {/* Price */}
        {price && (
          <p className="text-xl font-bold text-secondary mt-2">
            {formatPrice(price.value.centAmount, price.value.currencyCode)}
          </p>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description['en-US']}
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full mt-4 bg-secondary hover:bg-accent text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
