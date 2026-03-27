import type { OrderSide, OrderStatus } from '@/types/order';
import { getSideLabel, getStatusLabel } from '@/utils/formatters';
import * as S from './styles';
import type { StatusBadgeProps } from './types';

export function StatusBadge({ kind, value }: StatusBadgeProps) {
  const label = kind === 'status'
    ? getStatusLabel(value as OrderStatus)
    : getSideLabel(value as OrderSide);

  return (
    <S.Badge $kind={kind} $value={value}>
      {label}
    </S.Badge>
  );
}
