import React, { useState } from "react";
import { useHistory } from "react-router";
import { Markdown } from "../../../shared/markdown";
import {
  LinkProjectSectionContainer,
  ProjectContainer,
} from "../../../shared/Layout.styles";
import { ProjectComponent } from "../../../shared/project/ProjectComponent";
import {
  ProjectArrowContainer,
  ProjectIconContainer,
  ProjectNavContainer,
  SVGFolderPlusIcon,
} from "../Landing/Landing.styles";
import { useAuthState } from "../../context/context";
import { ModalCommon } from "../../../shared/modal/ModalCommon";

export const ProjectSection = ({ projects }) => {
  const { push } = useHistory();
  const { authenticated } = useAuthState();
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <ModalCommon setModal={setModal} modal={modal} />}
      <ProjectContainer>
        <Markdown children={"# Folders"} align="center" />
        <Markdown children={`### Select a folder` || ""} align="center" />
        <ProjectArrowContainer>
          <ProjectIconContainer>
            <ProjectNavContainer>
              <SVGFolderPlusIcon
                onClick={() =>
                  authenticated ? push("/add-folder") : setModal(true)
                }
              />
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
              projects.map((project) => (
                <ProjectComponent
                  project={project}
                  key={project?.project_id}
                  empty={project?.project_id === "default_project"}
                />
              ))}
          </LinkProjectSectionContainer>
        }
      </ProjectContainer>
    </>
  );
};
