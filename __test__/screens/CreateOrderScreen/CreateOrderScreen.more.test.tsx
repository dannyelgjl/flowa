import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { CreateOrderScreen } from '@/screens/CreateOrder';
import { ordersService } from '@/services/orders/orders.service';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('CreateOrderScreen additional flows', () => {
  it('atualiza a pré-visualização e permite voltar ao book', async () => {
    renderWithProviders(
      <Routes>
        <Route element={<CreateOrderScreen />} path="/orders/new" />
        <Route element={<div>Book da aplicação</div>} path="/orders" />
      </Routes>,
      { route: '/orders/new' },
    );

    fireEvent.change(screen.getByPlaceholderText('PETR4'), {
      target: { value: 'vale3' },
    });
    fireEvent.change(screen.getAllByRole('combobox')[0]!, {
      target: { value: 'SELL' },
    });
    fireEvent.change(screen.getByPlaceholderText('29.80'), {
      target: { value: '55.3' },
    });
    fireEvent.change(screen.getByPlaceholderText('1000'), {
      target: { value: '250' },
    });

    expect(screen.getByText('VALE3')).toBeInTheDocument();
    expect(screen.getAllByText('Venda').length).toBeGreaterThan(0);
    expect(screen.getByText(/55,30/)).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Voltar ao book' }));

    expect(screen.getByText('Book da aplicação')).toBeInTheDocument();
  });

  it('permanece na tela quando a criação falha', async () => {
    ordersService.seed(cloneOrders());
    vi.spyOn(ordersService, 'createOrder').mockRejectedValueOnce(
      new Error('Falha ao criar'),
    );

    renderWithProviders(
      <Routes>
        <Route element={<CreateOrderScreen />} path="/orders/new" />
        <Route element={<div>Não deveria navegar</div>} path="/orders/:orderId" />
      </Routes>,
      { route: '/orders/new' },
    );

    fireEvent.change(screen.getByPlaceholderText('PETR4'), {
      target: { value: 'ABEV3' },
    });
    fireEvent.change(screen.getByPlaceholderText('29.80'), {
      target: { value: '18.52' },
    });
    fireEvent.change(screen.getByPlaceholderText('1000'), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar ordem' }));

    await waitFor(() => {
      expect(screen.queryByText('Não deveria navegar')).not.toBeInTheDocument();
      expect(useOrdersStore.getState().error).toBe('Falha ao criar');
    });
  });
});
