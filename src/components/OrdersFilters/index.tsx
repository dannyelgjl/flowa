import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { SelectInput, TextInput } from "@/components/FormField/styles";
import type { OrderFilters } from "@/types/order";
import * as S from './styles';
import type { OrdersFiltersProps } from "./types";

export function OrdersFilters({
  filters,
  onChange,
  onReset,
}: OrdersFiltersProps) {
  return (
    <>
      <S.Grid>
        <FormField label="ID">
          <TextInput
            onChange={(event) => onChange("id", event.target.value)}
            placeholder="ORD-1001"
            value={filters.id}
          />
        </FormField>

        <FormField label="Instrumento">
          <TextInput
            onChange={(event) => onChange("instrument", event.target.value)}
            placeholder="PETR4"
            value={filters.instrument}
          />
        </FormField>

        <FormField label="Status">
          <SelectInput
            onChange={(event) =>
              onChange("status", event.target.value as OrderFilters["status"])
            }
            value={filters.status}
          >
            <option value="ALL">Todos</option>
            <option value="OPEN">Aberta</option>
            <option value="PARTIAL">Parcial</option>
            <option value="EXECUTED">Executada</option>
            <option value="CANCELLED">Cancelada</option>
          </SelectInput>
        </FormField>

        <FormField label="Lado">
          <SelectInput
            onChange={(event) =>
              onChange("side", event.target.value as OrderFilters["side"])
            }
            value={filters.side}
          >
            <option value="ALL">Todos</option>
            <option value="BUY">Compra</option>
            <option value="SELL">Venda</option>
          </SelectInput>
        </FormField>

        <FormField label="Data">
          <TextInput
            onChange={(event) => onChange("date", event.target.value)}
            type="date"
            value={filters.date}
          />
        </FormField>
      </S.Grid>

      <S.Footer>
        <Button onClick={onReset} size="sm" variant="secondary">
          Limpar filtros
        </Button>
      </S.Footer>
    </>
  );
}
