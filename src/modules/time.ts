import { format } from 'date-fns';

export enum DateFormat {
  DATE_1 = 'MM/dd/yyyy',
  TIME_1 = 'h:mm a',
}

export function formatDateString(dateStr: string, formatStr: string): string {
  const dateToFormat = new Date(dateStr);
  const result = format(dateToFormat, formatStr);
  return result;
}
