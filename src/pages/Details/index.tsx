import { useParams, useNavigate } from "react-router";
import { useCallback } from "react";
import Button from "../../components/Button";
import { useAppSelector } from "../../hooks/useAppSelector";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === Number(id))
  );

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 align-start justify-start bg-zinc-200 p-4 rounded w-80">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Name:</strong> {task.name}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
      </p>
      <Button text="Back to List" onClick={handleGoBack} />
    </div>
  );
};

export default Details;
