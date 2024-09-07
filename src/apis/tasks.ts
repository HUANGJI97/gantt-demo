import dayjs from "dayjs";
import { Task } from "gantt-task-react";
const COMMON_TASK_STYLES: Task["styles"] = {
  /**  背景色 */
  backgroundColor: '#FE9961',
  /** 进度颜色 */
  progressColor: '#F06503',

  backgroundSelectedColor: "#d9af99",
  /** 选中后的进度色 */
  progressSelectedColor: '#c25304'
}

const DONE_TASK_STYLES: Task["styles"] = {
  ...COMMON_TASK_STYLES,
  backgroundColor: '#04b757',
  progressColor: '#04b757',
  progressSelectedColor: '#008000'
}

const PENDING_TASK_STYLES: Task["styles"] = {
  ...COMMON_TASK_STYLES,
  backgroundColor: '#D5DEF2',
  backgroundSelectedColor: '#668fe7'
}


export interface TaskItem extends Task {
  children?: Task[];
  status?: "pending" | "doing" | "done"
}
export const TASK_STATUS_DICT = {
  "pending": "待开始",
  "doing": "进行中",
  "done": "已完成"
}
export const TASK_TYPE_DICT = {
  "project": "项目",
  "milestone": "里程碑",
  "task": "任务"
}
export function getTasks(): Promise<TaskItem[]> {
  return new Promise((resolve) => {
    const tasks: Task[] = [
      {
        start: new Date("2024-08-30 00:00:00"),
        end: new Date("2024-09-10 23:59:59"),
        name: '极数大屏',
        id: 'project-1',
        type: "project",
        progress: 0,
        isDisabled: false,
        hideChildren: false,
        styles: {
          backgroundColor: '#F06503',
          progressColor: '#D5DEF2'
        }
      },
      {
        start: new Date("2024-08-30 00:00:00"),
        end: new Date("2024-09-05 23:59:59"),
        name: 'v1.1.4版本开发',
        id: 'Task 0',
        type: 'task',
        progress: 45,
        isDisabled: true,
        project: "project-1",
        styles: COMMON_TASK_STYLES,
      },
      {
        start: new Date("2024-09-06 00:00:00"),
        end: new Date("2024-09-09 23:59:59"),
        name: 'v1.1.4测试',
        id: 'Task 1',
        type: 'task',
        progress: 45,
        isDisabled: true,
        project: "project-1",
        styles: COMMON_TASK_STYLES,
      },
      {
        start: new Date("2024-09-04 00:00:00"),
        end: new Date("2024-09-04 23:59:59"),
        name: '紧急 bug 修复 ',
        id: 'Task 2',
        type: 'task',
        progress: 100,
        isDisabled: false,
        project: "project-1",
        styles: COMMON_TASK_STYLES,
      }, {
        start: new Date("2024-09-10 00:00:00"),
        end: new Date("2024-09-10 23:59:59"),
        name: '版本上线',
        id: 'Task 3',
        type: "milestone",
        progress: 0,
        isDisabled: true,
        project: "project-1",
        styles: COMMON_TASK_STYLES,
      },

    ];
    setTimeout(() => {
      resolve(tasks.map(item => {
        const children = tasks.filter(task => task.project === item.id)
        const status = dayjs(item.start).isAfter(dayjs()) ? "pending" : (item.progress === 100 ? 'done' : 'doing')
        return {
          ...item,
          styles: status === "done" ? DONE_TASK_STYLES
            : status === "pending" ? PENDING_TASK_STYLES :
              COMMON_TASK_STYLES,
          progress: children.length > 0 ? children.reduce((acc, task) => acc + task.progress, 0) / children.length : item.progress,
          children,
          status
        }
      }));
    }, Math.random() * 1000);
  })
}