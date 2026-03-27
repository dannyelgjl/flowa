import styled from 'styled-components';
import { Panel } from '@/components/Panel';

export const ScreenStack = styled.section`
  display: grid;
  gap: 24px;

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

export const HeroPanel = styled(Panel)`
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const HeroCopy = styled.div`
  display: grid;
  gap: 14px;
`;

export const Eyebrow = styled.span`
  width: fit-content;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(231, 198, 109, 0.16);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.05;

  @media (max-width: 900px) {
    font-size: clamp(1.9rem, 4.8vw, 2.7rem);
  }
`;

export const Description = styled.p`
  margin: 0;
  max-width: 60ch;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.7;
`;

export const HeroAside = styled.div`
  display: grid;
  gap: 14px;
  padding: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(245, 239, 229, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.line};

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

export const AsideTitle = styled.strong`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
`;

export const AsideList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  line-height: 1.7;
`;

export const StatsGrid = styled.div`
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

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.4rem;
`;

export const SectionMeta = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;

export const ErrorBanner = styled.div`
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(193, 63, 50, 0.16);
  color: ${({ theme }) => theme.colors.textInverse};
`;

export const LoadingState = styled.div`
  padding: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMutedInverse};
`;
