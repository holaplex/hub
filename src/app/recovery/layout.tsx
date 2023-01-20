import Splash from '../../layouts/Splash';

interface RecoveryLayoutProps {
  children: React.ReactNode;
}
export default function RecoveryLayout({ children }: RecoveryLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
}
