import React, { useState } from "react";
import {
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Markdown } from "../../../shared/markdown";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import * as linkify from "linkifyjs";
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
import _ from "lodash";
import Input from "../../../shared/formElements/input";
import axios from "axios";
import { Loader } from "../../../shared/loaders";

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
  const { authenticated, currentProject, loading } = useAuthState();
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
  //
  const { handleSubmit, watch, control, setValue } = methods;

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const res = await axios.post(
        `/link/${currentProject?.url_name}`,
        watchedUploadLinks
      );
      console.log("res", res);
      dispatch("STOP_LOADING");
      push("/");
    } catch (err: any) {
      console.log(err);
      // const error = err.response.data; //
    }
  };

  const [parsedLinkText, setParsedLinkText] = useState<any>();
  const watchedUploadLinks = watch("uploadLinks");
  const linksLength = currentProject?.links.length;

  const handleLinkUpload = async (linkText: string) => {
    const parsedGetUrlsLinkText = linkify.find(linkText);
    const parsedLinkObj = await parsedGetUrlsLinkText.map(
      (link: any, index) => {
        const hostName = new URL(link.href).hostname;
        const parsedIco = `https://www.google.com/s2/favicons?domain_url=${hostName}`;
        // `https://icons.duckduckgo.com/ip2/${hostName}.ico`;
        return {
          position: linksLength ? linksLength + index : index,
          project_id: currentProject?.project_id || null,
          url: link.href,
          url_image: parsedIco,
          url_name: "",
        };
      }
    );
    setParsedLinkText(parsedLinkObj);
    setValue("linkText", linkText);
  };

  const { fields, append } = useFieldArray<any>({
    name: "uploadLinks",
    control,
  });

  // const handleDelete = async (index, remove) => {
  //   await remove(index);
  // };

  const appendLinks = async () => {
    if (!_.isEmpty(parsedLinkText)) {
      append(parsedLinkText);
    } else {
      //TODO give an alert if no links present to be appened
    }
  };

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          {loading && <Loader />}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Markdown
                children={`# Add Links to the ${currentProject?.project_name} Project 🔗`}
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
