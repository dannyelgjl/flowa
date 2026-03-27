export const ROUTE_PATHS = {
  orderDetails: (orderId = ":orderId") => `/orders/${orderId}`,
  orders: "/orders",
  root: "/",
  createOrder: "/orders/new",
} as const;
