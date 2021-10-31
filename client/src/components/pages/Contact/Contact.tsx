import React, { FC } from "react";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { Markdown } from "../../../shared/markdown";

export const Contact: FC = () => {
  return (
    <PageLayoutContainer>
      <SectionContainer>
        <FormContainer>
          <Markdown children="# Contact" />
        </FormContainer>
      </SectionContainer>
    </PageLayoutContainer>
  );
};
