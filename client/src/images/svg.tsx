import React, { FC } from 'react';
import { SVGContainer } from '../shared/header/Header.styles';
export interface ISVGProps {
  className?: string;
  push: (type: any) => void;
}

export const SVG: FC<ISVGProps> = ({ className, push }) => {
  return <SVGContainer></SVGContainer>;
};
