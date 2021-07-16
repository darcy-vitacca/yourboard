import React, { ButtonHTMLAttributes, FC } from 'react';
import { ButtonContainer } from './Button.styles';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <>
      <ButtonContainer {...props}>{children}</ButtonContainer>
    </>
  );
};
