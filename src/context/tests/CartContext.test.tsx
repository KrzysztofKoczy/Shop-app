import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import type { Product } from '../../types/product';

const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  price: 10.99,
  description: 'Test description 1',
  category: 'test',
  image: 'https://example.com/image1.jpg',
  rating: { rate: 4.5, count: 100 },
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 20.99,
  description: 'Test description 2',
  category: 'test',
  image: 'https://example.com/image2.jpg',
  rating: { rate: 4.0, count: 50 },
};

describe('CartContext', () => {
  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn(() => {});
  });

  it('should initialize empty cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems).toBe(0);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product).toEqual(mockProduct1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.getTotalItems).toBe(2);
  });

  it('should increase quantity when product already exists in cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 2);
    });

    act(() => {
      result.current.addToCart(mockProduct1, 3);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems).toBe(5);
  });

  it('should add multiple different products', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 1);
      result.current.addToCart(mockProduct2, 2);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.getTotalItems).toBe(3);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 1);
      result.current.addToCart(mockProduct2, 2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(mockProduct1.id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(mockProduct2.id);
    expect(result.current.getTotalItems).toBe(2);
  });

  it('should update quantity of product', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 2);
    });

    act(() => {
      result.current.updateQuantity(mockProduct1.id, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems).toBe(5);
  });

  it('should remove product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 2);
    });

    act(() => {
      result.current.updateQuantity(mockProduct1.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems).toBe(0);
  });

  it('should correctly calculate total number of products', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addToCart(mockProduct1, 3);
      result.current.addToCart(mockProduct2, 5);
    });

    expect(result.current.getTotalItems).toBe(8);
  });
});

