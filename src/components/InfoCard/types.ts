export type InfoCardTone = 'accent' | 'default' | 'success' | 'warning';

export interface InfoCardProps {
  label: string;
  tone?: InfoCardTone;
  value: string;
  support?: string;
}
