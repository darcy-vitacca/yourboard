import React, { useEffect } from 'react';
import {
  SectionContainer,
  PageLayoutContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';
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
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
