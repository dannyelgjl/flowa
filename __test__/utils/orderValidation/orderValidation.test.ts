import { describe, expect, it } from 'vitest';
import {
  toCreateOrderPayload,
  validateCreateOrderForm,
} from '@/utils/orderValidation';

describe('orderValidation', () => {
  it('retorna erros quando o formulário é inválido', () => {
    const result = validateCreateOrderForm({
      instrument: 'p',
      price: '0',
      quantity: '1.5',
      side: 'BUY',
    });

    expect(result).toEqual({
      instrument: 'Use de 4 a 10 caracteres alfanuméricos.',
      price: 'O preço deve ser maior que zero.',
      quantity: 'A quantidade deve ser um inteiro positivo.',
    });
  });

  it('transforma o formulário válido em payload normalizado', () => {
    const payload = toCreateOrderPayload({
      instrument: ' petr4 ',
      price: '29.8',
      quantity: '100',
      side: 'SELL',
    });

    expect(payload).toEqual({
      instrument: 'PETR4',
      price: 29.8,
      quantity: 100,
      side: 'SELL',
    });
  });
});
