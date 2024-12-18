import { render, waitFor } from "@testing-library/react";
import TaskList from "../list";
import { Provider } from "react-redux";
import store from "../../../store/store";
import { Task, Task as TaskProps } from "../../../features/tasks/types";
import { addTask } from "../../../features/tasks/taskSlice";
import { act } from "react";
import { MemoryRouter } from "react-router";

const defaultTasks: TaskProps[] = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: true },
];

const setupComponent = (tasks: Task[] = []) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <TaskList tasks={tasks} />
      </MemoryRouter>
    </Provider>
  );
};

describe("TaskList component", () => {
  it("should render message when there are no tasks", () => {
    const { getByText } = setupComponent();

    expect(getByText("Create your first task")).toBeInTheDocument();
  });

  it("should not render anything when there are tasks but no filtered tasks", async () => {
    const [firstTask] = defaultTasks;

    const { queryByText } = setupComponent();

    await act(async () => {
      store.dispatch(addTask(firstTask));
    });

    await waitFor(() => {
      expect(queryByText("Create your first task")).toBeNull();
      expect(queryByText("Task 1")).toBeNull();
    });
  });

  it("should render filtered tasks", async () => {
    const [firstTask, secondTask] = defaultTasks;

    const { getByText } = setupComponent(defaultTasks);

    await act(async () => {
      store.dispatch(addTask(firstTask));
      store.dispatch(addTask(secondTask));
    });

    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });

  it("should render empty when filtered tasks are empty", async () => {
    const [firstTask, secondTask] = defaultTasks;

    const { queryByText } = setupComponent();

    await act(async () => {
      store.dispatch(addTask(firstTask));
      store.dispatch(addTask(secondTask));
    });

    expect(queryByText("Task 1")).toBeNull();
    expect(queryByText("Task 2")).toBeNull();
  });
});
