import { createGlobalStyle } from 'styled-components';
import { mainFontFamily, fontFamily, theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${mainFontFamily}, ${fontFamily};
    background-color: ${theme.layout.background};
  }

  html, body, #root {
    height: 100%;
  } 

  h1 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.title};
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }

  h2 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.heading};
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  h3 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.large};
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  h4 {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.medium};
    font-weight: ${theme.font.weight.semiBold};
    color: ${theme.colors.text.default};
  }
  p {
    font-family: ${mainFontFamily}, ${fontFamily};
    font-size: ${theme.font.size.small};
    font-weight: ${theme.font.weight.regular};
    color: ${theme.colors.text.subText};
  }
`;
