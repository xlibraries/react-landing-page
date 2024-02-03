import React from 'react';
import { format } from 'date-fns';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
}

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => (
    <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{format(task.dueDate, 'dd/MM/yyyy')}</p>
    </div>
);

export default TaskItem;
