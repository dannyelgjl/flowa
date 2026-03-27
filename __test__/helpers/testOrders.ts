import { initialOrders } from '@/services/orders/orders.fixtures';
import type { Order } from '@/types/order';

export function cloneOrders(orders: Order[] = initialOrders) {
  return JSON.parse(JSON.stringify(orders)) as Order[];
}
