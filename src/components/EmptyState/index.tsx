import * as S from './styles';
import type { EmptyStateProps } from './types';

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
}
