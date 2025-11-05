import express from 'express';

import { getTasksByBoardId, addTaskToBoard, updateTaskById, deleteTaskById } from '../controllers/task.controller.js';

const router = express.Router();

// Task Route APIs
router.get('/boards/:id/tasks', getTasksByBoardId);
router.post('/boards/:id/tasks', addTaskToBoard);
router.put('/boards/:id/tasks/:taskId', updateTaskById);
router.delete('/boards/:id/tasks/:taskId', deleteTaskById);

export default router;