import { FilterType } from '../graphql.types';

export function toFilterTypes(events: string[]): FilterType[] {
  return events.map((e) => e.toUpperCase().replaceAll('.', '_') as FilterType);
}
