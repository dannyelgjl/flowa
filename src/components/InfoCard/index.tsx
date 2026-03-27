import * as S from './styles';
import type { InfoCardProps } from './types';

export function InfoCard({
  label,
  support,
  tone = 'default',
  value,
}: InfoCardProps) {
  return (
    <S.Card $tone={tone}>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
      {support ? <S.Support>{support}</S.Support> : null}
    </S.Card>
  );
}
