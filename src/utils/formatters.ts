import type { OrderSide, OrderStatus } from '@/types/order';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
});

const quantityFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 0,
});

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const sideLabels: Record<OrderSide, string> = {
  BUY: 'Compra',
  SELL: 'Venda',
};

const statusLabels: Record<OrderStatus, string> = {
  CANCELLED: 'Cancelada',
  EXECUTED: 'Executada',
  OPEN: 'Aberta',
  PARTIAL: 'Parcial',
};

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatQuantity(value: number) {
  return quantityFormatter.format(value);
}

export function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

export function formatDateInputValue(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getSideLabel(side: OrderSide) {
  return sideLabels[side];
}

export function getStatusLabel(status: OrderStatus) {
  return statusLabels[status];
}
