import React from "react";
import { Markdown } from "../../../shared/markdown";
import landingSVG from "../../../images/landing.svg";
import styled from "styled-components/macro";
import { device } from "../../../styles/devices";
import { Button } from "../../../shared/formElements/button";
import { useHistory } from "react-router";

export interface IImageContainerStyles {
  display: boolean;
}
const StyledHeroImg = styled.img`
  width: 100%;
  @media ${device.mobileLrg} {
    max-width: 280px;
  }
  @media ${device.laptop} {
    max-width: 420px;
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
  @media ${device.tablet} {
    padding-right: 60px;
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
        <LandingCTAContainer>
          <Markdown children=" **urboard** is a personal dashboard designed to help you **navigate the web easier**. Access it **across all your devices**  to manage your favourite links/bookmarks and **navigate faster to what matters most**. Collaborate with friends and organize your projects, ideas, and inspiration in one place. " />
          <div>
            <Markdown
              children="
#### Enhance your web browsing experience today. "
            />
            <Button
              text="Register Now"
              width="100%"
              type="button"
              onClick={() => push("/register")}
              bkgColor="green"
            />
          </div>
        </LandingCTAContainer>
        <StyledHeroImg src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/landing_yk3VjPjlNNB.svg?updatedAt=1635751648479" />
      </LandingSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/recipeProject_2HQSnlY2H9D.png?updatedAt=1635751114271" />
        <div>
          <Markdown children="### Project Dashboard " />
          <Markdown children="The project dashboard is **where your links are**, simply click on any of these to **navigate to something**. In this example we at urboard use this project to store all of our recipes. " />
          <Markdown children="Anytime you see a recipe you like, add it here. **No more trying to find links** for recipes you have in  a lot of different places. The best part is when it's time to cook you wont have to bring your laptop as you can access this on your phone!" />
          <Markdown children="You **can invite friends** to this project too! So now we have a community where we can all post great recipes. Awesome! 🍔🍸🍔🍸 " />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/projects_aBmC5EMbSipD.png?updatedAt=1635751067952" />
        <div>
          <Markdown children="### urboard dashboard" />
          <Markdown children=" Navigate through all created projects here, this is **your** mission control" />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/addLinks_DuhczUdma2T.png?updatedAt=1635751023331" />
        <div>
          <Markdown children="### Add Links" />
          <Markdown children="**Add links** into a project, get rid of that pesky notepad of links on your computer. Simply drag and drop a link from another browser window or copy paste them all in here 😮 and see what happens!" />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/addProjects_wkWU725Lkuj.png?updatedAt=1635751063826" />
        <div>
          <Markdown children="### Add Project" />
          <Markdown children="**Add projects** of where you want your links to live, think of it like a subfolder." />
        </div>
      </ImageSectionContainer>
    </>
  );
};
