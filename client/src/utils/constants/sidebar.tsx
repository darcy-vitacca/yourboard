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

const SVGAddLinkIcon = styled(AddLink)`
  color: ${({ theme }) => theme.colors.white};
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const SVGNotepadEditIcon = styled(NotepadEdit)`
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
    title: "#### Add Project",
    icon: <AddCircleIcon />,
    link: "/add-project",
    tooltip: "Add Project",
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
    tooltip: "Drag Item to here to delete",
  },
  // {
  //   title: "#### Project Notes",
  //   icon: <SVGNotepadEditIcon />,
  //   link: "/notes",
  //   tooltip: "Project Notes",
  // },
  // {
  //   title: "#### Settings",
  //   icon: <SettingsIcon />,
  //   link: "/settings",
  //   tooltip: "Settings",
  // },
  // {
  //   title: "#### My Inbox",
  //   icon: <MailIcon />,
  //   link: "/my-inbox",
  //   tooltip: "My Inbox",
  //   expand: <ArrowDropDownIcon />,
  // subMenuName: 'Inbox',
  // subMenuItems: [
  //   { label: '#### Compose', link: 'compose', icon: <CreateIcon /> },
  //   { label: '#### Inbox', link: 'inbox', icon: <InboxIcon /> },
  //   { label: '#### Sent Items', link: 'sent-items', icon: <MailIcon /> },
  //   { label: '#### Archive', link: '/archive', icon: <ArchiveIcon /> },
  //   { label: '#### Trash', link: 'trash', icon: <DeleteIcon /> },
  // ],
  // },
  // {
  //   title: "#### My Profile",
  //   icon: <AccountBoxIcon />,
  //   link: "/my-profile",
  //   tooltip: "My Profile",
  // },
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
