import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

//InboxIcons
import CreateIcon from '@material-ui/icons/Create';
import InboxIcon from '@material-ui/icons/Inbox';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import { FC } from 'react';


export interface SideMenuValues {
  title: string,
  icon:any,
  link: string,
  tooltip: string,
  expand?: any,
  subMenuName?: string,
  subMenuItems?: SubMenuValue[]
}

interface SubMenuValue {
  label:string;
  link:string;
  icon: any;
}

export const sidebarDataAuth: SideMenuValues[]= [
  {
    title: `#### Home`,
    icon: <HomeIcon />,
    link: '/',
    tooltip: `Home`,
  },
  {
    title: '#### My Inbox',
    icon: <MailIcon />,
    link: '/my-inbox',
    tooltip: 'My Inbox',
    expand: <ArrowDropDownIcon />,
    subMenuName: 'Inbox',
    subMenuItems: [
      { label: '#### Compose', link: 'compose', icon: <CreateIcon /> },
      { label: '#### Inbox', link: 'inbox', icon: <InboxIcon /> },
      { label: '#### Sent Items', link: 'sent-items', icon: <MailIcon /> },
      { label: '#### Archive', link: '/archive', icon: <ArchiveIcon /> },
      { label: '#### Trash', link: 'trash', icon: <DeleteIcon /> },
    ],
  },
  {
    title: '#### My Salary Package',
    icon: <AccountBalanceWalletIcon />,
    link: '/my-salary-package',
    tooltip: 'My Salary Package',
  },
  {
    title: '#### Proof of Expenses (POE)',
    icon: <ReceiptIcon />,
    link: '/proof-of-expenses',
    tooltip: 'Proof of Expenses (POE)',
  },
  {
    title: '#### My Profile',
    icon: <AccountBoxIcon />,
    link: '/my-profile',
    tooltip: 'My Profile',
  },
  {
    title: '#### Reports',
    icon: <AssessmentIcon />,
    link: '/reports',
    tooltip: 'Reports',
  },
  {
    title: '#### My Bank Accounts',
    icon: <AccountBalanceIcon />,
    link: '/my-bank-accounts',
    tooltip: 'My Bank Accounts',
  },
  {
    title: '#### Add 2nd Employer',
    icon: <AddIcon />,
    link: '/add-employer',
    tooltip: 'Add 2nd Employer',
  },
  {
    title: '#### Logout',
    icon: <ExitToAppIcon />,
    link: '/logout',
    tooltip: 'Logout',
  },
];

export const sidebarDataUnauth = [
  {
    title: '#### Login',
    icon: <LockOpenIcon />,
    link: '/login',
    tooltip: 'Login',
  },
  {
    title: '#### Register',
    icon: <PersonAddIcon />,
    link: '/register',
    tooltip: 'Register',
  },

]
