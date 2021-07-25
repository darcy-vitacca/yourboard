import React, { useEffect } from 'react';
import {
  SectionContainer,
  PageLayoutContainer, LinkSectionContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';
import axios from 'axios';
import { useAuthDispatch, useAuthState } from '../../context/context';
import { Link } from '../../../shared/link';

export const Landing = () => {
  const dispatch = useAuthDispatch();
  const {project} = useAuthState()
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/project/scotpac');
        console.log('res', res.data);
        dispatch('SET_PROJECT', res.data)
      } catch (err) {
        console.log(err);
      }

    })();
  }, []);
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer align="center">
          {
            project && <>
            <Markdown children={`# ${project.project_name}`|| ""} align="center" />
              <Markdown children={`### ${project.description}`|| ""} align="center" />
              <LinkSectionContainer>
              {project?.links.map(link =>
                <Link link={link} key={link.link_id}/>)
              }
            </LinkSectionContainer>
            </>
          }
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
