import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import { useOrdersStore } from '@/store/orders/orders.store';
import {
  DEFAULT_ORDER_FILTERS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_STATE,
  type OrderFilters,
  type SortState,
} from '@/types/order';
import { filterOrders, paginateOrders, sortOrders } from '@/utils/orderFilters';
import type { IOrdersProps } from './types';

export const useContainer = (_props: IOrdersProps) => {
  void _props;
  const navigate = useNavigate();
  const clearError = useOrdersStore((state) => state.clearError);
  const error = useOrdersStore((state) => state.error);
  const hasHydrated = useOrdersStore((state) => state.hasHydrated);
  const isLoading = useOrdersStore((state) => state.isLoading);
  const loadOrders = useOrdersStore((state) => state.loadOrders);
  const orders = useOrdersStore((state) => state.orders);

  const [filters, setFilters] = useState(DEFAULT_ORDER_FILTERS);
  const [page, setPage] = useState(1);
  const [sortState, setSortState] = useState(DEFAULT_SORT_STATE);

  useEffect(() => {
    if (!hasHydrated) {
      void loadOrders();
    }
  }, [hasHydrated, loadOrders]);

  const filteredOrders = filterOrders(orders, filters);
  const sortedOrders = sortOrders(filteredOrders, sortState);
  const paginatedOrders = paginateOrders(sortedOrders, page, DEFAULT_PAGE_SIZE);

  const openOrders = orders.filter((order) => order.status === 'OPEN').length;
  const partialOrders = orders.filter((order) => order.status === 'PARTIAL').length;
  const executedOrders = orders.filter(
    (order) => order.status === 'EXECUTED',
  ).length;
  const pendingVolume = orders
    .filter((order) => order.status === 'OPEN' || order.status === 'PARTIAL')
    .reduce((total, order) => total + order.remainingQuantity, 0);

  function handleCreateOrder() {
    navigate(ROUTE_PATHS.createOrder);
  }

  function handleFilterChange<Field extends keyof OrderFilters>(
    field: Field,
    value: OrderFilters[Field],
  ) {
    clearError();
    setPage(1);
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  }

  function handleOpenDetails(orderId: string) {
    navigate(ROUTE_PATHS.orderDetails(orderId));
  }

  function handlePageChange(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), paginatedOrders.totalPages));
  }

  function handleResetFilters() {
    setFilters(DEFAULT_ORDER_FILTERS);
    setPage(1);
  }

  function handleSort(field: SortState['field']) {
    setSortState((currentSortState) => {
      if (currentSortState.field === field) {
        return {
          direction: currentSortState.direction === 'asc' ? 'desc' : 'asc',
          field,
        };
      }

      return {
        direction: field === 'createdAt' ? 'desc' : 'asc',
        field,
      };
    });
  }

  return {
    error,
    filters,
    handleCreateOrder,
    handleFilterChange,
    handleOpenDetails,
    handlePageChange,
    handleResetFilters,
    handleSort,
    isLoading,
    metrics: {
      executedOrders,
      openOrders,
      partialOrders,
      pendingVolume,
    },
    paginatedOrders,
    sortState,
  };
};
