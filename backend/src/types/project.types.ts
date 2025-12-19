export type ProjectStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Project{
    id: number;
    name: string;
    description: string | null;
    status: ProjectStatus;
    due_date: Date;
}