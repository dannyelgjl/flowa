import { createPortal } from 'react-dom';
import { Button } from '@/components/Button';
import * as S from './styles';
import type { ConfirmationDialogProps } from './types';

export function ConfirmationDialog({
  children,
  confirmLabel = 'Confirmar',
  isLoading = false,
  onCancel,
  onConfirm,
  open,
  title,
}: ConfirmationDialogProps) {
  if (!open) {
    return null;
  }

  return createPortal(
    <S.Backdrop onClick={onCancel}>
      <S.Dialog
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <S.Title>{title}</S.Title>
        <S.Content>{children}</S.Content>
        <S.Actions>
          <Button onClick={onCancel} variant="secondary">
            Voltar
          </Button>
          <Button onClick={onConfirm} variant="danger">
            {isLoading ? 'Cancelando...' : confirmLabel}
          </Button>
        </S.Actions>
      </S.Dialog>
    </S.Backdrop>,
    document.body,
  );
}
