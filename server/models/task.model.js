import mongoose from 'mongoose';

// Task Model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'pending' },
    priority: { type: String, default: 'medium' },
    assignedTo: String,
    dueDate: Date,
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;