import styled from "styled-components/macro";
import { Markdown } from "../markdown";
export const TodoAddItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green500};
  min-width: 80%;
  border-radius: 5px;
  margin: 15px 5px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.green500},
      #1cb8aa
    );
  }
`;
export const TaskAddItem = ({ append }) => {
  return (
    <TodoAddItemContainer onClick={() => append()}>
      <Markdown children="＋" />
      <Markdown children="Add Item" />
    </TodoAddItemContainer>
  );
};
