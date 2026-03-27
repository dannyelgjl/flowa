import { describe, expect, it } from 'vitest';
import { cloneOrders } from '@test/helpers/testOrders';
import { DEFAULT_ORDER_FILTERS } from '@/types/order';
import { filterOrders, paginateOrders, sortOrders } from '@/utils/orderFilters';

describe('orderFilters', () => {
  it('filtra ordens por instrumento, lado e status', () => {
    const result = filterOrders(cloneOrders(), {
      ...DEFAULT_ORDER_FILTERS,
      instrument: 'VALE3',
      side: 'SELL',
      status: 'OPEN',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('ORD-1003');
  });

  it('filtra ordens por id e data', () => {
    const result = filterOrders(cloneOrders(), {
      ...DEFAULT_ORDER_FILTERS,
      date: '2026-03-27',
      id: '1008',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('ORD-1008');
  });

  it('ordena as ordens pelo campo informado', () => {
    const result = sortOrders(cloneOrders().slice(0, 4), {
      direction: 'asc',
      field: 'price',
    });

    expect(result[0]?.price).toBeLessThanOrEqual(result[1]?.price ?? 0);
    expect(result[1]?.price).toBeLessThanOrEqual(result[2]?.price ?? 0);
  });

  it('ordena por id, instrumento, lado, quantidade, restante, status e createdAt', () => {
    const orders = cloneOrders();

    expect(
      sortOrders(orders, { direction: 'asc', field: 'id' })[0]?.id,
    ).toBe('ORD-1001');
    expect(
      sortOrders(orders, { direction: 'asc', field: 'instrument' })[0]?.instrument,
    ).toBe('AAPL34');
    expect(
      sortOrders(orders, { direction: 'asc', field: 'side' })[0]?.side,
    ).toBe('BUY');
    expect(
      sortOrders(orders, { direction: 'asc', field: 'quantity' })[0]?.quantity,
    ).toBeLessThanOrEqual(
      sortOrders(orders, { direction: 'asc', field: 'quantity' })[1]?.quantity ?? 0,
    );
    expect(
      sortOrders(orders, { direction: 'asc', field: 'remainingQuantity' })[0]?.remainingQuantity,
    ).toBe(0);
    expect(
      sortOrders(orders, { direction: 'asc', field: 'status' })[0]?.status,
    ).toBe('OPEN');
    expect(
      sortOrders(orders, { direction: 'desc', field: 'createdAt' })[0]?.id,
    ).toBe('ORD-1010');
  });

  it('usa o desempate por data quando o campo comparado é igual', () => {
    const orders = [
      cloneOrders()[2]!,
      {
        ...cloneOrders()[2]!,
        createdAt: '2026-03-26T10:00:00-03:00',
        id: 'ORD-2000',
      },
    ];

    const result = sortOrders(orders, {
      direction: 'asc',
      field: 'price',
    });

    expect(result[0]?.id).toBe('ORD-2000');
  });

  it('usa o fallback por data quando recebe um campo de ordenação inesperado', () => {
    const [firstOrder, secondOrder] = cloneOrders();
    const orders = [
      {
        ...firstOrder!,
        createdAt: '2026-03-27T12:00:00-03:00',
        id: 'ORD-3001',
      },
      {
        ...secondOrder!,
        createdAt: '2026-03-27T10:00:00-03:00',
        id: 'ORD-3002',
      },
    ];

    const result = sortOrders(orders, {
      direction: 'asc',
      field: 'unexpected' as never,
    });

    expect(result[0]?.id).toBe('ORD-3002');
  });

  it('trata ids sem sequência numérica ao ordenar por id', () => {
    const [firstOrder, secondOrder] = cloneOrders();
    const orders = [
      {
        ...firstOrder!,
        createdAt: '2026-03-27T09:00:00-03:00',
        id: 'SEM-SEQUENCIA',
      },
      {
        ...secondOrder!,
        createdAt: '2026-03-27T10:00:00-03:00',
        id: 'ORD-5000',
      },
    ];

    const result = sortOrders(orders, {
      direction: 'asc',
      field: 'id',
    });

    expect(result[0]?.id).toBe('SEM-SEQUENCIA');
  });

  it('pagina os resultados com metadados corretos', () => {
    const result = paginateOrders(cloneOrders(), 2, 4);

    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(3);
    expect(result.items).toHaveLength(4);
  });

  it('ajusta a página para limites válidos', () => {
    const orders = cloneOrders();
    const lowerBound = paginateOrders(orders, 0, 4);
    const upperBound = paginateOrders(orders, 99, 4);

    expect(lowerBound.page).toBe(1);
    expect(upperBound.page).toBe(3);
  });
});
