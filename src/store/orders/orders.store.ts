import { create } from "zustand";
import { ordersService } from "@/services/orders/orders.service";
import type { CreateOrderPayload, Order } from "@/types/order";

interface OrdersStoreState {
  createOrder: (payload: CreateOrderPayload) => Promise<Order>;
  error: string | null;
  hasHydrated: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  loadOrders: () => Promise<void>;
  orders: Order[];
  cancelOrder: (orderId: string) => Promise<Order>;
  clearError: () => void;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  async cancelOrder(orderId) {
    set({ error: null, isSubmitting: true });

    try {
      const response = await ordersService.cancelOrder(orderId);

      set({
        isSubmitting: false,
        orders: response.orders,
      });

      return response.order;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, isSubmitting: false });
      throw error;
    }
  },

  clearError() {
    set({ error: null });
  },

  async createOrder(payload) {
    set({ error: null, isSubmitting: true });

    try {
      const response = await ordersService.createOrder(payload);

      set({
        isSubmitting: false,
        orders: response.orders,
      });

      return response.order;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, isSubmitting: false });
      throw error;
    }
  },

  error: null,
  hasHydrated: false,
  isLoading: false,
  isSubmitting: false,

  async loadOrders() {
    set({ error: null, isLoading: true });

    try {
      const orders = await ordersService.listOrders();

      set({
        hasHydrated: true,
        isLoading: false,
        orders,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        error: message,
        hasHydrated: true,
        isLoading: false,
      });
    }
  },

  orders: [],
}));
