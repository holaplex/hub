import Splash from '../../layouts/Splash';

export default function LoginLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <Splash>{children}</Splash>;
}
