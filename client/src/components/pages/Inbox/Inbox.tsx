import React from "react";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useAuthState } from "../../context/context";

interface FormValue {
  email: string;
  password: string;
}
const defaultValues = {
  email: "",
  password: "",
};

export const Inbox = () => {
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
  const { handleSubmit } = methods;

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
