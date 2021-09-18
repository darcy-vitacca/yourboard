import styled from "styled-components/macro";
import { ArrowLeftCircleFill } from "@styled-icons/bootstrap/ArrowLeftCircleFill";
import { ArrowRightCircleFill } from "@styled-icons/bootstrap/ArrowRightCircleFill";

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

export const ProjectArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 0 70px;
`;
