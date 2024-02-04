import React, { useState, useEffect } from 'react';
import { Task } from './TaskModel';

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
        fetchTasks();
    }, []);

    useEffect(() => {
        sortTasks();
    }, [tasks, sortOption]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/task');
            if (response.ok) {
                const tasks = await response.json();
                setTasks(tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const sortTasks = () => {
        const today = new Date();
    
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
    
        const newSortedTasks = [...tasks].sort((a, b) => {
            switch (sortOption) {
                case 'dueTasks':
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                case 'todaysTasks':
                    return (new Date(a.dueDate).getTime() === today.getTime() ? 0 : 1) - (new Date(b.dueDate).getTime() === today.getTime() ? 0 : 1);
                case 'tomorrowsTasks':
                    return (new Date(a.dueDate).getTime() === tomorrow.getTime() ? 0 : 1) - (new Date(b.dueDate).getTime() === tomorrow.getTime() ? 0 : 1);
                case 'priority':
                    return b.priority - a.priority;
                case 'creationDate':
                    return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
                default:
                    return 0;
            }
        });
        setSortedTasks(newSortedTasks);
    };
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setNewTask({ ...newTask, [e.target.name || '']: e.target.value });
    };
    
    const handleAddTask = async () => {
        if (!newTask.title || !newTask.dueDate || !newTask.status || !newTask.priority) {
            alert('Please fill all required fields.');
            return;
        }
    
        const task: Task = {
            id: Math.random().toString(), // Generate a random id
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            status: newTask.status,
            priority: newTask.priority,
            creationDate: new Date() // Set the creation date to the current date and time
        };

        try {
            // Make an API call to create the task
            const response = await fetch('/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            if (response.ok) {
                const savedTask = await response.json();
                setTasks([...tasks, savedTask]); // Add the new task to the tasks array
                setNewTask({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0, creationDate: new Date()});
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleSortChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSortOption(event.target.value as string);
    };
    

    const handleEditTask = async (id: string, updatedTask: Task) => {
        try {
            const response = await fetch(`/api/task/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                const editedTask = await response.json();
                setTasks(tasks.map(task => task.id === id ? editedTask : task));
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const response = await fetch(`/api/task/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleMarkAsComplete = async (id: string) => {
        const completedTask = tasks.find(task => task.id === id);
        if (completedTask) {
            completedTask.status = 'completed';
            await handleEditTask(id, completedTask);
        }
    };

    return { handleOpen, handleClose, handleInputChange, handleAddTask, handleSortChange, handleEditTask, handleDeleteTask, handleMarkAsComplete, sortedTasks, sortOption };
};

export function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-base
    const year = date.getFullYear();
    return `${hours}:${minutes} hrs. - ${day}/${month}/${year}`;
}