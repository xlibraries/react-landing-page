// HomePage.tsx
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, InputLabel, MenuItem, Select, Box } from '@material-ui/core';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import TaskCard from './TaskCard';
import { TaskController } from './TaskController';
import { Task } from './TaskModel';
import './HomePage.css';

interface HomePageProps {
    tasks: Task[];
}

const HomePage: React.FC<HomePageProps> = ({ tasks: initialTasks }) => {
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState<Task>({ id: '', title: '', description: '', dueDate: new Date(), status: '', priority: 0, creationDate: new Date() });
    const { handleOpen, handleClose, handleInputChange, handleAddTask, handleSortChange, sortedTasks, sortOption } = TaskController({ setOpen, setNewTask, newTask, initialTasks });

    const completedTasks = sortedTasks.filter(task => task.status === 'completed').length;
    const pendingTasks = sortedTasks.filter(task => task.status === 'pending').length;
    const dueTasks = sortedTasks.filter(task => new Date(task.dueDate) < new Date()).length;

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

    return (
        <Grid container spacing={3} direction="row" wrap="wrap">
            <Grid item xs={12} className="header">
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add New Task
                </Button>
                <Box>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select labelId="sort-label" id="sort-select" value={sortOption} onChange={handleSortChange}>
                        <MenuItem value={'dueTasks'}>Due Tasks</MenuItem>
                        <MenuItem value={'todaysTasks'}>Today's Tasks</MenuItem>
                        <MenuItem value={'tomorrowsTasks'}>Tomorrow's Tasks</MenuItem>
                        <MenuItem value={'priority'}>Priority</MenuItem>
                        <MenuItem value={'creationDate'}>Creation Date</MenuItem>
                    </Select>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <TextField name="title" label="Title" value={newTask.title} onChange={handleInputChange} />
                        <TextField name="description" label="Description" value={newTask.description} onChange={handleInputChange} />
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
            <Grid item xs={12} className="main-content">
                {sortedTasks.map(task => (
                    <Grid item xs={2}>
                        <TaskCard key={task.id} task={task} />
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12} className="charts">
                <div style={{ maxWidth: '600px', maxHeight: '600px' }}>
                    <Pie data={pieData} />
                </div>
            </Grid>
        </Grid>
    );
};

export default HomePage;