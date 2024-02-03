import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    status: String,
    priority: Number,
});

export default mongoose.model('Task', taskSchema);
