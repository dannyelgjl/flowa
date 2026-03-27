import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDateInputValue,
  formatQuantity,
  getSideLabel,
  getStatusLabel,
} from '@/utils/formatters';

describe('formatters', () => {
  it('formata moeda, quantidade e data de input', () => {
    expect(formatCurrency(29.8)).toContain('29,80');
    expect(formatQuantity(1811)).toBe('1.811');
    expect(formatDateInputValue('2026-03-27T10:11:00-03:00')).toBe(
      '2026-03-27',
    );
  });

  it('traduz labels de lado e status', () => {
    expect(getSideLabel('SELL')).toBe('Venda');
    expect(getStatusLabel('PARTIAL')).toBe('Parcial');
  });
});
