import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../../shared/footer";
import { Header } from "../../../shared/header";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import styled from "styled-components/macro";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green500};
`;

export const NotFound = () => {
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <h1>
              Page not found return <StyledLink to="/">home</StyledLink>
            </h1>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
