import React, { useEffect } from "react";
import {
  FormContainer,
  LoginRegisterLinkProjectContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
  StyledLink,
} from "../../../shared/Layout.styles";
import { useParams, useHistory, useLocation } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../shared/formElements/input";
import { Markdown } from "../../../shared/markdown";
import { Button } from "../../../shared/formElements/button";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Loader } from "../../../shared/loaders";
import queryString from "query-string";
import isEmpty from "lodash/isEmpty";

interface FormValue {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
const defaultValues = {
  email: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
};

interface QueryStrings {
  user: string;
}

export const Register = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, loading } = useAuthState();
  const { push } = useHistory();
  if (authenticated) push("/");
  const params: any = queryString.parse(useLocation().search);

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
    setValue,
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.post("/auth/register", formData);
      debugger;
      const resAuth = await axios.get("/auth/me");
      dispatch("LOGIN", resAuth.data);
      dispatch("STOP_LOADING");
      push("/");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      const error = err.response.data;
      if (error.email) setError("email", { message: error.email });
      if (error.firstName) setError("firstName", { message: error.firstName });
      if (error.lastName) setError("lastName", { message: error.lastName });
      if (error.password) setError("password", { message: error.password });
      if (error.username) setError("username", { message: error.username });
    }
  };

  useEffect(() => {
    if (params) {
      setValue("email", params.user);
    }
  }, []);

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LoginRegisterSectionContainer>
                  <Markdown children="### Register" />
                  <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />
                  <Input
                    type="email"
                    name="email"
                    width="100%"
                    helperText="Email"
                    label="EMAIL"
                    control={control}
                    defaultValue={""}
                    validation={errors?.email?.message || ""}
                    disabled={params !== null && !isEmpty(params)}
                  />
                  <Input
                    type="text"
                    name="username"
                    width="100%"
                    helperText="Username (6 characters or more without spaces)"
                    label="USERNAME"
                    control={control}
                    defaultValue={""}
                    validation={errors?.username?.message || ""}
                  />
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
                    type="text"
                    name="firstName"
                    width="100%"
                    label="FIRST NAME"
                    helperText="First Name"
                    control={control}
                    defaultValue={""}
                    validation={errors?.firstName?.message || ""}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    width="100%"
                    label="LAST NAME"
                    helperText="Last Name"
                    control={control}
                    defaultValue={""}
                    validation={errors?.lastName?.message || ""}
                  />

                  <Button text="Register" width="100%" type="submit" />
                  <LoginRegisterLinkProjectContainer>
                    <Markdown children="Already a urboard member?" />
                    <StyledLink to="/login">LOGIN </StyledLink>
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
