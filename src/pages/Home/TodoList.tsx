import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
}

interface TodoListProps {
    tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => (
    <div>
        {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
        ))}
    </div>
);

export default TodoList;
