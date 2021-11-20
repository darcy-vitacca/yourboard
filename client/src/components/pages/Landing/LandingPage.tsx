import React from "react";
import { Markdown } from "../../../shared/markdown";
import landingSVG from "../../../images/landing.svg";
import styled from "styled-components/macro";
import { device } from "../../../styles/devices";
import { Button } from "../../../shared/formElements/button";
import { useHistory } from "react-router";
import { LandingProjectExamples } from "./LandingProjectExamples";

export interface IImageContainerStyles {
  display: boolean;
}
export const StyledHeroImg = styled.img`
  width: 100%;
  @media ${device.mobileLrg} {
    max-width: 280px;
  }
  @media ${device.laptop} {
    max-width: 420px;
  }
  &.secondImage {
    @media ${device.laptop} {
      max-width: 380px;
    }
  }

  margin: 10px 0;
`;

export const LandingSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
  margin: 30px 0;
  background-color: ${({ theme }) => theme.colors.blue500};
  @media ${device.mobileLrg} {
    flex-direction: row;
  }
  border: 8px solid ${({ theme }) => theme.colors.blue500};
  border-radius: 10px;
`;

export const ImageSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
  margin: 30px 0;
  background-color: ${({ theme }) => theme.colors.blue500};
  @media ${device.tablet} {
    flex-direction: row;
  }
  border: 8px solid ${({ theme }) => theme.colors.blue500};
  border-radius: 10px;
`;

export const LandingCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.firstSection {
    @media ${device.tablet} {
      padding-right: 60px;
    }
  }
  &.secondSection {
    @media ${device.tablet} {
      padding-left: 60px;
    }
  }
`;

export const ExampleImages = styled.img`
  width: 100%;
  padding-bottom: 20px;
  @media ${device.mobileXL} {
    padding-right: 50px;
  }
  @media ${device.tablet} {
    max-width: 500px;
  }
`;

export const LandingPage = () => {
  const { push } = useHistory();
  return (
    <>
      <LandingSectionContainer>
        <Markdown children="# Welcome to" />
        <Markdown children="# urboard" className="landingHeading" />
      </LandingSectionContainer>
      <LandingSectionContainer>
        <LandingCTAContainer className="firstSection">
          <Markdown children=" **urboard** is a personal dashboard designed to help you **navigate the web easier**. Access it **across all your devices**  to manage your favourite links/bookmarks and **navigate faster to what matters most**. Collaborate with friends and organize your projects, ideas, and inspiration in one place. " />
          <div>
            <Markdown
              children="
#### Enhance your web browsing experience today. "
            />
            <Button
              text="Register Now ➥️"
              width="100%"
              type="button"
              onClick={() => push("/register")}
              bkgColor="green"
            />
          </div>
        </LandingCTAContainer>
        <StyledHeroImg src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/landing_yk3VjPjlNNB.svg?updatedAt=1635751648479" />
      </LandingSectionContainer>
      <LandingSectionContainer>
        <StyledHeroImg
          src="https://ik.imagekit.io/ticnymjalpq/undraw_launching_re_tomg__1__6e5DGtbObSj.svg?updatedAt=1637294212371"
          className="secondImage"
        />
        <LandingCTAContainer className="secondSection">
          <div>
            <Markdown
              children="
#### Want to check out an example urboard? "
            />
            <Markdown children="This is just one of the many customizable ways you can use urboard. See a setup of how you can improve your web browsing experience today.  " />
            <Markdown children="# 👇" />
          </div>
          <div>
            <Button
              text="View urboard 👀"
              width="100%"
              type="button"
              onClick={() => push("/example")}
              bkgColor="green"
            />
          </div>
        </LandingCTAContainer>
      </LandingSectionContainer>
      <LandingProjectExamples />
    </>
  );
};
