import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 48px 24px;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.04);

  @media (max-width: 640px) {
    padding: 32px 18px;
  }
`;

export const Title = styled.h3`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.6;
`;
