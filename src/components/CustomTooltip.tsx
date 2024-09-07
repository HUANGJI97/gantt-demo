import dayjs from "dayjs";
import { TASK_STATUS_DICT, TASK_TYPE_DICT, TaskItem } from "../apis/tasks";

const CustomTooltip: React.FC<{
  task: TaskItem;
  fontSize: string;
  fontFamily: string;
}> = ({ task }) => {
  return (
    <div className="gantt-tooltip">
      <div className="header">
        <div className="title">
          <div>{task.name}</div>
          <div className="tag">{TASK_TYPE_DICT[task.type]}</div>
        </div>
        <div className="duration">
          {dayjs(task.start).format("YYYY年MM月DD日")}-
          {dayjs(task.end).format("YYYY年MM月DD日")}
        </div>
      </div>
      <div className="body">
        <div className="data-item">
          <div>任务状态</div>
          <div className={`status ${task.status}`}>
            {TASK_STATUS_DICT[task.status!]}
          </div>
        </div>
        <div className="data-item">
          <div>任务耗时</div>
          <div>{dayjs(task.end).diff(dayjs(task.start), "day") + 1}天</div>
        </div>
        <div className="data-item">
          <div>任务进度</div>
          <div
            className="progress"
            style={{ "--progress": `${task.progress}%` } as React.CSSProperties}
          ></div>
          {task.progress}%
        </div>
        <div className="data-item">
          <div>子任务数</div>
          <div>{task.children?.length}</div>
        </div>
        <div className="data-item">
          <div>相关人员</div>
          <div className="tags">
            <div className="tag">张三</div>
            <div className="tag">李四</div>
            <div className="tag">王五</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomTooltip;
