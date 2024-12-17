import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
import TaskList from "../../components/Task/list";
import Filter from "../../components/Filter";
import { RootState } from "../../store/store";
import { FilterEnum } from "../../features/tasks/types";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

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
    <div>
      <input value={taskName} onChange={handleSetName} placeholder="New task" />
      <button onClick={handleAddTask}>Add Task</button>
      <Filter />
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Home;
