import type { OrderSide, OrderStatus } from '@/types/order';

export interface StatusBadgeProps {
  kind: 'side' | 'status';
  value: OrderSide | OrderStatus;
}
