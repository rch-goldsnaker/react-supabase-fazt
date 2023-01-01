import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { deleteTask, updatedTask } = useTasks();
  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggle = () => {
    updatedTask(task.id, { done: !task.done });
  };

  return (
    <div className="card card-body mb-2">
      <h1 className="h5">{`${task.id}.${task.name}`}</h1>
      <p>{task.done ? "Done ✔" : "Not done ❌"}</p>
      <div className="ms-auto">
        <button className="btn btn-danger btn-sm me-1" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleToggle}>
          Done
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
