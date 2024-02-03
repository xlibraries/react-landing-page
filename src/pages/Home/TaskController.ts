// TaskController.ts
import { Request, Response } from 'express';
import Task from './TaskModel';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
}

const TaskController = {
    getTasks: async (req: Request, res: Response) => {
        const tasks = await Task.find();
        res.json(tasks);
    },

    addTask: async (req: Request, res: Response) => {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.json(savedTask);
    },

    updateTask: async (req: Request, res: Response) => {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    },

    deleteTask: async (req: Request, res: Response) => {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json(deletedTask);
    }
};

export default TaskController;
