import { Button } from '@/components/Button';
import * as S from './styles';
import type { PaginationProps } from './types';

export function Pagination({
  currentPage,
  onPageChange,
  totalItems,
  totalPages,
}: PaginationProps) {
  return (
    <S.Container>
      <S.Summary>
        {totalItems} ordens encontradas
      </S.Summary>

      <S.Actions>
        <Button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="sm"
          variant="secondary"
        >
          Anterior
        </Button>
        <S.CurrentPage>
          Página {currentPage} de {totalPages}
        </S.CurrentPage>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="sm"
          variant="secondary"
        >
          Próxima
        </Button>
      </S.Actions>
    </S.Container>
  );
}
