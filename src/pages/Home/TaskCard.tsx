import React from 'react';
import { Card } from '@material-ui/core';
import { Task } from './TaskModel';
import './HomePage';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    //const classes = useStyles();

    return (
        <Card className="task-card">
            <h2>{task.title}</h2>
            <p>Due Date: {task.dueDate.toString()}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>{task.description}</p>
        </Card>
    );
};

export default TaskCard;
