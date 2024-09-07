import "./App.scss";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { getTasks } from "./apis/tasks";
import CustomTooltip from "./components/CustomTooltip";
import GithubSvg from "./assets/github.svg";

// const TaskListHeader: React.FC<{
//   headerHeight: number;
//   rowWidth: string;
//   fontFamily: string;
//   fontSize: string;
// }> = (props) => (
//   <div
//     className="custom-task-list-header"
//     style={{ "--height": `${props.headerHeight - 2}px` } as React.CSSProperties}
//   >
//     <div>名称</div>
//     <div>开始时间</div>
//     <div>结束时间</div>
//   </div>
// );

function App() {
  // const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([]);

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
  // const CustomTooltip =

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
      {tasks.length ? (
        <Gantt
          tasks={tasks}
          todayColor="#FBEBE4"
          TooltipContent={CustomTooltip}
          locale="zh"
          listCellWidth="155px"
          onExpanderClick={handleExpanderClick}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
