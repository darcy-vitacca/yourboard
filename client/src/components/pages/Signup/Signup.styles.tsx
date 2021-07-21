import styled from 'styled-components/macro';
import { device } from '../../../styles/devices';
import { Link } from 'react-router-dom';

export const LoginRegisterLinkContainer = styled.div`
  display: flex;
`;

export const StyledLink = styled(Link)`
  margin-left: 4px;
  font-size: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green500};
`;
