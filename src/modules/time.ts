import { format, formatDistanceToNow, compareAsc } from 'date-fns';

export enum DateFormat {
  DATE_1 = 'MM/dd/yyyy',
  TIME_1 = 'h:mm a',
}

export function formatDateString(dateStr: string, formatStr: string): string {
  const dateToFormat = new Date(dateStr);
  const result = format(dateToFormat, formatStr);
  return result;
}

export function daysUntil(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr));
}

export function inTheFuture(dateString: string): boolean {
  return compareAsc(new Date(), new Date(dateString)) === -1
}