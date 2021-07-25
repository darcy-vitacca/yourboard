import React, { FC } from 'react';
import { LinkContainer, LinkImg, LinkSectionLeft, LinkSectionRight } from './Link.tsx.styles';
import { Markdown } from '../markdown';

 interface LinkValues {
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
   link : LinkValues
 }

export const Link: FC<Link> = ({  link: {clicked,
createdAt,
link_id,
position,
project_id,
subfolder_id,
updatedAt,
url,
url_image, url_name}}) => {

  return (
    <LinkContainer onClick={() => window.open(url, '_blank')}>
      <LinkSectionLeft>
        <LinkImg src={url_image}/>
      </LinkSectionLeft>
      <LinkSectionRight>
        <Markdown children={`#### ${url_name}`} />
        <Markdown children={`${url}`} />
      </LinkSectionRight>
    </LinkContainer>
  );
};
