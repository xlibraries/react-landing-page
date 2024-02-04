import React from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Task } from './TaskModel';
import './HomePage';
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
        // Implement your edit logic here
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
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleComplete}>Mark as Complete</Button>
            <Typography variant="h5" component="div">
                {task.title}
            </Typography>
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
                {task.description}
            </Typography>
        </CardContent>
    </Card>
    );
};

export default TaskCard;
