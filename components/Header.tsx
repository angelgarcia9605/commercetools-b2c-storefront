'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { useState } from 'react';

export default function Header() {
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemCount = cart?.lineItems.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            🛍️ StoreFront
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/products" className="hover:text-secondary transition">
              Products
            </Link>
            <Link href="/search" className="hover:text-secondary transition">
              Search
            </Link>
            <Link href="/account" className="hover:text-secondary transition">
              Account
            </Link>
            <Link href="/cart" className="relative hover:text-secondary transition">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4">
            <Link href="/products" className="hover:text-secondary transition">
              Products
            </Link>
            <Link href="/search" className="hover:text-secondary transition">
              Search
            </Link>
            <Link href="/account" className="hover:text-secondary transition">
              Account
            </Link>
            <Link href="/cart" className="hover:text-secondary transition">
              Cart ({itemCount})
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
