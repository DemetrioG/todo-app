import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../features/tasks/taskSlice";
import { Task as TaskProps } from "../../features/tasks/types";

const Task = ({ task }: { task: TaskProps }) => {
  const { id, name } = task;
  const dispatch = useDispatch();

  const handleToggleTask = useCallback(() => {
    dispatch(toggleTask(id));
  }, [dispatch, id]);

  return (
    <div
      onClick={handleToggleTask}
      style={{ textDecoration: task.completed ? "line-through" : "none" }}
    >
      {name}
    </div>
  );
};

export default memo(Task);
