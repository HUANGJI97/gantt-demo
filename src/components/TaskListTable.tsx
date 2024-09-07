import React from "react";
import { TaskItem } from "../apis/tasks";
export type Table = React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: TaskItem[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  children?: (row: TaskItem) => React.ReactNode;
}>;
const TaskListTable: Table = ({ rowHeight, rowWidth, tasks, children }) => {
  return (
    <div
      className="gantt-table-body"
      style={
        {
          "--column-width": rowWidth,
          "--row-height": `${rowHeight}px`,
        } as React.CSSProperties
      }
    >
      {tasks.map((row, index) => (
        <div className="row" key={`${row.id}-${index}`}>
          {children instanceof Function ? children(row) : ""}
        </div>
      ))}
    </div>
  );
};
export default TaskListTable;
