import { Hint, Label, Wrapper } from './styles';
import type { FormFieldProps } from './types';

export function FormField({
  children,
  error,
  hint,
  label,
}: FormFieldProps) {
  const supportText = error ?? hint;

  return (
    <Wrapper>
      <Label>{label}</Label>
      {children}
      {supportText ? (
        <Hint $isError={Boolean(error)}>{supportText}</Hint>
      ) : null}
    </Wrapper>
  );
}
