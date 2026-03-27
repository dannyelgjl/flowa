import type { CreateOrderPayload, OrderSide } from "@/types/order";

export interface CreateOrderFormValues {
  instrument: string;
  price: string;
  quantity: string;
  side: OrderSide;
}

export interface CreateOrderFormErrors {
  instrument?: string;
  price?: string;
  quantity?: string;
}

export const DEFAULT_CREATE_ORDER_VALUES: CreateOrderFormValues = {
  instrument: "",
  price: "",
  quantity: "",
  side: "BUY",
};

export function validateCreateOrderForm(
  values: CreateOrderFormValues
): CreateOrderFormErrors {
  const errors: CreateOrderFormErrors = {};
  const normalizedInstrument = values.instrument.trim().toUpperCase();
  const price = Number(values.price);
  const quantity = Number(values.quantity);

  if (!normalizedInstrument) {
    errors.instrument = "Informe o instrumento.";
  } else if (!/^[A-Z0-9]{4,10}$/.test(normalizedInstrument)) {
    errors.instrument = "Use de 4 a 10 caracteres alfanuméricos.";
  }

  if (!values.price) {
    errors.price = "Informe o preço.";
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.price = "O preço deve ser maior que zero.";
  }

  if (!values.quantity) {
    errors.quantity = "Informe a quantidade.";
  } else if (!Number.isInteger(quantity) || quantity <= 0) {
    errors.quantity = "A quantidade deve ser um inteiro positivo.";
  }

  return errors;
}

export function toCreateOrderPayload(
  values: CreateOrderFormValues
): CreateOrderPayload {
  return {
    instrument: values.instrument.trim().toUpperCase(),
    price: Number(values.price),
    quantity: Number(values.quantity),
    side: values.side,
  };
}
