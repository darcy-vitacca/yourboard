import React, { useEffect, FC } from "react";
import {
  SectionContainer,
  PageDashboardContainer,
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
      // if (authenticated) {
      try {
        dispatch("LOADING");
        const res = await axios.get("/projects");
        dispatch("SET_PROJECTS", res.data);
      } catch (err: any) {
        dispatch("STOP_LOADING");
        if (err?.response?.data?.project === "Projects not Found") {
          push("/add-folder");
        }
      }
      // }
    })();
  }, []);

  return (
    <>
      <DragDrop>
        <PageDashboardContainer>
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
        </PageDashboardContainer>
      </DragDrop>
    </>
  );
};
