import { StyledButton } from './styles';
import type { ButtonProps } from './types';

export function Button({
  children,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <StyledButton
      {...buttonProps}
      $fullWidth={fullWidth}
      $size={size}
      $variant={variant}
    >
      {children}
    </StyledButton>
  );
}
