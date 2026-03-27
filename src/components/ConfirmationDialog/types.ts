import type { PropsWithChildren } from 'react';

export interface ConfirmationDialogProps extends PropsWithChildren {
  confirmLabel?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}
