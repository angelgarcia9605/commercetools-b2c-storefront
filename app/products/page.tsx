import { getProducts } from '@/lib/commercetools/products';
import ProductsClient from './products-client';

export const metadata = {
  title: 'Products | StoreFront',
  description: 'Browse our collection of high-quality products',
};

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    // Try to fetch from commercetools API
    const response = await getProducts(12, 0);
    if (response.results && response.results.length > 0) {
      products = response.results;
    }
  } catch (err: any) {
    console.error('Error fetching products:', err);
    // Will use mock products as fallback
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsClient initialProducts={products} />
    </div>
  );
}
