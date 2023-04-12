import { format, formatDistanceToNow, compareAsc, set } from 'date-fns';
import { pipe, isNil, not, when } from 'ramda';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export enum DateFormat {
  DATE_1 = 'MM/dd/yyyy',
  TIME_1 = 'h:mm a',
  DATE_2 = 'MM/dd/yyyy h:mm a',
  DATE_3 = 'yyyy-MM-dd',
  TIME_2 = 'hh:mm',
}

export function formatDateString(dateStr: string, formatStr: string): string {
  const dateToFormat = new Date(dateStr);
  return format(dateToFormat, formatStr);
}

export function daysUntil(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr));
}

export function inTheFuture(dateString: string): boolean {
  return compareAsc(new Date(), new Date(dateString)) === -1;
}

export function combineDateTime(date: Date, hours: number, minutes: number): Date {
  return set(date, {
    hours,
    minutes,
  });
}

export const maybeToUtc = when(pipe(isNil, not), (date) =>
  zonedTimeToUtc(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
);

export function convertLocalTime(date: string | Date): Date {
  return utcToZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
}
