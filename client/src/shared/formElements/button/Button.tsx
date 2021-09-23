import React, { ButtonHTMLAttributes, FC } from "react";
import { ButtonContainer, IButtonPropStyles } from "./Button.styles";

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IButtonPropStyles {
  validation?: string;
  width: "25%" | "50%" | "75%" | "100%";
  text: string;
  bkgColor?: string;
}

export const Button: FC<IButtonProps> = ({ text, ...props }) => {
  return (
    <>
      <ButtonContainer {...props}>{text}</ButtonContainer>
    </>
  );
};
