import React, { useEffect, FC } from "react";
import {
  SectionContainer,
  PageLayoutContainer,
} from "../../../shared/Layout.styles";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { useHistory } from "react-router";
import { Loader } from "../../../shared/loaders";
import { LinkSection } from "../LinkSection/LinkSection";
import { ProjectSection } from "../ProjectSection/ProjectSection";
import { DragDrop } from "../../../shared/dragDrop";
import { LandingPage } from "./LandingPage";

export const Landing: FC = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, loading, authenticated, projects } = useAuthState();
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      try {
        dispatch("LOADING");
        const res = await axios.get("/projects");
        dispatch("SET_PROJECTS", res.data);
      } catch (err: any) {
        dispatch("STOP_LOADING");
        if (err?.response?.data?.project === "Projects not Found") {
          push("/add-project");
        }
        // console.log(err.response);
      }
    })();
  }, []);

  return (
    <>
      <DragDrop>
        <PageLayoutContainer>
          <SectionContainer>
            {loading && <Loader />}
            {!authenticated && !loading ? (
              <LandingPage />
            ) : !currentProject ? (
              <ProjectSection projects={projects} />
            ) : (
              <LinkSection
                currentProject={currentProject}
                key={currentProject?.project_id}
              />
            )}
          </SectionContainer>
        </PageLayoutContainer>
      </DragDrop>
    </>
  );
};
