import styled from "styled-components/macro";
import { ArrowLeftCircleFill } from "@styled-icons/bootstrap/ArrowLeftCircleFill";
import { ArrowRightCircleFill } from "@styled-icons/bootstrap/ArrowRightCircleFill";
import { Folder } from "@styled-icons/bootstrap/Folder";
import { FolderPlus } from "@styled-icons/bootstrap/FolderPlus";
import { PersonAdd } from "@styled-icons/ionicons-solid/PersonAdd";
import { NotepadEdit } from "@styled-icons/fluentui-system-filled/NotepadEdit";
import { Edit } from "@styled-icons/feather/Edit";
import { AddLink } from "@styled-icons/material-outlined/AddLink";

import { device } from "../../../styles/devices";

export interface IArrowProps {
  moreThanOneProject: boolean | null;
}

export const SVGLeftIcon = styled(ArrowLeftCircleFill)<IArrowProps>`
  color: ${({ theme, moreThanOneProject }) =>
    !moreThanOneProject ? theme.colors.blue100 : theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 35px;
  height: 35px;
  @media ${device.mobileLrg} {
    width: 45px;
    height: 45px;
  }
  padding: 3px;

  cursor: ${({ moreThanOneProject }) =>
    !moreThanOneProject ? "inherit" : "pointer"};
`;

export const SVGRightIcon = styled(ArrowRightCircleFill)<IArrowProps>`
  color: ${({ theme, moreThanOneProject }) =>
    !moreThanOneProject ? theme.colors.blue100 : theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 35px;
  height: 35px;
  @media ${device.mobileLrg} {
    width: 45px;
    height: 45px;
  }
  padding: 3px;
  cursor: ${({ moreThanOneProject }) =>
    !moreThanOneProject ? "inherit" : "pointer"};
`;

export const SVGAddFriendIcon = styled(PersonAdd)`
  color: ${({ theme }) => theme.colors.white};
  //background-color: ${({ theme }) => theme.colors.green500};
  border-radius: 5px;
  width: 35px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const SVGEditIcon = styled(Edit)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const SVGAddLinkIcon = styled(AddLink)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const SVGFolderIcon = styled(Folder)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 40px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const SVGFolderPlusIcon = styled(FolderPlus)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 40px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const SVGNotepadIcon = styled(NotepadEdit)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 40px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
`;

export const ProjectArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const ProjectIconContainer = styled.div`
  width: 140px;
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  @media ${device.mobileLrg} {
    width: 280px;
  }
`;

export const ProjectNavContainer = styled.div`
  width: 80px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
