import { fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { OrdersScreen } from '@/screens/Orders';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('OrdersScreen', () => {
  it('permite filtrar as ordens e navegar para os detalhes', async () => {
    useOrdersStore.setState({
      hasHydrated: true,
      orders: cloneOrders(),
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrdersScreen />} path="/" />
        <Route element={<div>Detalhe da ordem</div>} path="/orders/:orderId" />
      </Routes>,
    );

    fireEvent.change(screen.getByLabelText('Instrumento'), {
      target: { value: 'MGLU3' },
    });

    expect(
      screen.getByText(/1 resultados após filtros e ordenação\./i),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Ver detalhes' })[0]!,
    );

    expect(screen.getByText('Detalhe da ordem')).toBeInTheDocument();
  });

  it('navega para a criação de nova ordem', async () => {
    useOrdersStore.setState({
      hasHydrated: true,
      orders: cloneOrders(),
    });

    renderWithProviders(
      <Routes>
        <Route element={<OrdersScreen />} path="/" />
        <Route element={<div>Página de criação</div>} path="/orders/new" />
      </Routes>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Criar nova ordem' }));

    expect(screen.getByText('Página de criação')).toBeInTheDocument();
  });
});
