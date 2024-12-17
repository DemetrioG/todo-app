import { memo } from "react";
import Task from "../Task";
import { Task as TaskProps } from "../../features/tasks/types";
import { useAppSelector } from "../../hooks/useAppSelector";

const TaskList = ({ tasks: filteredTasks }: { tasks: TaskProps[] }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const hasTasks = tasks.length > 0;
  const hasFilteredTasks = filteredTasks.length > 0;

  if (!hasTasks) {
    return <span className="text-xl font-medium">Create your first task</span>;
  }

  if (hasTasks && !hasFilteredTasks) return;

  return (
    <div className="flex flex-col gap-4 bg-zinc-200 p-4 rounded max-h-[400px] overflow-y-auto">
      {filteredTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default memo(TaskList);
