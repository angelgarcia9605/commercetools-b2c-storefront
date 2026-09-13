'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/commercetools/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    console.warn('ProductCard: product is null');
    return null;
  }

  // Get variant - either from flattened structure or masterData
  const variant = product.masterVariant || product.masterData?.current?.masterVariant;
  if (!variant) {
    console.warn('ProductCard: no variant found for product', product.id);
    return null;
  }

  // Get name from flattened structure or masterData - try multiple languages
  const nameObj = product.name || product.masterData?.current?.name;
  const name = nameObj?.['en-US'] || nameObj?.['en'] || nameObj?.['de-DE'] || 'Product';
  
  // Get slug
  const slugObj = product.slug || product.masterData?.current?.slug;
  const slug = slugObj?.['en-US'] || slugObj?.['de-DE'] || product.id;
  
  // Get description
  const descObj = product.description || product.masterData?.current?.description;
  const description = descObj?.['en-US'] || descObj?.['en'] || descObj?.['de-DE'];
  
  // Get price - handle both formats
  const prices = variant.prices || [];
  if (prices.length === 0) {
    console.warn('ProductCard: no prices found for product', product.id);
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 text-center">
        <h3 className="text-lg font-semibold text-primary mb-2">{name}</h3>
        <p className="text-gray-500 text-sm">Price not 
        
        </p>
      </div>
    );
  }

  const price = prices[0];
  console.log('ProductCard price object:', price);
  
  // Get image
  const image = variant.images?.[0];

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
          <div className="relative w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <span className="text-white text-sm font-semibold">No image</span>
            </div>
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
          {price && price.value && (
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
