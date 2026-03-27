import { Button } from "@/components/Button";
import { FormField } from "@/components/FormField";
import { SelectInput, TextInput } from "@/components/FormField/styles";
import {
  formatCurrency,
  formatQuantity,
  getSideLabel,
} from "@/utils/formatters";
import {
  Actions,
  ContentGrid,
  Description,
  ErrorBanner,
  Eyebrow,
  FieldsGrid,
  FormPanel,
  FullRow,
  HeroPanel,
  PanelTitle,
  PreviewCard,
  PreviewLabel,
  PreviewValue,
  RuleList,
  ScreenStack,
  SidePanel,
  Title,
} from "./styles";
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
    <ScreenStack>
      <HeroPanel>
        <Eyebrow>Nova ordem</Eyebrow>
        <Title>Crie uma ordem com validação forte e execução automática.</Title>
        <Description>
          Ao enviar a ordem, o motor verifica contrapartes compatíveis no livro.
          Se houver preço igual ou mais agressivo com quantidade disponível, a
          execução acontece imediatamente.
        </Description>
      </HeroPanel>

      <ContentGrid>
        <FormPanel onSubmit={handleSubmit}>
          <PanelTitle>Dados da ordem</PanelTitle>

          {error ? <ErrorBanner>{error}</ErrorBanner> : null}

          <FieldsGrid>
            <FullRow>
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
            </FullRow>

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

            <FullRow>
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
            </FullRow>
          </FieldsGrid>

          <Actions>
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
          </Actions>
        </FormPanel>

        <SidePanel>
          <PanelTitle>Pré-visualização</PanelTitle>

          <PreviewCard>
            <PreviewLabel>Instrumento</PreviewLabel>
            <PreviewValue>{formValues.instrument || "A definir"}</PreviewValue>
          </PreviewCard>

          <PreviewCard>
            <PreviewLabel>Lado</PreviewLabel>
            <PreviewValue>{getSideLabel(formValues.side)}</PreviewValue>
          </PreviewCard>

          <PreviewCard>
            <PreviewLabel>Preço estimado</PreviewLabel>
            <PreviewValue>
              {formValues.price
                ? formatCurrency(Number(formValues.price))
                : "R$ 0,00"}
            </PreviewValue>
          </PreviewCard>

          <PreviewCard>
            <PreviewLabel>Quantidade</PreviewLabel>
            <PreviewValue>
              {formValues.quantity
                ? formatQuantity(Number(formValues.quantity))
                : "0"}
            </PreviewValue>
          </PreviewCard>

          <PanelTitle>O que acontece após o envio</PanelTitle>
          <RuleList>
            <li>A ordem nasce como aberta.</li>
            <li>O matching busca a melhor contraparte compatível por preço.</li>
            <li>Se a quantidade for maior, a ordem continua parcial.</li>
            <li>Ordens abertas ou parciais podem ser canceladas depois.</li>
          </RuleList>
        </SidePanel>
      </ContentGrid>
    </ScreenStack>
  );
}
