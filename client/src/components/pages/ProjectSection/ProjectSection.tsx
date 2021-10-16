import React from "react";
import { Markdown } from '../../../shared/markdown';
import { LinkProjectSectionContainer, ProjectContainer } from '../../../shared/Layout.styles';
import {  ProjectComponent } from '../../../shared/project/ProjectComponent';
import {landingConstants} from '../../../utils/constants/landing'
import { useAuthState } from '../../context/context';

export const ProjectSection = ({projects}) => {
const {defaultProject} = landingConstants
  const {  loading } = useAuthState();

  console.log('useAuthState()', useAuthState());
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
      {

        <LinkProjectSectionContainer>
          {projects &&
          projects.map(project =>
            <ProjectComponent
              project={project}
              key={project?.project_id}
              empty={project?.project_id === "default_project"}/>)

          }
        </LinkProjectSectionContainer>
      }

    </ProjectContainer>
    </>
  );
};





