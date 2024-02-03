import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { Task } from './TaskModel';

interface TaskCardProps {
    task: Task;
}

const useStyles = makeStyles({
    root: {
        maxWidth: '100%', // This will ensure that 5 cards are displayed in full screen.
        margin: '1em', // Add some margin around the cards
        borderRadius: '15px', // Rounded corners
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
