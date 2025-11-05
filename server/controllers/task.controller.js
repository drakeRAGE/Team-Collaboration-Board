
import Task from '../models/task.model.js';

export async function getTasksByBoardId(req, res) {
    try {
        const tasks = await Task.find({ boardId: req.params.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function addTaskToBoard(req, res) {
    try {
        const task = new Task({
            ...req.body,
            boardId: req.params.id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateTaskById(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteTaskById(req, res) {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}