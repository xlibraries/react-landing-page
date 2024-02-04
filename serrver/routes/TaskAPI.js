const express = require('express');
const router = express.Router();
const Task = require('../models/TaskModel');

// Create a new task
router.post('/create', async (req, res) => {
    console.log('Received request to /create');
    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        priority: req.body.priority,
        creationDate: req.body.creationDate,
    });

    try {
        const savedTask = await task.save();
        res.status(200).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Edit a task
router.put('/edit/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await Task.findOneAndUpdate(task._id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a task
// Delete a task
router.delete('/delete/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ id: req.params.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await Task.findOneAndDelete({ _id: task._id });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Mark a task as complete
router.put('/complete/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id);
        task.status = 'completed';
        const completedTask = await task.save();
        res.status(200).json(completedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;