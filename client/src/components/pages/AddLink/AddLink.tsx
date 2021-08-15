import React, { useState } from "react";
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
import { Markdown } from "../../../shared/markdown";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import getUrls from "get-urls";
import {
  AddLinkContainer,
  AddLinkPreviewContainer,
  AddLinkSection,
} from "./AddLink.styles";
import { Link } from "../../../shared/link";

interface FormValue {
  linkText: string;
}
const defaultValues = {
  linkText: "",
};

export const AddLink = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  const { push } = useHistory();
  // if(authenticated) push('/')

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
    setValue,
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
    } catch (err) {
      const error = err.response.data;
    }
  };
  const [parsedLinkText, setParsedLinkText] = useState<any>();
  const handleLinkUpload = async (linkText: string) => {
    const parsedLinkText = Array.from(getUrls(linkText));
    setParsedLinkText(parsedLinkText);
    console.log("parsedLinkText", parsedLinkText);
    setValue("linkText", linkText);
  };
  console.log("watch()", watch());
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown children={"# Add Links"} />
              <TextArea
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLinkUpload(e.target.value)
                }
                label="Upload links here, simply paste in whatever you want and click upload."
              />
              <AddLinkPreviewContainer>
                {parsedLinkText?.map((link: any) => {
                  return (
                    <AddLinkSection>
                      <AddLinkContainer>
                        <p key={link}>{link}</p>
                      </AddLinkContainer>
                      <Link link={link} key={link} />
                    </AddLinkSection>
                  );
                })}
              </AddLinkPreviewContainer>

              <Button width="25%" text="Upload" />
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
