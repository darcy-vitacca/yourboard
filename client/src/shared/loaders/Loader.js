import React from "react";
import styled, { keyframes } from "styled-components";
import { Loader4 } from "@styled-icons/remix-fill/Loader4";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled(Loader4)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.colors.green500};
  animation: ${rotate} 0.6s linear infinite;
  background-color: transparent;
  width: 100px;
  left: 47%;
  top: 35%;
  z-index: 5;
`;
