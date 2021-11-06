import { FC } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../utils/dnd/item";
export interface DragAndDropCondition {
  condition: boolean;
  children: any;
}

export const ConditionalDragAndDropWrapper: FC<DragAndDropCondition> = ({
  condition,
  children,
}) => {
  return condition ? DragAnDropWrapper(children) : children;
};

export const DragAnDropWrapper = (children) => {
  const deleteItem = (props) => {
    console.log(props);
  };
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    // @ts-ignore
    drop: (item, monitor) => deleteItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return <div ref={drop}>{children}</div>;
};
