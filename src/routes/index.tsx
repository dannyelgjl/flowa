import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { CreateOrderScreen } from "@/screens/CreateOrder";
import { OrderDetailsScreen } from "@/screens/OrderDetails";
import { OrdersScreen } from "@/screens/Orders";
import { ROUTE_PATHS } from "./paths";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route
            element={<Navigate replace to={ROUTE_PATHS.orders} />}
            path={ROUTE_PATHS.root}
          />
          <Route element={<OrdersScreen />} path={ROUTE_PATHS.orders} />
          <Route
            element={<CreateOrderScreen />}
            path={ROUTE_PATHS.createOrder}
          />
          <Route
            element={<OrderDetailsScreen />}
            path={ROUTE_PATHS.orderDetails()}
          />
        </Route>
        <Route
          element={<Navigate replace to={ROUTE_PATHS.orders} />}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
}
