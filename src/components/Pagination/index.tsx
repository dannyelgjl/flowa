import { Button } from '@/components/Button';
import { Actions, Container, CurrentPage, Summary } from './styles';
import type { PaginationProps } from './types';

export function Pagination({
  currentPage,
  onPageChange,
  totalItems,
  totalPages,
}: PaginationProps) {
  return (
    <Container>
      <Summary>
        {totalItems} ordens encontradas
      </Summary>

      <Actions>
        <Button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
          variant="secondary"
        >
          Anterior
        </Button>
        <CurrentPage>
          Página {currentPage} de {totalPages}
        </CurrentPage>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
          variant="secondary"
        >
          Próxima
        </Button>
      </Actions>
    </Container>
  );
}
