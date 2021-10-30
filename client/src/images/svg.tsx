import React, { FC } from "react";

export interface ISVGProps {
  className?: string;
  push: (type: any) => void;
}

export const SVG: FC<ISVGProps> = ({ className, push }) => {
  return <div>1</div>;
};
