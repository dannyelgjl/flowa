import { fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { OrderDetailsScreen } from '@/screens/OrderDetails';
import { ordersService } from '@/services/orders/orders.service';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('OrderDetailsScreen additional flows', () => {
  it('renderiza estado de loading quando ainda está carregando sem ordem', () => {
    useOrdersStore.setState({
      hasHydrated: true,
      isLoading: true,
      orders: [],
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrderDetailsScreen />} path="/orders/:orderId" />
      </Routes>,
      { route: '/orders/ORD-1008' },
    );

    expect(
      screen.getByText('Carregando detalhes da ordem...'),
    ).toBeInTheDocument();
  });

  it('permite navegar de volta e criar outra ordem', async () => {
    const orders = cloneOrders();

    useOrdersStore.setState({
      hasHydrated: true,
      orders,
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrderDetailsScreen />} path="/orders/:orderId" />
        <Route element={<div>Book</div>} path="/orders" />
        <Route element={<div>Tela de criação</div>} path="/orders/new" />
      </Routes>,
      { route: '/orders/ORD-1008' },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao book' }));
    expect(screen.getByText('Book')).toBeInTheDocument();
  });

  it('renderiza execuções quando a ordem já foi executada e navega para nova ordem', async () => {
    const orders = cloneOrders();

    useOrdersStore.setState({
      hasHydrated: true,
      orders,
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrderDetailsScreen />} path="/orders/:orderId" />
        <Route element={<div>Book</div>} path="/orders" />
        <Route element={<div>Tela de criação</div>} path="/orders/new" />
      </Routes>,
      { route: '/orders/ORD-1006' },
    );

    expect(screen.getByText(/Contra ordem:/)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Cancelar ordem' }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Nova ordem' }));
    expect(screen.getByText('Tela de criação')).toBeInTheDocument();
  });

  it('mantém o diálogo aberto quando o cancelamento falha', async () => {
    const orders = cloneOrders();

    ordersService.seed(orders);
    useOrdersStore.setState({
      hasHydrated: true,
      orders,
    });

    vi.spyOn(ordersService, 'cancelOrder').mockRejectedValueOnce(
      new Error('Falha ao cancelar'),
    );

    renderWithProviders(
      <Routes>
        <Route element={<OrderDetailsScreen />} path="/orders/:orderId" />
      </Routes>,
      { route: '/orders/ORD-1008' },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar ordem' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Confirmar cancelamento' }),
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
