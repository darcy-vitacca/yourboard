import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Trash } from "@styled-icons/bootstrap/Trash";
import { RoadMap } from "@styled-icons/remix-fill/RoadMap";
import styled from "styled-components/macro";
import { NotepadEdit } from "@styled-icons/fluentui-system-filled/NotepadEdit";
import { AddLink } from "@styled-icons/material-outlined/AddLink";
import { Edit } from "@styled-icons/boxicons-regular/Edit";

const SVGAddLinkIcon = styled(AddLink)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const SVGEditIcon = styled(Edit)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const SVGRoadMap = styled(RoadMap)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const TrashIcon = styled(Trash)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const NotepadIcon = styled(NotepadEdit)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export interface SideMenuValues {
  title: string;
  icon: any;
  link: string;
  tooltip: string;
  expand?: any;
  subMenuName?: string;
  subMenuItems?: SubMenuValue[];
}

interface SubMenuValue {
  label: string;
  link: string;
  icon: any;
}

export const sidebarDataAuth: SideMenuValues[] = [
  {
    title: `#### urboard`,
    icon: <HomeIcon />,
    link: "/",
    tooltip: `urboard`,
  },
  {
    title: "#### Add Links",
    icon: <SVGAddLinkIcon />,
    link: "/add-links",
    tooltip: "Add Links",
  },
  {
    title: "#### Add Folder",
    icon: <AddCircleIcon />,
    link: "/add-folder",
    tooltip: "Add Folder",
  },
  {
    title: "#### Notes",
    icon: <NotepadIcon />,
    link: "/notes",
    tooltip: "Notes",
  },
  {
    title: "#### Edit Item",
    icon: <SVGEditIcon />,
    link: "/edit",
    tooltip: "Drag item here to edit",
  },
  {
    title: "#### Road Map",
    icon: <SVGRoadMap />,
    link: "/roadmap",
    tooltip: "Road Map",
  },
  {
    title: "#### Delete Item",
    icon: <TrashIcon />,
    link: "/delete",
    tooltip: "Drag item here to delete",
  },

  {
    title: "#### Logout",
    icon: <ExitToAppIcon />,
    link: "/logout",
    tooltip: "Logout",
  },
];

export const sidebarDataUnauth = [
  {
    title: `#### urboard`,
    icon: <HomeIcon />,
    link: "/",
    tooltip: `urboard`,
  },
  {
    title: "#### Login",
    icon: <LockOpenIcon />,
    link: "/login",
    tooltip: "Login",
  },
  {
    title: "#### Register",
    icon: <PersonAddIcon />,
    link: "/register",
    tooltip: "Register",
  },
  {
    title: "#### Road Map",
    icon: <SVGRoadMap />,
    link: "/roadmap",
    tooltip: "Road Map",
  },
];
