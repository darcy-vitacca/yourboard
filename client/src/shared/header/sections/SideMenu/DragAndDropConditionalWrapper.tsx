import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../../utils/dnd/item';
import { useHistory } from 'react-router';
import { useAuthDispatch } from '../../../../components/context/context';
import axios from 'axios';

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
  const dispatch = useAuthDispatch();
  const { push } = useHistory();

  const deleteItem = async (props) => {
    try {
      dispatch('LOADING');
      if (props?.link_id) {
        const res = await axios.delete(
          `/link/${props.link_id}/${props.project_id}`,
        );
        dispatch('UPDATE_CURRENT_PROJECT', res.data);
      } else {
        const res = await axios.delete(
          `/project/${props.project_id}`,
        );
        dispatch('SET_PROJECTS', res?.data);
      }
      push('/');
    } catch (err: any) {
      dispatch('STOP_LOADING');
      console.log(err);
    }
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