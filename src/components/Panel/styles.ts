import styled from 'styled-components';

export const StyledPanel = styled.section<{ $padding: string }>`
  padding: ${({ $padding }) => $padding};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadow.panel};
  backdrop-filter: blur(18px);

  @media (max-width: 900px) {
    padding: 20px;
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;
