import styled from "styled-components/macro";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

export const SideNavContainer = styled.div`
  height: 100%;
  width: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.blue700};
  padding-top: 20px;
  transition: all 0.75s ease;
  &.hideMenu {
    width: 300px;
  }
`;
export const SideBarMenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.blue700};
`;

export const ExpandIconContainer = styled.div`
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
export const SVGMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green500};
  border-radius: 50px;
  width: 35px;
  padding: 3px;
  cursor: pointer;
  position: fixed;
  margin-left: 15px;
  margin-top: -2px;
`;
export const SVGCloseIcon = styled(CloseOutline)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green500};
  border-radius: 50px;
  width: 35px;
  padding: 3px;
  cursor: pointer;
  position: fixed;
  margin-left: 15px;
  margin-top: -2px;
`;
export const SideBar = styled.ul`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.blue700};
`;

export const SideBarList = styled.ul`
  background-color: ${({ theme }) => theme.colors.blue700};
  min-width: 90%;
`;

export const TodoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue400};
  min-width: 90%;
  border-radius: 5px;
  height: 370px;
  padding: 15px 0;
  overflow-y: scroll;
`;
export const TodoItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 80%;
  border-radius: 5px;
  margin: 15px 5px;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

export const SideBarRowContainer = styled.div``;

export const NavRow = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blue700};
  * {
    background-color: ${({ theme }) => theme.colors.blue700};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.green500};
    border-radius: 5px;
    * {
      background-color: ${({ theme }) => theme.colors.green500};
    }
    .tooltip {
      display: block;
      background-color: inherit;
    }
  }
`;
export const NavSubRow = styled.div`
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blue700};
  &:hover {
    border-radius: 5px;
  }
`;
export const NavSubRowLeftContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey400};
    border-radius: 5px;
  }
`;
export const NavRowLeftContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue700};
  display: flex;
  align-items: center;
`;
export const NavRowRightContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue700};
  display: flex;
  align-items: center;
`;

export const SideMenuIconContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue700};
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
export const Tooltip = styled.p`
  display: none;
  position: fixed;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white} !important;
  margin-left: 70px;
  z-index: ${({ theme }) => theme.zIndex.menu};
  padding: 10px 20px;
  width: 140px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 1s ease;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

export const TodoFuncContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
`;

export const TodoItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 190px;
`;

export const TodoInput = styled.input`
  width: 70px;
`;

export const TodoButtonTime = styled.button`
  width: 70px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid grey;
`;

export const TodoButtonName = styled.input`
  width: 180px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid grey;
  margin-bottom: 17px;
  padding: 4px 5px;
`;
