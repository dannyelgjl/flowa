import styled from 'styled-components';
import type { InfoCardTone } from './types';

const toneMap = {
  accent: 'rgba(231, 198, 109, 0.16)',
  default: 'rgba(245, 239, 229, 0.08)',
  success: 'rgba(0, 135, 95, 0.16)',
  warning: 'rgba(191, 123, 18, 0.16)',
};

export const Card = styled.article<{ $tone: InfoCardTone }>`
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $tone }) => toneMap[$tone]};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  font-size: 0.9rem;
`;

export const Value = styled.strong`
  display: block;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.9rem;
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

export const Support = styled.small`
  display: block;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.5;
`;
