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
  SVGLeftIcon,
  SVGRightIcon,
} from "./Landing.styles";
import { landingConstants } from "../../../utils/constants/landing";
import _ from "lodash";

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, user, projects, currentProjectIndex } =
    useAuthState();
  const { defaultProject } = landingConstants;
  const { push } = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/projects");
        console.log("res.data", res.data);
        dispatch("SET_PROJECTS", res.data);
      } catch (err) {
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
      <PageLayoutContainer>
        <SectionContainer>
          {projects &&
            projects.map((project, idx) => {
              console.log(currentProjectIndex === idx);
              return (
                <ProjectContainer
                  key={project.project_id}
                  showProject={currentProjectIndex === idx}
                >
                  <Markdown
                    children={`# ${project.project_name}` || ""}
                    align="center"
                  />

                  <Markdown
                    children={`### ${project.description}` || ""}
                    align="center"
                  />
                  <ProjectArrowContainer>
                    <SVGLeftIcon onClick={() => handlePrevious()} />
                    <SVGRightIcon onClick={() => handleForward()} />
                  </ProjectArrowContainer>
                  <LinkSectionContainer>
                    {project && !_.isEmpty(project.links)
                      ? project.links.map((link) => (
                          <Link link={link} key={link.link_id} />
                        ))
                      : defaultProject.links.map((link) => (
                          <Link link={link} key={link.link_id} />
                        ))}
                  </LinkSectionContainer>
                </ProjectContainer>
              );
            })}
          {/*{currentProject && (*/}
          {/*  <ProjectContainer key={currentProject.project_id}>*/}
          {/*    <Markdown*/}
          {/*      children={`# ${currentProject.project_name}` || ""}*/}
          {/*      align="center"*/}
          {/*    />*/}

          {/*    <Markdown*/}
          {/*      children={`### ${currentProject.description}` || ""}*/}
          {/*      align="center"*/}
          {/*    />*/}
          {/*    <ProjectArrowContainer>*/}
          {/*      <SVGLeftIcon onClick={() => handlePrevious()} />*/}
          {/*      <SVGRightIcon onClick={() => handleForward()} />*/}
          {/*    </ProjectArrowContainer>*/}
          {/*    <LinkSectionContainer>*/}
          {/*      {currentProject && !_.isEmpty(currentProject.links)*/}
          {/*        ? currentProject.links.map((link) => (*/}
          {/*            <Link link={link} key={link.link_id} />*/}
          {/*          ))*/}
          {/*        : defaultProject.links.map((link) => (*/}
          {/*            <Link link={link} key={link.link_id} />*/}
          {/*          ))}*/}
          {/*    </LinkSectionContainer>*/}
          {/*  </ProjectContainer>*/}
          {/*)}*/}
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
