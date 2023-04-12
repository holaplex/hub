import { createDropFormState, DropFormProps } from '../providers/DropFormProvider';
import { useRef } from 'react';

export function useDropFormState(initialState: DropFormProps = {}) {
  return useRef(createDropFormState(initialState)).current;
}
