import styled from 'styled-components/macro';
import { device } from '../../styles/devices';

export const HeaderContainer = styled.div`
  padding: 5px 20px 0 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white.default};
  box-shadow: 4px 0 5px rgb(0 0 0 / 8%);
`;
export const HeaderContentContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

export const HeaderLeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AmyIcon = styled.img`
  width: 60px;
  margin-right: 5px;
`;

export const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Banner = styled.img`
  width: 100%;
  display: none;
  @media ${device.mobileLrg} {
    display: block;
  }
`;
