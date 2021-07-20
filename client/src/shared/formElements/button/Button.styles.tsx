import { FC } from 'react';
import styled from 'styled-components/macro';
const height = 45;

export interface IButtonPropStyles {
  disabled?: boolean;
  width: '25%' | '50%' | '75%' | '100%';
}
export const ButtonContainer = styled.button<IButtonPropStyles>`
  margin: 10px 0;
  cursor: pointer;
  width: ${({ width }) =>
    width === '25%'
      ? '25%'
      : width === '50%'
      ? '50%'
      : width === '75%'
      ? '75%'
      : width === '100%'
      ? '100%'
      : 'inherit'};

  padding: 0 5px;
  //min-width: ${({ theme }) => theme.layout.buttonWidth};
  height: ${height}px;
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.default};
  background-color: ${({ theme }) => theme.colors.blue500};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: solid ${({ theme }) => theme.colors.blue500};
`;
