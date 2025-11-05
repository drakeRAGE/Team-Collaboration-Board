
import React, { useState } from 'react';

const TaskModal = ({ isOpen, onClose, task, onSubmit }) => {
    const [taskData, setTaskData] = useState(task || { title: '', description: '', status: 'todo' });

    return isOpen ? (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-lg font-medium mb-4">{task ? 'Edit Task' : 'Create Task'}</h3>
                <input
                    value={taskData.title}
                    onChange={e => setTaskData({...taskData, title: e.target.value})}
                    placeholder="Task Title"
                    className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <textarea
                    value={taskData.description}
                    onChange={e => setTaskData({...taskData, description: e.target.value})}
                    placeholder="Description"
                    className="w-full mb-3 px-3 py-2 border rounded h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <select
                    value={taskData.status}
                    onChange={e => setTaskData({...taskData, status: e.target.value})}
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none"
                >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onSubmit(taskData)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default TaskModal;