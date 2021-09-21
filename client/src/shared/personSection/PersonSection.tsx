import { FC } from "react";
import {
  PersonContainer,
  PersonContainerApprovedIcon,
  PersonContainerPendingIcon,
  PersonText,
  PersonContentContainer,
  PersonSectionContainer,
} from "./PersonSection.styles";
import ProjectUser from "../../../../server/src/entities/ProjectUser";

export interface ProjectUserValues {
  full_name: string;
  status: boolean;
  project_id: string;
}
interface ProjectUsers {
  project_user: ProjectUserValues;
}

export const PersonSection: FC<ProjectUsers> = ({
  project_user: { status, full_name },
}) => {
  return (
    <PersonContentContainer>
      <PersonText>{full_name}</PersonText>
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
