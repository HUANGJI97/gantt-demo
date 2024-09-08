import "./App.scss";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { getTasks } from "./apis/tasks";
import CustomTooltip from "./components/CustomTooltip";
import GithubSvg from "./assets/github.svg";
import useCustomTable from "./components/CustomTable";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 引入中文语言包
import ButtonTabs from "./components/ButtonTabs";

dayjs.locale("zh-cn"); // 设置为中文
function App() {
  // const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day);
  const [TaskListHeader, TaskListTable] = useCustomTable([
    { title: "名称", prop: "name", onExpanderClick: handleExpanderClick },
    {
      title: "开始时间",
      prop: "start",
      render: (val) => dayjs(val).format("YYYY-MM-DD"),
    },
    {
      title: "结束时间",
      prop: "end",
      render: (val) => dayjs(val).format("YYYY-MM-DD"),
    },
  ]);

  const columnWidth = useMemo(() => {
    const DEFAULT = 60;
    const modeColumnWidthMap = new Map<ViewMode, number>([
      [ViewMode.Day, 60],
      [ViewMode.Week, 250],
      [ViewMode.Month, 300],
      [ViewMode.QuarterYear, 400],
      [ViewMode.Year, 450],
    ]);
    return modeColumnWidthMap.get(viewMode) || DEFAULT;
  }, [viewMode]);

  async function fetchTask() {
    const result = await getTasks();
    console.log("执行 fetchTask");
    setTasks(result);
  }
  useEffect(() => {
    fetchTask();
  }, []);
  function updateTask(task: Task) {
    setTasks(tasks.map((item) => (item.id === task.id ? task : item)));
  }

  function handleExpanderClick(task: Task) {
    console.log("展开按钮", task);
    updateTask(task);
  }
  function handleDateChange(task: Task) {
    updateTask(task);
  }
  function handleProgressChange(task: Task) {
    updateTask(task);
  }
  const customCalendarColumn = (date: Date) => {
    const day = dayjs(date);
    return (
      <div className="gantt-calendar-column">
        <div className="date">{day.format("MM-DD")}</div>
        <div className="week">{day.format("ddd")}</div>
      </div>
    );
  };
  // const CustomTooltip =
  const viewModes = [
    {
      value: ViewMode.Day,
      label: "日",
    },

    {
      value: ViewMode.Week,
      label: "周",
    },
    {
      value: ViewMode.Month,
      label: "月",
    },
    {
      value: ViewMode.QuarterYear,
      label: "季",
    },
  ];

  return (
    <div className="container">
      {/* <div style={{ width: "300px" }}>
        {tasks[0] && (
          <CustomTooltip task={tasks[0]} fontFamily="" fontSize="" />
        )}
      </div> */}
      <div className="header">
        <a href="https://github.com/HUANGJI97/gantt-demo" target="_blank">
          <img src={GithubSvg} />
          <h1>Gantt Demo</h1>
        </a>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}
      >
        <ButtonTabs<ViewMode>
          value={viewMode}
          items={viewModes}
          onChange={(val) => setViewMode(val)}
        ></ButtonTabs>
      </div>
      {tasks.length ? (
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          todayColor="#FBEBE4"
          TooltipContent={CustomTooltip}
          TaskListHeader={TaskListHeader}
          TaskListTable={TaskListTable}
          columnWidth={columnWidth}
          customCalendarColumn={customCalendarColumn}
          locale="zh"
          listCellWidth="155px"
          onExpanderClick={handleExpanderClick}
          onDateChange={handleDateChange}
          onProgressChange={handleProgressChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
