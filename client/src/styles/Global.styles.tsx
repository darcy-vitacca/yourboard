import { createGlobalStyle } from "styled-components/macro";
import { mainFontFamily, fontFamily, theme } from "./theme";
import { device } from "./devices";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Sans', sans-serif;;
    
  }

  html, body, #root {
    height: 100%;
    background-color: ${theme.layout.background};
  } 

  h1 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.largeHeading};
    @media ${device.mobileLrg} {
      font-size: ${theme.font.size.title};
    }

    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  h2 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.large};
    font-size: ${theme.font.size.medium};
    @media ${device.mobileLrg} {
      font-size: ${theme.font.size.heading};
    }
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  h3 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.default};
    @media ${device.mobileLrg} {
      font-size: ${theme.font.size.large};
    }
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  h4 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.default};
    @media ${device.mobileLrg} {
      font-size: ${theme.font.size.medium};
    }
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  p {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.small};
    font-weight: ${theme.font.weight.regular};
    color: ${theme.colors.text.subText};
  }
  & .MuiPopover-root {
    background-color: transparent ;
  }
`;
