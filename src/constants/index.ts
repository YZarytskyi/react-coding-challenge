import { TaskProgressType, TaskStatusType } from '../types';

export const KEY_NAME_ESC = 'Escape';

export const KEY_UP_EVENT_TYPE = 'keyup';

export const TASK_PRIORITY_OPTIONS = ['high', 'medium', 'low'] as const;

export const TASK_STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'] as const;

export const TASK_PROGRESS_OPTIONS = [0, 50, 100] as const;

export const STATUS_PROGRESS_MAP = new Map<TaskStatusType, TaskProgressType>();

for (let i = 0; i < TASK_STATUS_OPTIONS.length; i++) {
  STATUS_PROGRESS_MAP.set(TASK_STATUS_OPTIONS[i], TASK_PROGRESS_OPTIONS[i]);
}
