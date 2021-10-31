import React, {  FC } from "react";
import { Editor } from "react-draft-wysiwyg";
import { Controller } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './Editor.css'
import styled from 'styled-components/macro'
// import { convertToRaw} from "draft-js";
// import draftToHtml from 'draftjs-to-html';
// import isEmpty from 'lodash/isEmpty'
// import { Markdown } from '../../../shared/markdown';

const EditorContainer = styled.div`
`

interface DraftEditorValues {
  name: string;
  defaultValue: string;
  control: any
  notes?: any;
  editorState: any;
  setEditorState: any;
}


export const DraftEditor: FC<DraftEditorValues> = ({name, defaultValue, control, notes, editorState, setEditorState}) => {
  return (
    <EditorContainer>
      <div style={{
        minHeight: '500px',
        color: 'black',
        backgroundColor: '#4c5e71'
       }}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
        <Editor
          {...field}
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
          )}
        />
      </div>
    {/*  {!isEmpty(editorState) &&*/}
    {/*  <Markdown children={draftToHtml(convertToRaw(editorState?.getCurrentContent()))} />*/}
    {/*}*/}
    </EditorContainer>
  );
}

