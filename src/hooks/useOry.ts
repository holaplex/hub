import { useContext } from 'react';
import { OryContext } from './../providers/OryProvider';

export function useOry() {
  const context = useContext(OryContext);

  if (context === undefined) {
    throw new Error('useOry must be used within a OryProvider');
  }
  return context;
}
