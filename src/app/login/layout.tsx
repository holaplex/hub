import Splash from '../../layouts/Splash';

export default function LoginLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Splash>{children}</Splash>;
}
