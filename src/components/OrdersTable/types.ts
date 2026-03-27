import type { Order, SortState } from '@/types/order';

export interface OrdersTableProps {
  onOpenDetails: (orderId: string) => void;
  onSort: (field: SortState['field']) => void;
  orders: Order[];
  sortState: SortState;
}
