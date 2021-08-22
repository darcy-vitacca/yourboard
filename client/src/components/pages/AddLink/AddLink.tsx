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
import axios from "axios";

interface FormValue {
  linkText: string;
  uploadLinks: any;
}
const defaultValues = {
  linkText: "",
  uploadLinks: [],
};

export const AddLink = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, project } = useAuthState();
  const { push } = useHistory();
  if (!authenticated) push("/");

  const methods = useForm<FormValue>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  //
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
      console.log("ON SUBMIT UPLOAD", watchedUploadLinks);
      const res = await axios.post(
        `/link/${project?.url_name}`,
        watchedUploadLinks
      );
      console.log("res", res);
      push("/");
    } catch (err) {
      // const error = err.response.data;
    }
  };

  const [parsedLinkText, setParsedLinkText] = useState<any>();
  const watchedUploadLinks = watch("uploadLinks");
  const linksLength = project?.links.length;

  const handleLinkUpload = async (linkText: string) => {
    const parsedGetUrlsLinkText = Array.from(getUrls(linkText));
    const parsedLinkObj = await parsedGetUrlsLinkText.map((link, index) => {
      const hostName = new URL(link).hostname;
      const parsedIco = `https://www.google.com/s2/favicons?domain_url=${hostName}`;
      // `https://icons.duckduckgo.com/ip2/${hostName}.ico`;
      return {
        position: linksLength ? linksLength + index : index,
        project_id: project?.project_id || null,
        url: link,
        url_image: parsedIco,
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

  const appendLinks = async () => {
    if (!_.isEmpty(parsedLinkText)) {
      append(parsedLinkText);
    } else {
      //TODO give an alert if no links present to be appened
    }
  };

  const uploadLinks = () => {};
  console.log("_.isEmpty(watchedUploadLinks)", _.isEmpty(watchedUploadLinks));
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown
                children={`# Add Links to the ${project?.project_name} Project 🔗`}
              />
              <TextArea
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLinkUpload(e.target.value)
                }
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                label="Upload links here, simply paste in whatever you want and click upload."
              />
              <AddLinkPreviewContainer>
                {fields.map((item: any, index) => {
                  return (
                    <AddLinkSection key={item.id}>
                      <LinkEditSection>
                        <LinkInputSection>
                          <LinkInputRow>
                            <Input
                              type="text"
                              name={`uploadLinks[${index}].url`}
                              width="100%"
                              label="LINK"
                              control={control}
                              defaultValue={item.url}
                              // validation={errors?.email?.message || ''}
                            />
                            <Input
                              type="text"
                              name={`uploadLinks[${index}].url_name`}
                              width="100%"
                              label="LINK NAME"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.email?.message || ''}
                            />
                          </LinkInputRow>
                          <LinkInputRow>
                            <Input
                              type="text"
                              name={`uploadLinks[${index}].url_image`}
                              width="100%"
                              label="LINK IMAGE"
                              control={control}
                              defaultValue={item.url_image}
                              // validation={errors?.email?.message || ''}
                            />
                          </LinkInputRow>
                        </LinkInputSection>

                        <AddLinkContainer>
                          <LinkText>{item.url}</LinkText>
                        </AddLinkContainer>
                      </LinkEditSection>

                      <Link link={watchedUploadLinks[index]} />
                    </AddLinkSection>
                  );
                })}
              </AddLinkPreviewContainer>

              <Button
                onClick={() => appendLinks()}
                type="button"
                width="25%"
                text="Create Links"
              />
              <Button type="submit" width="25%" text="Upload Links" />
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
