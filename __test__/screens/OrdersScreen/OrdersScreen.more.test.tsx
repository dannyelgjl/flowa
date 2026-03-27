import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { OrdersScreen } from '@/screens/Orders';
import { ordersService } from '@/services/orders/orders.service';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('OrdersScreen additional flows', () => {
  it('carrega ordens automaticamente quando a store ainda não hidratou', async () => {
    ordersService.seed(cloneOrders());

    renderWithProviders(
      <Routes>
        <Route element={<OrdersScreen />} path="/" />
      </Routes>,
    );

    expect(await screen.findByText('Ordens negociadas')).toBeInTheDocument();

    await waitFor(() => {
      expect(useOrdersStore.getState().hasHydrated).toBe(true);
    });
  });

  it('renderiza estados de loading, erro e vazio', () => {
    useOrdersStore.setState({
      error: 'Falha na listagem',
      hasHydrated: true,
      isLoading: true,
      orders: [],
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrdersScreen />} path="/" />
      </Routes>,
    );

    expect(screen.getByText('Falha na listagem')).toBeInTheDocument();
    expect(screen.getByText('Carregando o livro de ordens...')).toBeInTheDocument();
  });

  it('permite alternar ordenação e usar paginação', async () => {
    const orders = cloneOrders();

    useOrdersStore.setState({
      hasHydrated: true,
      orders,
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrdersScreen />} path="/" />
      </Routes>,
    );

    fireEvent.click(screen.getByRole('button', { name: /preço/i }));
    fireEvent.click(screen.getByRole('button', { name: /preço/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }));
    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));

    expect(screen.getByText(/Página 1 de/i)).toBeInTheDocument();
  });
});
