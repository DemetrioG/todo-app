import { useDispatch } from "react-redux";
import { setFilter } from "../../features/tasks/taskSlice";
import { useCallback } from "react";
import { FilterEnum, FilterType } from "../../features/tasks/types";
import Button from "../Button";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = useCallback(
    (filterType: FilterType) => {
      return dispatch(setFilter(filterType));
    },
    [dispatch]
  );

  const handleFilterAll = useCallback(
    () => handleFilter(FilterEnum.ALL),
    [handleFilter]
  );

  const handleFilterCompleted = useCallback(
    () => handleFilter(FilterEnum.COMPLETED),
    [handleFilter]
  );

  const handleFilterPending = useCallback(
    () => handleFilter(FilterEnum.PENDING),
    [handleFilter]
  );

  return (
    <div className="flex gap-2">
      <Button text="All" onClick={handleFilterAll} />
      <Button text="Completed" onClick={handleFilterCompleted} />
      <Button text="Pending" onClick={handleFilterPending} />
    </div>
  );
};

export default Filter;
