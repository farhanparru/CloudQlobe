"use client"; // Ensure this is at the very top
import React, { useState } from 'react';

const SupportTask = () => {
  // Sample support tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Resolve Network Outage',
      assignedTo: 'John Doe',
      status: 'In Progress',
      dueDate: '2024-09-30',
      notes: 'Investigate the root cause of the outage.',
    },
    {
      id: 2,
      title: 'Update System Software',
      assignedTo: 'Jane Smith',
      status: 'Pending',
      dueDate: '2024-10-05',
      notes: 'Ensure all systems are up-to-date.',
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    assignedTo: '',
    status: 'Pending',
    dueDate: '',
    notes: '',
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) {
      return; // Basic validation to ensure required fields are filled
    }
    const taskToAdd = {
      ...newTask,
      id: tasks.length + 1, // Simple ID assignment
    };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', assignedTo: '', status: 'Pending', dueDate: '', notes: '' }); // Reset form
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Support Tasks</h2>
      <p className="text-gray-600 mb-6">Manage support tasks here.</p>

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Status:</strong> <span className={`font-bold ${task.status === 'In Progress' ? 'text-yellow-500' : task.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}`}>{task.status}</span></p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
            <p><strong>Notes:</strong> {task.notes}</p>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Add New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full bg-gray-100 text-gray-900 px-4 py-2 mb-4 rounded-lg border border-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          className="w-full bg-gray-100 text-gray-900 px-4 py-2 mb-4 rounded-lg border border-gray-300"
          required
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="w-full bg-gray-100 text-gray-900 px-4 py-2 mb-4 rounded-lg border border-gray-300"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="w-full bg-gray-100 text-gray-900 px-4 py-2 mb-4 rounded-lg border border-gray-300"
          required
        />
        <textarea
          value={newTask.notes}
          onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
          rows="3"
          placeholder="Notes"
          className="w-full bg-gray-100 text-gray-900 px-4 py-2 mb-4 rounded-lg border border-gray-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default SupportTask;
