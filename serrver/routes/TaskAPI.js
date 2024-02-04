const Router = require('express');
const router = Router();
const Task = require('../models/TaskModel');

// Create a new task
router.post('/create', async (req, res) => {
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
        res.send(savedTask);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all tasks
router.get('/fetch', async (req, res) => {
    try {
        const tasks = await find();
        console.log("tasks");
        res.send(tasks);
    } catch (err) {
        console.log("err");
        res.status(400).send(err);
    }
});

export default router;
