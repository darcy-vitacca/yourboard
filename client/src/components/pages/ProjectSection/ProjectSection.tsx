import React from "react";
import { Markdown } from '../../../shared/markdown';
import { LinkProjectSectionContainer, ProjectContainer } from '../../../shared/Layout.styles';
import {  ProjectComponent } from '../../../shared/project/ProjectComponent';
import {landingConstants} from '../../../utils/constants/landing'

export const ProjectSection = ({projects}) => {
const {defaultProject} = landingConstants

  return (
    <>
    <ProjectContainer >
      <Markdown
        children={"# Projects"}
        align="center"
      />
      <Markdown
        children={`### Select a project` || ""}
        align="center"
      />
    <LinkProjectSectionContainer>
      {projects ? projects.map((project => <ProjectComponent  project={project} key={project?.project_id}/>))
        : <ProjectComponent  project={defaultProject} key={defaultProject?.project_id} empty/>
      }
    </LinkProjectSectionContainer>
    </ProjectContainer>
    </>
  );
};





