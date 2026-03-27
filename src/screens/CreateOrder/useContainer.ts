import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import { useOrdersStore } from '@/store/orders/orders.store';
import {
  DEFAULT_CREATE_ORDER_VALUES,
  type CreateOrderFormErrors,
  type CreateOrderFormValues,
  toCreateOrderPayload,
  validateCreateOrderForm,
} from '@/utils/orderValidation';
import type { ICreateOrderProps } from './types';

export const useContainer = (_props: ICreateOrderProps) => {
  void _props;
  const navigate = useNavigate();
  const clearError = useOrdersStore((state) => state.clearError);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const error = useOrdersStore((state) => state.error);
  const isSubmitting = useOrdersStore((state) => state.isSubmitting);

  const [formValues, setFormValues] = useState<CreateOrderFormValues>(
    DEFAULT_CREATE_ORDER_VALUES,
  );
  const [formErrors, setFormErrors] = useState<CreateOrderFormErrors>({});

  function handleChange<Field extends keyof CreateOrderFormValues>(
    field: Field,
    value: CreateOrderFormValues[Field],
  ) {
    clearError();
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: field === 'instrument' ? String(value).toUpperCase() : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateCreateOrderForm(formValues);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const createdOrder = await createOrder(toCreateOrderPayload(formValues));
      navigate(ROUTE_PATHS.orderDetails(createdOrder.id));
    } catch {
      return;
    }
  }

  function handleBackToBook() {
    navigate(ROUTE_PATHS.orders);
  }

  return {
    error,
    formErrors,
    formValues,
    handleBackToBook,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};
