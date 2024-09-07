import React from "react";
export type Header = React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  children?: React.ReactNode;
}>;
const TaskListHeader: Header = ({ headerHeight, children }) => (
  <div
    className="custom-task-list-header"
    style={{ "--height": `${headerHeight - 2}px` } as React.CSSProperties}
  >
    {children ? children : ""}
  </div>
);
export default TaskListHeader;
