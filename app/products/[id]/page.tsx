'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/commercetools/products';
import { Product } from '@/lib/commercetools/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        if (response.data && response.data.results && response.data.results.length > 0) {
          setProduct(response.data.results[0]);
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      await addItem(product.id, product.masterVariant.id, quantity);
      setQuantity(1);
      // Optionally show success message
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error || 'Product not found'}
      </div>
    );
  }

  const variant = product.masterVariant;
  const price = variant.prices[0];
  const name = product.name['en-US'];
  const description = product.description?.['en-US'];
  const images = variant.images;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Images */}
      <div>
        {images.length > 0 && (
          <>
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={images[selectedImage].url}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index ? 'border-secondary' : 'border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`${name} ${index}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-4">{name}</h1>

        {/* Price */}
        {price && (
          <p className="text-3xl font-bold text-secondary mb-6">
            {formatPrice(price.value.centAmount, price.value.currencyCode)}
          </p>
        )}

        {/* Description */}
        {description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Attributes */}
        {variant.attributes && variant.attributes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Specifications</h3>
            <div className="space-y-2">
              {variant.attributes.map((attr, index) => (
                <div key={index} className="flex justify-between text-gray-700">
                  <span className="font-medium">{attr.name}:</span>
                  <span>{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantity & Add to Cart */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label className="font-semibold text-primary">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          className="w-full bg-secondary hover:bg-accent text-white font-bold py-3 rounded-lg transition disabled:opacity-50 mb-4"
        >
          {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
        </button>

        {/* Additional Info */}
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
          <p className="mb-2">✓ Free shipping on orders over $50</p>
          <p className="mb-2">✓ 30-day return policy</p>
          <p>✓ 1-year warranty</p>
        </div>
      </div>
    </div>
  );
}
