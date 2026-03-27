import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OrdersFilters } from '@/components/OrdersFilters';
import { DEFAULT_ORDER_FILTERS } from '@/types/order';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('OrdersFilters', () => {
  it('dispara alterações dos filtros e reseta', async () => {
    const onChange = vi.fn();
    const onReset = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <OrdersFilters
        filters={DEFAULT_ORDER_FILTERS}
        onChange={onChange}
        onReset={onReset}
      />,
      { withRouter: false },
    );

    fireEvent.change(screen.getByLabelText('ID'), {
      target: { value: 'ORD-1001' },
    });
    fireEvent.change(screen.getByLabelText('Instrumento'), {
      target: { value: 'PETR4' },
    });
    fireEvent.change(screen.getByLabelText('Status'), {
      target: { value: 'OPEN' },
    });
    fireEvent.change(screen.getByLabelText('Lado'), {
      target: { value: 'SELL' },
    });
    fireEvent.change(screen.getByLabelText('Data'), {
      target: { value: '2026-03-27' },
    });

    await user.click(screen.getByRole('button', { name: 'Limpar filtros' }));

    expect(onChange).toHaveBeenCalledWith('id', 'ORD-1001');
    expect(onChange).toHaveBeenCalledWith('instrument', 'PETR4');
    expect(onChange).toHaveBeenCalledWith('status', 'OPEN');
    expect(onChange).toHaveBeenCalledWith('side', 'SELL');
    expect(onChange).toHaveBeenCalledWith('date', '2026-03-27');
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
