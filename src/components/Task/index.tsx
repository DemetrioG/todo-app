import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../features/tasks/taskSlice";
import { Task as TaskProps } from "../../features/tasks/types";
import { useNavigate } from "react-router";

const Task = ({ task }: { task: TaskProps }) => {
  const { id, name } = task;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleTask = useCallback(() => {
    dispatch(toggleTask(id));
  }, [dispatch, id]);

  const handleExpandTask = useCallback(() => {
    navigate(`/details/${id}`);
  }, [navigate, id]);

  return (
    <div className="flex gap-2 w-80 bg-zinc-100 p-2 rounded justify-between">
      <span
        onClick={handleToggleTask}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {name}
      </span>
      <span onClick={handleExpandTask} data-testid="expand-task">
        🔎
      </span>
    </div>
  );
};

export default memo(Task);
