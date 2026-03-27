import * as S from './styles';
import type { PanelProps } from './types';

export function Panel({
  children,
  className,
  padding = '24px',
}: PanelProps) {
  return (
    <S.StyledPanel className={className} $padding={padding}>
      {children}
    </S.StyledPanel>
  );
}
