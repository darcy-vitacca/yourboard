import React, { useEffect } from "react";
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
  ProjectIconContainer,
  SVGAddFriendIcon,
  SVGEditIcon,
  SVGLeftIcon,
  SVGRightIcon,
} from "./Landing.styles";
import { landingConstants } from "../../../utils/constants/landing";
import _ from "lodash";
import { Loader } from "../../../shared/loaders";
import { PersonSection } from "../../../shared/personSection";
import {
  PersonContainer,
  PersonSectionContainer,
} from "../../../shared/personSection/PersonSection.styles";

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, loading, authenticated } = useAuthState();
  const { defaultProject } = landingConstants;
  const { push } = useHistory();
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

  console.log("useAuthState();", useAuthState());

  return (
    <>
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
                  <SVGEditIcon onClick={() => console.log("Edit")} />
                  <SVGAddFriendIcon onClick={() => console.log("Add friend")} />
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
                      <Link link={link} key={link.link_id} />
                    ))}
              </LinkSectionContainer>
            </ProjectContainer>
          )}
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
