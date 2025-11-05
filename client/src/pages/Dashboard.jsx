import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Board List Sidebar Component
const BoardList = ({ boards = [], activeBoard, onBoardSelect, onCreateBoard, onDeleteBoard }) => {
    return (
        <div className="sidebar bg-gray-50 p-4 w-64 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Boards</h2>
            <button
                onClick={() => onCreateBoard()}
                className="mb-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                New Board
            </button>
            {Array.isArray(boards) && boards.map(board => (
                <div
                    key={board._id}
                    className={`board-item ${activeBoard === board._id ? 'active' : ''} flex items-center justify-between p-2 rounded hover:bg-gray-100`}
                >
                    <span
                        onClick={() => onBoardSelect(board._id)}
                        className="cursor-pointer text-sm text-gray-700"
                    >
                        {board.name}
                    </span>
                    <button
                        onClick={() => onDeleteBoard(board._id)}
                        className="ml-2 text-sm text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            ))}

        </div>
    );
};

// Create/Edit Task Modal Component
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

// Main Dashboard Component
const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [activeBoard, setActiveBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    // Fetch Boards
    useEffect(() => {
        const fetchBoards = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/boards`);
            setBoards(response.data);
        };
        fetchBoards();
    }, []);
    

    // Fetch Tasks for Active Board
    useEffect(() => {
        const fetchTasks = async () => {
            if (activeBoard) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/boards/${activeBoard}/tasks`);
                setTasks(response.data);
            }
        };
        if (activeBoard) fetchTasks();
    }, [activeBoard]);

    // Board Operations
    const createBoard = async () => {
        const name = prompt('Enter board name:');
        if (name) {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/boards`, { name });
            setBoards([...boards, response.data]);
        }
    };

    const deleteBoard = async (boardId) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/boards/${boardId}`);
        setBoards(boards.filter(board => board._id !== boardId));
        if (activeBoard === boardId) setActiveBoard(null);
    };

    // Task Operations
    const handleTaskSubmit = async (taskData) => {
        try {
            if (currentTask) {
                await axios.put(`${import.meta.env.VITE_API_URL}/boards/${activeBoard}/tasks/${currentTask._id}`, taskData);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/boards/${activeBoard}/tasks`, taskData);
            }
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/boards/${activeBoard}/tasks`);
            setTasks(response.data);
            setIsTaskModalOpen(false);
            setCurrentTask(null);
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };
    
    const deleteTask = async (taskId) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/boards/${activeBoard}/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    // Group tasks by status
    const groupedTasks = {
        todo: tasks.filter(task => task.status === 'todo'),
        inProgress: tasks.filter(task => task.status === 'inProgress'),
        done: tasks.filter(task => task.status === 'done')
    };

    return (
        <div className="dashboard flex h-screen">
            <BoardList
                boards={boards}
                activeBoard={activeBoard}
                onBoardSelect={setActiveBoard}
                onCreateBoard={createBoard}
                onDeleteBoard={deleteBoard}
            />
            
            <div className="main-content flex-1 p-6">
                {activeBoard ? (
                    <>
                        <div className="mb-4">
                            <button
                                onClick={() => setIsTaskModalOpen(true)}
                                className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                New Task
                            </button>
                        </div>
                        <div className="task-columns grid grid-cols-3 gap-4">
                            {Object.entries(groupedTasks).map(([status, taskList]) => (
                                <div key={status} className="task-column bg-white p-4 rounded shadow-sm">
                                    <h3 className="text-md font-semibold mb-2 capitalize">{status}</h3>
                                    {taskList.map(task => (
                                        <div key={task._id} className="task-card mb-3 p-3 border rounded bg-gray-50">
                                            <h4 className="font-medium">{task.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {setCurrentTask(task); setIsTaskModalOpen(true)}}
                                                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task._id)}
                                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                ): (
                    <div className="flex flex-column items-center justify-center h-full">
                        <h2 className="text-2xl text-gray-600">Select or create a board to get started.</h2>
                    </div>
                )}
            </div>

            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => {setIsTaskModalOpen(false); setCurrentTask(null)}}
                task={currentTask}
                onSubmit={handleTaskSubmit}
            />
        </div>
    );
};

export default Dashboard;
