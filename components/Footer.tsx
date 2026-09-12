'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About StoreFront</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop destination for quality products at unbeatable prices. We're committed to providing an exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-secondary transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-secondary transition">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-secondary transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@storefront.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Main St, City, State 12345</li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="hover:text-secondary transition">Facebook</a>
                <a href="#" className="hover:text-secondary transition">Twitter</a>
                <a href="#" className="hover:text-secondary transition">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; {currentYear} StoreFront. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-secondary transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
