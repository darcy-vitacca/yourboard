import React from "react";
import { Markdown } from '../../../shared/markdown';
import { LinkProjectSectionContainer, ProjectContainer } from '../../../shared/Layout.styles';
import {  ProjectComponent } from '../../../shared/project/ProjectComponent';



export const ProjectSection = ({projects}) => {
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





