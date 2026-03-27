import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('ConfirmationDialog', () => {
  it('renderiza o diálogo e dispara ações de cancelar e confirmar', async () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    renderWithProviders(
      <ConfirmationDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        open
        title="Cancelar ordem?"
      >
        Conteúdo de confirmação.
      </ConfirmationDialog>,
      { withRouter: false },
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo de confirmação.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
