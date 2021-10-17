import styled from "styled-components/macro";
import { ReactMarkdownProps } from "react-markdown";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { device } from "../../styles/devices";

export interface IMarkdownTypeProps extends Omit<ReactMarkdownProps, "types"> {
  weight?: "light" | "regular" | "medium" | "bold";
  align?: "left" | "center" | "right";
}

export const MarkdownElement = styled(
  ReactMarkdownWithHtml
)<IMarkdownTypeProps>`
  padding-bottom: 10px;
  text-align: ${({ align }) =>
    align === "left"
      ? "left"
      : align === "center"
      ? "center"
      : align === "right"
      ? "right"
      : "inherit"};
  a {
    display: inline-block;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.default};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    font-size: 8px;
    word-break: break-all;
  }

  &.termsConditionsText > p > a {
    font-size: ${({ theme }) => theme.font.size.small};
    padding: 0;
  }
  &.termsConditionsText {
    padding: 0;
  }
  &.divider > p {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.primary.default};
  }
  &.successText > h4,
  &.termsInstructionsText > h4 {
    font-weight: ${({ theme }) => theme.font.weight.light};
    width: 70%;
    margin: 0 auto;
  }
  &.balanceText > h4 {
    font-weight: ${({ theme }) => theme.font.weight.light};
  }
  &.subText > p {
    font-size: ${({ theme }) => theme.font.size.smallest};
  }
  &.validationText {
    padding-top: 5px;
  }
  &.validationText > p {
    font-size: ${({ theme }) => theme.font.size.smallest};
    color: ${({ theme }) => theme.colors.error};
  }
  &.avatar-text {
    padding: 0;
  }
  &.avatar-text > h4 {
    color: ${({ theme }) => theme.colors.white};
  }
  &.sidebar-nav-text {
    padding: 0;
  }
  &.sidebar-nav-text > h4 {
    color: ${({ theme }) => theme.colors.white};
  }
  &.hideMenu {
    display: block;
  }
  &.showMenu {
    display: none;
  }
  &.arrowContainerIconText > p {
    font-size: ${({ theme }) => theme.font.size.tinier};
    @media ${device.mobileLrg} {
      font-size: ${({ theme }) => theme.font.size.smallest};
    }
  }
  &.linkCardSubText {
    padding:0;
    @media ${device.mobileLrg} {
      padding-bottom: 10px;
    }
}
  &.linkCardSubText > p {
    font-size: ${({ theme }) => theme.font.size.tiny};
    @media ${device.mobileLrg} {
      font-size: ${({ theme }) => theme.font.size.smallest};
    }
  }
  &.linkCardMainText {
    width: 80%;
    overflow: hidden;
    @media ${device.mobileLrg} {
      width: 100%;
    }
    
  &.linkCardMainText > h4 {
    width: 80%;
    font-size: ${({ theme }) => theme.font.size.smallest};
    @media ${device.mobileLrg} {
      width: 100%;
      font-size: ${({ theme }) => theme.font.size.medium};
    }
  }
   
`;
