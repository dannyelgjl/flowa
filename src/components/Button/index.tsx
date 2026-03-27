import * as S from './styles';
import type { ButtonProps } from './types';

export function Button({
  children,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <S.StyledButton
      {...buttonProps}
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
    >
      {children}
    </S.StyledButton>
  );
}
