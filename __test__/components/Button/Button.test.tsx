import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/components/Button';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('Button', () => {
  it('renderiza o label e dispara o clique', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<Button onClick={onClick}>Salvar</Button>, {
      withRouter: false,
    });

    await user.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza variações de estilo e tamanhos sem quebrar', () => {
    renderWithProviders(
      <>
        <Button fullWidth size="sm" variant="secondary">
          Secundário
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </>,
      { withRouter: false },
    );

    expect(screen.getByRole('button', { name: 'Secundário' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ghost' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Danger' })).toBeInTheDocument();
  });
});
