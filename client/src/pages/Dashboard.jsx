import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardList from '../components/BoardList.jsx';
import TaskModal from '../components/TaskModal.jsx';

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
                {activeBoard && (
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
