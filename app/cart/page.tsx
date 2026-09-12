'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const lineItems = cart?.lineItems || [];
  const totalPrice = cart?.totalPrice;

  const handleRemove = async (lineItemId: string) => {
    await removeItem(lineItemId);
  };

  const handleQuantityChange = async (lineItemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateQuantity(lineItemId, newQuantity);
    }
  };

  if (lineItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link
          href="/products"
          className="inline-block px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {lineItems.map((item) => (
              <div key={item.id} className="border-b p-6 flex gap-4">
                {/* Product Image */}
                {item.variant.images && item.variant.images[0] && (
                  <div className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.variant.images[0].url}
                      alt={item.name['en-US']}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-primary">
                    {item.name['en-US']}
                  </h3>
                  {item.variant.sku && (
                    <p className="text-sm text-gray-600">SKU: {item.variant.sku}</p>
                  )}
                  <p className="text-lg font-bold text-secondary mt-2">
                    {formatPrice(item.price.value.centAmount, item.price.value.currencyCode)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-primary">
                    {formatPrice(item.totalPrice.centAmount, item.totalPrice.currencyCode)}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600 hover:text-red-800 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-primary">
                  {totalPrice
                    ? formatPrice(totalPrice.centAmount, totalPrice.currencyCode)
                    : '$0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-primary">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold text-primary">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-lg">
              <span className="font-bold text-primary">Total:</span>
              <span className="font-bold text-secondary">
                {totalPrice
                  ? formatPrice(totalPrice.centAmount, totalPrice.currencyCode)
                  : '$0.00'}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center bg-secondary hover:bg-accent text-white font-bold py-3 rounded-lg transition mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="block w-full text-center border border-secondary text-secondary hover:bg-gray-50 font-semibold py-3 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
