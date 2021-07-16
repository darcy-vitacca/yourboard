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
  padding: 10px;
  .MuiFormLabel-root.Mui-focused {
    color: ${({ theme }) => theme.colors.primary.default};
    font-family: ${mainFontFamily}, ${fontFamily};
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-input {
    padding: 14px;
  }
  .MuiInputLabel-outlined {
    font-size: 14px;
    transform: translate(15px, 15px);
    font-family: ${mainFontFamily}, ${fontFamily};
  }
  .MuiOutlinedInput-notchedOutline {
    border-radius: 0;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${primary};
  }
  .MuiFormLabel-root.Mui-error {
    color: ${grey};
  }
`;

export const inputTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.primary.default,
    },
    action: {
      hover: '#FF00000',
    },
  },
});
