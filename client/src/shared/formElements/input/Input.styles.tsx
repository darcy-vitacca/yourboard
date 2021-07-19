import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {
  fontFamily,
  mainFontFamily,
  primary,
  grey,
  theme,
} from '../../../styles/theme';
import { createMuiTheme } from '@material-ui/core';

export interface IInputContainerProps {
  width?: '25%' | '50%' | '75%' | '100%';
}
export const InputContainer = styled.div<IInputContainerProps>`
  padding: 10px 0;
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
`;

export const InputElement = styled(TextField)`
  width: 100%;
  color: ${theme.colors.blue400}
  background-color: ${theme.colors.blue400}
  padding: 10px;
  .MuiFormLabel-root.Mui-focused {
    color: ${theme.colors.blue400}
    font-family: ${mainFontFamily}, ${fontFamily};
  }
  & .MuiFormLabel-root {
  color: red
}
  .MuiInputBase-input {
    font-size: 14px;
  }
.MuiFilledInput-root {
  background:${theme.colors.blue400}
}
  .MuiOutlinedInput-input {
    padding: 14px;
    
  }
  .MuiInputLabel-outlined {
    font-size: 18px;
    transform: translate(10px, 13.5px);
    font-family: ${mainFontFamily}, ${fontFamily};
    color: ${theme.colors.grey400};
    background: transparent;
  }
  .MuiOutlinedInput-notchedOutline {
    border-radius: 0;
    background-color: ${theme.colors.blue500};
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  }
  .MuiFormLabel-root.Mui-error {
  }
  .MuiFormLabel-root.Mui-disabled {
    
  }
`;

export const inputTheme = createMuiTheme({
  palette: {

    action: {
      hover: '#FF00000',
    },
  },
});
