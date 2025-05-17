/* eslint-disable @typescript-eslint/no-explicit-any */
// types/index.ts

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In-progress' | 'Completed';
  createdBy: any;
  assignedTo: any[];
}
