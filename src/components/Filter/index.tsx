import { useDispatch } from "react-redux";
import { setFilter } from "../../features/tasks/taskSlice";
import { useCallback } from "react";
import { FilterEnum, FilterType } from "../../features/tasks/types";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = useCallback(
    (filterType: FilterType) => {
      return dispatch(setFilter(filterType));
    },
    [dispatch]
  );

  return (
    <div>
      <button onClick={() => handleFilter(FilterEnum.ALL)}>All</button>
      <button onClick={() => handleFilter(FilterEnum.COMPLETED)}>
        Completed
      </button>
      <button onClick={() => handleFilter(FilterEnum.PENDING)}>Pending</button>
    </div>
  );
};

export default Filter;
