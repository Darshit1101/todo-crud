import React, { useState } from "react";

const TwoInputCrud = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, formData]);
    }

    setFormData({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          React CRUD with Tailwind
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* List Section */}
      <div className="mt-8 w-full max-w-md">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No records found</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TwoInputCrud;
