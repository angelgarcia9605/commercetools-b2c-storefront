import { ReactNode } from 'react';

export function formatPrice(
  centAmount: number,
  currencyCode: string = 'USD'
): string {
  const amount = centAmount / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseQueryParams(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      params[key] = value[0];
    } else if (value) {
      params[key] = value;
    }
  }
  return params;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  pageSize: number = 5
): (number | string)[] {
  const range: (number | string)[] = [];
  const start = Math.max(1, currentPage - Math.floor(pageSize / 2));
  const end = Math.min(totalPages, start + pageSize - 1);

  if (start > 1) {
    range.push(1);
    if (start > 2) {
      range.push('...');
    }
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      range.push('...');
    }
    range.push(totalPages);
  }

  return range;
}

export function getImageUrl(
  url: string,
  width?: number,
  height?: number
): string {
  if (!url) return '/placeholder.png';

  // If using Cloudinary or similar service
  if (url.includes('cloudinary')) {
    const params = [];
    if (width) params.push(`w_${width}`);
    if (height) params.push(`h_${height}`);
    if (params.length > 0) {
      const [baseUrl, path] = url.split('/upload/');
      return `${baseUrl}/upload/${params.join(',')}/${path}`;
    }
  }

  return url;
}

export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    MXN: '$',
  };
  return symbols[currencyCode] || currencyCode;
}

export function calculateDiscount(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
