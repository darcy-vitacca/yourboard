import styled from 'styled-components';

export const AvatarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.default};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
