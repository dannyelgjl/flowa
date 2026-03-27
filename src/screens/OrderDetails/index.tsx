import { Button } from '@/components/Button';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { EmptyState } from '@/components/EmptyState';
import { InfoCard } from '@/components/InfoCard';
import { Panel } from '@/components/Panel';
import { StatusBadge } from '@/components/StatusBadge';
import {
  formatCurrency,
  formatDateTime,
  formatQuantity,
  getSideLabel,
  getStatusLabel,
} from '@/utils/formatters';
import {
  ContentGrid,
  Description,
  DetailCard,
  DetailLabel,
  DetailsGrid,
  DetailValue,
  ErrorBanner,
  ExecutionItem,
  ExecutionList,
  Eyebrow,
  HeroActions,
  HeroCopy,
  HeroPanel,
  LoadingState,
  MetricsGrid,
  Mono,
  ScreenStack,
  SectionTitle,
  Timeline,
  TimelineDate,
  TimelineDescription,
  TimelineItem,
  Title,
} from './styles';
import { useContainer } from './useContainer';

export function OrderDetailsScreen() {
  const {
    canCancel,
    closeDialog,
    error,
    handleBack,
    handleConfirmCancel,
    handleCreateAnother,
    isDialogOpen,
    isLoading,
    isSubmitting,
    openDialog,
    order,
    orderId,
  } = useContainer({});

  if (isLoading && !order) {
    return (
      <Panel>
        <LoadingState>Carregando detalhes da ordem...</LoadingState>
      </Panel>
    );
  }

  if (!order) {
    return (
      <Panel>
        <EmptyState
          description={`Não encontramos a ordem ${orderId ?? ''}.`}
          title="Ordem não localizada"
        />
      </Panel>
    );
  }

  return (
    <ScreenStack>
      <HeroPanel>
        <HeroCopy>
          <Eyebrow>{order.id}</Eyebrow>
          <Title>{order.instrument} em acompanhamento detalhado</Title>
          <Description>
            Veja o histórico completo, a quantidade remanescente, execuções já
            realizadas e o status atual da ordem.
          </Description>
        </HeroCopy>

        <HeroActions>
          <Button onClick={handleBack} variant="secondary">
            Voltar ao book
          </Button>
          <Button onClick={handleCreateAnother} variant="secondary">
            Nova ordem
          </Button>
          {canCancel ? (
            <Button onClick={openDialog} variant="danger">
              Cancelar ordem
            </Button>
          ) : null}
        </HeroActions>
      </HeroPanel>

      {error ? <ErrorBanner>{error}</ErrorBanner> : null}

      <MetricsGrid>
        <InfoCard
          label="Status"
          support="Situação atual da ordem."
          tone="accent"
          value={getStatusLabel(order.status)}
        />
        <InfoCard label="Lado" value={getSideLabel(order.side)} support="Direção da operação." />
        <InfoCard label="Preço" value={formatCurrency(order.price)} support="Preço limite enviado." />
        <InfoCard
          label="Restante"
          value={formatQuantity(order.remainingQuantity)}
          support="Quantidade ainda disponível no livro."
        />
      </MetricsGrid>

      <ContentGrid>
        <Panel>
          <SectionTitle>Dados completos da ordem</SectionTitle>
          <DetailsGrid>
            <DetailCard>
              <DetailLabel>ID</DetailLabel>
              <DetailValue>
                <Mono>{order.id}</Mono>
              </DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Instrumento</DetailLabel>
              <DetailValue>{order.instrument}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Lado</DetailLabel>
              <DetailValue>
                <StatusBadge kind="side" value={order.side} />
              </DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Status</DetailLabel>
              <DetailValue>
                <StatusBadge kind="status" value={order.status} />
              </DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Quantidade total</DetailLabel>
              <DetailValue>{formatQuantity(order.quantity)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Quantidade restante</DetailLabel>
              <DetailValue>{formatQuantity(order.remainingQuantity)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Criada em</DetailLabel>
              <DetailValue>{formatDateTime(order.createdAt)}</DetailValue>
            </DetailCard>
            <DetailCard>
              <DetailLabel>Última atualização</DetailLabel>
              <DetailValue>{formatDateTime(order.updatedAt)}</DetailValue>
            </DetailCard>
          </DetailsGrid>
        </Panel>

        <Panel>
          <SectionTitle>Histórico de status</SectionTitle>
          <Timeline>
            {order.history.map((entry) => (
              <TimelineItem key={entry.id}>
                <StatusBadge kind="status" value={entry.status} />
                <TimelineDate>{formatDateTime(entry.timestamp)}</TimelineDate>
                <TimelineDescription>{entry.description}</TimelineDescription>
              </TimelineItem>
            ))}
          </Timeline>
        </Panel>
      </ContentGrid>

      <Panel>
        <SectionTitle>Execuções registradas</SectionTitle>
        {order.executions.length === 0 ? (
          <EmptyState
            description="Essa ordem ainda não encontrou contraparte compatível."
            title="Nenhuma execução até o momento"
          />
        ) : (
          <ExecutionList>
            {order.executions.map((execution) => (
              <ExecutionItem key={execution.id}>
                <strong>Contra ordem: <Mono>{execution.matchedOrderId}</Mono></strong>
                <TimelineDescription>
                  {formatQuantity(execution.quantity)} unidades a{' '}
                  {formatCurrency(execution.price)} em {formatDateTime(execution.timestamp)}.
                </TimelineDescription>
              </ExecutionItem>
            ))}
          </ExecutionList>
        )}
      </Panel>

      <ConfirmationDialog
        confirmLabel="Confirmar cancelamento"
        isLoading={isSubmitting}
        onCancel={closeDialog}
        onConfirm={() => void handleConfirmCancel()}
        open={isDialogOpen}
        title="Cancelar esta ordem?"
      >
        Essa ação só é permitida para ordens abertas ou parciais e vai registrar
        um novo evento no histórico da ordem.
      </ConfirmationDialog>
    </ScreenStack>
  );
}
