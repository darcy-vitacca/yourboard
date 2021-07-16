import { FC } from 'react';
import styled from 'styled-components';
const height = 45;

export interface IButtonPropStyles {
  disabled?: boolean;
}
export const ButtonContainer: FC<IButtonPropStyles> = styled.button`
  margin: 10px 0;
  cursor: pointer;
  padding: 0 5px;
  min-width: ${({ theme }) => theme.layout.buttonWidth};
  height: ${height}px;
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.default};
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: solid ${({ theme }) => theme.button.background};
`;
