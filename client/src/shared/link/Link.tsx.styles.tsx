import styled from "styled-components/macro";
import { device } from "../../styles/devices";

export const LinkContainer = styled.div`
  margin: 10px;
  width: 200px;
  height: 170px;
  border-radius: 2px;
  display: flex;

  flex-direction: row;
  cursor: pointer;
  * {
    background-color: ${({ theme }) => theme.colors.blue400};
  }
`;

export const LinkSectionLeft = styled.div`
  width: 80%;
  display: flex;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  flex-direction: column;
`;

export const LinkSectionRight = styled.div`
  padding: 10px 10px 10px 5px;

  border-radius: 0 5px 5px 0;
  width: 20%;
  display: flex;
  align-items: flex-start;
`;

export const LinkImg = styled.img`
  width: 30px;
`;
