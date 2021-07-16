import React from 'react';
import { Footer } from '../../../shared/footer';
import { Header } from '../../../shared/header';
import {
  SectionContainer,
  PageLayoutContainer,
  ButtonGroupContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';
import { Button } from '../../../shared/formElements/button';
import { useHistory } from 'react-router';
import Input from '../../../shared/formElements/input';

export const Landing = () => {
  const { push } = useHistory();
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          <Markdown children={'subHeading'} align="center" />
          <Input fieldName="test" />
          <ButtonGroupContainer align="center">
            <Button onClick={() => push('/activate')} className="centerLeftBtn">
              {'activateCardButtonText'}
            </Button>
            <Button children={'balanceButtonText'} className="centerRightBtn" />
          </ButtonGroupContainer>
        </SectionContainer>

      </PageLayoutContainer>
    </>
  );
};
