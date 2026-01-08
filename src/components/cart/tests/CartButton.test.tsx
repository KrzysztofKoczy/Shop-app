import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartButton from '../CartButton';
import { CartProvider } from '../../../context/CartContext';

const renderWithProvider = (openCart: () => void) => {
  return render(
    <CartProvider>
      <CartButton openCart={openCart} />
    </CartProvider>
  );
};

describe('CartButton', () => {
  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn(() => {});
  });

  it('should display 0 when cart is empty', () => {
    const mockOpenCart = vi.fn();

    renderWithProvider(mockOpenCart);

    const badge = screen.getByText('0');

    expect(badge).toBeInTheDocument();
  });

  it('should call openCart when clicked', async () => {
    const user = userEvent.setup();
    const mockOpenCart = vi.fn();
    
    renderWithProvider(mockOpenCart);

    const button = screen.getByRole('button', { name: 'Basket' });
    await user.click(button);

    expect(mockOpenCart).toHaveBeenCalledTimes(1);
  });
});

