// import { MuiThemeProvider, TextField } from '@material-ui/core';
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

import { Markdown } from "../../markdown";
import { InputElement, InputContainer, InputLabel } from "./Input.styles";

export interface IInputProps {
  name: string;
  label?: string;
  type: string;
  validation?: string;
  width?: "25%" | "50%" | "75%" | "100%";
  maxLength?: number;
  helperText?: string;
  defaultValue: string;
  control?: any;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type,
      label,
      validation,
      width,
      maxLength,
      helperText,
      name,
      defaultValue,
      control,
    },
    ref
  ) => {
    return (
      <>
        {helperText && <InputLabel>{helperText}</InputLabel>}
        <InputContainer width={width}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            render={({ field }) => (
              <InputElement
                {...field}
                // label={label}
                placeholder={label}
                type={type}
                variant="outlined"
                inputRef={ref}
                inputProps={{ maxLength: maxLength }}
                InputLabelProps={{ shrink: true }}
                // InputLabelProps={{ shrink: this.state.value ? true: false }}
                error={!!validation}
              />
            )}
          />

          {validation && (
            <Markdown children={validation} className="validationText" />
          )}
        </InputContainer>
      </>
    );
  }
);
export default Input;
