import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { AppRouter } from '@/routes';
import { ordersService } from '@/services/orders/orders.service';

describe('AppRouter', () => {
  it('redireciona a raiz para a listagem de ordens', async () => {
    ordersService.seed(cloneOrders());
    window.history.replaceState({}, '', '/');

    renderWithProviders(<AppRouter />, { withRouter: false });

    expect(
      await screen.findByText('Ordens negociadas'),
    ).toBeInTheDocument();
  });
});
