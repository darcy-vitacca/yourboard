import React, { FC, ReactElement } from 'react';
import gfm from 'remark-gfm';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { MarkdownElement } from './Markdown.styles';

interface IProps {
  [key: string]: ReactElement;
}

export interface IMarkdownProps {
  children: string;
  className?: string;
  props?: IProps;
  align?: 'left' | 'center' | 'right';
}

export const Markdown: FC<IMarkdownProps> = ({
  children,
  props,
  className,
  align,
}) => {
  let markdown = children;

  if (props) {
    Object.keys(props).forEach((key) => {
      markdown = markdown.replace(
        `%{${key}}`,
        `${reactElementToJSXString(props[key])}`
      );
    });
  }
  return (
    <MarkdownElement
      className={className}
      align={align}
      allowDangerousHtml={true}
      plugins={[gfm]}
      renderers={{
        link: (props) => <a href={props.href}>{props.children}</a>,
      }}
    >
      {children}
    </MarkdownElement>
  );
};
