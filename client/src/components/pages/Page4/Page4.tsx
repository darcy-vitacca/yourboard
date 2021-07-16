import React from 'react';
import { useHistory } from 'react-router';
import { Footer } from '../../../shared/footer';
import { Button } from '../../../shared/formElements/button';
import { Header } from '../../../shared/header';
import {
  ButtonGroupContainer,
  PageLayoutContainer,
  SectionContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';

export const Page4 = () => {
  const { push } = useHistory();

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <Markdown children={'subHeading'} align="center" />
          <Markdown
            children={'termsInstructionsText'}
            align="center"
            className="termsInstructionsText"
          />
          <ButtonGroupContainer align="center">
            <Button
              onClick={() => push('/terms')}
              children={'termsButtonText'}
            />
          </ButtonGroupContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
