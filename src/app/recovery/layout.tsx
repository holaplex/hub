import Splash from '../../layouts/Splash';

interface RecoveryLayoutProps {
  children: React.ReactNode;
}
export default function RecoveryLayout({ children }: RecoveryLayoutProps): React.ReactNode {
  return <Splash>{children}</Splash>;
}
