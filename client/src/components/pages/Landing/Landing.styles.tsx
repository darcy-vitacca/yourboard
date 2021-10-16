import styled from "styled-components/macro";
import { ArrowLeftCircleFill } from "@styled-icons/bootstrap/ArrowLeftCircleFill";
import { ArrowRightCircleFill } from "@styled-icons/bootstrap/ArrowRightCircleFill";
import { Folder} from "@styled-icons/bootstrap/Folder";
import { PersonAdd } from "@styled-icons/ionicons-solid/PersonAdd";
import { Edit } from "@styled-icons/feather/Edit";
import { AddLink } from "@styled-icons/material-outlined/AddLink";

import { device } from "../../../styles/devices";

export const SVGLeftIcon = styled(ArrowLeftCircleFill)`
  color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 35px;
  height: 35px;
  @media ${device.mobileLrg} {
    width: 45px;
    height: 45px;
  }
  padding: 3px;
  
  cursor: pointer;
  // margin-top: -2px;
`;

export const SVGRightIcon = styled(ArrowRightCircleFill)`
  color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 35px;
  height: 35px;
  @media ${device.mobileLrg} {
    width: 45px;
    height: 45px;
  }
  padding: 3px;
  cursor: pointer;

  // margin-top: -2px;
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
  width: 45px;
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
  width: 100px;
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  @media ${device.mobileLrg} {
    width: 200px;
  }
`;

export const ProjectNavContainer = styled.div`
  width:80px;
display:flex;
justify-content: center;
  align-items: center;
flex-direction: column;`

