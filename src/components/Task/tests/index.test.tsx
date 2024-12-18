import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Task from "../index";
import store from "../../../store/store";
import { addTask } from "../../../features/tasks/taskSlice";
import { MemoryRouter, useNavigate } from "react-router";

const defaultTask = { id: 1, name: "Task 1", completed: false };

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const setupComponent = (addicionalProps = {}) => {
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Task task={{ ...defaultTask, ...addicionalProps }} />
      </MemoryRouter>
    </Provider>
  );

  store.dispatch(addTask(defaultTask));

  return component;
};

describe("Task component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders task with name and id", () => {
    const { getByText } = setupComponent();
    expect(getByText(defaultTask.name)).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    const { getByText } = setupComponent();
    const toggleButton = getByText(defaultTask.name);
    fireEvent.click(toggleButton);

    expect(
      store.getState().tasks.tasks.find((t) => t.id === defaultTask.id)
        ?.completed
    ).toBe(true);
  });

  it("expands task details", async () => {
    const { getByTestId } = setupComponent();
    const expandButton = getByTestId("expand-task");
    fireEvent.click(expandButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/details/${defaultTask.id}`);
  });

  it("renders task with completed status", async () => {
    const { getByText } = setupComponent({ completed: true });

    expect(getByText(defaultTask.name)).toHaveStyle(
      "textDecoration: line-through"
    );
  });

  it("renders task with pending status", () => {
    const { getByText } = setupComponent();

    expect(getByText(defaultTask.name)).not.toHaveStyle(
      "textDecoration: line-through"
    );
  });
});
