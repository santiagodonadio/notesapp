import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load notes from Supabase on first load
  useEffect(() => {
    loadNotes();
  }, []);

  // Fetch notes from Supabase
  const loadNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading notes:", error.message);
    } else {
      setTasks(data); // Store full note objects (with id, content, etc)
    }
  };

  // Add a new task to Supabase
  const addTask = async () => {
    if (input.trim() !== "") {
      const { error } = await supabase
        .from("notes")
        .insert([{ content: input }]);

      if (error) {
        console.error("Error saving task:", error.message);
      } else {
        setInput("");
        loadNotes(); // refresh list
      }
    }
  };

  // Delete a task from Supabase
  const removeTask = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      loadNotes(); // refresh list
    }
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
