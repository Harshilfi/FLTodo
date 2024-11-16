import React, { useState, useEffect } from "react";
import './Style.scss';

import { MdAddBox, MdAssignmentTurnedIn , MdDelete, } from "react-icons/md";

const Todoer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState(3);
  const [sorting, setSorting] = useState("remaining");


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now(), title: taskTitle, priority:taskPriority, completed: false }]);
      setTaskTitle("");
      console.log({ id: Date.now(), title: taskTitle, priority:taskPriority, completed: false })
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortTasks = (criteria) => {
    let sortedTasks = [...tasks];
    if (criteria === "remaining") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else if (criteria === "priority") {
      sortedTasks.sort((a, b) => a.priority - b.priority);
    } else if (criteria === "completion") {
      sortedTasks.sort((a, b) => b.completed - a.completed);
    }
    setTasks(sortedTasks);
  };

  const handleSortChange = (event) => {
    const criteria = event.target.value;
    setSorting(criteria);
    sortTasks(criteria);
  };
  return (
    <div className="todoer">
      <h1>Task Manager</h1>
      <div className="inputs">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <select className="priority" defaultValue={3} onChange={(e)=>setTaskPriority(e.target.value)}>
            <option value={1} >very important</option>
            <option value={2}>important</option>
            <option value={3}>regular</option>
        </select>
        <button onClick={addTask} className="add-bt">
          <MdAddBox className="icon add"/>
        </button>
    </div>

    <div className="filter-panel">
        <p>Filter by</p>
        <button value={'priority'} onClick={handleSortChange}>Priority</button>
        <button value={'completion'} onClick={handleSortChange}>Completion</button>
        <button value={'remaining'} onClick={handleSortChange}>Remaining</button>
    </div>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id}
          style={{backgroundColor: task.completed ? "var(--accent)" : null}}>
                <MdAssignmentTurnedIn className="icon checked" onClick={() => toggleCompletion(task.id)} />
                <span className="task-title">{task.title}</span>

            <button onClick={() => deleteTask(task.id)} className="del-bt">
              <MdDelete className="icon del"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todoer;
