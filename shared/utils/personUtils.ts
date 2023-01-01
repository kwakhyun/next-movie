import { MediaType } from '../types/commonEnums';
import { Person } from '../types/personTypes';

import { isOfType } from './commonUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPerson(value: any): value is Person {
  return (
    value.media_type === MediaType.PERSON ||
    isOfType<Person>(value, ['name', 'gender'])
  );
}
