import styled from 'styled-components';
import { Panel } from '@/components/Panel';

export const ScreenStack = styled.section`
  display: grid;
  gap: 24px;
`;

export const HeroPanel = styled(Panel)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HeroCopy = styled.div`
  display: grid;
  gap: 12px;
`;

export const Eyebrow = styled.span`
  width: fit-content;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(245, 239, 229, 0.1);
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.8rem);
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.7;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 18px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.35rem;
`;

export const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailCard = styled.div`
  padding: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const DetailLabel = styled.dt`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;

export const DetailValue = styled.dd`
  margin: 0;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

export const Timeline = styled.ol`
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TimelineItem = styled.li`
  position: relative;
  padding: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const TimelineDate = styled.small`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;

export const TimelineDescription = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.6;
`;

export const ExecutionList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ExecutionItem = styled.li`
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Mono = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  word-break: break-all;
`;

export const ErrorBanner = styled.div`
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(193, 63, 50, 0.16);
`;

export const LoadingState = styled.div`
  padding: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;
