import React, { FC } from "react";
import {
  LinkImg,
  LinkProjectBottomRow,
  LinkProjectContainer,
  LinkProjectRow,
  LinkProjectTopRow,
} from "./Link.tsx.styles";
import { Markdown } from "../markdown";
import moment from "moment";
import { useHistory } from "react-router";
import { AddCircleIcon } from "../personSection/PersonSection.styles";

export interface LinkValues {
  clicked?: number;
  createdAt: Date | null;
  link_id: string;
  position?: number;
  project_id: string;
  subfolder_id?: string;
  updatedAt?: Date | null | undefined;
  url: string | null;
  url_image?: string;
  url_name: string;
}
interface Links {
  link: LinkValues;
  empty?: boolean;
  key?: string;
}

export const LinkComponent: FC<Links> = ({ empty, link }) => {
  const { push } = useHistory();
  return (
    <LinkProjectContainer
      key={link?.link_id}
      onClick={() =>
        link?.url ? window.open(link?.url, "_blank") : push("/add-links")
      }
    >
      <LinkProjectTopRow>
        <Markdown
          children={`#### ${link?.url_name}`}
          className="linkCardMainText"
        />
        {empty ? <AddCircleIcon /> : <LinkImg src={link?.url_image} />}
      </LinkProjectTopRow>
      <LinkProjectBottomRow>
        <LinkProjectRow>
          {link?.updatedAt && (
            <Markdown
              children={`Last updated ${moment(link?.updatedAt).fromNow()}`}
              className="linkCardSubText"
            />
          )}
        </LinkProjectRow>
      </LinkProjectBottomRow>
    </LinkProjectContainer>
  );
};
