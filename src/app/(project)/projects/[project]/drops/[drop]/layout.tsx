import Drop from './Drop';

interface DropLayoutProps {
  children: React.ReactNode;
  params: { project: string; drop: string };
}

export default function DropLayout({
  children,
  params: { drop, project },
}: DropLayoutProps): JSX.Element {
  return (
    <Drop project={project} drop={drop}>
      {children}
    </Drop>
  );
}
