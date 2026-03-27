import { describe, expect, it, vi } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { ordersService } from '@/services/orders/orders.service';
import { useOrdersStore } from '@/store/orders/orders.store';

describe('useOrdersStore', () => {
  it('carrega as ordens do serviço', async () => {
    const orders = cloneOrders();
    ordersService.seed(orders);

    await useOrdersStore.getState().loadOrders();

    expect(useOrdersStore.getState().hasHydrated).toBe(true);
    expect(useOrdersStore.getState().orders).toHaveLength(orders.length);
  });

  it('cria e cancela ordens atualizando o estado global', async () => {
    ordersService.seed(cloneOrders());

    const createdOrder = await useOrdersStore.getState().createOrder({
      instrument: 'BBAS3',
      price: 27.4,
      quantity: 90,
      side: 'BUY',
    });

    expect(
      useOrdersStore.getState().orders.some((order) => order.id === createdOrder.id),
    ).toBe(true);

    const cancelledOrder = await useOrdersStore.getState().cancelOrder('ORD-1008');

    expect(cancelledOrder.status).toBe('CANCELLED');
  });

  it('salva mensagem de erro quando o serviço falha ao carregar', async () => {
    vi.spyOn(ordersService, 'listOrders').mockRejectedValueOnce(
      new Error('Falha no carregamento'),
    );

    await useOrdersStore.getState().loadOrders();

    expect(useOrdersStore.getState().error).toBe('Falha no carregamento');
  });

  it('salva erro genérico quando a criação falha com valor não-Error', async () => {
    vi.spyOn(ordersService, 'createOrder').mockRejectedValueOnce('falha');

    await expect(
      useOrdersStore.getState().createOrder({
        instrument: 'ABEV3',
        price: 18.4,
        quantity: 100,
        side: 'BUY',
      }),
    ).rejects.toBe('falha');

    expect(useOrdersStore.getState().error).toBe(
      'Ocorreu um erro inesperado.',
    );
  });

  it('salva erro quando o cancelamento falha', async () => {
    vi.spyOn(ordersService, 'cancelOrder').mockRejectedValueOnce(
      new Error('Falha no cancelamento'),
    );

    await expect(
      useOrdersStore.getState().cancelOrder('ORD-1008'),
    ).rejects.toThrow('Falha no cancelamento');

    expect(useOrdersStore.getState().error).toBe('Falha no cancelamento');
  });
});
