import React from "react";
import {
  ModalContainer,
  ModalContentContainer,
  ModalTopRow,
  SVGCloseIcon,
} from "./Modal.styles";
import { Markdown } from "../markdown";
import { Button } from "../formElements/button";
import { useHistory } from "react-router";

export const ModalCommon = ({ setModal, modal }) => {
  const { push } = useHistory();
  return (
    <ModalContainer>
      <ModalContentContainer>
        <ModalTopRow>
          <SVGCloseIcon
            onClick={() => {
              setModal(false);
            }}
          />
        </ModalTopRow>
        <Markdown
          children={`#### Feature not available on example`}
          align="center"
        />
        <Markdown
          children={`To use this feature you will need to register, urboard is totally free and we are striving to improve web browsing daily.`}
          align="center"
        />
        <Button
          text="Register Now"
          width="100%"
          onClick={() => push("/register")}
          type="button"
          bkgColor="green"
        />
      </ModalContentContainer>
    </ModalContainer>
  );
};
