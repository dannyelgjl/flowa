import { Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/paths';
import * as S from './styles';
import type { AppShellProps } from './types';

export function AppShell(_props: AppShellProps) {
  void _props;

  return (
    <S.Shell>
      <S.Header>
        <S.BrandBlock>
          <S.BrandPill>BASE Exchange</S.BrandPill>
          <S.BrandTitle>Gerenciamento de ordens em tempo de decisão</S.BrandTitle>
          <S.BrandDescription>
            Visualize o livro, acompanhe o ciclo completo das ordens e dispare
            novas negociações com regras de execução consistentes.
          </S.BrandDescription>
        </S.BrandBlock>

        <S.Navigation aria-label="Navegação principal">
          <S.NavItem to={ROUTE_PATHS.orders}>Book</S.NavItem>
          <S.NavItem to={ROUTE_PATHS.createOrder}>Nova ordem</S.NavItem>
        </S.Navigation>
      </S.Header>

      <S.Main>
        <Outlet />
      </S.Main>
    </S.Shell>
  );
}
