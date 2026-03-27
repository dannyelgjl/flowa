import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormField } from '@/components/FormField';
import { TextInput } from '@/components/FormField/styles';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('FormField', () => {
  it('renderiza label, input e mensagem de erro', () => {
    renderWithProviders(
      <FormField error="Campo obrigatório" label="Instrumento">
        <TextInput placeholder="PETR4" />
      </FormField>,
      { withRouter: false },
    );

    expect(screen.getByText('Instrumento')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('PETR4')).toBeInTheDocument();
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });
});
