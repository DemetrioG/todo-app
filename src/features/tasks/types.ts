export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export type FilterType = "ALL" | "COMPLETED" | "PENDING";

export enum FilterEnum {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}
