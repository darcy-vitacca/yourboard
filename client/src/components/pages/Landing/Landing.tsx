import React, { useEffect, useState } from "react";
import {
  SectionContainer,
  PageLayoutContainer,
  LinkSectionContainer,
  ProjectContainer,
} from "../../../shared/Layout.styles";
import { Markdown } from "../../../shared/markdown";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Link } from "../../../shared/link";
import { useHistory } from "react-router";
import {
  ProjectArrowContainer,
  ProjectIconContainer, ProjectNavContainer,
  SVGAddFriendIcon, SVGAddLinkIcon,
  SVGEditIcon,
  SVGLeftIcon,
  SVGRightIcon,
} from './Landing.styles';
import { landingConstants } from "../../../utils/constants/landing";
import _ from "lodash";
import { Loader } from "../../../shared/loaders";
import { PersonSection } from "../../../shared/personSection";
import {
  PersonContainer,
  PersonSectionContainer,
} from "../../../shared/personSection/PersonSection.styles";
import { Modal } from "../../../shared/modal/Modal";

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, loading, authenticated } = useAuthState();
  const { defaultProject } = landingConstants;
  const { push } = useHistory();
  const [modal, setModal] = useState(false);
  if (!authenticated && !loading) push("/login");

  useEffect(() => {
    (async () => {
      try {
        dispatch("LOADING");
        const res = await axios.get("/projects");
        dispatch("SET_PROJECTS", res.data);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, []);


  const handlePrevious = () => {
    dispatch("PREVIOUS_PROJECT");
  };
  const handleForward = () => {
    dispatch("NEXT_PROJECT");
  };

  return (
    <>
      {modal && <Modal setModal={setModal} modal={modal} />}
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          {currentProject && (
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
                  <ProjectNavContainer>
                    <SVGAddLinkIcon onClick={() => push('/add-links')} />
                    <Markdown
                      children="Add Link"
                      align="center"
                    />
                  </ProjectNavContainer>
                  <ProjectNavContainer>
                  <SVGAddFriendIcon onClick={() => setModal(true)} />
                    <Markdown
                      children="Add User"
                      align="center"
                    />
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
              <LinkSectionContainer>
                {currentProject && !_.isEmpty(currentProject.links)
                  ? currentProject.links.map((link) => (
                      <Link link={link} key={link.link_id} />
                    ))
                  : defaultProject.links.map((link) => (
                      <Link link={link} key={link.link_id} empty />
                    ))}
              </LinkSectionContainer>
            </ProjectContainer>
          )}
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
