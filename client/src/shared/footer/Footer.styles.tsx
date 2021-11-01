import styled from "styled-components/macro";
import { device } from "../../styles/devices";

export const FooterLinkSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
  min-width: 320px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  overflow: hidden;
  margin-left: 26px;
  @media ${device.laptop} {
    margin-left: inherit;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin: 7px 7px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  * {
    display: inline;
    color: ${({ theme }) => theme.colors.white};
  }

  .divider {
    padding: 0 5px;
  }
`;
