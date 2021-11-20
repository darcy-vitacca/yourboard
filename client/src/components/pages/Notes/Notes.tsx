import React, { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import {
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { Markdown } from "../../../shared/markdown";
import { Loader } from "../../../shared/loaders";
import { DraftEditor } from "./Editor";
import { Button } from "../../../shared/formElements/button";
import { DragDrop } from "../../../shared/dragDrop";
import styled from "styled-components/macro";
import { Size, useWindowSize } from "../../../hooks/useWindowSize";

const defaultValues = {
  description: "",
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Notes = () => {
  const dispatch = useAuthDispatch();
  const size: Size = useWindowSize();
  // @ts-ignore
  const mobile = size?.width < 500;
  const { authenticated, currentProject, loading, projects, notes } =
    useAuthState();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editMode, setEditMode] = useState(false);

  const { push } = useHistory();
  if (!authenticated) push("/login");
  if (!currentProject && projects) push("/");
  if (!currentProject && !projects) push("/add-folder");

  const methods = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    // resolver: yupResolver(validationSchema),
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
  });
  //
  const {
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    (async () => {
      try {
        dispatch("LOADING");
        const res = await axios.get(`/notes/${currentProject?.project_id}`);
        dispatch("SET_NOTES", res.data);

        await setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(res?.data?.note))
          )
        );
      } catch (err: any) {
        dispatch("STOP_LOADING");
        console.log("err", err);
      }
    })();
    return () => {
      dispatch("CLEAR_NOTES");
    };
  }, []);

  const handleEditMode = async () => {
    try {
      if (!editMode) {
        setEditMode(true);
      } else {
        dispatch("LOADING");
        const res = await axios.post(`/notes/${currentProject?.project_id}`, {
          note: JSON.stringify(convertToRaw(editorState?.getCurrentContent())),
        });
        dispatch("SET_NOTES", res.data);
        setEditMode(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DragDrop>
        <PageLayoutContainer>
          <SectionContainer>
            {loading && <Loader />}
            <FormProvider {...methods}>
              <form>
                <Markdown
                  children={`# Notes for ${currentProject?.project_name} Project`}
                />
                <ButtonContainer>
                  <Button
                    text="Return to project ↩️"
                    width={mobile ? "100%" : "25%"}
                    onClick={() => push("/")}
                    type="button"
                  />
                  <Button
                    text={editMode ? "Update Notes ✅️" : "Edit Notes ✍️"}
                    width={mobile ? "100%" : "25%"}
                    onClick={() => handleEditMode()}
                    type="button"
                  />
                </ButtonContainer>

                {editMode ? (
                  <DraftEditor
                    name="description"
                    defaultValue={""}
                    control={control}
                    editorState={editorState}
                    setEditorState={setEditorState}
                  />
                ) : (
                  notes?.note && (
                    <Markdown
                      children={draftToHtml(JSON.parse(notes?.note))}
                      className="notesText"
                    />
                  )
                )}
              </form>
            </FormProvider>
          </SectionContainer>
        </PageLayoutContainer>
      </DragDrop>
    </>
  );
};
