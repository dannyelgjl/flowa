import { createPortal } from 'react-dom';
import { Button } from '@/components/Button';
import { Actions, Backdrop, Content, Dialog, Title } from './styles';
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
    <Backdrop onClick={onCancel}>
      <Dialog
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <Title>{title}</Title>
        <Content>{children}</Content>
        <Actions>
          <Button onClick={onCancel} variant="secondary">
            Voltar
          </Button>
          <Button onClick={onConfirm} variant="danger">
            {isLoading ? 'Cancelando...' : confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Backdrop>,
    document.body,
  );
}
