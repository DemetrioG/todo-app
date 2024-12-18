import { render, fireEvent } from "@testing-library/react";
import Filter from "../index";
import { useDispatch, Provider } from "react-redux";
import taskReducer, { setFilter } from "../../../features/tasks/taskSlice";
import { FilterEnum } from "../../../features/tasks/types";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<typeof import("react-redux")>(
    "react-redux"
  );
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const setupStore = () => {
  return configureStore({
    reducer: {
      tasks: taskReducer,
    },
  });
};

describe("Filter component", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render 3 buttons", () => {
    const store = setupStore();

    const { getAllByRole } = render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    expect(getAllByRole("button")).toHaveLength(3);
  });

  it("should dispatch setFilter action when button is clicked", () => {
    const store = setupStore();

    const { getByText } = render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    fireEvent.click(getByText("All"));
    expect(mockDispatch).toHaveBeenCalledWith(setFilter(FilterEnum.ALL));
  });
});
