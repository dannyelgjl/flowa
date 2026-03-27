import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { InfoCard } from '@/components/InfoCard';
import { OrdersFilters } from '@/components/OrdersFilters';
import { OrdersTable } from '@/components/OrdersTable';
import { Pagination } from '@/components/Pagination';
import { Panel } from '@/components/Panel';
import { formatQuantity } from '@/utils/formatters';
import {
  AsideList,
  AsideTitle,
  Description,
  ErrorBanner,
  Eyebrow,
  HeroAside,
  HeroCopy,
  HeroPanel,
  LoadingState,
  ScreenStack,
  SectionHeader,
  SectionMeta,
  SectionTitle,
  StatsGrid,
  Title,
} from './styles';
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
    <ScreenStack>
      <HeroPanel>
        <HeroCopy>
          <Eyebrow>Order Management</Eyebrow>
          <Title>Book com filtros rápidos, execução automática e leitura clara.</Title>
          <Description>
            Acompanhe as ordens por instrumento, status, lado e data. O motor
            de matching considera preço agressivo e quantidade disponível para
            atualizar o ciclo da negociação em tempo real.
          </Description>
          <Button onClick={handleCreateOrder}>Criar nova ordem</Button>
        </HeroCopy>

        <HeroAside>
          <AsideTitle>Regras ativas nesta simulação</AsideTitle>
          <AsideList>
            <li>Ordens novas entram sempre com status aberta.</li>
            <li>Execução acontece quando existe contraparte compatível.</li>
            <li>Ordens parciais preservam a quantidade restante.</li>
            <li>Somente ordens abertas ou parciais podem ser canceladas.</li>
          </AsideList>
        </HeroAside>
      </HeroPanel>

      <StatsGrid>
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
      </StatsGrid>

      <Panel>
        <SectionHeader>
          <div>
            <SectionTitle>Filtros do livro</SectionTitle>
            <SectionMeta>Refine o grid para encontrar ordens com rapidez.</SectionMeta>
          </div>
        </SectionHeader>
        <OrdersFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </Panel>

      <Panel>
        <SectionHeader>
          <div>
            <SectionTitle>Ordens negociadas</SectionTitle>
            <SectionMeta>
              {paginatedOrders.totalItems} resultados após filtros e ordenação.
            </SectionMeta>
          </div>
        </SectionHeader>

        {error ? <ErrorBanner>{error}</ErrorBanner> : null}

        {isLoading ? <LoadingState>Carregando o livro de ordens...</LoadingState> : null}

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
    </ScreenStack>
  );
}
