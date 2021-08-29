import React from "react";
import * as Yup from "yup";
import {
  Form,
  FormContainer,
  LoginRegisterLinkContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
  StyledLink,
} from "../../../shared/Layout.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";
import { useForm, FormProvider, Controller } from "react-hook-form";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import Input from "../../../shared/formElements/input";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";

interface FormValue {
  url_name: string;
  project_name: string;
  description: string;
}
const defaultValues = {
  url_name: "",
  project_name: "",
  description: "",
};

export const AddProject = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  const { push } = useHistory();
  if (!authenticated) push("/login");

  const methods = useForm<FormValue>({
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
    register,
    watch,
    setValue,
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.post("/project", formData);
      dispatch("STOP_LOADING");
      push("/");
    } catch (err) {
      const error = err.response.data;
      if (error.url_name) setError("url_name", { message: error.url_name });
      if (error.project_name)
        setError("project_name", { message: error.project_name });
      if (error.description)
        setError("description", { message: error.description });
    }
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Project 📁 </h1>
                <Input
                  type="text"
                  name="project_name"
                  width="100%"
                  helperText="Project Name"
                  label="PROJECT NAME"
                  control={control}
                  defaultValue={""}
                  validation={errors?.project_name?.message || ""}
                />
                <Input
                  type="text"
                  name="url_name"
                  width="100%"
                  helperText="URL Name (Alphanumeric only) *"
                  label="URL NAME"
                  control={control}
                  defaultValue={""}
                  validation={errors?.url_name?.message || ""}
                />
                <TextArea
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue("description", e.target.value)
                  }
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  label="A short description about the project"
                  validation={errors?.description?.message || ""}
                />
                <Button text="Add Project" width="100%" type="submit" />
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};

const validationSchema = Yup.object().shape({
  project_name: Yup.string().required("Required"),
  url_name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9_]*$/, {
      message: "Must contain letters and numbers only",
      excludeEmptyString: true,
    }),
  description: Yup.string().required("Required"),
});
