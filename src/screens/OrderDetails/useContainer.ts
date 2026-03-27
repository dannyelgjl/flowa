import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import { useOrdersStore } from '@/store/orders/orders.store';
import type { IOrderDetailsProps } from './types';

export const useContainer = (_props: IOrderDetailsProps) => {
  void _props;
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const cancelOrder = useOrdersStore((state) => state.cancelOrder);
  const error = useOrdersStore((state) => state.error);
  const hasHydrated = useOrdersStore((state) => state.hasHydrated);
  const isLoading = useOrdersStore((state) => state.isLoading);
  const isSubmitting = useOrdersStore((state) => state.isSubmitting);
  const loadOrders = useOrdersStore((state) => state.loadOrders);
  const orders = useOrdersStore((state) => state.orders);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!hasHydrated) {
      void loadOrders();
    }
  }, [hasHydrated, loadOrders]);

  const order = orders.find((entry) => entry.id === orderId);
  const canCancel =
    order?.status === 'OPEN' || order?.status === 'PARTIAL';

  function handleBack() {
    navigate(ROUTE_PATHS.orders);
  }

  function handleCreateAnother() {
    navigate(ROUTE_PATHS.createOrder);
  }

  async function handleConfirmCancel() {
    if (!order) {
      return;
    }

    try {
      await cancelOrder(order.id);
      setIsDialogOpen(false);
    } catch {
      return;
    }
  }

  return {
    canCancel,
    error,
    handleBack,
    handleConfirmCancel,
    handleCreateAnother,
    isDialogOpen,
    isLoading,
    isSubmitting,
    openDialog: () => setIsDialogOpen(true),
    order,
    orderId,
    closeDialog: () => setIsDialogOpen(false),
  };
};
