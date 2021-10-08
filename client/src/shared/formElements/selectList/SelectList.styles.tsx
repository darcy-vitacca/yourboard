import styled from "styled-components/macro";
import { fontFamily, mainFontFamily, theme } from "../../../styles/theme";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

export interface IInputContainerProps {
  width?: "25%" | "50%" | "75%" | "100%";
}
export const StyledSelectList = styled(Select)`
  width: 100%;
  color: ${theme.colors.white}
  background-color: ${theme.colors.blue400}
  padding: 10px;
  border-radius: 12px;
  * {
    color: white;
  }
  & .MuiSelect-iconOutlined {
    z-index: 1;
    background: transparent;
  }
.MuiInputBase-root {
  color: ${theme.colors.white}
},
  .MuiFormLabel-root.Mui-focused {
    color: ${theme.colors.grey400};
    font-family: ${mainFontFamily}, ${fontFamily};
  }
//border radius
.MuiOutlinedInput-root {
  & fieldset {
    border-radius: 3px;
  }
}
  &.MuiFormLabel-root {
}
  .MuiInputBase-input {
    font-size: 14px;
    color: ${theme.colors.white}
  }
.MuiFilledInput-root {
  background:${theme.colors.blue400}
  color: ${theme.colors.white}
}
  .MuiOutlinedInput-input { 
    padding: 14px;
    color: ${theme.colors.white};
    z-index: 1;
  }
  .MuiInputLabel-outlined {
    font-size: 18px;
    transform: translate(10px, 13.5px);
    font-family: ${mainFontFamily}, ${fontFamily};
    color: ${theme.colors.grey400};
    background: transparent;
  }
  .MuiOutlinedInput-notchedOutline {
    border-radius: 5px;
    background-color: ${theme.colors.blue500};
    & :hover {
      color:black;
      border-color: green;
    }
    &:focus {
      border-color: green;
    }
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: green;
  }    


  //placeholder
    input {
    ::placeholder {
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    &:hover,
    &:focus {
      background-color: ${theme.colors.white} !important;
    }
  }
`;

export const useStylesSelectList = makeStyles({
  select: {
    "& ul": {
      backgroundColor: "#ffffff ",
    },
    "& li": {
      backgroundColor: "#ffffff",
      fontSize: 14,
      color: theme.colors.black,
    },
  },
});
