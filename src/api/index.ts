import { TaskType } from '../types';

export const getTaskList = async (): Promise<TaskType[]> => {
  const response = await fetch('http://localhost:3000/taskList');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return await response.json();
};
