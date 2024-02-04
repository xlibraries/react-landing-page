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

module.exports = router;
