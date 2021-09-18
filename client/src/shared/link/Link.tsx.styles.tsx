import styled from "styled-components/macro";
import { device } from "../../styles/devices";

export const LinkContainer = styled.div`
  margin: 10px;
  width: 120px;
  height: 100px;
  @media ${device.mobileLrg} {
    width: 200px;
    height: 160px;
  }

  border-radius: 5px;
  padding: 10px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue400};
  flex-direction: column;
  cursor: pointer;
  justify-content: space-between;
  * {
    background-color: ${({ theme }) => theme.colors.blue400};
  }
`;

export const LinkTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80%;
`;
export const LinkBottomRow = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LinkRow = styled.div``;

export const LinkRowTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  height: 50px;
`;

export const Tag = styled.p`
  margin: 3px 3px 5px 0;
  font-size: ${({ theme }) => theme.font.size.smallest};
  background-color: ${({ theme }) => theme.colors.blue500};
  padding: 3px;
`;

export const LinkImg = styled.img`
  width: 16px;
  height: 16px;
  @media ${device.mobileLrg} {
    width: 25px;
    height: 25px;
  }
  margin-left: 10px;
`;
