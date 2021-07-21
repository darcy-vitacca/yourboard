import { MuiThemeProvider } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';

import { Markdown } from '../../markdown';
import {
  InputElement,
  InputContainer,
  inputTheme,
  InputLabel,
} from './Input.styles';

export interface IInputProps {
  name: string;
  label?: string;
  type: string;
  validation?: string;
  width?: '25%' | '50%' | '75%' | '100%';
  maxLength?: number;
  helperText?: string;
  defaultValue: string;
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
    },
    ref
  ) => {
    const { control } = useFormContext();
    return (
      <>
        {helperText && <InputLabel>{helperText}</InputLabel>}
        <InputContainer width={width}>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ''}
            render={({ field }) => (
              <InputElement
                {...field}
                label={label}
                type={type}
                onChange={(e) => {console.log(e)}}
                variant="outlined"
                inputProps={{ maxLength: maxLength }}
                error={!!validation}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key) && type === 'tel') {
                    e.preventDefault();
                  }
                }}
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
