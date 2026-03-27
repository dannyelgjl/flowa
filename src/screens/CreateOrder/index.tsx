import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { SelectInput, TextInput } from "@/components/FormField/styles";
import {
  formatCurrency,
  formatQuantity,
  getSideLabel,
} from "@/utils/formatters";
import * as S from './styles';
import { useContainer } from "./useContainer";

export function CreateOrderScreen() {
  const {
    error,
    formErrors,
    formValues,
    handleBackToBook,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useContainer({});

  return (
    <S.ScreenStack>
      <S.HeroPanel>
        <S.Eyebrow>Nova ordem</S.Eyebrow>
        <S.Title>Crie uma ordem com validação forte e execução automática.</S.Title>
        <S.Description>
          Ao enviar a ordem, o motor verifica contrapartes compatíveis no livro.
          Se houver preço igual ou mais agressivo com quantidade disponível, a
          execução acontece imediatamente.
        </S.Description>
      </S.HeroPanel>

      <S.ContentGrid>
        <S.FormPanel onSubmit={handleSubmit}>
          <S.PanelTitle>Dados da ordem</S.PanelTitle>

          {error ? <S.ErrorBanner>{error}</S.ErrorBanner> : null}

          <S.FieldsGrid>
            <S.FullRow>
              <FormField
                error={formErrors.instrument}
                hint="Ex.: PETR4, VALE3, BOVA11, AAPL34."
                label="Instrumento"
              >
                <TextInput
                  onChange={(event) =>
                    handleChange("instrument", event.target.value)
                  }
                  placeholder="PETR4"
                  value={formValues.instrument}
                />
              </FormField>
            </S.FullRow>

            <FormField label="Lado">
              <SelectInput
                onChange={(event) =>
                  handleChange(
                    "side",
                    event.target.value as typeof formValues.side
                  )
                }
                value={formValues.side}
              >
                <option value="BUY">Compra</option>
                <option value="SELL">Venda</option>
              </SelectInput>
            </FormField>

            <FormField error={formErrors.price} label="Preço">
              <TextInput
                min="0"
                onChange={(event) => handleChange("price", event.target.value)}
                placeholder="29.80"
                step="0.01"
                type="number"
                value={formValues.price}
              />
            </FormField>

            <S.FullRow>
              <FormField error={formErrors.quantity} label="Quantidade">
                <TextInput
                  min="1"
                  onChange={(event) =>
                    handleChange("quantity", event.target.value)
                  }
                  placeholder="1000"
                  step="1"
                  type="number"
                  value={formValues.quantity}
                />
              </FormField>
            </S.FullRow>
          </S.FieldsGrid>

          <S.Actions>
            <Button
              onClick={handleBackToBook}
              type="button"
              variant="secondary"
            >
              Voltar ao book
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Enviando ordem..." : "Enviar ordem"}
            </Button>
          </S.Actions>
        </S.FormPanel>

        <S.SidePanel>
          <S.PanelTitle>Pré-visualização</S.PanelTitle>

          <S.PreviewCard>
            <S.PreviewLabel>Instrumento</S.PreviewLabel>
            <S.PreviewValue>{formValues.instrument || "A definir"}</S.PreviewValue>
          </S.PreviewCard>

          <S.PreviewCard>
            <S.PreviewLabel>Lado</S.PreviewLabel>
            <S.PreviewValue>{getSideLabel(formValues.side)}</S.PreviewValue>
          </S.PreviewCard>

          <S.PreviewCard>
            <S.PreviewLabel>Preço estimado</S.PreviewLabel>
            <S.PreviewValue>
              {formValues.price
                ? formatCurrency(Number(formValues.price))
                : "R$ 0,00"}
            </S.PreviewValue>
          </S.PreviewCard>

          <S.PreviewCard>
            <S.PreviewLabel>Quantidade</S.PreviewLabel>
            <S.PreviewValue>
              {formValues.quantity
                ? formatQuantity(Number(formValues.quantity))
                : "0"}
            </S.PreviewValue>
          </S.PreviewCard>

          <S.PanelTitle>O que acontece após o envio</S.PanelTitle>
          <S.RuleList>
            <li>A ordem nasce como aberta.</li>
            <li>O matching busca a melhor contraparte compatível por preço.</li>
            <li>Se a quantidade for maior, a ordem continua parcial.</li>
            <li>Ordens abertas ou parciais podem ser canceladas depois.</li>
          </S.RuleList>
        </S.SidePanel>
      </S.ContentGrid>
    </S.ScreenStack>
  );
}
