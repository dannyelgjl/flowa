import { describe, expect, it } from 'vitest';
import type { Order } from '@/types/order';
import {
  applyIncomingOrder,
  cancelOrderById,
  createOrderEntity,
} from '@/utils/orderEngine';

function buildOrder(overrides: Partial<Order>): Order {
  return {
    createdAt: '2026-03-27T09:00:00.000Z',
    executions: [],
    history: [
      {
        description: 'Ordem criada com status inicial aberta.',
        id: `${overrides.id ?? 'ORD-BASE'}-history-1`,
        status: 'OPEN',
        timestamp: '2026-03-27T09:00:00.000Z',
      },
    ],
    id: 'ORD-BASE',
    instrument: 'PETR4',
    price: 30,
    quantity: 100,
    remainingQuantity: 100,
    side: 'SELL',
    status: 'OPEN',
    updatedAt: '2026-03-27T09:00:00.000Z',
    ...overrides,
  };
}

describe('orderEngine', () => {
  it('executa integralmente quando existe contraparte compatível com mesma quantidade', () => {
    const existingOrders = [
      buildOrder({
        id: 'ORD-1001',
        price: 29.9,
        quantity: 100,
        remainingQuantity: 100,
        side: 'SELL',
      }),
    ];

    const incomingOrder = createOrderEntity(
      {
        instrument: 'PETR4',
        price: 30.2,
        quantity: 100,
        side: 'BUY',
      },
      'ORD-2001',
      '2026-03-27T09:10:00.000Z',
    );

    const nextBook = applyIncomingOrder(existingOrders, incomingOrder);

    expect(nextBook.find((order) => order.id === 'ORD-1001')?.status).toBe(
      'EXECUTED',
    );
    expect(nextBook.find((order) => order.id === 'ORD-2001')?.status).toBe(
      'EXECUTED',
    );
  });

  it('mantém a ordem como parcial quando a contraparte tem quantidade menor', () => {
    const existingOrders = [
      buildOrder({
        id: 'ORD-1002',
        instrument: 'VALE3',
        price: 56.25,
        quantity: 120,
        remainingQuantity: 120,
        side: 'SELL',
      }),
    ];

    const incomingOrder = createOrderEntity(
      {
        instrument: 'VALE3',
        price: 56.25,
        quantity: 200,
        side: 'BUY',
      },
      'ORD-2002',
      '2026-03-27T09:20:00.000Z',
    );

    const nextBook = applyIncomingOrder(existingOrders, incomingOrder);

    expect(nextBook.find((order) => order.id === 'ORD-2002')?.status).toBe(
      'PARTIAL',
    );
    expect(
      nextBook.find((order) => order.id === 'ORD-2002')?.remainingQuantity,
    ).toBe(80);
  });

  it('permite cancelar apenas ordens abertas ou parciais', () => {
    const existingOrders = [
      buildOrder({
        id: 'ORD-1003',
        remainingQuantity: 40,
        status: 'PARTIAL',
      }),
      buildOrder({
        id: 'ORD-1004',
        remainingQuantity: 0,
        status: 'EXECUTED',
      }),
    ];

    const nextBook = cancelOrderById(
      existingOrders,
      'ORD-1003',
      '2026-03-27T10:00:00.000Z',
    );

    expect(nextBook.find((order) => order.id === 'ORD-1003')?.status).toBe(
      'CANCELLED',
    );

    expect(() =>
      cancelOrderById(
        existingOrders,
        'ORD-1004',
        '2026-03-27T10:00:00.000Z',
      ),
    ).toThrow('Apenas ordens abertas ou parciais podem ser canceladas.');
  });

  it('prioriza a contraparte mais antiga quando o preço é igual e ignora quantidade zerada', () => {
    const existingOrders = [
      buildOrder({
        createdAt: '2026-03-27T09:00:00.000Z',
        id: 'ORD-1101',
        price: 30,
        quantity: 0,
        remainingQuantity: 0,
        side: 'SELL',
        status: 'OPEN',
      }),
      buildOrder({
        createdAt: '2026-03-27T09:01:00.000Z',
        id: 'ORD-1102',
        price: 30,
        quantity: 50,
        remainingQuantity: 50,
        side: 'SELL',
        status: 'OPEN',
      }),
      buildOrder({
        createdAt: '2026-03-27T09:02:00.000Z',
        id: 'ORD-1103',
        price: 30,
        quantity: 50,
        remainingQuantity: 50,
        side: 'SELL',
        status: 'OPEN',
      }),
    ];

    const incomingOrder = createOrderEntity(
      {
        instrument: 'PETR4',
        price: 30,
        quantity: 50,
        side: 'BUY',
      },
      'ORD-2101',
      '2026-03-27T09:10:00.000Z',
    );

    const nextBook = applyIncomingOrder(existingOrders, incomingOrder);
    const createdOrder = nextBook.find((order) => order.id === 'ORD-2101')!;

    expect(createdOrder.executions[0]?.matchedOrderId).toBe('ORD-1102');
    expect(nextBook.find((order) => order.id === 'ORD-1101')?.status).toBe('OPEN');
  });

  it('prioriza o menor preço de venda para ordens de compra', () => {
    const existingOrders = [
      buildOrder({
        createdAt: '2026-03-27T09:00:00.000Z',
        id: 'ORD-1201',
        price: 30.2,
        quantity: 80,
        remainingQuantity: 80,
        side: 'SELL',
      }),
      buildOrder({
        createdAt: '2026-03-27T09:05:00.000Z',
        id: 'ORD-1202',
        price: 29.8,
        quantity: 80,
        remainingQuantity: 80,
        side: 'SELL',
      }),
    ];

    const incomingOrder = createOrderEntity(
      {
        instrument: 'PETR4',
        price: 30.5,
        quantity: 80,
        side: 'BUY',
      },
      'ORD-2201',
      '2026-03-27T09:10:00.000Z',
    );

    const nextBook = applyIncomingOrder(existingOrders, incomingOrder);

    expect(nextBook.find((order) => order.id === 'ORD-2201')?.executions[0]?.matchedOrderId).toBe(
      'ORD-1202',
    );
  });

  it('prioriza o maior preço comprador e ignora contraparte incompatível para ordens de venda', () => {
    const existingOrders = [
      buildOrder({
        createdAt: '2026-03-27T09:00:00.000Z',
        id: 'ORD-1301',
        price: 55,
        quantity: 40,
        remainingQuantity: 40,
        side: 'BUY',
      }),
      buildOrder({
        createdAt: '2026-03-27T09:05:00.000Z',
        id: 'ORD-1302',
        price: 56,
        quantity: 40,
        remainingQuantity: 40,
        side: 'BUY',
      }),
      buildOrder({
        createdAt: '2026-03-27T09:10:00.000Z',
        id: 'ORD-1303',
        price: 54,
        quantity: 40,
        remainingQuantity: 40,
        side: 'BUY',
      }),
    ];

    const incomingOrder = createOrderEntity(
      {
        instrument: 'PETR4',
        price: 54.5,
        quantity: 40,
        side: 'SELL',
      },
      'ORD-2301',
      '2026-03-27T09:15:00.000Z',
    );

    const nextBook = applyIncomingOrder(existingOrders, incomingOrder);
    const createdOrder = nextBook.find((order) => order.id === 'ORD-2301')!;

    expect(createdOrder.executions[0]?.matchedOrderId).toBe('ORD-1302');
    expect(nextBook.find((order) => order.id === 'ORD-1303')?.status).toBe('OPEN');
  });

  it('lança erro quando tenta cancelar uma ordem inexistente', () => {
    expect(() =>
      cancelOrderById([], 'ORD-404', '2026-03-27T10:00:00.000Z'),
    ).toThrow('Ordem não encontrada.');
  });
});
