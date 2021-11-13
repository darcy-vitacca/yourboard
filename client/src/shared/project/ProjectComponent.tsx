import React, { FC } from "react";
import { useHistory } from "react-router";
import Link from "../../../../server/src/entities/Link";
import ProjectUser from "../../../../server/src/entities/ProjectUser";
import {
  LinkProjectBottomRow,
  LinkImg,
  LinkProjectContainer,
  LinkProjectRow,
  LinkProjectTopRow,
} from "../link/Link.tsx.styles";
import { Markdown } from "../markdown";
import moment from "moment";
import { useAuthDispatch } from "../../components/context/context";
import { AddCircleIcon } from "../personSection/PersonSection.styles";
import { ItemTypes } from '../../utils/dnd/item';
import { useDrag } from "react-dnd";
import {isMobile} from "react-device-detect";

export interface ProjectValues {
  project_id: string;
  project_name: string;
  updatedAt: Date | null;
  createdAt: Date | null;
  description: string | null;
  // url_name: string;
  links?: Link[];
  project_users: ProjectUser[] | null;
  position?: number;
  // subfolders: Subfolder[];
}
interface Projects {
  project: ProjectValues;
  empty?: boolean;
}

export const ProjectComponent: FC<Projects> = ({ empty, project }) => {
  const {
    project_id,
    project_name,
    updatedAt,
    createdAt,
    description,
    // url_name,
    links,
    project_users,
    position,
  } = project;
  const dispatch = useAuthDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      project_id:  project_id
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const selectProject = (project) => {
    dispatch("SET_CURRENT_PROJECT", project);
  };

  const { push } = useHistory();
  return (

    <LinkProjectContainer
      ref={!empty ? drag : null}
      key={project_id}
      id={project_id}
      onClick={() => (empty ? push("/add-project") : selectProject(project))}
      opacity={isDragging}
    >
      <LinkProjectTopRow>
        <Markdown
          children={`#### ${project_name}`}
          className="projectCardMainText"
        />
        {empty && <AddCircleIcon />}
        <Markdown children={`📁`} />
      </LinkProjectTopRow>
      <LinkProjectBottomRow>
        <LinkProjectRow>
          {project_users && (
            <Markdown
              children={`🤖 ${project_users?.length} ${
                project_users?.length === 1 ? "User" : "Users"
              }`}
              className="linkCardSubText"
            />
          )}

          {createdAt && (
            <Markdown
              children={`Created  ${moment(createdAt).fromNow()}`}
              className="linkCardSubText"
            />
          )}
        </LinkProjectRow>
      </LinkProjectBottomRow>
    </LinkProjectContainer>
  );
};
