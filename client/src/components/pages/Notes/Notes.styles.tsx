import styled from "styled-components/macro";
import { device } from "../../../styles/devices";

export const AddLinkPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddLinkProjectContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 10px;
`;

export const AddLinkSection = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border: 6px solid ${({ theme }) => theme.colors.blue500};
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  @media ${device.mobileLrg} {
    flex-direction: row;
  }
  justify-content: space-between;
`;

export const LinkEditElement = styled.div`
  width: 50%;
  padding: 10px;
`;

export const LinkText = styled.div`
  display: inline-block;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.size.smallest};
`;

export const LinkInputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LinkInputRow = styled.div`
  width: 100%;
`;

export const LinkEditSection = styled.div`
  width: 100%;
  @media ${device.mobileLrg} {
    width: 70%;
  }
`;
