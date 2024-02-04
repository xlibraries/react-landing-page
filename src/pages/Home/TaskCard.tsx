import React from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Task } from './TaskModel';
import  DoneIcon  from '@material-ui/icons/Done';
import  DeleteIcon from '@material-ui/icons/Delete';
import './HomePage.css';
import { formatDate } from './TaskController';

interface TaskCardProps {
    task: Task;
    handleEditTask: (id: string, updatedTask: Task) => void;
    handleDeleteTask: (id: string) => void;
    handleMarkAsComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleEditTask, handleDeleteTask, handleMarkAsComplete }) => {
    //const classes = useStyles();
    const handleEdit = () => {
        handleEditTask(task.id, task);
    };

    const handleDelete = () => {
        handleDeleteTask(task.id);
    };

    const handleComplete = () => {
        handleMarkAsComplete(task.id);
    };
    return (
        <Card className="task-card">
        <CardContent>
            {/* <Button onClick={handleEdit}>Edit</Button> */}
            <Typography variant="h5" component="div" color="textPrimary">
                Title: {task.title}
            </Typography>
                <Button color="secondary" onClick={handleDelete}>{<DeleteIcon />}</Button>
                <Button color="primary" onClick={handleComplete} disabled={task.status === 'completed'}>{<DoneIcon />}</Button>
            <Typography variant="body2" color="textSecondary">
                Due Date: {formatDate(task.dueDate)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Status: {task.status}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Priority: {task.priority}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Description: {task.description}
            </Typography>
        </CardContent>
    </Card>
    );
};

export default TaskCard;
