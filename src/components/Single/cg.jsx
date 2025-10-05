import React, { useState } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or Update Todo
  const handleSubmit = () => {
    if (!inputValue.trim()) return alert("Please enter a todo");

    if (editId) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, text: inputValue } : todo
      ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
    }

    setInputValue("");
  };

  // Delete Todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setInputValue(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-2">Todo App</h1>
      <p className="text-gray-600">Simple todo app with React & Tailwind</p>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Enter todo"
          className="border border-gray-300 rounded px-2 py-1 flex-1 mr-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`px-4 py-1 rounded text-white ${editId ? "bg-green-500" : "bg-blue-500"}`}
          onClick={handleSubmit}
        >
          {editId ? "Save" : "Add"}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b pb-1"
          >
            <span>{todo.text}</span>
            <div>
              <button
                className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
