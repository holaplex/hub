'use client';
import RetryMint from '../../../../../RetryMint';

interface ShutdownPageProps {
  params: { drop: string; project: string; mintId: string };
}

export default function ShutdownPage({ params: { drop, project, mintId } }: ShutdownPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <RetryMint drop={drop} project={project} mintId={mintId} />
    </div>
  );
}
