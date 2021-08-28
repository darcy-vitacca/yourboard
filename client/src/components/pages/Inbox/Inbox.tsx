import React from "react";
import {
  Form,
  FormContainer,
  LoginRegisterLinkContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
  StyledLink,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider, Controller } from "react-hook-form";
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

export const Inbox = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

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
    register,
    watch,
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {};
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Inbox</h1>
                <h1>Coming Soon.....</h1>
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
