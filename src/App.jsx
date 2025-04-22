import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // 🧠 Load tasks from Supabase on page load
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading notes:", error.message);
    } else {
      setTasks(data); // Each task is { id, content, created_at }
    }
  };

  // 📝 This version just updates local state for now (we'll update it next!)
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), content: input }]); // temporary ID
      setInput("");
    }
  };

  // ❌ This version just updates local state (we’ll upgrade it to delete from Supabase)
  const removeTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>Santiago's To-Do List</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        placeholder="Add a new task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.content}{" "}
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
