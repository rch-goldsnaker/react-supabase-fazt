import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const navigate = useNavigate();
  const [showTaskDone, setShowTaskDone] = useState(false);

  const handleAuth = async (e) => {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleAuth();
  }, [navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <TaskForm />
        <header className="d-flex justify-content-between my-3">
          <span className="h5">
            {showTaskDone ? "Task Done" : "Task to DO"}
          </span>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setShowTaskDone(!showTaskDone)}
          >
            {showTaskDone ? "Show task to Do" : "Show task Done"}
          </button>
        </header>
        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}

export default Home;
