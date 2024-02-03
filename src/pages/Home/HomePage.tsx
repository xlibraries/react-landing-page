import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@material-ui/core';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import TaskCard from './TaskCard';
import TodoList from './TodoList';
import TaskController from './TaskController';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
}

interface HomePageProps {
    tasks: Task[];
}

const HomePage: React.FC<HomePageProps> = ({ tasks }) => {
    // Calculate the data for the pie chart
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const dueTasks = tasks.filter(task => new Date(task.dueDate) < new Date()).length;

    const pieData = {
        labels: ['Completed Tasks', 'Pending Tasks', 'Due Tasks'],
        datasets: [
            {
                data: [completedTasks, pendingTasks, dueTasks],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
            }
        ]
    };

    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState<Task>({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0 });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = () =>
    {
        const task: Task = {
            id: Math.random().toString(), // Generate a random id
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            status: newTask.status,
            priority: newTask.priority
        };
        setNewTask({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0 });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TaskCard title="Completed Tasks" count={completedTasks} />
            </Grid>
            <Grid item xs={6}>
                <TaskCard title="Pending Tasks" count={pendingTasks} />
            </Grid>
            <Grid item xs={12}>
                <TodoList tasks={tasks} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add New Task
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <TextField name="title" label="Title" value={newTask.title} onChange={handleInputChange} />
                        <TextField name="description" label="Description" value={newTask.description} onChange={handleInputChange} />
                        {/* Add fields for due date, status, and priority here */}
                        <TextField name="dueDate" label="Due Date" value={newTask.dueDate} onChange={handleInputChange} />
                        <TextField name="status" label="Status" value={newTask.status} onChange={handleInputChange} />
                        <TextField name="priority" label="Priority" value={newTask.priority} onChange={handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddTask}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12}>
                <div style={{ maxWidth: '600px', maxHeight: '600px' }}>
                    <Pie data={pieData} />
                </div>
            </Grid>
        </Grid>
    );
};

export default HomePage;
