import type { PropsWithChildren } from 'react';

export interface FormFieldProps extends PropsWithChildren {
  error?: string;
  hint?: string;
  label: string;
}
