import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import {
  TextAreaContainer,
  StyledTextArea,
  IContainerProps,
  IStyledTextAreaProps,
} from "./TextArea.styles";
import { Markdown } from "../../markdown";

export interface ITextAreaProps extends IContainerProps, IStyledTextAreaProps {
  name: string;
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
  control?: any;
  change?: any;
  setValue?: any;
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
      disabled,
      control,
      defaultValue,
      change,
      setValue,
      placeholder,
      ...props
    },
    ref
  ) => {
    const labelProps = {
      asterisk: <span className="asterisk">*</span>,
    };

    const rowHeight = 38;
    const overrideTextAreaInitialHeight = minRows
      ? minRows * rowHeight
      : rowHeight;

    return (
      <TextAreaContainer className={className} width={width}>
        <Markdown children={label} props={labelProps} className="label" />
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <StyledTextArea
              {...field}
              id={name}
              disabled={disabled}
              placeholder={placeholder}
              //@ts-ignore
              onChange={(e: any) =>
                setValue
                  ? setValue(name, e.target.value)
                  : change(e.target.value)
              }
              ref={ref}
              minRows={minRows}
              error={validation}
              style={{
                minHeight: `${overrideTextAreaInitialHeight}px`,
              }}
            />
          )}
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
