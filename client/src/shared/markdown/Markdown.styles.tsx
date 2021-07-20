import styled from 'styled-components/macro';
import { ReactMarkdownProps } from 'react-markdown';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

export interface IMarkdownTypeProps extends Omit<ReactMarkdownProps, 'types'> {
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const MarkdownElement = styled(
  ReactMarkdownWithHtml
)<IMarkdownTypeProps>`
  padding-bottom: 10px;
  text-align: ${({ align }) =>
    align === 'left'
      ? 'left'
      : align === 'center'
      ? 'center'
      : align === 'right'
      ? 'right'
      : 'inherit'};
  a {
    display: inline-block;
    padding: 0 5px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.default};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    font-size: ${({ theme }) => theme.font.size.medium};
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
`;
