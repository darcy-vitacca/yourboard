import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import Input from "../../../shared/formElements/input";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import { DragDrop } from "../../../shared/dragDrop";
import { Loader } from "../../../shared/loaders";

type FormValue = {
  // url_name: string;
  project_name: string;
  description: string;
};
const defaultValues = {
  // url_name: "",
  project_name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  project_name: Yup.string().nullable().required("Required"),
  // url_name: Yup.string()
  //   .nullable()
  //   .required("Required")
  //   .matches(/^[a-zA-Z0-9_]*$/, {
  //     message: "Must contain letters and numbers only",
  //     excludeEmptyString: true,
  //   }),
  description: Yup.string().nullable().required("Required"),
});

export const EditProject = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, editingProject, loading } = useAuthState();
  const { push } = useHistory();
  const [projectId, setProjectId] = useState("");
  if (!authenticated) push("/login");
  if (!editingProject) push("/");

  const methods = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.patch(`/project/${projectId}`, formData);
      dispatch("UPDATE_CURRENT_PROJECT", res?.data?.project);
      push("/");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      const error = err.response.data;
      if (error.project_name)
        setError("project_name", { message: error.project_name });
      if (error.description)
        setError("description", { message: error.description });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (editingProject) {
          setProjectId(editingProject.project_id);
          setValue("project_name", editingProject.project_name);
          setValue("description", editingProject.description);
        }
      } catch (err: any) {
        console.log(err.response);
      }
    })();
    return () => {
      dispatch("REMOVE_EDIT_PROJECT");
    };
  }, []);
  return (
    <>
      <DragDrop>
        <PageLayoutContainer>
          {loading && <Loader />}
          <SectionContainer align="center">
            <FormContainer>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Edit Folder 📁 </h1>
                  <Input
                    type="text"
                    name="project_name"
                    width="100%"
                    helperText="Folder Name"
                    label="FOLDER NAME"
                    control={control}
                    defaultValue={defaultValues.project_name}
                    validation={errors?.project_name?.message || ""}
                  />
                  <TextArea
                    setValue={setValue}
                    name="description"
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                    label="A short description about the project"
                    validation={errors?.description?.message || ""}
                    placeholder="TYPE HERE..."
                  />
                  <Button text="Update Folder" width="100%" type="submit" />
                </form>
              </FormProvider>
            </FormContainer>
          </SectionContainer>
        </PageLayoutContainer>
      </DragDrop>
    </>
  );
};
