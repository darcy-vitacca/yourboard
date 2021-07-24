import { FC, useState } from 'react';
import {
  NavRow,
  NavSubRow,
  SideBar,
  SVGMenuIcon,
  Tooltip,
  SideBarList,
  SideNavContainer,
  SVGCloseIcon,
  SideBarRowContainer,
  SideMenuIconContainer,
  SideBarMenuContainer,
  ExpandIconContainer,
  NavRowLeftContainer,
  NavRowRightContainer,
  NavSubRowLeftContainer,
} from './SideMenu.styles';
import { sidebarDataAuth, sidebarDataUnauth, SideMenuValues } from '../../../../utils/constants/sidebar';
import { Markdown } from '../../../markdown';
import { useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from '../../../../components/context/context';

interface ISideMenuProps {
  className: string;
}

export const SideMenu: FC<ISideMenuProps> = ({ className }) => {
  const initialSubMenuState = {
    inbox: false,
    bankAccount: false,
  };
  const { showMenu,authenticated} = useAuthState();
  const dispatch = useAuthDispatch();
  const [showSubMenu, setShowSubMenu] = useState(initialSubMenuState);

  const { push } = useHistory();

  const sideBarData = authenticated ? sidebarDataAuth : sidebarDataUnauth

  const handleMenuRoute = (route: string) => {
    if (route !== '/my-inbox' && !showMenu) {
      push(route);
      dispatch('HIDE_MENU');
    } else if (route === '/logout' ){
      dispatch('LOGOUT');
    } else {
      push(route);
    }
  };

  const handleShowSubMenuOptions = (subMenuName: string) => {
    setShowSubMenu({
      ...showSubMenu,
    // @ts-ignore
      [subMenuName]: !showSubMenu[subMenuName],
    });
  };

  return (
    <SideNavContainer className={className}>
      <SideBarMenuContainer>
        {showMenu ? (
          <SVGCloseIcon
            onClick={() => {
              dispatch('HIDE_MENU');
              setShowSubMenu(initialSubMenuState);
            }}
          />
        ) : (
          <SVGMenuIcon
            onClick={() => {
              dispatch('SHOW_MENU');
            }}
          />
        )}
      </SideBarMenuContainer>
      <SideBar>
        <SideBarList>
          {sideBarData.map((item: SideMenuValues) => {
            return (
              <SideBarRowContainer key={item.title}>
                <NavRow
                  className="sidebar-row"
                  onClick={() => handleMenuRoute(item.link)}
                >
                  <NavRowLeftContainer>
                    <SideMenuIconContainer>{item.icon}</SideMenuIconContainer>
                    <Markdown
                      children={item.title}
                      className={`sidebar-nav-text ${className}`}
                    />
                  </NavRowLeftContainer>
                  {showMenu && (
                    <NavRowRightContainer
                      // @ts-ignore
                      onClick={() => handleShowSubMenuOptions(item.subMenuName)}
                    >
                      {item.expand&&  <ExpandIconContainer>{item.expand}</ExpandIconContainer>}
                    </NavRowRightContainer>
                  )}
                  {!showMenu && (
                    <Tooltip className="tooltip">{item.tooltip}</Tooltip>
                  )}
                </NavRow>
                {item.subMenuItems &&
                // @ts-ignore
                showSubMenu[item.subMenuName]&&
                (
                  <NavSubRow>
                    {item.subMenuItems.map((subMenuItem) => {
                      return (
                        <NavSubRowLeftContainer key={subMenuItem.label}>
                          <SideMenuIconContainer>
                            {subMenuItem.icon}
                          </SideMenuIconContainer>
                          <Markdown
                            children={subMenuItem.label}
                            className="sidebar-nav-text"
                          />
                        </NavSubRowLeftContainer>
                      );
                    })}
                  </NavSubRow>
                )}
              </SideBarRowContainer>
            );
          })}
        </SideBarList>
      </SideBar>
    </SideNavContainer>
  );
};
