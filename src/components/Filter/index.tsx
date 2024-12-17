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

  return (
    <div className="flex gap-2">
      <Button text="All" onClick={() => handleFilter(FilterEnum.ALL)} />
      <Button
        text="Completed"
        onClick={() => handleFilter(FilterEnum.COMPLETED)}
      />
      <Button text="Pending" onClick={() => handleFilter(FilterEnum.PENDING)} />
    </div>
  );
};

export default Filter;
