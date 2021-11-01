import React from "react";
import {
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import styled from "styled-components/macro";
import { Markdown } from "../../../shared/markdown";
import { device } from "../../../styles/devices";

const Dot = styled.span`
  height: 25px;
  width: 25px;
  background-color: transparent;
  border: 5px solid white;
  border-radius: 50%;
  display: inline-block;
`;
const CompletedDot = styled.span`
  height: 25px;
  width: 25px;
  background-color: #10b981;
  border: 5px solid white;
  border-radius: 50%;
  display: inline-block;
`;

const RoadMapSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
`;
const RoadMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.tablet} {
    margin-left: 70px;
    width: 600px;
    margin: 0 auto;
  }
`;

export const Line = styled.div`
  border-left: 6px solid white;
  height: 200px;
  left: 50%;
  margin-left: 10px;
  top: 0;
`;
const RoadMapArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  margin-right: 10px;
`;
const RoadMapTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-top: 70px;
  padding-right: 10px;
`;

export const RoadMap = () => {
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          <RoadMapContainer>
            <Markdown children="# Road Map" />
            <Markdown children="#### If you have any feature requests please reach out via our contact page or chat bot." />
            <RoadMapSection>
              <RoadMapArrowContainer>
                <CompletedDot />
                <Markdown children="V1.0-11/21" />
                <Line />
              </RoadMapArrowContainer>
              <RoadMapTextContainer>
                <Markdown children="• Soft Launch Beta" />
                <Markdown children="• Go through user interviews to gain feedback about products and what features users need." />
              </RoadMapTextContainer>
            </RoadMapSection>
            <RoadMapSection>
              <RoadMapArrowContainer>
                <Dot />
                <Markdown children="V1.1-12/21" />
                <Line />
              </RoadMapArrowContainer>
              <RoadMapTextContainer>
                <Markdown children="• Chrome extension for ease of use" />
                <Markdown children="• Drag and reorder functionality on projects and links" />
                <Markdown children="• Allow tagging, sorting, searching and filtering  on projects and links" />
                <Markdown children="• Edit functionality on projects and links" />
                <Markdown children="• Delete functionality on projects and links" />
                <Markdown children="• Allow more customization of how projects and links look" />
                <Markdown children="• Customization of how the dashboard looks" />
                <Markdown children="• Further functionality added to notes" />
                <Markdown children="• Establish Branding" />
              </RoadMapTextContainer>
            </RoadMapSection>
            <RoadMapSection>
              <RoadMapArrowContainer>
                <Dot />
                <Markdown children="V1.2-2022" />
                <Line />
              </RoadMapArrowContainer>
              <RoadMapTextContainer>
                <Markdown children="• Public mode, allow a board to be displayed to even non-members" />
              </RoadMapTextContainer>
            </RoadMapSection>
            <RoadMapSection>
              <RoadMapArrowContainer>
                <Dot />
              </RoadMapArrowContainer>
              <RoadMapTextContainer></RoadMapTextContainer>
            </RoadMapSection>
          </RoadMapContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
