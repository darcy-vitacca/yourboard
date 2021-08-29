import React from "react";
import classNames from "classnames";
import { SideMenu } from "./sections";
import { useAuthState } from "../../components/context/context";
import {
  HeaderContainer,
  HeaderContentContainer,
  HeaderLeftContainer,
  HeaderRightContainer,
} from "./Header.styles";

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

          <HeaderRightContainer></HeaderRightContainer>
        </HeaderContentContainer>
      </HeaderContainer>
    </>
  );
};
