'use client';

import MintEdition from '../../../MintEdition';

interface HelpPageProps {
  params: { drop: string; project: string };
}

export default function MintPage({ params: { drop, project } }: HelpPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <MintEdition drop={drop} project={project} />
    </div>
  );
}
