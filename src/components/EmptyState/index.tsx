import { Description, Title, Wrapper } from './styles';
import type { EmptyStateProps } from './types';

export function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}
