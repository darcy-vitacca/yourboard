import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//InboxIcons
import CreateIcon from "@material-ui/icons/Create";
import InboxIcon from "@material-ui/icons/Inbox";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import { FC } from "react";

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
    tooltip: `Home`,
  },
  {
    title: "#### Add Links",
    icon: <AddIcon />,
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
    title: "#### Settings",
    icon: <SettingsIcon />,
    link: "/settings",
    tooltip: "Settings",
  },
  {
    title: "#### My Inbox",
    icon: <MailIcon />,
    link: "/my-inbox",
    tooltip: "My Inbox",
    expand: <ArrowDropDownIcon />,
    // subMenuName: 'Inbox',
    // subMenuItems: [
    //   { label: '#### Compose', link: 'compose', icon: <CreateIcon /> },
    //   { label: '#### Inbox', link: 'inbox', icon: <InboxIcon /> },
    //   { label: '#### Sent Items', link: 'sent-items', icon: <MailIcon /> },
    //   { label: '#### Archive', link: '/archive', icon: <ArchiveIcon /> },
    //   { label: '#### Trash', link: 'trash', icon: <DeleteIcon /> },
    // ],
  },
  {
    title: "#### My Profile",
    icon: <AccountBoxIcon />,
    link: "/my-profile",
    tooltip: "My Profile",
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
];
