import { memo } from "react";
import Task from "../Task";
import { Task as TaskProps } from "../../features/tasks/types";

const TaskList = ({ tasks }: { tasks: TaskProps[] }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default memo(TaskList);
