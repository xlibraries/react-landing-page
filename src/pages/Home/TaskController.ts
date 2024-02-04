// TaskController.tsx
import React, { useState, useEffect } from 'react';
import { Task } from './TaskModel';
import { SelectChangeEvent } from '@material-ui/core';

interface TaskControllerProps {
    setOpen: (open: boolean) => void;
    setNewTask: (task: Task) => void;
    newTask: Task;
    initialTasks: Task[];
}

export const TaskController = ({ setOpen, setNewTask, newTask, initialTasks }: TaskControllerProps) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [sortOption, setSortOption] = useState('creationDate');
    const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

    useEffect(() => {
        const newSortedTasks = [...tasks].sort((a, b) => {
            switch (sortOption) {
                case 'dueTasks':
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                case 'todaysTasks':
                    return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
                case 'tomorrowsTasks':
                    return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate() + 1;
                case 'priority':
                    return a.priority - b.priority;
                case 'creationDate':
                    return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
                default:
                    return 0;
            }
        });
        setSortedTasks(newSortedTasks);
    }, [tasks, sortOption]);

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
            priority: newTask.priority,
            creationDate: new Date() // Set the creation date to the current date and time
        };
        setTasks([...tasks, task]); // Add the new task to the tasks array
        setNewTask({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0, creationDate: new Date()});
    };


    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortOption(event.target.value as string);
    };


    return { handleOpen, handleClose, handleInputChange, handleAddTask, handleSortChange, sortedTasks, sortOption };
};
