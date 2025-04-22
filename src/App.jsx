import { useState } from "react";
import "./App.css"

function App(){

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== ""){
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (

    <div className="App">

      <h1>Santiago's To-Do List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new task"
      />

      <button onClick={addTask}>Add</button>

      <ul>

        {tasks.map((task, index) => (
            <li key={index}>
              {task}{" "}
              <button onClick={() => removeTask(index)}>X</button>
            </li>


        ))}


      </ul>





    </div>



  );

    
}

export default App;