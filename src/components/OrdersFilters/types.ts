import type { OrderFilters } from '@/types/order';

export interface OrdersFiltersProps {
  filters: OrderFilters;
  onChange: <Field extends keyof OrderFilters>(
    field: Field,
    value: OrderFilters[Field],
  ) => void;
  onReset: () => void;
}
