import { ReactElement } from 'react';

export interface SplashProps {
  children: ReactElement;
}
export default function Splash({ children }: SplashProps) {
  return (
    <div className="flex flex-col h-screen items-center pt-10">
      <div className="text-2xl font-bold text-primary mb-14">Holaplex</div>
      {children}
    </div>
  );
}
