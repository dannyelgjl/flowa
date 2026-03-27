import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import type { SortState } from "@/types/order";
import {
  formatCurrency,
  formatDateTime,
  formatQuantity,
} from "@/utils/formatters";
import * as S from "./styles";
import type { OrdersTableProps } from "./types";

function getSortIcon(field: SortState["field"], sortState: SortState) {
  if (sortState.field !== field) {
    return "↕";
  }

  return sortState.direction === "asc" ? "↑" : "↓";
}

export function OrdersTable({
  onOpenDetails,
  onSort,
  orders,
  sortState,
}: OrdersTableProps) {
  return (
    <>
      <S.DesktopWrapper>
        <S.Table>
          <thead>
            <tr>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("id")} type="button">
                  ID {getSortIcon("id", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton
                  onClick={() => onSort("instrument")}
                  type="button"
                >
                  Instrumento {getSortIcon("instrument", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("side")} type="button">
                  Lado {getSortIcon("side", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("price")} type="button">
                  Preço {getSortIcon("price", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("quantity")} type="button">
                  Quantidade {getSortIcon("quantity", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton
                  onClick={() => onSort("remainingQuantity")}
                  type="button"
                >
                  Restante {getSortIcon("remainingQuantity", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("status")} type="button">
                  Status {getSortIcon("status", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>
                <S.SortButton onClick={() => onSort("createdAt")} type="button">
                  Data/Hora {getSortIcon("createdAt", sortState)}
                </S.SortButton>
              </S.HeadCell>
              <S.HeadCell>Ações</S.HeadCell>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <S.BodyCell>
                  <S.Mono>{order.id}</S.Mono>
                </S.BodyCell>
                <S.BodyCell>
                  <S.Instrument>{order.instrument}</S.Instrument>
                </S.BodyCell>
                <S.BodyCell>
                  <StatusBadge kind="side" value={order.side} />
                </S.BodyCell>
                <S.BodyCell>{formatCurrency(order.price)}</S.BodyCell>
                <S.BodyCell>{formatQuantity(order.quantity)}</S.BodyCell>
                <S.BodyCell>
                  {formatQuantity(order.remainingQuantity)}
                </S.BodyCell>
                <S.BodyCell>
                  <StatusBadge kind="status" value={order.status} />
                </S.BodyCell>
                <S.BodyCell>{formatDateTime(order.createdAt)}</S.BodyCell>
                <S.BodyCell>
                  <Button
                    onClick={() => onOpenDetails(order.id)}
                    size="sm"
                    variant="secondary"
                  >
                    Ver detalhes
                  </Button>
                </S.BodyCell>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.DesktopWrapper>

      <S.MobileList>
        {orders.map((order) => (
          <S.MobileCard key={order.id}>
            <S.MobileHeader>
              <S.MobileMeta>
                <S.Mono>{order.id}</S.Mono>
                <S.Instrument>{order.instrument}</S.Instrument>
              </S.MobileMeta>
              <StatusBadge kind="status" value={order.status} />
            </S.MobileHeader>

            <S.MobileGrid>
              <S.MobileItem>
                <S.MobileLabel>Lado</S.MobileLabel>
                <S.MobileValue>
                  <StatusBadge kind="side" value={order.side} />
                </S.MobileValue>
              </S.MobileItem>
              <S.MobileItem>
                <S.MobileLabel>Preço</S.MobileLabel>
                <S.MobileValue>{formatCurrency(order.price)}</S.MobileValue>
              </S.MobileItem>
              <S.MobileItem>
                <S.MobileLabel>Quantidade</S.MobileLabel>
                <S.MobileValue>{formatQuantity(order.quantity)}</S.MobileValue>
              </S.MobileItem>
              <S.MobileItem>
                <S.MobileLabel>Restante</S.MobileLabel>
                <S.MobileValue>
                  {formatQuantity(order.remainingQuantity)}
                </S.MobileValue>
              </S.MobileItem>
              <S.MobileItem>
                <S.MobileLabel>Data/Hora</S.MobileLabel>
                <S.MobileValue>{formatDateTime(order.createdAt)}</S.MobileValue>
              </S.MobileItem>
            </S.MobileGrid>

            <S.MobileActions>
              <Button
                onClick={() => onOpenDetails(order.id)}
                size="sm"
                variant="secondary"
              >
                Ver detalhes
              </Button>
            </S.MobileActions>
          </S.MobileCard>
        ))}
      </S.MobileList>
    </>
  );
}
