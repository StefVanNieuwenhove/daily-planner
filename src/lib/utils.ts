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
