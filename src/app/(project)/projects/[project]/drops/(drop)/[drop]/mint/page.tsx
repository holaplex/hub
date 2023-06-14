'use client';

import MintEdition from '../../../MintEdition';

interface MintPageProps {
  params: { drop: string; project: string };
}

export default function MintPage({ params: { drop, project } }: MintPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <MintEdition drop={drop} project={project} />
    </div>
  );
}
