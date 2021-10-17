import React, { useEffect, useState, FC } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw, ContentState} from "draft-js";
import { Controller } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import './Editor.css'
import styled from 'styled-components/macro'
import isEmpty from 'lodash/isEmpty'
import { Markdown } from '../../../shared/markdown';

const EditorContainer = styled.div`
`

interface DraftEditorValues{
  name: string;
  defaultValue: string;
  control : any
}


export const DraftEditor: FC<DraftEditorValues> = ({name, defaultValue, control}) => {
//TODO: ADD EDIT MODE //PASS VALUE //SHOW ONE OR THE OTHER
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  // const saveBlogPostToStore = (blogPost) =>{
  //   const JSBlogPost = { ...blogPost, content: JSON.stringify(convertToRaw(blogPost.content.getCurrentContent()))};
  //   this.props.dispatch(blogActions.saveBlogPostToStore(JSBlogPost));
  // }
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
      {!isEmpty(editorState) &&
      <Markdown children={  draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
    }
    </EditorContainer>
  );
}

