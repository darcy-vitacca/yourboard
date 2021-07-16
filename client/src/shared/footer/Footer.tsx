import React from 'react';
import { globalConstants } from '../../utils/constants/global';
import { Line } from '../Layout.styles';
import { Markdown } from '../markdown';
import { FooterLinkSection, FooterLinks } from './Footer.styles';

export const Footer = () => {
  return (
    <>
      <FooterLinkSection>
        <FooterLinks></FooterLinks>
      </FooterLinkSection>
    </>
  );
};
