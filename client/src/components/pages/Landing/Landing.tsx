import React, { useEffect } from 'react';
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
import axios from 'axios';

export const Landing = () => {
  useEffect(() => {
 (async () => {
    const res = await axios.post('/api/project/scotpac');
    console.log('res', res);
  })();
  }, []);
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          <Markdown children={'subHeading'} align="center" />
          <Input fieldName="test" />

        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
