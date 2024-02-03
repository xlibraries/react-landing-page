import React from 'react';
import { Card } from '@material-ui/core';

interface TaskCardProps {
    title: string;
    count: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, count }) => (
    <Card>
        <h2>{title}</h2>
        <p>{count}</p>
    </Card>
);

export default TaskCard;
