import styled from "styled-components/macro";
import { TextareaAutosize, TextareaAutosizeProps } from "@material-ui/core";
import { device } from "../../../styles/devices";
import { mainFontFamily } from "../../../styles/theme";

export interface IContainerProps {
  width?: "quarter" | "third" | "maxWidthHalf" | "twoThirds" | "full";
}

export interface IStyledTextAreaProps extends TextareaAutosizeProps {
  align?: "left" | "right";
  border?: "noBorder";
  autoFocus?: boolean;
  error?: boolean;
  startsymbol?: React.ReactNode;
  disabled?: boolean;
}

export const TextAreaContainer = styled.div<IContainerProps>`
  width: 100%;
  position: relative;
  margin-top: 10px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media ${device.mobileLrg} {
    width: ${({ width }) =>
      width === "quarter"
        ? "25%"
        : width === "third"
        ? "33.33%"
        : width === "twoThirds"
        ? "67.22%"
        : "100%"};
    max-width: ${({ width }) => (width === "maxWidthHalf" ? "340px" : "100%")};
  }
`;

export const StyledTextArea = styled(TextareaAutosize)<IStyledTextAreaProps>`
  width: 100%;
  resize: none;
  border: 1px solid
    ${({ theme, error, disabled }) =>
      error
        ? theme.colors.error
        : disabled
        ? theme.colors.grey
        : "transparent"} !important;
  color: ${({ theme }) => theme.colors.white} !important;

  &:hover {
    border-color: black;
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.white};
  }
  outline: 0;
  border-radius: 5px;
  padding: 8px 10px;
  overflow: auto;
  min-height: 200px !important;
  max-height: 30px;
  overflow-y: auto !important;
  background-color: ${({ theme }) => theme.colors.blue500};
  font-size: ${({ theme }) => theme.font.size.small};
  font-family: ${mainFontFamily};

  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : "transparent"};

  &:hover {
    border: 1px solid
      ${({ theme, error }) => (error ? theme.colors.error : theme.colors.black)} !important;
  }

  &:focus {
    border: 1px solid
      ${({ theme, disabled }) => (disabled ? "none" : theme.colors.grey)} !important;
  }
`;

export const Icon = styled.section`
  position: absolute;
`;
