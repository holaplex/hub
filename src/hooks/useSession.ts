import { useContext } from 'react';
import { SessionContext } from './../providers/SessionProvider';

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
