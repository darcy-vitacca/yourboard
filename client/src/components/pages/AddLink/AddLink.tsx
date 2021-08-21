import React, { useEffect, useState } from "react";
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
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Markdown } from "../../../shared/markdown";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import getUrls from "get-urls";
import {
  AddLinkContainer,
  AddLinkPreviewContainer,
  AddLinkSection,
  LinkEditSection,
  LinkInputRow,
  LinkInputSection,
  LinkText,
} from "./AddLink.styles";
import { Link } from "../../../shared/link";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { LinkValues } from "../../../shared/link/Link";
import Input from "../../../shared/formElements/input";

interface FormValue {
  linkText: string;
}
const defaultValues = {
  linkText: "",
  uploadLinks: [],
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
    const parsedGetUrlsLinkText = Array.from(getUrls(linkText));
    const parsedLinkObj = await parsedGetUrlsLinkText.map((link) => {
      return {
        clicked: "",
        createdAt: "",
        link_id: "",
        position: "",
        project_id: "",
        subfolder_id: "",
        updatedAt: "",
        url: link,
        url_image: "",
        url_name: "",
      };
    });
    setParsedLinkText(parsedLinkObj);
    setValue("linkText", linkText);
  };

  const { fields, append, remove } = useFieldArray<any>({
    name: "uploadLinks",
    control,
  });

  const handleDelete = async (index, remove) => {
    await remove(index);
  };

  console.log("fields", fields);

  const appendLinks = async () => {
    if (!_.isEmpty(parsedLinkText)) {
      console.log("parsedLinkText", parsedLinkText);
      append(parsedLinkText);
    } else {
      //TODO give an alert if no links present to be appened
    }
  };

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown children={"# Add Links 🔗"} />
              <TextArea
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLinkUpload(e.target.value)
                }
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                label="Upload links here, simply paste in whatever you want and click upload."
              />
              <AddLinkPreviewContainer>
                {fields.map((item: any, index) => {
                  console.log("item", item);
                  return (
                    <AddLinkSection key={item.id}>
                      <LinkEditSection>
                        <LinkInputSection>
                          <LinkInputRow>
                            <Input
                              type="email"
                              name="email"
                              width="100%"
                              label="EMAIL"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.email?.message || ''}
                            />
                            <Input
                              type="email"
                              name="email"
                              width="100%"
                              label="EMAIL"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.email?.message || ''}
                            />
                          </LinkInputRow>
                          <LinkInputRow>
                            <Input
                              type="email"
                              name="email"
                              width="100%"
                              label="EMAIL"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.email?.message || ''}
                            />
                            <Input
                              type="email"
                              name="email"
                              width="100%"
                              label="EMAIL"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.email?.message || ''}
                            />
                          </LinkInputRow>
                        </LinkInputSection>

                        <AddLinkContainer>
                          <LinkText>{item.url}</LinkText>
                        </AddLinkContainer>
                      </LinkEditSection>
                      <Link link={item} />
                    </AddLinkSection>
                  );
                })}
              </AddLinkPreviewContainer>

              <Button
                onClick={() => appendLinks()}
                width="25%"
                text="Create Links"
              />
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
