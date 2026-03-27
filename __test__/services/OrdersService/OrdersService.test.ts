import { beforeEach, describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { ordersService } from '@/services/orders/orders.service';

describe('ordersService', () => {
  beforeEach(() => {
    ordersService.reset();
    ordersService.seed(cloneOrders());
  });

  it('persiste a criação de ordem com matching automático', async () => {
    const response = await ordersService.createOrder({
      instrument: 'VALE3',
      price: 56.25,
      quantity: 200,
      side: 'BUY',
    });

    expect(response.order.status).toBe('EXECUTED');

    const restingOrder = response.orders.find((order) => order.id === 'ORD-1003');
    expect(restingOrder?.status).toBe('PARTIAL');
    expect(restingOrder?.remainingQuantity).toBe(300);
  });

  it('cancela uma ordem elegível e reflete o histórico', async () => {
    const response = await ordersService.cancelOrder('ORD-1008');

    expect(response.order.status).toBe('CANCELLED');
    expect(response.order.history.at(-1)?.status).toBe('CANCELLED');
  });

  it('semeia ordens iniciais quando não há dados persistidos e busca por id', async () => {
    ordersService.reset();

    const listedOrders = await ordersService.listOrders();
    const foundOrder = await ordersService.getOrderById('ORD-1001');
    const missingOrder = await ordersService.getOrderById('ORD-9999');

    expect(listedOrders.length).toBeGreaterThan(0);
    expect(foundOrder?.id).toBe('ORD-1001');
    expect(missingOrder).toBeNull();
  });
});
