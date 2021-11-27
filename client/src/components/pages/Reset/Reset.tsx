import React from "react";
import {
  FormContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../shared/formElements/input";
import { Markdown } from "../../../shared/markdown";
import { Button } from "../../../shared/formElements/button";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Loader } from "../../../shared/loaders";
import isEmpty from "lodash/isEmpty";

interface FormValue {
  password: string;
  confirmPassword: string;
}
const defaultValues = {
  password: "",
  confirmPassword: "",
};

export const Reset = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, loading } = useAuthState();
  const { push } = useHistory();
  const { id }: any = useParams();

  if (isEmpty(id)) push("/login");
  if (authenticated) push("/");

  const methods = useForm<any>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.patch("/auth/reset", {
        password: formData.password,
        id: id,
      });
      dispatch("STOP_LOADING");
      push("/login");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      const error = err.response.data;
      if (error?.password) setError("password", { message: error.password });
    }
  };

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LoginRegisterSectionContainer>
                  <Markdown children="### Reset" />
                  <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />

                  <Input
                    type="password"
                    name="password"
                    width="100%"
                    helperText="Password (A combination of 8 letters and numbers, including uppercase and lower case, without spaces)"
                    label="PASSWORD"
                    control={control}
                    defaultValue={""}
                    validation={errors?.password?.message || ""}
                  />
                  <Input
                    type="password"
                    name="confirmPassword"
                    width="100%"
                    label="CONFIRM PASSWORD"
                    control={control}
                    defaultValue={""}
                    validation={errors?.confirmPassword?.message || ""}
                  />

                  <Button text="UPDATE PASSWORD" width="100%" type="submit" />
                </LoginRegisterSectionContainer>
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};

export const validationSchema = Yup.object({
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
