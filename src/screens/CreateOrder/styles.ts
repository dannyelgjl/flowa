import styled from 'styled-components';
import { Panel } from '@/components/Panel';

export const ScreenStack = styled.section`
  display: grid;
  gap: 24px;
`;

export const HeroPanel = styled(Panel)`
  display: grid;
  gap: 14px;
`;

export const Eyebrow = styled.span`
  width: fit-content;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(13, 109, 126, 0.18);
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 3vw, 3rem);
`;

export const Description = styled.p`
  margin: 0;
  max-width: 62ch;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.7;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const FormPanel = styled(Panel).attrs({ as: 'form' })`
  display: grid;
  gap: 18px;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FullRow = styled.div`
  grid-column: 1 / -1;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column-reverse;

    & > button {
      width: 100%;
    }
  }
`;

export const SidePanel = styled(Panel)`
  display: grid;
  gap: 18px;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
`;

export const RuleList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.7;
`;

export const PreviewCard = styled.div`
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const PreviewLabel = styled.small`
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;

export const PreviewValue = styled.strong`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.15rem;
  overflow-wrap: anywhere;
`;

export const ErrorBanner = styled.div`
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(193, 63, 50, 0.16);
`;
