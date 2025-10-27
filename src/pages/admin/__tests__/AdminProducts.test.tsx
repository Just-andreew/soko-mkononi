import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminProducts from '../AdminProducts';
import { getProducts, addProduct, deleteProduct } from '../../../lib/supabaseClient';
import { ToastProvider } from '../../../lib/context/ToastContext';
import { vi, Mock } from 'vitest';

// Use Vitest's mocking function
vi.mock('../../../lib/supabaseClient');

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe('AdminProducts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  test('renders product list', async () => {
    (getProducts as Mock).mockResolvedValueOnce([
      { id: '1', name: 'Product 1', price: 100, stock: 10, tags: ['tag1'], images: [] },
      { id: '2', name: 'Product 2', price: 200, stock: 20, tags: ['tag2'], images: [] },
    ]);

    await act(async () => {
      renderWithProviders(<AdminProducts />);
    });

    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('adds a new product', async () => {
    (addProduct as Mock).mockResolvedValueOnce({ id: '3' });
    (getProducts as Mock).mockResolvedValueOnce([
      { id: '1', name: 'Product 1', price: 100, stock: 10, tags: ['tag1'], images: [] },
      { id: '3', name: 'New Product', price: 300, stock: 30, tags: ['tag3'], images: [] },
    ]);

    await act(async () => {
      renderWithProviders(<AdminProducts />);
    });

    fireEvent.change(screen.getByPlaceholderText('Search products...'), {
      target: { value: 'New Product' },
    });
    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => {
      expect(addProduct).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'New Product', price: 300 })
      );
      expect(screen.getByText('New Product')).toBeInTheDocument();
    });
  });

  test('deletes a product', async () => {
    (getProducts as Mock).mockResolvedValueOnce([
      { id: '1', name: 'Product 1', price: 100, stock: 10, tags: ['tag1'], images: [] },
    ]);
    (deleteProduct as Mock).mockResolvedValueOnce(true);

    await act(async () => {
      renderWithProviders(<AdminProducts />);
    });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTitle('Delete Product'));

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
  });
});