import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Shell = styled.div`
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 40px;

  @media (max-width: 900px) {
    width: min(100%, calc(100% - 24px));
    padding-top: 22px;
  }

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 20px));
    padding-top: 20px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
  padding: 18px 22px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(9, 23, 38, 0.78);
  backdrop-filter: blur(16px);

  @media (max-width: 900px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    padding: 18px;
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const BrandBlock = styled.div`
  display: grid;
  gap: 8px;
`;

export const BrandPill = styled.span`
  width: fit-content;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(231, 198, 109, 0.16);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const BrandTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.6rem);

  @media (max-width: 900px) {
    font-size: clamp(1.9rem, 4vw, 2.35rem);
  }
`;

export const BrandDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMutedInverse};
  max-width: 560px;
  line-height: 1.6;

  @media (max-width: 900px) {
    max-width: none;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 12px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.colors.textMutedInverse};
  border: 1px solid transparent;
  text-align: center;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &.active {
    background: rgba(245, 239, 229, 0.1);
    border-color: ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.textInverse};
  }
`;

export const Main = styled.main`
  display: block;
`;
