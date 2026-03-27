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
import * as S from './styles';
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
        <S.LoadingState>Carregando detalhes da ordem...</S.LoadingState>
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
    <S.ScreenStack>
      <S.HeroPanel>
        <S.HeroCopy>
          <S.Eyebrow>{order.id}</S.Eyebrow>
          <S.Title>{order.instrument} em acompanhamento detalhado</S.Title>
          <S.Description>
            Veja o histórico completo, a quantidade remanescente, execuções já
            realizadas e o status atual da ordem.
          </S.Description>
        </S.HeroCopy>

        <S.HeroActions>
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
        </S.HeroActions>
      </S.HeroPanel>

      {error ? <S.ErrorBanner>{error}</S.ErrorBanner> : null}

      <S.MetricsGrid>
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
      </S.MetricsGrid>

      <S.ContentGrid>
        <Panel>
          <S.SectionTitle>Dados completos da ordem</S.SectionTitle>
          <S.DetailsGrid>
            <S.DetailCard>
              <S.DetailLabel>ID</S.DetailLabel>
              <S.DetailValue>
                <S.Mono>{order.id}</S.Mono>
              </S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Instrumento</S.DetailLabel>
              <S.DetailValue>{order.instrument}</S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Lado</S.DetailLabel>
              <S.DetailValue>
                <StatusBadge kind="side" value={order.side} />
              </S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Status</S.DetailLabel>
              <S.DetailValue>
                <StatusBadge kind="status" value={order.status} />
              </S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Quantidade total</S.DetailLabel>
              <S.DetailValue>{formatQuantity(order.quantity)}</S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Quantidade restante</S.DetailLabel>
              <S.DetailValue>{formatQuantity(order.remainingQuantity)}</S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Criada em</S.DetailLabel>
              <S.DetailValue>{formatDateTime(order.createdAt)}</S.DetailValue>
            </S.DetailCard>
            <S.DetailCard>
              <S.DetailLabel>Última atualização</S.DetailLabel>
              <S.DetailValue>{formatDateTime(order.updatedAt)}</S.DetailValue>
            </S.DetailCard>
          </S.DetailsGrid>
        </Panel>

        <Panel>
          <S.SectionTitle>Histórico de status</S.SectionTitle>
          <S.Timeline>
            {order.history.map((entry) => (
              <S.TimelineItem key={entry.id}>
                <StatusBadge kind="status" value={entry.status} />
                <S.TimelineDate>{formatDateTime(entry.timestamp)}</S.TimelineDate>
                <S.TimelineDescription>{entry.description}</S.TimelineDescription>
              </S.TimelineItem>
            ))}
          </S.Timeline>
        </Panel>
      </S.ContentGrid>

      <Panel>
        <S.SectionTitle>Execuções registradas</S.SectionTitle>
        {order.executions.length === 0 ? (
          <EmptyState
            description="Essa ordem ainda não encontrou contraparte compatível."
            title="Nenhuma execução até o momento"
          />
        ) : (
          <S.ExecutionList>
            {order.executions.map((execution) => (
              <S.ExecutionItem key={execution.id}>
                <strong>Contra ordem: <S.Mono>{execution.matchedOrderId}</S.Mono></strong>
                <S.TimelineDescription>
                  {formatQuantity(execution.quantity)} unidades a{' '}
                  {formatCurrency(execution.price)} em {formatDateTime(execution.timestamp)}.
                </S.TimelineDescription>
              </S.ExecutionItem>
            ))}
          </S.ExecutionList>
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
    </S.ScreenStack>
  );
}
