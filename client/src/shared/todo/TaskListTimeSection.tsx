import { Markdown } from "../markdown";
import { FC, useState } from "react";

interface ITaskListTimeSection {
  fields: any;
}
export const TaskListTimeSection: FC<ITaskListTimeSection> = ({ fields }) => {
  return (
    <>
      <Markdown children="### 0:00" align="center" />
      <Markdown children="Add a task below" align="center" />
      <Markdown children="### ⏸️️" align="center" />
      <Markdown children="### ▶️" align="center" />
    </>
  );
};
