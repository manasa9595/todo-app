"use client";

import { useState, useEffect } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex].text = input;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: input, done: false }]);
    }

    setInput("");
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditingIndex(index);
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg border">
      <h1 className="text-2xl font-bold mb-4">📝 Manasa's To-Do List</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-grow px-3 py-2 border rounded"
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span
              onClick={() => toggleDone(index)}
              className={`cursor-pointer flex-1 ${
                task.done ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
