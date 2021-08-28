import React, { FC } from "react";
import {
  LinkBottomRow,
  LinkContainer,
  LinkImg,
  LinkRow,
  LinkRowTags,
  // LinkSectionLeft,
  // LinkSectionRight,
  LinkTopRow,
  Tag,
} from "./Link.tsx.styles";
import { Markdown } from "../markdown";
import moment from "moment";
import { LoginRegisterLinkContainer, StyledLink } from "../Layout.styles";

export interface LinkValues {
  clicked?: number;
  createdAt: Date;
  link_id: string;
  position?: number;
  project_id: string;
  subfolder_id: string;
  updatedAt: Date;
  url: string;
  url_image?: string;
  url_name: string;
}
interface Link {
  link: LinkValues;
}

export const Link: FC<Link> = ({
  link: {
    clicked,
    createdAt,
    link_id,
    position,
    project_id,
    subfolder_id,
    updatedAt,
    url,
    url_image,
    url_name,
  },
}) => {
  return (
    <LinkContainer onClick={() => window.open(url, "_blank")}>
      <LinkTopRow>
        <Markdown children={`#### ${url_name}`} />
        <LinkImg src={url_image} />
      </LinkTopRow>
      <LinkBottomRow>
        <LinkRow>
          <Markdown
            children={`Last updated ${moment(updatedAt).fromNow()}`}
            className="linkCardSubText"
          />
        </LinkRow>
        {/*<LinkRow>*/}
        {/*  <Markdown children={`${url}`} className="linkCardSubText" />*/}
        {/*</LinkRow>*/}
      </LinkBottomRow>
    </LinkContainer>
  );
};
