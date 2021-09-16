import React from "react";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";

import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";

interface FormValue {
  email: string;
  password: string;
}
const defaultValues = {
  email: "",
  password: "",
};

export const MyProfile = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  const { push } = useHistory();
  if (!authenticated) push("/login");

  const methods = useForm<FormValue>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  const { handleSubmit, setError } = methods;

  const onSubmit = async (formData: any) => {
    try {
      console.log("formData", formData);
      const res = await axios.post("/auth/login", formData);
      dispatch("LOGIN", res.data);
      push("/");
    } catch (err: any) {
      const error = err.response.data;
      if (error.email) setError("email", { message: error.email });
      if (error.password) setError("password", { message: error.password });
    }
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>My Profile</h1>
                <h1>Coming Soon.....</h1>
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
