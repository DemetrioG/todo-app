import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCallback } from "react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === Number(id))
  );

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Name:</strong> {task.name}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
      </p>
      <button onClick={handleGoBack}>Back to List</button>
    </div>
  );
};

export default Details;
