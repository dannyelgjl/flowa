import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { InfoCard } from '@/components/InfoCard';
import { OrdersFilters } from '@/components/OrdersFilters';
import { OrdersTable } from '@/components/OrdersTable';
import { Pagination } from '@/components/Pagination';
import { Panel } from '@/components/Panel';
import { formatQuantity } from '@/utils/formatters';
import * as S from './styles';
import { useContainer } from './useContainer';

export function OrdersScreen() {
  const {
    error,
    filters,
    handleCreateOrder,
    handleFilterChange,
    handleOpenDetails,
    handlePageChange,
    handleResetFilters,
    handleSort,
    isLoading,
    metrics,
    paginatedOrders,
    sortState,
  } = useContainer({});

  return (
    <S.ScreenStack>
      <S.HeroPanel>
        <S.HeroCopy>
          <S.Eyebrow>Order Management</S.Eyebrow>
          <S.Title>Book com filtros rápidos, execução automática e leitura clara.</S.Title>
          <S.Description>
            Acompanhe as ordens por instrumento, status, lado e data. O motor
            de matching considera preço agressivo e quantidade disponível para
            atualizar o ciclo da negociação em tempo real.
          </S.Description>
          <Button onClick={handleCreateOrder}>Criar nova ordem</Button>
        </S.HeroCopy>

        <S.HeroAside>
          <S.AsideTitle>Regras ativas nesta simulação</S.AsideTitle>
          <S.AsideList>
            <li>Ordens novas entram sempre com status aberta.</li>
            <li>Execução acontece quando existe contraparte compatível.</li>
            <li>Ordens parciais preservam a quantidade restante.</li>
            <li>Somente ordens abertas ou parciais podem ser canceladas.</li>
          </S.AsideList>
        </S.HeroAside>
      </S.HeroPanel>

      <S.StatsGrid>
        <InfoCard
          label="Ordens abertas"
          support="Disponíveis para casar no livro."
          tone="accent"
          value={String(metrics.openOrders)}
        />
        <InfoCard
          label="Ordens parciais"
          support="Já receberam execução parcial."
          tone="warning"
          value={String(metrics.partialOrders)}
        />
        <InfoCard
          label="Ordens executadas"
          support="Fechadas integralmente."
          tone="success"
          value={String(metrics.executedOrders)}
        />
        <InfoCard
          label="Volume pendente"
          support="Soma da quantidade ainda em aberto."
          value={formatQuantity(metrics.pendingVolume)}
        />
      </S.StatsGrid>

      <Panel>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Filtros do livro</S.SectionTitle>
            <S.SectionMeta>Refine o grid para encontrar ordens com rapidez.</S.SectionMeta>
          </div>
        </S.SectionHeader>
        <OrdersFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </Panel>

      <Panel>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Ordens negociadas</S.SectionTitle>
            <S.SectionMeta>
              {paginatedOrders.totalItems} resultados após filtros e ordenação.
            </S.SectionMeta>
          </div>
        </S.SectionHeader>

        {error ? <S.ErrorBanner>{error}</S.ErrorBanner> : null}

        {isLoading ? <S.LoadingState>Carregando o livro de ordens...</S.LoadingState> : null}

        {!isLoading && paginatedOrders.items.length === 0 ? (
          <EmptyState
            description="Ajuste os filtros ou crie uma nova ordem para popular o grid."
            title="Nenhuma ordem encontrada"
          />
        ) : null}

        {!isLoading && paginatedOrders.items.length > 0 ? (
          <>
            <OrdersTable
              onOpenDetails={handleOpenDetails}
              onSort={handleSort}
              orders={paginatedOrders.items}
              sortState={sortState}
            />
            <Pagination
              currentPage={paginatedOrders.page}
              onPageChange={handlePageChange}
              totalItems={paginatedOrders.totalItems}
              totalPages={paginatedOrders.totalPages}
            />
          </>
        ) : null}
      </Panel>
    </S.ScreenStack>
  );
}
