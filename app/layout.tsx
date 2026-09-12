import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StoreFront | B2C E-commerce',
  description: 'Shop quality products at unbeatable prices with StoreFront, powered by commercetools',
  keywords: ['e-commerce', 'shopping', 'products', 'storefront'],
  authors: [{ name: 'StoreFront Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://storefront.example.com',
    title: 'StoreFront | B2C E-commerce',
    description: 'Shop quality products at unbeatable prices',
    siteName: 'StoreFront',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
