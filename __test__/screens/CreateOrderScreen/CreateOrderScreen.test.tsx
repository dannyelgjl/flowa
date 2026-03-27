import { fireEvent, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { CreateOrderScreen } from '@/screens/CreateOrder';
import { ordersService } from '@/services/orders/orders.service';

describe('CreateOrderScreen', () => {
  it('exibe validações quando o formulário é enviado vazio', async () => {
    renderWithProviders(
      <Routes>
        <Route element={<CreateOrderScreen />} path="/orders/new" />
      </Routes>,
      { route: '/orders/new' },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Enviar ordem' }));

    expect(screen.getByText('Informe o instrumento.')).toBeInTheDocument();
    expect(screen.getByText('Informe o preço.')).toBeInTheDocument();
    expect(screen.getByText('Informe a quantidade.')).toBeInTheDocument();
  });

  it('cria a ordem e navega para a rota de detalhes', async () => {
    ordersService.seed(cloneOrders());

    renderWithProviders(
      <Routes>
        <Route element={<CreateOrderScreen />} path="/orders/new" />
        <Route element={<div>Rota de detalhes</div>} path="/orders/:orderId" />
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

    expect(await screen.findByText('Rota de detalhes')).toBeInTheDocument();
  });
});
