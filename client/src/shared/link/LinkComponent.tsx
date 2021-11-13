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
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/dnd/item";
//@ts-ignore
import Preview from 'react-dnd-preview';


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

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      link_id: link?.link_id,
      project_id:   link?.project_id,
      createdAt:link?.createdAt,
      position:  link?.position,
      updatedAt:  link?.updatedAt,
      url:  link?.url,
      url_image:  link?.url_image,
      url_name:  link?.url_name,
    },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });
  const { push } = useHistory();

  return (
    <LinkProjectContainer
      ref={!empty ? drag : null}
      key={link?.link_id}
      id={link?.link_id}
      onClick={() =>
        link?.url ? window.open(link?.url, "_blank") : push("/add-links")
      }
      opacity={isDragging}
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
