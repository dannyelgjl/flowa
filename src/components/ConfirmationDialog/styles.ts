import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(7, 17, 29, 0.72);
  backdrop-filter: blur(8px);
`;

export const Dialog = styled.div`
  width: min(100%, 420px);
  max-height: min(100vh - 48px, 640px);
  overflow-y: auto;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.panel};

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

export const Title = styled.h3`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 640px) {
    flex-direction: column-reverse;

    & > button {
      width: 100%;
    }
  }
`;
