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
  AddLinkProjectContainer,
  AddLinkPreviewContainer,
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
import { LinkComponent } from '../../../shared/link';

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
  )
});

export const AddLink = () => {
  const dispatch = useAuthDispatch();
  const { authenticated, currentProject, loading, projects } = useAuthState();
  const { push } = useHistory();
  if (!authenticated) push("/login");
  if (!currentProject && projects) push("/");
  if (!currentProject && !projects) push("/add-project");

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

  const onSubmit = async (formData: any) => {
    try {
      dispatch("LOADING");
      const completedLinks = watchedUploadLinks.map((link, index) => {
        return {...link , position: linksLength ? linksLength + index : index}
      })
      const res = await axios.post(
        `/link/${currentProject?.project_id}`,
        completedLinks
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
    } else {
      setError("linkText", {
        message: "Please add links to the text area for your project.",
      });
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
              {
                _.isEmpty(watchedUploadLinks) &&   <TextArea
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleLinkUpload(e.target.value)
                  }
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {}}
                  label="Upload links here, simply paste in whatever you want and click upload."
                  disabled={!_.isEmpty(watchedUploadLinks)}
                />
              }

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
                              validation={errors?.uploadLinks?.[index]?.url?.message || ""}
                            />
                            <Input
                              type="text"
                              name={`uploadLinks.${index}.url_image`}
                              width="100%"
                              label="LINK IMAGE"
                              control={control}
                              defaultValue={item.url_image}
                              validation={errors?.uploadLinks?.[index]?.url_image?.message || ""}
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
                              validation={errors?.uploadLinks?.[index]?.url_name?.message || ""}
                            />
                          </LinkInputRow>
                        </LinkInputSection>

                        <AddLinkProjectContainer>
                          <LinkText>{item.url}</LinkText>
                        </AddLinkProjectContainer>
                      </LinkEditSection>
<div>
  <LinkComponent link={watchedUploadLinks[index]} />
  <Button text="Remove" width="100%" type="button"  onClick={() => handleDelete(index)}/>
</div>

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
                <Button type="submit" width="25%" text="Submit Links"   />
              )}
            </form>
          </FormProvider>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};


