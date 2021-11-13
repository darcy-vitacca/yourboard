import React from "react";
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

export const AddProject = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  const { push } = useHistory();
  if (!authenticated) push("/login");

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
      const res = await axios.post("/project", formData);
      dispatch("ADD_NEW_PROJECT", res?.data?.project);
      push("/");
    } catch (err: any) {
      const error = err.response.data;
      // if (error.url_name) setError("url_name", { message: error.url_name });
      if (error.project_name)
        setError("project_name", { message: error.project_name });
      if (error.description)
        setError("description", { message: error.description });
    }
  };
  return (
    <>
      <DragDrop>
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
                    defaultValue={defaultValues.project_name}
                    validation={errors?.project_name?.message || ""}
                  />
                  {/*<Input*/}
                  {/*  type="text"*/}
                  {/*  name="url_name"*/}
                  {/*  width="100%"*/}
                  {/*  helperText="URL Name (Alphanumeric only) *"*/}
                  {/*  label="URL NAME"*/}
                  {/*  control={control}*/}
                  {/*  defaultValue={defaultValues.url_name}*/}
                  {/*  validation={errors?.url_name?.message || ""}*/}
                  {/*/>*/}
                  <TextArea
                    setValue={setValue}
                    name="description"
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
      </DragDrop>
    </>
  );
};
