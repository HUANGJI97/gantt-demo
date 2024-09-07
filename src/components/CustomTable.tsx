import React from "react";
import { TaskItem } from "../apis/tasks";
import TaskListHeader, { Header } from "./TaskListHeader";
import TaskListTable, { Table } from "./TaskListTable";

export interface CustomTableColumns<T extends keyof TaskItem> {
  title: string;
  prop: T;
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
  if (column.render instanceof Function) {
    return column.render(row[column.prop], row, column);
  }
  return row[column.prop]?.toString();
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
              {renderColumn(row, column)}
            </div>
          ))
        }
      </TaskListTable>
    ),
  ];
}
