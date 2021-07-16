import { MuiThemeProvider } from '@material-ui/core';
import React, { forwardRef } from 'react';

import { Markdown } from '../../markdown';
import { InputElement, InputContainer, inputTheme } from './Input.styles';

export interface IInputProps {
  name?: string;
  label?: string;
  type?: string;
  validation?: string;
  width?: '25%' | '50%' | '75%' | '100%';
  maxLength?: number;
  fieldName: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type, label, validation, width, maxLength }, ref) => {
    return (
      <MuiThemeProvider theme={inputTheme}>
        <InputContainer width={width}>
          <InputElement
            label={label}
            variant="outlined"
            inputProps={{ maxLength: maxLength }}
            type={type}
            error={!!validation}
            inputRef={ref}
            onChange={(e) => {}}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key) && type === 'tel') {
                e.preventDefault();
              }
            }}
          />

          {validation && (
            <Markdown children={validation} className="validationText" />
          )}
        </InputContainer>
      </MuiThemeProvider>
    );
  }
);
export default Input;
