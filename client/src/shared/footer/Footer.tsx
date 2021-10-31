import React from "react";
import { FooterLinks, FooterLinkSection } from "./Footer.styles";
import { useHistory } from "react-router";

export const Footer = () => {
  const { push } = useHistory();
  return (
    <FooterLinkSection>
      <FooterLinks onClick={() => push("/contact")}>Contact</FooterLinks>
      <FooterLinks onClick={() => push("/privacy")}>Privacy Policy</FooterLinks>
    </FooterLinkSection>
  );
};
