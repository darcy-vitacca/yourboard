import React, { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { Markdown } from "../../../shared/markdown";
import Input from "../../../shared/formElements/input";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import { useAuthDispatch, useAuthState } from "../../context/context";
import isEmpty from "lodash/isEmpty";
import { Loader } from "../../../shared/loaders";

type FormValue = {
  name: string;
  email: string;
  message: string;
};

const defaultValues = {
  name: "",
  email: "",
  message: "",
};

export const Contact: FC = () => {
  const dispatch = useAuthDispatch();
  const { loading } = useAuthState();
  const [success, setSuccess] = useState("");
  const methods = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.post("/auth/contact", formData);
      setSuccess(res?.data?.success);
      dispatch("STOP_LOADING");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      console.log("err", err);
    }
  };
  return (
    <PageLayoutContainer>
      <SectionContainer>
        {loading && <Loader />}
        <FormContainer>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown children="# Contact" />
              <Input
                type="text"
                name="name"
                width="100%"
                label="NAME"
                defaultValue={""}
                validation={errors?.name?.message || ""}
              />
              <Input
                type="email"
                name="email"
                width="100%"
                label="EMAIL"
                defaultValue={""}
                validation={errors?.email?.message || ""}
              />
              <TextArea
                setValue={setValue}
                name="message"
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                label="Message"
                validation={errors?.message?.message || ""}
              />
              <Button text="Send Message" width="100%" type="submit" />
              {!isEmpty(success) && (
                <Markdown children={success} className="successText" />
              )}
            </form>
          </FormProvider>
        </FormContainer>
      </SectionContainer>
    </PageLayoutContainer>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  message: Yup.string().required("Required"),
});
