import { Card, Label, Support, Value } from './styles';
import type { InfoCardProps } from './types';

export function InfoCard({
  label,
  support,
  tone = 'default',
  value,
}: InfoCardProps) {
  return (
    <Card $tone={tone}>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {support ? <Support>{support}</Support> : null}
    </Card>
  );
}
