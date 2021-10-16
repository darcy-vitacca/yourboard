import React, { useState } from "react";
import { useAuthDispatch} from "../../context/context";
import { useHistory } from "react-router";
import { landingConstants } from "../../../utils/constants/landing";
import isEmpty from "lodash/isEmpty";
import { PersonSection } from "../../../shared/personSection";
import {
  PersonContainer,
  PersonSectionContainer,
} from "../../../shared/personSection/PersonSection.styles";
import { Modal } from "../../../shared/modal/Modal";
import { Markdown } from '../../../shared/markdown';
import {
  ProjectArrowContainer,
  ProjectIconContainer,
  ProjectNavContainer, SVGAddFriendIcon, SVGAddLinkIcon, SVGFolderIcon,
  SVGLeftIcon, SVGRightIcon,
} from '../Landing/Landing.styles';
import { LinkProjectSectionContainer, ProjectContainer } from '../../../shared/Layout.styles';
import { LinkComponent } from '../../../shared/link';

export const LinkSection= ({currentProject}) => {
  const dispatch = useAuthDispatch();
  const { defaultLinks } = landingConstants;
  const { push } = useHistory();

  const [modal, setModal] = useState(false);


  const handlePrevious = () => {
    dispatch("PREVIOUS_PROJECT");
  };
  const handleForward = () => {
    dispatch("NEXT_PROJECT");
  };

  return (
    <>
    {modal && <Modal setModal={setModal} modal={modal} />}
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
        <SVGLeftIcon onClick={() => handlePrevious()} />
        <ProjectIconContainer>

          <ProjectNavContainer onClick={() => push("/add-links")}>
            <SVGAddLinkIcon />
            <Markdown children="Add Link" align="center" className="arrowContainerIconText" />
          </ProjectNavContainer>
          <ProjectNavContainer onClick={() => setModal(true)}>
            <SVGAddFriendIcon />
            <Markdown children="Add User" align="center"  className="arrowContainerIconText" />
          </ProjectNavContainer>
          <ProjectNavContainer onClick={() => {
            dispatch("RETURN_INITIAL_STATE_CURRENT_PROJECT")
            push("/")
          }}>
            <SVGFolderIcon />
            <Markdown children="Projects" align="center" className="arrowContainerIconText" />
          </ProjectNavContainer>
        </ProjectIconContainer>
        <SVGRightIcon onClick={() => handleForward()} />
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
    </>
  );
};





