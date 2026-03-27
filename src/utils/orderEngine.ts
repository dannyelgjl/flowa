import type { CreateOrderPayload, Order, OrderHistoryEntry, OrderStatus } from '@/types/order';

const ACTIVE_STATUSES: OrderStatus[] = ['OPEN', 'PARTIAL'];

function cloneOrders(orders: Order[]) {
  return orders.map((order) => ({
    ...order,
    executions: [...order.executions],
    history: [...order.history],
  }));
}

function buildHistoryEntry(
  orderId: string,
  index: number,
  status: OrderStatus,
  timestamp: string,
  description: string,
): OrderHistoryEntry {
  return {
    description,
    id: `${orderId}-history-${index}`,
    status,
    timestamp,
  };
}

function pushHistoryEntry(
  order: Order,
  status: OrderStatus,
  timestamp: string,
  description: string,
) {
  order.history.push(
    buildHistoryEntry(order.id, order.history.length + 1, status, timestamp, description),
  );
}

function isActive(order: Order) {
  return ACTIVE_STATUSES.includes(order.status);
}

function isCompatiblePrice(incomingOrder: Order, bookOrder: Order) {
  if (incomingOrder.side === 'BUY') {
    return bookOrder.price <= incomingOrder.price;
  }

  return bookOrder.price >= incomingOrder.price;
}

function sortCandidates(incomingOrder: Order, candidates: Order[]) {
  return [...candidates].sort((left, right) => {
    if (incomingOrder.side === 'BUY' && left.price !== right.price) {
      return left.price - right.price;
    }

    if (incomingOrder.side === 'SELL' && left.price !== right.price) {
      return right.price - left.price;
    }

    return new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
  });
}

function updateOrderAfterExecution(
  order: Order,
  matchedOrderId: string,
  executedQuantity: number,
  executionPrice: number,
  timestamp: string,
) {
  order.remainingQuantity -= executedQuantity;
  order.updatedAt = timestamp;

  const nextStatus: OrderStatus =
    order.remainingQuantity === 0 ? 'EXECUTED' : 'PARTIAL';

  order.status = nextStatus;
  order.executions.push({
    id: `${order.id}-execution-${order.executions.length + 1}`,
    matchedOrderId,
    price: executionPrice,
    quantity: executedQuantity,
    timestamp,
  });

  pushHistoryEntry(
    order,
    nextStatus,
    timestamp,
    `${executedQuantity} unidades executadas contra ${matchedOrderId}.`,
  );
}

export function createOrderEntity(
  payload: CreateOrderPayload,
  nextId: string,
  timestamp: string,
): Order {
  const instrument = payload.instrument.trim().toUpperCase();

  return {
    createdAt: timestamp,
    executions: [],
    history: [
      {
        description: 'Ordem criada com status inicial aberta.',
        id: `${nextId}-history-1`,
        status: 'OPEN',
        timestamp,
      },
    ],
    id: nextId,
    instrument,
    price: payload.price,
    quantity: payload.quantity,
    remainingQuantity: payload.quantity,
    side: payload.side,
    status: 'OPEN',
    updatedAt: timestamp,
  };
}

export function applyIncomingOrder(existingOrders: Order[], incomingOrder: Order) {
  const book = cloneOrders(existingOrders);
  const createdOrder: Order = {
    ...incomingOrder,
    executions: [...incomingOrder.executions],
    history: [...incomingOrder.history],
  };

  const candidates = sortCandidates(
    createdOrder,
    book.filter(
      (order) =>
        order.instrument === createdOrder.instrument &&
        order.side !== createdOrder.side &&
        isActive(order) &&
        isCompatiblePrice(createdOrder, order),
    ),
  );

  for (const candidate of candidates) {
    if (createdOrder.remainingQuantity === 0) {
      break;
    }

    const executionQuantity = Math.min(
      createdOrder.remainingQuantity,
      candidate.remainingQuantity,
    );

    if (executionQuantity <= 0) {
      continue;
    }

    const executionPrice = candidate.price;
    const executionTime = createdOrder.updatedAt;

    updateOrderAfterExecution(
      createdOrder,
      candidate.id,
      executionQuantity,
      executionPrice,
      executionTime,
    );
    updateOrderAfterExecution(
      candidate,
      createdOrder.id,
      executionQuantity,
      executionPrice,
      executionTime,
    );
  }

  book.push(createdOrder);
  return book;
}

export function cancelOrderById(
  existingOrders: Order[],
  orderId: string,
  timestamp: string,
) {
  const book = cloneOrders(existingOrders);
  const order = book.find((entry) => entry.id === orderId);

  if (!order) {
    throw new Error('Ordem não encontrada.');
  }

  if (!isActive(order)) {
    throw new Error('Apenas ordens abertas ou parciais podem ser canceladas.');
  }

  order.status = 'CANCELLED';
  order.updatedAt = timestamp;
  pushHistoryEntry(order, 'CANCELLED', timestamp, 'Ordem cancelada pelo usuário.');

  return book;
}

export function getNextOrderId(orders: Order[]) {
  const maxSequence = orders.reduce((highest, order) => {
    const currentSequence = Number(order.id.replace(/\D/g, ''));
    return Math.max(highest, currentSequence);
  }, 1000);

  return `ORD-${maxSequence + 1}`;
}
