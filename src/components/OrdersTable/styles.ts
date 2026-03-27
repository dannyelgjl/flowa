import styled from 'styled-components';

export const DesktopWrapper = styled.div`
  overflow-x: auto;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 820px;
`;

export const HeadCell = styled.th`
  padding: 14px 12px;
  text-align: left;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-weight: 600;
`;

export const BodyCell = styled.td`
  padding: 18px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  vertical-align: middle;
`;

export const Mono = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export const Instrument = styled.strong`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
`;

export const MobileList = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    gap: 14px;
  }
`;

export const MobileCard = styled.article`
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const MobileMeta = styled.div`
  display: grid;
  gap: 6px;
`;

export const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MobileItem = styled.div`
  display: grid;
  gap: 4px;
`;

export const MobileLabel = styled.small`
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;

export const MobileValue = styled.span`
  font-weight: 600;
`;

export const MobileActions = styled.div`
  margin-top: 16px;

  & > button {
    width: 100%;
  }
`;
