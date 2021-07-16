import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
export const Box = styled.div`
  margin-right: 5px;
`;

export const CheckboxCheck = styled(Checkbox)`
  &.MuiButtonBase-root {
    padding: 0;
  }
  width: 20px;
  color: ${({ theme }) => theme.colors.default.faded};

  &:hover {
    background-color: transparent;
  }
  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.colors.primary.default};

    &:hover {
      background-color: transparent;
    }
  }
`;
