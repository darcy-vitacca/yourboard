import React, { useState } from "react";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { useHistory } from "react-router";
import { landingConstants } from "../../../utils/constants/landing";
import isEmpty from "lodash/isEmpty";
import { PersonSection } from "../../../shared/personSection";
import {
  PersonContainer,
  PersonSectionContainer,
} from "../../../shared/personSection/PersonSection.styles";
import { Modal } from "../../../shared/modal/Modal";
import { Markdown } from "../../../shared/markdown";
import {
  ProjectArrowContainer,
  ProjectIconContainer,
  ProjectNavContainer,
  SVGAddFriendIcon,
  SVGAddLinkIcon,
  SVGFolderIcon,
  SVGLeftIcon,
  SVGNotepadIcon,
  SVGRightIcon,
} from "../Landing/Landing.styles";
import {
  LinkProjectSectionContainer,
  ProjectContainer,
} from "../../../shared/Layout.styles";
import { LinkComponent } from "../../../shared/link";
import { DragDrop } from "../../../shared/dragDrop";
import { ModalCommon } from "../../../shared/modal/ModalCommon";

export const LinkSection = ({ currentProject }) => {
  const dispatch = useAuthDispatch();
  const { authenticated, projects } = useAuthState();
  const { defaultLinks } = landingConstants;
  const { push } = useHistory();

  const [modal, setModal] = useState(false);
  const [modalExample, setModalExample] = useState(false);

  const handlePrevious = () => {
    dispatch("PREVIOUS_PROJECT");
  };
  const handleForward = () => {
    dispatch("NEXT_PROJECT");
  };
  const moreThanOneProject = projects && projects?.length > 1;

  return (
    <>
      <DragDrop>
        {modal && <Modal setModal={setModal} modal={modal} />}
        {modalExample && (
          <ModalCommon setModal={setModalExample} modal={modalExample} />
        )}
        <ProjectContainer key={currentProject.project_id}>
          <Markdown
            children={`# ${currentProject.project_name}` || ""}
            align="center"
          />

          <Markdown
            children={`### ${currentProject.description}` || ""}
            align="center"
          />
          <ProjectArrowContainer>
            {moreThanOneProject && (
              <SVGLeftIcon
                onClick={() => handlePrevious()}
                moreThanOneProject={moreThanOneProject}
              />
            )}

            <ProjectIconContainer>
              <ProjectNavContainer
                onClick={() =>
                  authenticated ? push("/add-links") : setModalExample(true)
                }
              >
                <SVGAddLinkIcon />
                <Markdown
                  children="Add Link"
                  align="center"
                  className="arrowContainerIconText"
                />
              </ProjectNavContainer>
              <ProjectNavContainer
                onClick={() =>
                  authenticated ? setModal(true) : setModalExample(true)
                }
              >
                <SVGAddFriendIcon />
                <Markdown
                  children="Add User"
                  align="center"
                  className="arrowContainerIconText"
                />
              </ProjectNavContainer>
              <ProjectNavContainer
                onClick={() => {
                  dispatch("RETURN_INITIAL_STATE_CURRENT_PROJECT");
                  authenticated ? push("/") : push("/example");
                }}
              >
                <SVGFolderIcon />
                <Markdown
                  children="Folders"
                  align="center"
                  className="arrowContainerIconText"
                />
              </ProjectNavContainer>
            </ProjectIconContainer>
            {moreThanOneProject && (
              <SVGRightIcon
                onClick={() => handleForward()}
                moreThanOneProject={moreThanOneProject}
              />
            )}
          </ProjectArrowContainer>
          <PersonSectionContainer>
            <PersonContainer>
              {currentProject?.project_users &&
                currentProject?.project_users.map((user) => (
                  <PersonSection project_user={user} />
                ))}
            </PersonContainer>
          </PersonSectionContainer>
          <LinkProjectSectionContainer>
            {currentProject && !isEmpty(currentProject.links)
              ? currentProject.links.map((link) => (
                  <LinkComponent link={link} key={link.link_id} />
                ))
              : defaultLinks.links.map((link) => (
                  <LinkComponent link={link} key={link.link_id} empty />
                ))}
          </LinkProjectSectionContainer>
        </ProjectContainer>
      </DragDrop>
    </>
  );
};
