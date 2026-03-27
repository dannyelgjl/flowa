import { StyledPanel } from './styles';
import type { PanelProps } from './types';

export function Panel({
  children,
  className,
  padding = '24px',
}: PanelProps) {
  return (
    <StyledPanel className={className} $padding={padding}>
      {children}
    </StyledPanel>
  );
}
