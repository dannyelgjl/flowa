import styled, { css } from 'styled-components';
import type { OrderSide, OrderStatus } from '@/types/order';
import type { StatusBadgeProps } from './types';

const statusToneMap = {
  CANCELLED: css`
    background: rgba(193, 63, 50, 0.18);
    color: ${({ theme }) => theme.colors.danger};
  `,
  EXECUTED: css`
    background: rgba(0, 135, 95, 0.18);
    color: ${({ theme }) => theme.colors.success};
  `,
  OPEN: css`
    background: rgba(231, 198, 109, 0.18);
    color: ${({ theme }) => theme.colors.accentStrong};
  `,
  PARTIAL: css`
    background: rgba(191, 123, 18, 0.18);
    color: ${({ theme }) => theme.colors.warning};
  `,
};

const sideToneMap = {
  BUY: css`
    background: rgba(13, 143, 122, 0.18);
    color: ${({ theme }) => theme.colors.buy};
  `,
  SELL: css`
    background: rgba(204, 95, 53, 0.18);
    color: ${({ theme }) => theme.colors.sell};
  `,
};

export const Badge = styled.span<{
  $kind: StatusBadgeProps['kind'];
  $value: StatusBadgeProps['value'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.01em;

  ${({ $kind, $value }) =>
    $kind === 'status'
      ? statusToneMap[$value as OrderStatus]
      : sideToneMap[$value as OrderSide]};

  @media (max-width: 640px) {
    min-width: 88px;
    padding-inline: 10px;
  }
`;
