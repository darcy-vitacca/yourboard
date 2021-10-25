import React, { FC } from "react";
import {
  LinkProjectBottomRow,
  LinkProjectContainer,
  LinkImg,
  LinkProjectRow,
  // LinkProjectRowTags,
  // LinkSectionLeft,
  // LinkSectionRight,
  LinkProjectTopRow,
  // Tag,
} from "./Link.tsx.styles";
import { Markdown } from "../markdown";
import moment from "moment";
import { useHistory } from "react-router";
import {
  AddCircleIcon,
} from "../personSection/PersonSection.styles";

export interface LinkValues {
  clicked?: number;
  createdAt: Date | null;
  link_id: string;
  position?: number;
  project_id: string;
  subfolder_id?: string;
  updatedAt: Date | null;
  url: string | null;
  url_image?: string;
  url_name: string;

}
interface Links {
  link: LinkValues;
  empty?: boolean;
  key?: string;
}

export const LinkComponent: FC<Links> = ({
  empty,
  key,
  link: {
    updatedAt,
    url,
    url_image,
    url_name,
    link_id
  },
}) => {
  const { push } = useHistory();
  return (
    <LinkProjectContainer
      key={key}
      onClick={() => (url ? window.open(url, "_blank") : push("/add-links"))}
    >
      <LinkProjectTopRow>
        <Markdown children={`#### ${url_name}`} className="linkCardMainText" />
        {empty ? <AddCircleIcon /> : <LinkImg src={url_image} />}
      </LinkProjectTopRow>
      <LinkProjectBottomRow>
        <LinkProjectRow>
          {
            updatedAt &&
          <Markdown
            children={`Last updated ${moment(updatedAt).fromNow()}`}
            className="linkCardSubText"
          />
          }
        </LinkProjectRow>
        {/*<LinkProjectRow>*/}
        {/*  <Markdown children={`${url}`} className="linkCardSubText" />*/}
        {/*</LinkProjectRow>*/}
      </LinkProjectBottomRow>
    </LinkProjectContainer>
  );
};
