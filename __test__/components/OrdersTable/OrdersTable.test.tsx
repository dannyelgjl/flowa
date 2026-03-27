import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OrdersTable } from '@/components/OrdersTable';
import { cloneOrders } from '@test/helpers/testOrders';
import { renderWithProviders } from '@test/helpers/renderWithProviders';
import { DEFAULT_SORT_STATE } from '@/types/order';

describe('OrdersTable', () => {
  it('renderiza as ordens e permite ordenar e abrir detalhes', async () => {
    const onOpenDetails = vi.fn();
    const onSort = vi.fn();
    const [order] = cloneOrders();

    renderWithProviders(
      <OrdersTable
        onOpenDetails={onOpenDetails}
        onSort={onSort}
        orders={[order]}
        sortState={DEFAULT_SORT_STATE}
      />,
      { withRouter: false },
    );

    expect(screen.getAllByText(order.instrument).length).toBeGreaterThan(0);

    const tableButtons = within(screen.getByRole('table')).getAllByRole('button');
    const sortButtons = tableButtons.slice(0, 8);

    sortButtons.forEach((button) => {
      fireEvent.click(button);
    });

    const detailButtons = screen.getAllByRole('button', { name: 'Ver detalhes' });
    expect(detailButtons.length).toBeGreaterThan(0);
    detailButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(onSort).toHaveBeenCalledWith('id');
    expect(onSort).toHaveBeenCalledWith('instrument');
    expect(onSort).toHaveBeenCalledWith('side');
    expect(onSort).toHaveBeenCalledWith('price');
    expect(onSort).toHaveBeenCalledWith('quantity');
    expect(onSort).toHaveBeenCalledWith('remainingQuantity');
    expect(onSort).toHaveBeenCalledWith('status');
    expect(onSort).toHaveBeenCalledWith('createdAt');
    expect(onOpenDetails).toHaveBeenCalledTimes(detailButtons.length);
    expect(onOpenDetails).toHaveBeenCalledWith(order.id);
  });

  it('exibe ícones diferentes quando a coluna atual está ascendente ou descendente', () => {
    const [order] = cloneOrders();
    const firstRender = renderWithProviders(
      <OrdersTable
        onOpenDetails={vi.fn()}
        onSort={vi.fn()}
        orders={[order]}
        sortState={{ direction: 'asc', field: 'price' }}
      />,
      { withRouter: false },
    );

    expect(screen.getByRole('button', { name: 'Preço ↑' })).toBeInTheDocument();

    firstRender.unmount();

    renderWithProviders(
      <OrdersTable
        onOpenDetails={vi.fn()}
        onSort={vi.fn()}
        orders={[order]}
        sortState={{ direction: 'desc', field: 'price' }}
      />,
      { withRouter: false },
    );

    expect(screen.getByRole('button', { name: 'Preço ↓' })).toBeInTheDocument();
  });

  it('aciona também a ação do card mobile', () => {
    const onOpenDetails = vi.fn();
    const [order] = cloneOrders();

    renderWithProviders(
      <OrdersTable
        onOpenDetails={onOpenDetails}
        onSort={vi.fn()}
        orders={[order]}
        sortState={DEFAULT_SORT_STATE}
      />,
      { withRouter: false },
    );

    const detailButtons = Array.from(document.body.querySelectorAll('button')).filter(
      (button) => button.textContent?.trim() === 'Ver detalhes',
    );

    expect(detailButtons.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(detailButtons[1]!);

    expect(onOpenDetails).toHaveBeenCalledWith(order.id);
  });
});
