import styled from "styled-components/macro";
import { CheckCircle } from "@styled-icons/boxicons-solid/CheckCircle";
import { PendingActions } from "@styled-icons/material/PendingActions";
import { Folder} from "@styled-icons/bootstrap/Folder";
import AddIcon from "@material-ui/icons/Add";
import { device } from '../../styles/devices';

export const PersonSectionContainer = styled.div`
  margin: 10px;
  width:100%;
  display: flex;
  justify-content: center;
`;

export const PersonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;

export const PersonContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.blue100};
  padding: 0 5px;
  @media ${device.mobileLrg} {
    padding: 1px 5px;
  }
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const PersonText = styled.p`
  font-size: ${({ theme }) => theme.font.size.tinier};
  @media ${device.mobileLrg} {
  font-size: ${({ theme }) => theme.font.size.smallest};
  }
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
`;

export const PersonContainerApprovedIcon = styled(CheckCircle)`
  color: ${({ theme }) => theme.colors.green500};
  background: transparent;
  width: 22px;
  @media ${device.mobileLrg} {
    width: 28px;
  }
  padding: 5px;
`;

export const AddCircleIcon = styled(AddIcon)`
   color: ${({ theme }) => theme.colors.white};
  width: 25px;
`;




export const PersonContainerPendingIcon = styled(PendingActions)`
  color: ${({ theme }) => theme.colors.purple500};
  background: transparent;
  width: 22px;
  @media ${device.mobileLrg} {
    width: 28px;
  }
  padding: 5px;
`;
