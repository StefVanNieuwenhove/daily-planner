import { TaskPriority, TaskStatus } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const upperCaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date: Date, houreFormat?: boolean) => {
  if (houreFormat) {
    return date.toLocaleString('be-BE', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  return date.toLocaleString('be-BE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const convertToStatus = (status: string) => {
  switch (status) {
    case 'BACKLOG':
      return TaskStatus.BACKLOG;
    case 'PLANNING':
      return TaskStatus.PLANNING;
    case 'IN_PROGRESS':
      return TaskStatus.IN_PROGRESS;
    case 'PAUSED':
      return TaskStatus.PAUSED;
    case 'COMPLETED':
      return TaskStatus.COMPLETED;
    case 'CANCELLED':
      return TaskStatus.CANCELLED;
    default:
      return TaskStatus.BACKLOG;
  }
};

export const convertToPriority = (priority: string) => {
  switch (priority) {
    case 'LOW':
      return TaskPriority.LOW;
    case 'MEDIUM':
      return TaskPriority.MEDIUM;
    case 'HIGH':
      return TaskPriority.HIGH;
    default:
      return TaskPriority.LOW;
  }
};

export const mapPriortiesToColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'bg-red-500 text-white';
    case TaskPriority.MEDIUM:
      return 'bg-yellow-500 text-white';
    case TaskPriority.LOW:
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500';
  }
};

export const mapStatusToColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'bg-green-500 text-white';
    case TaskStatus.IN_PROGRESS:
      return 'bg-yellow-500 text-white';
    case TaskStatus.PAUSED:
      return 'bg-orange-700 text-white';
    case TaskStatus.PLANNING:
      return 'bg-teal-500 text-white';
    case TaskStatus.CANCELLED:
      return 'bg-red-500 text-white';
    case TaskStatus.BACKLOG:
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500';
  }
};
