// TaskController.tsx
import React, { useState } from 'react';
import { Task } from './TaskModel';

interface TaskControllerProps {
    setOpen: (open: boolean) => void;
    setNewTask: (task: Task) => void;
    newTask: Task;
    initialTasks: Task[];
}

export const TaskController = ({ setOpen, setNewTask, newTask, initialTasks }: TaskControllerProps) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = () => {
        const task: Task = {
            id: Math.random().toString(), // Generate a random id
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            status: newTask.status,
            priority: newTask.priority
        };
        setTasks([...tasks, task]); // Add the new task to the tasks array
        setNewTask({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0 });
    };

    return { handleOpen, handleClose, handleInputChange, handleAddTask, tasks };
};
