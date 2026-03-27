import styled from 'styled-components';

export const Wrapper = styled.label`
  display: grid;
  gap: 10px;
`;

export const Label = styled.span`
  font-weight: 600;
`;

export const Hint = styled.small<{ $isError: boolean }>`
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.danger : theme.colors.textMutedInverse};
`;

const fieldStyles = `
  min-height: 48px;
  width: 100%;
  padding: 0 16px;
  border: 1px solid rgba(245, 239, 229, 0.14);
  border-radius: 14px;
  background: rgba(245, 239, 229, 0.06);
  color: #f5efe5;
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: rgba(231, 198, 109, 0.8);
    box-shadow: 0 0 0 4px rgba(231, 198, 109, 0.16);
  }

  &::placeholder {
    color: rgba(174, 185, 197, 0.7);
  }

  @media (max-width: 640px) {
    min-height: 46px;
  }
`;

export const TextInput = styled.input`
  ${fieldStyles}
`;

export const SelectInput = styled.select`
  ${fieldStyles}
  appearance: none;
  padding-right: 40px;
`;
