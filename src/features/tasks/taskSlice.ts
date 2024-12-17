import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterEnum, FilterType, Task } from "./types";

const sliceName = "tasks";

const defaultFilter = FilterEnum.ALL;

const initialState = {
  tasks: [],
  filter: defaultFilter,
} as {
  tasks: Task[];
  filter: FilterType;
};

/**
 * @description The commented code is the other way to write reducer using immutability concept.
 * But createSlice of toolkit does this parse for us automatically
 */
const taskSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);

      // return {
      //   ...state,
      //   tasks: [...state.tasks, action.payload],
      // };
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find((t) => t.id === action.payload);

      if (task) task.completed = !task.completed;

      // return {
      //   ...state,
      //   tasks: state.tasks.map((task) =>
      //     task.id === action.payload
      //       ? { ...task, completed: !task.completed }
      //       : task
      //   ),
      // };
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;

      // return {
      //   ...state,
      //   filter: action.payload,
      // };
    },
  },
});

export const { addTask, toggleTask, setFilter } = taskSlice.actions;

export default taskSlice.reducer;
