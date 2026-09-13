'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/commercetools/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product || !product.masterVariant) {
    return null;
  }

  const variant = product.masterVariant;
  const price = variant.prices?.[0];
  const name = product.name?.['en-US'] || product.name?.['en'] || 'Product';
  const slug = product.slug?.['en-US'] || product.slug?.['en'] || product.id;
  const image = variant.images?.[0];
  const description = product.description?.['en-US'] || product.description?.['en'];

  // Fallback if no price
  if (!price) {
    console.warn('Product missing price:', product.id);
    return null;
  }

  return (
    <Link href={`/products/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
        {/* Image */}
        {image && image.url ? (
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <Image
              src={image.url}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition"
              onError={(e) => {
                console.warn('Image failed to load:', image.url);
              }}
            />
          </div>
        ) : (
          <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Name */}
          <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
              {description}
            </p>
          )}

          {/* Price */}
          {price && (
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xl font-bold text-secondary">
                {formatPrice(price.value.centAmount, price.value.currencyCode)}
              </span>
              <button className="bg-secondary hover:bg-accent text-white p-2 rounded-lg transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
