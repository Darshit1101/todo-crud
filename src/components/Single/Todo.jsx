import React, { useState } from 'react'

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    //add todo
    const handleAddTodo = () => {
        if (inputValue.trim() === "") {
            alert("Please enter a todo");
            return;
        }
        else {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    }

    //delete todo
    const handleDeleteTodo = (index) => {
        const newTodo = todos.filter((_, i) => i !== index);
        setTodos(newTodo);
    }

    //edit todo state change
    const handleEditTodo = (name, index) => {
        setInputValue(name);
        setIsEditing(true);
        setEditIndex(index);
    }

    //handle edit save todo
    const handleEditSave = () => {
        const newTodos = [...todos];
        newTodos[editIndex] = inputValue;
        setTodos(newTodos);

        //reset
        setInputValue("");
        setIsEditing(false);
        setEditIndex(null);
    }

    return (
        <div>
            <div className='text-2xl font-bold'>Todo app</div>
            <div className='text-lg'>This is a simple todo app built with React, Tailwind CSS and Vite.</div>

            <div className='mt-4'>
                <input
                    type="text"
                    placeholder='Enter todo'
                    className='border border-gray-300 rounded px-2 py-1 mr-2'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {
                    isEditing && <button className='bg-green-500 text-white px-4 py-1 rounded mr-2' onClick={handleEditSave}>Save</button>
                }
                {
                    !isEditing && <button className='bg-blue-500 text-white px-4 py-1 rounded' onClick={handleAddTodo}>Add Todo</button>
                }

            </div>

            <div className='mt-4'>
                <ul>
                    {
                        todos.map((todo, index) => (
                            <li key={index}>{todo}
                                <button className='ml-4 border border-yellow-500 rounded bg-yellow-500 text-white' onClick={() => handleEditTodo(todo, index)}>Edit</button>
                                <button className='ml-4 border border-red-500 rounded bg-red-500 text-white' onClick={() => handleDeleteTodo(index)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo