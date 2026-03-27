import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { OrderDetailsScreen } from '@/screens/OrderDetails';
import { ordersService } from '@/services/orders/orders.service';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('OrderDetailsScreen', () => {
  it('renderiza a ordem e permite cancelar quando elegível', async () => {
    const orders = cloneOrders();

    ordersService.seed(orders);
    useOrdersStore.setState({
      hasHydrated: true,
      orders,
    });

    renderWithProviders(
      <Routes>
        <Route
          element={<OrderDetailsScreen />}
          path="/orders/:orderId"
        />
      </Routes>,
      { route: '/orders/ORD-1008' },
    );

    expect(screen.getByText('Execuções registradas')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar ordem' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Confirmar cancelamento' }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Cancelar ordem' }),
      ).not.toBeInTheDocument();
    });

    expect(screen.getAllByText('Cancelada').length).toBeGreaterThan(0);
  });

  it('mostra estado vazio quando a ordem não existe', () => {
    useOrdersStore.setState({
      hasHydrated: true,
      orders: [],
    });

    renderWithProviders(
      <Routes>
        <Route
          element={<OrderDetailsScreen />}
          path="/orders/:orderId"
        />
      </Routes>,
      { route: '/orders/ORD-9999' },
    );

    expect(screen.getByText('Ordem não localizada')).toBeInTheDocument();
  });

  it('mostra a mensagem vazia mesmo sem orderId na rota', () => {
    useOrdersStore.setState({
      hasHydrated: true,
      orders: [],
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrderDetailsScreen />} path="/" />
      </Routes>,
    );

    expect(screen.getByText('Ordem não localizada')).toBeInTheDocument();
    expect(screen.getByText('Não encontramos a ordem .')).toBeInTheDocument();
  });
});
