export const ORDER_SIDE_OPTIONS = ['BUY', 'SELL'] as const;
export const ORDER_STATUS_OPTIONS = [
  'OPEN',
  'PARTIAL',
  'EXECUTED',
  'CANCELLED',
] as const;

export type OrderSide = (typeof ORDER_SIDE_OPTIONS)[number];
export type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];
export type OrderStatusFilter = OrderStatus | 'ALL';
export type OrderSideFilter = OrderSide | 'ALL';

export interface OrderExecution {
  id: string;
  matchedOrderId: string;
  price: number;
  quantity: number;
  timestamp: string;
}

export interface OrderHistoryEntry {
  id: string;
  description: string;
  status: OrderStatus;
  timestamp: string;
}

export interface Order {
  id: string;
  createdAt: string;
  executions: OrderExecution[];
  history: OrderHistoryEntry[];
  instrument: string;
  price: number;
  quantity: number;
  remainingQuantity: number;
  side: OrderSide;
  status: OrderStatus;
  updatedAt: string;
}

export interface CreateOrderPayload {
  instrument: string;
  price: number;
  quantity: number;
  side: OrderSide;
}

export interface OrderFilters {
  date: string;
  id: string;
  instrument: string;
  side: OrderSideFilter;
  status: OrderStatusFilter;
}

export interface SortState {
  direction: 'asc' | 'desc';
  field: keyof Pick<
    Order,
    | 'createdAt'
    | 'id'
    | 'instrument'
    | 'price'
    | 'quantity'
    | 'remainingQuantity'
    | 'side'
    | 'status'
  >;
}

export interface PaginatedOrdersResult {
  items: Order[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const DEFAULT_ORDER_FILTERS: OrderFilters = {
  date: '',
  id: '',
  instrument: '',
  side: 'ALL',
  status: 'ALL',
};

export const DEFAULT_SORT_STATE: SortState = {
  direction: 'desc',
  field: 'createdAt',
};

export const DEFAULT_PAGE_SIZE = 6;
