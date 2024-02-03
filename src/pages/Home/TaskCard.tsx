import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { Task } from './TaskModel';

interface TaskCardProps {
    task: Task;
}

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        margin: '1em',
        borderRadius: '15px',
    },
});

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <h2>{task.title}</h2>
            <p>Due Date: {task.dueDate.toString()}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>{task.description}</p>
        </Card>
    );
};

export default TaskCard;
