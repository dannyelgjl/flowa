import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './types';

const variantStyles = {
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.textInverse};
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.line};
  `,
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textPrimary};
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surfaceSoft};
    color: ${({ theme }) => theme.colors.textInverse};
    border-color: ${({ theme }) => theme.colors.line};
  `,
};

const sizeStyles = {
  md: css`
    min-height: 42px;
    padding: 0 18px;
  `,
  sm: css`
    min-height: 36px;
    padding: 0 14px;
  `,
};

export const StyledButton = styled.button<{
  $fullWidth: boolean;
  $size: ButtonSize;
  $variant: ButtonVariant;
}>`
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  text-align: center;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.soft};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;
