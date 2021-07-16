import React, { useState } from 'react';
import { Footer } from '../../../shared/footer';
import { Button } from '../../../shared/formElements/button';
import { Header } from '../../../shared/header';
import {
  FormContainer,
  FormSectionContainer,
  PageLayoutContainer,
  SectionContainer,
  ButtonGroupContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';
import { useHistory } from 'react-router';

export const Page2 = () => {
  const { push } = useHistory();

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <Markdown children={'heading'} />
          <Markdown children={'subHeading'} className="balanceText" />

          <FormContainer>
            <FormSectionContainer className="balanceSection">
              <Markdown children={'balanceText'} className="subText" />
              <ButtonGroupContainer>
                <Button children={'balanceButtonText'} />
              </ButtonGroupContainer>
            </FormSectionContainer>
            <FormSectionContainer></FormSectionContainer>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
// const validationSchema = Yup.object().shape({});
