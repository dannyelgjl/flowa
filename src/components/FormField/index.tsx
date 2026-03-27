import * as S from './styles';
import type { FormFieldProps } from './types';

export function FormField({
  children,
  error,
  hint,
  label,
}: FormFieldProps) {
  const supportText = error ?? hint;

  return (
    <S.Wrapper>
      <S.Label>{label}</S.Label>
      {children}
      {supportText ? (
        <S.Hint $isError={Boolean(error)}>{supportText}</S.Hint>
      ) : null}
    </S.Wrapper>
  );
}
