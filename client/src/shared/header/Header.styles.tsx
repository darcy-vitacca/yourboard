import styled from 'styled-components';
import { device } from '../../styles/devices';

export const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const HeaderContainer = styled.div`
  padding: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.layout.navBackground};
  @media ${device.mobileLrg} {
    padding: inherit;
  }
`;
export const Banner = styled.img`
  width: 100%;
  display: none;
  @media ${device.mobileLrg} {
    display: block;
  }
`;
export const SVGContainer = styled.svg``;
