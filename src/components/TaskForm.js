import { useState } from "react";
import { useTasks } from "../context/TaskContext";
function TaskForm() {
  const [TaskName, setTaskName] = useState("");
  const { createTask,adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(TaskName);
    setTaskName("")
  };

  return (
      <form onSubmit={handleSubmit} className="card card-body">
        <input
          type="text"
          name="taskName"
          placeholder="write a task name"
          onChange={(e) => setTaskName(e.target.value)}
          value={TaskName}
          className="form-control mb-2"
        />
        <div className="ms-auto">
          <button disabled={adding} className="btn btn-primary btn-sm">{adding ? "Adding" : "Add"}</button>
        </div>
      </form>
  );
}

export default TaskForm;
