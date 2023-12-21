import {
  TASK_PRIORITY_OPTIONS,
  TASK_PROGRESS_OPTIONS,
  TASK_STATUS_OPTIONS,
} from '../constants';

export interface TaskType {
  id: string;
  title: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  progress: TaskProgressType;
}

export type TaskPriorityType = (typeof TASK_PRIORITY_OPTIONS)[number];

export type TaskStatusType = (typeof TASK_STATUS_OPTIONS)[number];

export type TaskProgressType = (typeof TASK_PROGRESS_OPTIONS)[number];
