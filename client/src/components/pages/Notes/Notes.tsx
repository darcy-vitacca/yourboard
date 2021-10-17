import React, { useState } from "react";
import axios from "axios"
import {
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider , Controller} from "react-hook-form";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Markdown } from "../../../shared/markdown";
import { Loader } from "../../../shared/loaders";
import { DraftEditor } from './Editor';



const defaultValues = {
  description: "",
};

export const Notes = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, currentProject, loading, projects } = useAuthState();

  const { push } = useHistory();
  if (!authenticated) push("/login");
  if (!currentProject && projects) push("/");
  if (!currentProject && !projects) push("/add-project");

  const methods = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    // resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  //
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");

      const res = await axios.post(
        `/link/${currentProject?.url_name}`,
        // completedLinks
      );
      console.log("res", res);
      dispatch("STOP_LOADING");
      push("/");
    } catch (err: any) {
      console.log(err);
      // const error = err.response.data; //
    }
  };



  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown
                children={`# Notes for ${currentProject?.project_name} Project`}
              />

                <DraftEditor
                  name="description"
                  defaultValue={""}
                  control={control} />
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};


