'use client';

import Help from '../../../Help';

interface HelpPageProps {
  params: { drop: string; project: string };
}

export default function HelpPage({ params: { drop, project } }: HelpPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <Help drop={drop} project={project} />
    </div>
  );
}
