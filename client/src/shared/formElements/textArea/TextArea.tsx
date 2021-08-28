import React, { forwardRef } from "react";

import {
  TextAreaContainer,
  StyledTextArea,
  IContainerProps,
  IStyledTextAreaProps,
} from "./TextArea.styles";
import { Markdown } from "../../markdown";

export interface ITextAreaProps extends IContainerProps, IStyledTextAreaProps {
  name?: string;
  label: string;
  id?: string;
  touched?: boolean;
  validation?: any;
  helperText?: string;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  variant?: "standard" | "outlined" | "filled";
  defaultValue?: string;
  value?: string | number | readonly string[];
  onChange?: any;
  onBlur?: any;
  handleChange?: any;
  ref: any;
  maxLength?: number;
  disabled?: boolean;
  minRows?: number;
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (
    {
      name,
      className,
      label,
      validation,
      helperText,
      width,
      minRows,
      ...props
    },
    ref
  ) => {
    const labelProps = {
      asterisk: <span className="asterisk">*</span>,
    };

    console.log("validation", validation);
    const rowHeight = 38;
    const overrideTextAreaInitialHeight = minRows
      ? minRows * rowHeight
      : rowHeight;

    return (
      <TextAreaContainer className={className} width={width}>
        <Markdown children={label} props={labelProps} className="label" />
        <StyledTextArea
          {...props}
          id={name}
          name={name}
          ref={ref}
          minRows={minRows}
          error={validation}
          style={{
            minHeight: `${overrideTextAreaInitialHeight}px`,
          }}
        />
        <Markdown children={validation} className="validationText" />
      </TextAreaContainer>
    );
  }
);

TextArea.defaultProps = {
  variant: "outlined",
  align: "left",
  minRows: 1,
};