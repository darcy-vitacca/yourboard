import {
  TodoButtonName,
  TodoButtonTime,
  TodoFuncContainer,
  TodoInput,
  TodoItemContainer,
  TodoItemText,
} from "../header/sections/SideMenu/SideMenu.styles";
import { FC, useState } from "react";
import { Markdown } from "../markdown";
import { Controller } from "react-hook-form";

interface ITaskListItem {
  index: number;
  handleDelete: any;
  control: any;
  setValue: any;
  item: any;
}
export const TaskListItem: FC<ITaskListItem> = ({
  index,
  handleDelete,
  control,
  setValue,
  item,
}) => {
  const handleTime = (time) => {
    const date = new Date(0);
    const convertedTime = parseInt(time);
    date.setSeconds(convertedTime * 60);
    return convertedTime > 60
      ? date.toISOString().substr(11, 8)
      : date.toISOString().substr(14, 5);
  };
  const [showtime, setShowtime] = useState(true);
  const [showName, setShowName] = useState(true);
  const [time, setTime] = useState(null);
  const [name, setName] = useState(null);

  const completeTask = (item) => {
    //Send complete call
    console.log(item);
  };

  console.log("item", item);
  return (
    <TodoItemContainer>
      <TodoItemText>
        {showName ? (
          <TodoButtonName
            type="text"
            name={`task_name.${index}`}
            value={item?.task_name}
            onMouseOut={(e) => setShowName(false)}
            onChange={(e: any) => {
              setValue(`task_name`, e.target.value);
            }}
            placeholder="Click to add name"
          />
        ) : (
          <div onClick={() => setShowName(true)}>
            <Markdown
              children="urboard reengagement email"
              align="left"
              className="timerText"
            />
          </div>
        )}

        {showtime ? (
          <TodoButtonTime onClick={() => setShowtime(false)}>
            {time ? `${handleTime(time)}` : "00:00"}
          </TodoButtonTime>
        ) : (
          <TodoInput
            type="number"
            max="1440"
            min="0"
            step="1"
            name={`task_time.${index}`}
            //@ts-ignore
            value={item?.task_time}
            onMouseOut={(e: any) => {
              setShowtime(true);
            }}
            onChange={(e: any) => {
              if (parseInt(e.target.value) < 1440) {
                setValue(`task_time.${index}`, e.target.value);
              }
            }}
          />
        )}
      </TodoItemText>

      <TodoFuncContainer>
        <div onClick={() => completeTask("tick")}>
          <Markdown children="### ✅" align="right" className="timerIcons" />
        </div>
        <div onClick={() => handleDelete(index)}>
          <Markdown children="### ✖️" align="right" className="timerIcons" />
        </div>
      </TodoFuncContainer>
    </TodoItemContainer>
  );
};
