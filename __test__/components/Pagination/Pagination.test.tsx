import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '@/components/Pagination';
import { renderWithProviders } from '@test/helpers/renderWithProviders';

describe('Pagination', () => {
  it('permite avançar e voltar de página', async () => {
    const onPageChange = vi.fn();

    renderWithProviders(
      <Pagination
        currentPage={2}
        onPageChange={onPageChange}
        totalItems={12}
        totalPages={4}
      />,
      { withRouter: false },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }));

    expect(screen.getByText('12 ordens encontradas')).toBeInTheDocument();
    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });
});
