import type { PropsWithChildren } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { useContainer } from '@/screens/Orders/useContainer';
import { useOrdersStore } from '@/store/orders/orders.store';
import { DEFAULT_ORDER_FILTERS } from '@/types/order';

function Wrapper({ children }: PropsWithChildren) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe('OrdersScreen container', () => {
  it('reseta os filtros e inicia ordenação por data em ordem decrescente', () => {
    useOrdersStore.setState({
      hasHydrated: true,
      orders: cloneOrders(),
    });

    const { result } = renderHook(() => useContainer({}), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.paginatedOrders.page).toBe(2);

    act(() => {
      result.current.handleFilterChange('instrument', 'PETR4');
    });

    expect(result.current.filters.instrument).toBe('PETR4');

    act(() => {
      result.current.handleResetFilters();
      result.current.handleSort('price');
      result.current.handleSort('createdAt');
    });

    expect(result.current.filters).toEqual(DEFAULT_ORDER_FILTERS);
    expect(result.current.paginatedOrders.page).toBe(1);
    expect(result.current.sortState).toEqual({
      direction: 'desc',
      field: 'createdAt',
    });

    act(() => {
      result.current.handleSort('createdAt');
    });

    expect(result.current.sortState).toEqual({
      direction: 'asc',
      field: 'createdAt',
    });
  });
});
