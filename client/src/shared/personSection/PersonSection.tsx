import { FC } from "react";

import {
  PersonContainerApprovedIcon,
  PersonContainerPendingIcon,
  PersonText,
  PersonContentContainer,
} from "./PersonSection.styles";

export interface ProjectUserValues {
  full_name: string;
  email: string;
  status: boolean;
  project_id: string;
}
interface ProjectUsers {
  project_user: ProjectUserValues;
}
export const PersonSection: FC<ProjectUsers> = ({
  project_user: { status, full_name, email },
}) => {
  return (
    <PersonContentContainer>
      <PersonText>{status ? full_name : email}</PersonText>
      {status ? (
        <>
          <PersonContainerApprovedIcon />
        </>
      ) : (
        <PersonContainerPendingIcon />
      )}
    </PersonContentContainer>
  );
};
