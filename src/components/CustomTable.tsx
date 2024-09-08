import React from "react";
import { TaskItem } from "../apis/tasks";
import TaskListHeader, { Header } from "./TaskListHeader";
import TaskListTable, { Table } from "./TaskListTable";
import ICON_EXPAND from "../assets/icon-arrow.svg";

export interface CustomTableColumns<T extends keyof TaskItem> {
  title: string;
  prop: T;
  onExpanderClick?: (task: TaskItem) => void;
  render?: (
    val: TaskItem[T],
    row: TaskItem,
    column: CustomTableColumns<T>
  ) => React.ReactNode;
}
function renderColumn<T extends keyof TaskItem>(
  row: TaskItem,
  column: CustomTableColumns<T>
): React.ReactNode {
  const value = row[column.prop];
  if (column.render instanceof Function) {
    return column.render(value, row, column);
  }
  return value?.toString();
}
export default function useCustomTable<T extends keyof TaskItem>(
  columns: CustomTableColumns<T>[]
): [Header, Table] {
  return [
    (props) => (
      <TaskListHeader {...props}>
        {columns.map((column) => (
          <div className="column" key={column.prop}>
            {column.title}
          </div>
        ))}
      </TaskListHeader>
    ),
    (props) => (
      <TaskListTable {...props}>
        {(row) =>
          columns.map((column) => (
            <div className="column" key={`${row.id}-${column.prop}`}>
              {row.children?.length &&
              column.onExpanderClick instanceof Function ? (
                <img
                  src={ICON_EXPAND}
                  onClick={() => {
                    row.hideChildren = !row.hideChildren;
                    console.log("点击展开按钮", row);
                    column.onExpanderClick && column.onExpanderClick(row);
                  }}
                  className={`icon-expand ${
                    row.hideChildren ? "" : "expanded"
                  }`}
                />
              ) : (
                ""
              )}

              {renderColumn(row, column)}
            </div>
          ))
        }
      </TaskListTable>
    ),
  ];
}
