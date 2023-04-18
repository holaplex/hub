import { useContext } from 'react';
import { DropFormContext } from './../providers/DropFormProvider';

export function useDropForm() {
  const context = useContext(DropFormContext);
  
  if (context === undefined) {
    throw new Error('useDropForm must be used within a DropFormProvider');
  }

  return context;
}
