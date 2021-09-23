import React, { useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import queryString from "query-string";
import {
  useAuthDispatch,
  useAuthState,
} from "../../components/context/context";
import { Loader } from "../loaders";
import {
  ModalContainer,
  ModalContentContainer,
  ModalTopRow,
  SVGCloseIcon,
} from "./Modal.styles";
import { Markdown } from "../markdown";
import Input from "../formElements/input";
import { Button } from "../formElements/button";

interface FormValue {
  email: string;
}
const defaultValues = {
  email: "",
};

interface ModalValues {
  setModal: any;
  modal: boolean;
}

export const Modal = ({ setModal, modal }) => {
  const dispatch = useAuthDispatch();
  const { loading, currentProject } = useAuthState();
  const { push } = useHistory();

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
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      const inviteData = {
        project_id: currentProject?.project_id,
        email: formData.email,
      };
      dispatch("LOADING");
      await axios.post("/project/invite", inviteData);
      dispatch("STOP_LOADING");
    } catch (err: any) {
      dispatch("STOP_LOADING");
      const error = err.response.data;
      if (error.email) setError("email", { message: error.email });
    }
  };

  return (
    <ModalContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*<Loader />*/}
          <ModalContentContainer>
            <ModalTopRow>
              <SVGCloseIcon
                onClick={() => {
                  setModal(false);
                }}
              />
            </ModalTopRow>
            <Markdown
              children={`#### Invite a friend to this project`}
              align="center"
            />
            <Input
              type="email"
              name="email"
              width="100%"
              helperText="Email"
              label="EMAIL"
              control={control}
              defaultValue={""}
              // validation={errors?.email?.message || ""}
            />
            <Button
              text="Invite Friend"
              width="100%"
              type="submit"
              bkgColor="green"
            />
          </ModalContentContainer>
        </form>
      </FormProvider>
    </ModalContainer>
  );
};
