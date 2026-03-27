import { initialOrders } from './orders.fixtures';
import { applyIncomingOrder, cancelOrderById, createOrderEntity, getNextOrderId } from '@/utils/orderEngine';
import type { CreateOrderPayload, Order } from '@/types/order';

const STORAGE_KEY = 'base-exchange-orders';
const NETWORK_DELAY_IN_MS = 180;

function wait(ms = NETWORK_DELAY_IN_MS) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function persistOrders(orders: Order[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function readOrders(): Order[] {
  const storedOrders = window.localStorage.getItem(STORAGE_KEY);

  if (!storedOrders) {
    const seededOrders = deepClone(initialOrders);
    persistOrders(seededOrders);
    return seededOrders;
  }

  return JSON.parse(storedOrders) as Order[];
}

export const ordersService = {
  async cancelOrder(orderId: string) {
    await wait();

    const currentOrders = readOrders();
    const nextOrders = cancelOrderById(
      currentOrders,
      orderId,
      new Date().toISOString(),
    );

    persistOrders(nextOrders);

    return {
      order: nextOrders.find((order) => order.id === orderId)!,
      orders: nextOrders,
    };
  },

  async createOrder(payload: CreateOrderPayload) {
    await wait();

    const currentOrders = readOrders();
    const nextId = getNextOrderId(currentOrders);
    const timestamp = new Date().toISOString();
    const nextOrder = createOrderEntity(payload, nextId, timestamp);
    const nextOrders = applyIncomingOrder(currentOrders, nextOrder);

    persistOrders(nextOrders);

    return {
      order: nextOrders.find((order) => order.id === nextId)!,
      orders: nextOrders,
    };
  },

  async getOrderById(orderId: string) {
    await wait();
    return readOrders().find((order) => order.id === orderId) ?? null;
  },

  async listOrders() {
    await wait();
    return readOrders();
  },

  reset() {
    window.localStorage.removeItem(STORAGE_KEY);
  },

  seed(orders: Order[]) {
    persistOrders(deepClone(orders));
  },
};
