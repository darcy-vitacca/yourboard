import React, { useEffect } from "react";
import {
  SectionContainer,
  PageLayoutContainer,
} from "../../../shared/Layout.styles";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { useHistory } from "react-router";
import { Loader } from "../../../shared/loaders";
import { LinkSection } from '../LinkSection/LinkSection';
import { ProjectSection } from '../ProjectSection/ProjectSection';

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const { currentProject, loading, authenticated ,projects} = useAuthState();
  const { push } = useHistory();
  if (!authenticated && !loading) push("/login");


  useEffect(() => {
    (async () => {
      try {
        dispatch("LOADING");
        const res = await axios.get("/projects");
        dispatch("SET_PROJECTS", res.data);
      } catch (err: any) {
        dispatch("STOP_LOADING");
        if(err?.response?.data?.project === "Projects ot Found"){
          push("/add-project")
        }
        console.log(err.response);
      }
    })();
  }, []);

  return (
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          {!currentProject ? <ProjectSection projects={projects} /> :
         <LinkSection currentProject={currentProject}/>
          }
        </SectionContainer>
      </PageLayoutContainer>
  );
};

