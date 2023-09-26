import { compareAsc } from 'date-fns';
import { parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

export function isSessionExpired(expiresAt: string | undefined): boolean {
  const now = zonedTimeToUtc(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);
  const expiration = parseISO(expiresAt as string);

  return compareAsc(now, expiration) >= 0;
}
