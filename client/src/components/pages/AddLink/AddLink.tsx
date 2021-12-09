import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory, useLocation } from "react-router";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Markdown } from "../../../shared/markdown";
import { TextArea } from "../../../shared/formElements/textArea";
import { Button } from "../../../shared/formElements/button";
import * as linkify from "linkifyjs";
import {
  AddLinkPreviewContainer,
  AddLinkProjectContainer,
  AddLinkSection,
  LinkEditSection,
  LinkInputRow,
  LinkInputSection,
  LinkText,
} from "./AddLink.styles";
import _ from "lodash";
import Input from "../../../shared/formElements/input";
import axios from "axios";
import { Loader } from "../../../shared/loaders";
import { LinkComponent } from "../../../shared/link";
import { DragDrop } from "../../../shared/dragDrop";
import { Size, useWindowSize } from "../../../hooks/useWindowSize";

interface FormValue {
  linkText: string;
  uploadLinks: any;
}

const defaultValues = {
  linkText: "",
  uploadLinks: [],
};

export const validationSchema = Yup.object({
  linkText: Yup.string(),
  uploadLinks: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().nullable().required("Required"),
      url_name: Yup.string().nullable().required("Required"),
      url_image: Yup.string().nullable().required("Required"),
    })
  ),
});

export const AddLink = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, currentProject, loading, projects } = useAuthState();
  const { push } = useHistory();
  const { state }: any = useLocation();
  const parsedLinkRef: any = useRef();

  if (!authenticated) push("/login");
  if (!currentProject && projects) push("/");
  if (!currentProject && !projects) push("/add-folder");

  const [parsedLinkText, setParsedLinkText] = useState<any>();
  const linksLength = currentProject?.links.length;

  const methods = useForm<any>({
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

  const watchedUploadLinks = watch("uploadLinks");

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const completedLinks = watchedUploadLinks.map((link, index) => {
        return { ...link, position: linksLength ? linksLength + index : index };
      });
      const res = await axios.post(
        `/link/${currentProject?.project_id}`,
        completedLinks
      );
      dispatch("UPDATE_CURRENT_PROJECT", res.data);
      push("/");
    } catch (err: any) {
      console.log(err);
      // const error = err.response.data; //
    }
  };

  const handleLinkUpload = async (linkText: string) => {
    const parsedGetUrlsLinkText = linkify.find(linkText);
    const parsedLinkObj = await parsedGetUrlsLinkText.map(
      (link: any, index) => {
        const hostName = new URL(link.href).hostname;
        const parsedIco = `https://www.google.com/s2/favicons?domain_url=${hostName}`;
        // `https://icons.duckduckgo.com/ip2/${hostName}.ico`;
        return {
          project_id: currentProject?.project_id || null,
          url: link.href,
          url_image: parsedIco,
          url_name: "",
        };
      }
    );
    setParsedLinkText(parsedLinkObj);
    parsedLinkRef.current = parsedLinkObj;
    setValue("linkText", linkText);
  };

  const { fields, append, remove } = useFieldArray<any>({
    name: "uploadLinks",
    control,
  });

  const handleDelete = async (index) => {
    await remove(index);
  };

  const appendLinks = async () => {
    if (!_.isEmpty(parsedLinkText)) {
      append(parsedLinkText);
      clearErrors("linkText");
    } else if (!_.isEmpty(parsedLinkRef.current)) {
      // @ts-ignore
      append(parsedLinkRef.current);
      clearErrors("linkText");
    } else {
      setError("linkText", {
        message: "Please add links to the text area for your folder.",
      });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        if (state?.droppedLink) {
          setValue("linkText", state?.droppedLink);
          await handleLinkUpload(state?.droppedLink);
          await appendLinks();
        }
      } catch (err: any) {
        console.log(err.response);
      }
    })();
  }, [state?.droppedLink]);


  const size: Size = useWindowSize();
  // @ts-ignore
  const mobile = size?.width < 500;
  return (
    <>
      <DragDrop>
        <PageLayoutContainer>
          <SectionContainer align="center" className="addLinks">
            {loading && <Loader />}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Markdown
                  children={`# Add Links to the ${currentProject?.project_name} folder 🔗`}
                />
                {_.isEmpty(watchedUploadLinks) && (
                  <TextArea
                    change={handleLinkUpload}
                    control={control}
                    name="linkText"
                    defaultValue={""}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                    label="Upload links here, simply drag and drop a link from another browser window or copy paste in whatever you want and click Add Links."
                    disabled={!_.isEmpty(watchedUploadLinks)}
                  />
                )}

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
                                name={`uploadLinks.${index}.url`}
                                width="100%"
                                label="LINK"
                                control={control}
                                defaultValue={item.url}
                                validation={
                                  errors?.uploadLinks?.[index]?.url?.message ||
                                  ""
                                }
                              />
                              <Input
                                type="text"
                                name={`uploadLinks.${index}.url_image`}
                                width="100%"
                                label="LINK IMAGE"
                                control={control}
                                defaultValue={item.url_image}
                                validation={
                                  errors?.uploadLinks?.[index]?.url_image
                                    ?.message || ""
                                }
                              />
                            </LinkInputRow>
                            <LinkInputRow>
                              <Input
                                type="text"
                                name={`uploadLinks.${index}.url_name`}
                                width="100%"
                                label="LINK NAME"
                                control={control}
                                defaultValue={""}
                                validation={
                                  errors?.uploadLinks?.[index]?.url_name
                                    ?.message || ""
                                }
                              />
                            </LinkInputRow>
                          </LinkInputSection>

                          <AddLinkProjectContainer>
                            <LinkText>{item.url}</LinkText>
                          </AddLinkProjectContainer>
                        </LinkEditSection>
                        <div>
                          <LinkComponent link={watchedUploadLinks[index]} />
                          <Button
                            text="Remove"
                            width="100%"
                            type="button"
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                      </AddLinkSection>
                    );
                  })}
                </AddLinkPreviewContainer>
                {_.isEmpty(watchedUploadLinks) ? (
                  <Button
                    onClick={() => appendLinks()}
                    type="button"
                    width={mobile ? "100%" : "25%"}
                    text="Add Links 🔗"
                  />
                ) : (
                  <Button type="submit" width="25%" text="Submit Links" />
                )}
              </form>
            </FormProvider>
          </SectionContainer>
        </PageLayoutContainer>
      </DragDrop>
    </>
  );
};
