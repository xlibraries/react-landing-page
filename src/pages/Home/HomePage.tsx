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
    const { handleOpen, handleClose, handleInputChange, handleAddTask, handleSortChange, handleEditTask, handleDeleteTask, handleMarkAsComplete, sortedTasks, sortOption } = TaskController({ setOpen, setNewTask, newTask, initialTasks });

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
                            <TextField name="title" label="Title *" value={newTask.title} onChange={handleInputChange} fullWidth />
                            <TextField name="description" label="Description" value={newTask.description} onChange={handleInputChange} fullWidth multiline />
                            <TextField name="dueDate" label="Due Date *" value={newTask.dueDate} onChange={handleInputChange} type="date" InputLabelProps={{ shrink: true }} />
                            <InputLabel id="priority-label">Priority *</InputLabel>
                            <Select name="priority" label="Priority" value={newTask.priority} onChange={handleInputChange} fullWidth>
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                            </Select>
                            <InputLabel id="status-label">Status *</InputLabel>
                            <Select name="status" value={newTask.status} onChange={handleInputChange} fullWidth>
                                <MenuItem value="due">Due</MenuItem>
                                <MenuItem value="complete">Complete</MenuItem>
                                <MenuItem value="pending">Pending</MenuItem>
                            </Select>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddTask}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={12} className="main-content">
            {sortedTasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                    handleMarkAsComplete={handleMarkAsComplete}
                />
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