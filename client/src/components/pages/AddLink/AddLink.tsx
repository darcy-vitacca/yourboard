import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  ["uploadLinks"]: [
    // {
    //   url: null,
    //   url_name: null,
    //   url_image: null,
    // },
  ],
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
    resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  //
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

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
      clearErrors("linkText");
    } else {
      setError("linkText", {
        message: "Please add a Link to the text are for your project.",
      });
    }
  };

  console.log("watchedUploadLinks", watchedUploadLinks);
  console.log("errors", errors);
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
              {errors?.linkText?.message && (
                <Markdown
                  children={errors?.linkText?.message}
                  className="validationText"
                />
              )}
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
                              // validation={errors?.url?.message || ""}
                            />
                            <Input
                              type="text"
                              name={`uploadLinks[${index}].url_name`}
                              width="100%"
                              label="LINK NAME"
                              control={control}
                              defaultValue={""}
                              // validation={errors?.url_name?.message || ""}
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
                              // validation={errors?.url_image?.message || ""}
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
              {_.isEmpty(watchedUploadLinks) ? (
                <Button
                  onClick={() => appendLinks()}
                  type="button"
                  width="25%"
                  text="Add Links"
                />
              ) : (
                <Button type="submit" width="25%" text="Submit Links" />
              )}
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};

export const validationSchema = Yup.object({
  url: Yup.string().required("Required"),
  url_name: Yup.string().required("Required"),
  url_image: Yup.string().required("Required"),
});
