import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { ProductProvider, useProduct } from '../ProductContext';
import { fetchProducts } from '../../api/products';
import type { Product } from '../../types/product';

vi.mock('../../api/products');

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 10.99,
    description: 'Test description 1',
    category: 'test',
    image: 'https://example.com/image1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 20.99,
    description: 'Test description 2',
    category: 'test',
    image: 'https://example.com/image2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
];

describe('ProductContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load products when initialized', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProduct(), {
      wrapper: ProductProvider,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it('should return random product from list', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProduct(), {
      wrapper: ProductProvider,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.randomProduct).not.toBeNull();
    expect(mockProducts).toContainEqual(result.current.randomProduct);
  });

  it('should return null for randomProduct when there are no products', async () => {
    vi.mocked(fetchProducts).mockResolvedValue([]);

    const { result } = renderHook(() => useProduct(), {
      wrapper: ProductProvider,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.randomProduct).toBeNull();
  });
});

