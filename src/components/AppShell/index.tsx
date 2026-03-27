import { Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import {
  BrandBlock,
  BrandDescription,
  BrandPill,
  BrandTitle,
  Header,
  Main,
  NavItem,
  Navigation,
  Shell,
} from './styles';
import type { AppShellProps } from './types';

export function AppShell(_props: AppShellProps) {
  void _props;

  return (
    <Shell>
      <Header>
        <BrandBlock>
          <BrandPill>BASE Exchange</BrandPill>
          <BrandTitle>Gerenciamento de ordens em tempo de decisão</BrandTitle>
          <BrandDescription>
            Visualize o livro, acompanhe o ciclo completo das ordens e dispare
            novas negociações com regras de execução consistentes.
          </BrandDescription>
        </BrandBlock>

        <Navigation aria-label="Navegação principal">
          <NavItem to={ROUTE_PATHS.orders}>Book</NavItem>
          <NavItem to={ROUTE_PATHS.createOrder}>Nova ordem</NavItem>
        </Navigation>
      </Header>

      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}
