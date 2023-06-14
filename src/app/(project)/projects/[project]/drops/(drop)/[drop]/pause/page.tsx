'use client';

import PauseDrop from '../../../PauseDrop';

interface PausePageProps {
  params: { drop: string; project: string };
}

export default function PausePage({ params: { drop, project } }: PausePageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <PauseDrop drop={drop} project={project} />
    </div>
  );
}
