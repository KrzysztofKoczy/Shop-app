import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductItem from '../ProductItem';
import { CartProvider } from '../../../context/CartContext';
import type { Product } from '../../../types/product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 120 },
};

const renderWithProvider = (product: Product) => {
  return render(
    <CartProvider>
      <ProductItem product={product} />
    </CartProvider>
  );
};

describe('ProductItem', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should increase quantity when + button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProvider(mockProduct);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const quantityDisplay = screen.getByText('0');

    await user.click(incrementButton);

    expect(quantityDisplay).toHaveTextContent('1');

    await user.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent('2');
  });

  it('should decrease quantity when - button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider(mockProduct);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const quantityDisplay = screen.getByText('0');

    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent('2');

    await user.click(decrementButton);
    expect(quantityDisplay).toHaveTextContent('1');

    await user.click(decrementButton);
    expect(quantityDisplay).toHaveTextContent('0');
  });

  it('should prevent quantity from going below 0', async () => {
    const user = userEvent.setup();
    renderWithProvider(mockProduct);

    const decrementButton = screen.getByRole('button', { name: '-' });
    const quantityDisplay = screen.getByText('0');

    await user.click(decrementButton);

    expect(quantityDisplay).toHaveTextContent('0');
  });

  it('should disable add to cart button when quantity is 0', () => {
    renderWithProvider(mockProduct);

    const addButton = screen.getByRole('button', { name: 'Dodaj do koszyka' });

    expect(addButton).toBeDisabled();
  });

  it('should enable add to cart button when quantity is greater than 0', async () => {
    const user = userEvent.setup();
    
    renderWithProvider(mockProduct);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const addButton = screen.getByRole('button', { name: 'Dodaj do koszyka' });

    expect(addButton).toBeDisabled();

    await user.click(incrementButton);

    expect(addButton).toBeEnabled();
  });

  it('should add product to cart and reset quantity', async () => {
    const user = userEvent.setup();

    renderWithProvider(mockProduct);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const addButton = screen.getByRole('button', { name: 'Dodaj do koszyka' });
    const quantityDisplay = screen.getByText('0');

    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(quantityDisplay).toHaveTextContent('2');

    await user.click(addButton);

    expect(quantityDisplay).toHaveTextContent('0');
    expect(addButton).toBeDisabled();
  });
});

