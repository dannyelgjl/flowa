import {
  DEFAULT_PAGE_SIZE,
  type Order,
  type OrderFilters,
  type PaginatedOrdersResult,
  type SortState,
} from '@/types/order';
import { formatDateInputValue } from './formatters';

const sideOrderMap = {
  BUY: 0,
  SELL: 1,
};

const statusOrderMap = {
  OPEN: 0,
  PARTIAL: 1,
  EXECUTED: 2,
  CANCELLED: 3,
};

function compareText(left: string, right: string) {
  return left.localeCompare(right, 'pt-BR', { sensitivity: 'base' });
}

function extractOrderSequence(id: string) {
  const match = id.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function filterOrders(orders: Order[], filters: OrderFilters) {
  return orders.filter((order) => {
    const matchesId = filters.id
      ? order.id.toLowerCase().includes(filters.id.trim().toLowerCase())
      : true;
    const matchesInstrument = filters.instrument
      ? order.instrument
          .toLowerCase()
          .includes(filters.instrument.trim().toLowerCase())
      : true;
    const matchesStatus =
      filters.status === 'ALL' ? true : order.status === filters.status;
    const matchesSide =
      filters.side === 'ALL' ? true : order.side === filters.side;
    const matchesDate = filters.date
      ? formatDateInputValue(order.createdAt) === filters.date
      : true;

    return (
      matchesId &&
      matchesInstrument &&
      matchesStatus &&
      matchesSide &&
      matchesDate
    );
  });
}

export function sortOrders(orders: Order[], sortState: SortState) {
  const multiplier = sortState.direction === 'asc' ? 1 : -1;

  return [...orders].sort((left, right) => {
    let result = 0;

    switch (sortState.field) {
      case 'id':
        result = extractOrderSequence(left.id) - extractOrderSequence(right.id);
        break;
      case 'instrument':
        result = compareText(left.instrument, right.instrument);
        break;
      case 'side':
        result = sideOrderMap[left.side] - sideOrderMap[right.side];
        break;
      case 'price':
        result = left.price - right.price;
        break;
      case 'quantity':
        result = left.quantity - right.quantity;
        break;
      case 'remainingQuantity':
        result = left.remainingQuantity - right.remainingQuantity;
        break;
      case 'status':
        result = statusOrderMap[left.status] - statusOrderMap[right.status];
        break;
      case 'createdAt':
        result =
          new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
        break;
      default:
        result = 0;
    }

    if (result === 0) {
      return (
        new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
      ) * multiplier;
    }

    return result * multiplier;
  });
}

export function paginateOrders(
  orders: Order[],
  page: number,
  pageSize = DEFAULT_PAGE_SIZE,
): PaginatedOrdersResult {
  const totalItems = orders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;

  return {
    items: orders.slice(startIndex, startIndex + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}
