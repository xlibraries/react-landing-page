// Task.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
    creationDate: Date;
}
