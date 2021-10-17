import styled from "styled-components/macro";
import { device } from "../../styles/devices";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 80px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContentContainer = styled.div`
  position: fixed;
  width: 220px;
  height: auto;
  left: 30%;
  @media ${device.mobileSml} {
    left: 35%;
  }
  top: 15%;
  background-color: ${({ theme }) => theme.layout.background};
  padding: 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.white};
  @media ${device.mobileLrg} {
    width: 300px;
    left: 40%;
    top: 20%;
  }
  border-radius: 10px;
`;

export const SVGCloseIcon = styled(CloseOutline)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green500};
  border-radius: 50px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const ModalTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
