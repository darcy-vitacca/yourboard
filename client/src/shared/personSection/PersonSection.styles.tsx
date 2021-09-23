import styled from "styled-components/macro";
import { device } from "../../styles/devices";
import { CheckCircle } from "@styled-icons/boxicons-solid/CheckCircle";
import { PendingActions } from "@styled-icons/material/PendingActions";

export const PersonSectionContainer = styled.div`
  margin: 10px;
`;

export const PersonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PersonContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue100};
  padding: 1px 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const PersonText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
`;

export const PersonContainerApprovedIcon = styled(CheckCircle)`
  color: ${({ theme }) => theme.colors.green500};
  background: transparent;
  width: 35px;
  padding: 5px;
`;

export const PersonContainerPendingIcon = styled(PendingActions)`
  color: ${({ theme }) => theme.colors.purple500};
  background: transparent;
  width: 35px;
  padding: 5px;
`;
