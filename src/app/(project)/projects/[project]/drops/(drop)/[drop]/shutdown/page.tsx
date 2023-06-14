'use client';
import ShutdownDrop from '../../../ShutdownDrop';

interface ShutdownPageProps {
  params: { drop: string; project: string };
}

export default function ShutdownPage({ params: { drop, project } }: ShutdownPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <ShutdownDrop drop={drop} project={project} />
    </div>
  );
}
