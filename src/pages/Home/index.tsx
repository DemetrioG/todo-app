import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
import TaskList from "../../components/Task/list";
import Filter from "../../components/Filter";
import { FilterEnum } from "../../features/tasks/types";
import Button from "../../components/Button";
import { useAppSelector } from "../../hooks/useAppSelector";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filter);

  const [taskName, setTaskName] = useState("");

  const handleSetName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskName(e.target.value);
    },
    []
  );

  const handleAddTask = useCallback(() => {
    if (taskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };

      dispatch(addTask(newTask));
      setTaskName("");
    }
  }, [dispatch, taskName]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const isAll = filter === FilterEnum.ALL;
        const isCompleted = filter === FilterEnum.COMPLETED;

        if (isAll) return true;

        if (isCompleted) return task.completed;

        return !task.completed;
      }),
    [filter, tasks]
  );

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex gap-2">
        <input
          value={taskName}
          onChange={handleSetName}
          placeholder="New task"
          className="bg-zinc-100 p-2 rounded"
        />
        <Button text="Add Task" onClick={handleAddTask} />
      </div>
      <Filter />
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Home;
