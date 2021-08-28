import React, { useEffect } from "react";
import {
  SectionContainer,
  PageLayoutContainer,
  LinkSectionContainer,
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

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, user, projects, currentProjectIndex } =
    useAuthState();
  const { push } = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/projects");
        dispatch("SET_PROJECTS", res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (projects) {
        try {
          const res = await axios.get(
            `/project/${projects[currentProjectIndex].url_name}`
          );
          dispatch("SET_CURRENT_PROJECT", res.data);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [currentProjectIndex, projects]);
  //

  const handlePrevious = () => {
    dispatch("PREVIOUS_PROJECT");
  };
  const handleForward = () => {
    dispatch("NEXT_PROJECT");
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          {currentProject && (
            <>
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
                <SVGRightIcon onClick={() => handleForward()} />
              </ProjectArrowContainer>
              <LinkSectionContainer>
                {currentProject &&
                  currentProject.links &&
                  currentProject.links.map((link) => (
                    <Link link={link} key={link.link_id} />
                  ))}
              </LinkSectionContainer>
            </>
          )}
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
