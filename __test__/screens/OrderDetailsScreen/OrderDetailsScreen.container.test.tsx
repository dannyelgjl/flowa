import type { PropsWithChildren } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { useContainer } from '@/screens/OrderDetails/useContainer';
import { useOrdersStore } from '@/store/orders/orders.store';

interface WrapperProps extends PropsWithChildren {
  path?: string;
  route?: string;
}

function Wrapper({
  children,
  path = '/orders/:orderId',
  route = '/orders/ORD-1008',
}: WrapperProps) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={<>{children}</>} path={path} />
      </Routes>
    </MemoryRouter>
  );
}

describe('OrderDetailsScreen container', () => {
  it('dispara a carga inicial quando a store ainda não hidratou', async () => {
    const loadOrders = vi.fn().mockResolvedValue(undefined);

    useOrdersStore.setState({
      hasHydrated: false,
      loadOrders,
      orders: [],
    });

    renderHook(() => useContainer({}), {
      wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
    });

    await waitFor(() => {
      expect(loadOrders).toHaveBeenCalledTimes(1);
    });
  });

  it('abre e fecha o diálogo e ignora cancelamento quando a ordem não existe', async () => {
    const cancelOrder = vi.fn(async () => cloneOrders()[0]!);

    useOrdersStore.setState({
      cancelOrder,
      hasHydrated: true,
      orders: [],
    });

    const { result } = renderHook(() => useContainer({}), {
      wrapper: ({ children }) => (
        <Wrapper route="/orders/ORD-404">{children}</Wrapper>
      ),
    });

    act(() => {
      result.current.openDialog();
    });

    expect(result.current.isDialogOpen).toBe(true);

    await act(async () => {
      await result.current.handleConfirmCancel();
    });

    expect(cancelOrder).not.toHaveBeenCalled();

    act(() => {
      result.current.closeDialog();
    });

    expect(result.current.isDialogOpen).toBe(false);
  });
});
