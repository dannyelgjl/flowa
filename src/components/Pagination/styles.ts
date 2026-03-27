import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 640px) {
    align-items: stretch;
  }
`;

export const Summary = styled.span`
  color: ${({ theme }) => theme.colors.textMutedInverse};
  font-size: 0.95rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    width: 100%;

    & > button {
      flex: 1;
    }
  }
`;

export const CurrentPage = styled.strong`
  min-width: 88px;
  text-align: center;

  @media (max-width: 640px) {
    min-width: auto;
    white-space: nowrap;
  }
`;
