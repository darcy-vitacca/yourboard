import React, { useState } from "react";
import {
  FormContainer,
  LoginRegisterLinkProjectContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
  StyledLink,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../shared/formElements/input";
import { Markdown } from "../../../shared/markdown";
import { Button } from "../../../shared/formElements/button";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Loader } from "../../../shared/loaders";

interface FormValue {
  email: string;
  password: string;
}
const defaultValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, loading } = useAuthState();
  const { push } = useHistory();
  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState("");

  if (authenticated) push("/");

  const methods = useForm<FormValue>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: undefined,
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
      if (reset) {
        const res = await axios.post("/auth/forgot", formData);
        setSuccess(res?.data?.email);
      } else {
        const res = await axios.post("/auth/login", formData);
        dispatch("LOGIN", res.data);
        push("/");
      }
      dispatch("STOP_LOADING");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      const error = err.response.data;
      if (error?.email) setError("email", { message: error.email });
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
                  <Markdown children={!reset ? "### Login" : "### Reset"} />
                  <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />
                  <Input
                    type="email"
                    name="email"
                    width="100%"
                    label="EMAIL"
                    control={control}
                    defaultValue={""}
                    validation={errors?.email?.message || ""}
                  />
                  {!reset && (
                    <Input
                      type="password"
                      name="password"
                      width="100%"
                      label="PASSWORD"
                      control={control}
                      defaultValue={""}
                      validation={errors?.password?.message || ""}
                    />
                  )}

                  <LoginRegisterLinkProjectContainer>
                    <Markdown
                      children={!reset ? "Forgot Password?" : "Go back to"}
                    />
                    <StyledLink to="#" onClick={() => setReset(!reset)}>
                      {!reset ? "RESET" : "LOGIN"}
                    </StyledLink>
                  </LoginRegisterLinkProjectContainer>
                  {success && reset && (
                    <Markdown children={success} className="successText" />
                  )}
                  <Button
                    text={!reset ? "LOGIN" : "RESET"}
                    width="100%"
                    type="submit"
                  />
                  <LoginRegisterLinkProjectContainer>
                    <Markdown children="New to yourboard?" />
                    <StyledLink to="/register">REGISTER</StyledLink>
                  </LoginRegisterLinkProjectContainer>
                </LoginRegisterSectionContainer>
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
