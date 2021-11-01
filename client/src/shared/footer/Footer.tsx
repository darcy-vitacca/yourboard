import React from "react";
import { FooterLinks, FooterLinkSection } from "./Footer.styles";
import { useHistory } from "react-router";
import { FacebookCircle } from "@styled-icons/boxicons-logos/FacebookCircle";
import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import styled from "styled-components/macro";

const FacebookIcon = styled(FacebookCircle)`
  width: 26px;
  color: white;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const TwitterIcon = styled(Twitter)`
  width: 26px;
  color: white;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const Footer = () => {
  const { push } = useHistory();
  return (
    <FooterLinkSection>
      <a href="https://www.facebook.com/urboard">
        <FacebookIcon />
      </a>
      <a href="https://twitter.com/urboard">
        <TwitterIcon />
      </a>
      <FooterLinks onClick={() => push("/contact")}>Contact</FooterLinks>
      <FooterLinks onClick={() => push("/privacy")}>Privacy Policy</FooterLinks>
    </FooterLinkSection>
  );
};
