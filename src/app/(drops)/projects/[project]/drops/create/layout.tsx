import CreateDrop from './CreateDrop';

interface CreateDropLayoutProps {
  children: React.ReactNode;
  params: { project: string };
}

export default function CreateDropLayout({
  children,
  params: { project },
}: CreateDropLayoutProps): React.ReactNode {
  return <CreateDrop project={project}>{children}</CreateDrop>;
}
