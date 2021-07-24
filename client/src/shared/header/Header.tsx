import React, { useState } from 'react';
import classNames from 'classnames';

import { Avatar } from './sections';
import { SideMenu } from './sections';
import { useAuthState } from '../../components/context/context';
import { HeaderContainer, HeaderContentContainer, HeaderLeftContainer, HeaderRightContainer } from './Header.styles';


export const Header = () => {
  const { showMenu } = useAuthState();

  return (
    <>
      <HeaderContainer>
        <HeaderContentContainer>
          <HeaderLeftContainer>
            <SideMenu
              className={classNames(
                { hideMenu: showMenu },
                { showMenu: !showMenu }
              )}
            />
          </HeaderLeftContainer>
          <HeaderRightContainer>
            {/*<Avatar initials={'#### DV'} />*/}
          </HeaderRightContainer>
        </HeaderContentContainer>
      </HeaderContainer>
    </>
  );
};
