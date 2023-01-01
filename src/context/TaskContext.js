import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context)
    throw new Error("useTasks must be  used  within  a TaskContext Provider");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const getSession = await supabase.auth.getSession();
    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("userId", getSession.data.session.user.id)
      .eq("done", done)
      .order("id", { ascending: true });
    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (TaskName) => {
    try {
      setAdding(true);
      const user = await (await supabase.auth.getSession()).data.session.user;
      const { error, data } = await supabase
        .from("tasks")
        .insert({
          name: TaskName,
          userId: user.id,
        })
        .select();
      if (error) throw error;
      console.log(data);
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };
  
  const deleteTask = async (id) =>{
    const user = await (await supabase.auth.getSession()).data.session.user;
    const {error,data} = await supabase
      .from("tasks")
      .delete()
      .eq("userId",user.id)
      .eq("id",id);
    
    if (error) throw error;
    setTasks(tasks.filter((task)=>task.id !== id ));
  }

  const updatedTask = async(id,updatedFields)=> {
    const user = await (await supabase.auth.getSession()).data.session.user;
    const { error, data } = await supabase
      .from("tasks")
      .update(updatedFields)
      .eq("userId", user.id)
      .eq("id", id);

    if (error) throw error;
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask,updatedTask }}>
      {children}
    </TaskContext.Provider>
  );
};
