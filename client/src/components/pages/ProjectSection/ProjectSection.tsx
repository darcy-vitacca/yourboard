import React from "react";
import { useHistory } from "react-router";
import { Markdown } from '../../../shared/markdown';
import { LinkProjectSectionContainer, ProjectContainer } from '../../../shared/Layout.styles';
import {  ProjectComponent } from '../../../shared/project/ProjectComponent';
import {
  ProjectArrowContainer, ProjectIconContainer,
  ProjectNavContainer,
  SVGFolderPlusIcon,
} from '../Landing/Landing.styles';



export const ProjectSection = ({projects}) => {
  const { push } = useHistory();
  return (
    <>
    <ProjectContainer >
      <Markdown
        children={"# Folder"}
        align="center"
      />
      <Markdown
        children={`### Select a folder` || ""}
        align="center"
      />
      <ProjectArrowContainer>
        <ProjectIconContainer>
          <ProjectNavContainer>
            <SVGFolderPlusIcon onClick={() => push("/add-folder")}/>
            <Markdown
              children="Add Folder"
              align="center"
              className="arrowContainerIconText"
            />
          </ProjectNavContainer>
        </ProjectIconContainer>
      </ProjectArrowContainer>
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





