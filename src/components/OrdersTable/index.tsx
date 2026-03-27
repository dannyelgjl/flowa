import { Button } from '@/components/Button';
import { StatusBadge } from '@/components/StatusBadge';
import type { SortState } from '@/types/order';
import { formatCurrency, formatDateTime, formatQuantity } from '@/utils/formatters';
import {
  BodyCell,
  DesktopWrapper,
  HeadCell,
  Instrument,
  MobileActions,
  MobileCard,
  MobileGrid,
  MobileHeader,
  MobileItem,
  MobileLabel,
  MobileList,
  MobileMeta,
  MobileValue,
  Mono,
  SortButton,
  Table,
} from './styles';
import type { OrdersTableProps } from './types';

function getSortIcon(field: SortState['field'], sortState: SortState) {
  if (sortState.field !== field) {
    return '↕';
  }

  return sortState.direction === 'asc' ? '↑' : '↓';
}

export function OrdersTable({
  onOpenDetails,
  onSort,
  orders,
  sortState,
}: OrdersTableProps) {
  return (
    <>
      <DesktopWrapper>
        <Table>
          <thead>
            <tr>
              <HeadCell>
                <SortButton onClick={() => onSort('id')} type="button">
                  ID {getSortIcon('id', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('instrument')} type="button">
                  Instrumento {getSortIcon('instrument', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('side')} type="button">
                  Lado {getSortIcon('side', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('price')} type="button">
                  Preço {getSortIcon('price', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('quantity')} type="button">
                  Quantidade {getSortIcon('quantity', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('remainingQuantity')} type="button">
                  Restante {getSortIcon('remainingQuantity', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('status')} type="button">
                  Status {getSortIcon('status', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>
                <SortButton onClick={() => onSort('createdAt')} type="button">
                  Data/Hora {getSortIcon('createdAt', sortState)}
                </SortButton>
              </HeadCell>
              <HeadCell>Ações</HeadCell>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <BodyCell>
                  <Mono>{order.id}</Mono>
                </BodyCell>
                <BodyCell>
                  <Instrument>{order.instrument}</Instrument>
                </BodyCell>
                <BodyCell>
                  <StatusBadge kind="side" value={order.side} />
                </BodyCell>
                <BodyCell>{formatCurrency(order.price)}</BodyCell>
                <BodyCell>{formatQuantity(order.quantity)}</BodyCell>
                <BodyCell>{formatQuantity(order.remainingQuantity)}</BodyCell>
                <BodyCell>
                  <StatusBadge kind="status" value={order.status} />
                </BodyCell>
                <BodyCell>{formatDateTime(order.createdAt)}</BodyCell>
                <BodyCell>
                  <Button
                    onClick={() => onOpenDetails(order.id)}
                    size="sm"
                    variant="secondary"
                  >
                    Ver detalhes
                  </Button>
                </BodyCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </DesktopWrapper>

      <MobileList>
        {orders.map((order) => (
          <MobileCard key={order.id}>
            <MobileHeader>
              <MobileMeta>
                <Mono>{order.id}</Mono>
                <Instrument>{order.instrument}</Instrument>
              </MobileMeta>
              <StatusBadge kind="status" value={order.status} />
            </MobileHeader>

            <MobileGrid>
              <MobileItem>
                <MobileLabel>Lado</MobileLabel>
                <MobileValue>
                  <StatusBadge kind="side" value={order.side} />
                </MobileValue>
              </MobileItem>
              <MobileItem>
                <MobileLabel>Preço</MobileLabel>
                <MobileValue>{formatCurrency(order.price)}</MobileValue>
              </MobileItem>
              <MobileItem>
                <MobileLabel>Quantidade</MobileLabel>
                <MobileValue>{formatQuantity(order.quantity)}</MobileValue>
              </MobileItem>
              <MobileItem>
                <MobileLabel>Restante</MobileLabel>
                <MobileValue>{formatQuantity(order.remainingQuantity)}</MobileValue>
              </MobileItem>
              <MobileItem>
                <MobileLabel>Data/Hora</MobileLabel>
                <MobileValue>{formatDateTime(order.createdAt)}</MobileValue>
              </MobileItem>
            </MobileGrid>

            <MobileActions>
              <Button
                onClick={() => onOpenDetails(order.id)}
                size="sm"
                variant="secondary"
              >
                Ver detalhes
              </Button>
            </MobileActions>
          </MobileCard>
        ))}
      </MobileList>
    </>
  );
}
