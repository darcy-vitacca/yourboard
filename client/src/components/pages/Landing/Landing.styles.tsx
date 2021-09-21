import styled from "styled-components/macro";
import { ArrowLeftCircleFill } from "@styled-icons/bootstrap/ArrowLeftCircleFill";
import { ArrowRightCircleFill } from "@styled-icons/bootstrap/ArrowRightCircleFill";
import { PersonAdd } from "@styled-icons/ionicons-solid/PersonAdd";
import { Edit } from "@styled-icons/feather/Edit";
import { device } from "../../../styles/devices";

export const SVGLeftIcon = styled(ArrowLeftCircleFill)`
  color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
  // margin-top: -2px;
`;

export const SVGRightIcon = styled(ArrowRightCircleFill)`
  color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.green500};
  // border-radius: 50px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;

  // margin-top: -2px;
`;

export const SVGAddFriendIcon = styled(PersonAdd)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green500};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
  // margin-top: -2px;
`;

export const SVGEditIcon = styled(Edit)`
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  padding: 3px;
  cursor: pointer;
  // margin-top: -2px;
`;

export const ProjectArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const ProjectIconContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  @media ${device.mobileLrg} {
    width: 200px;
  }
`;
