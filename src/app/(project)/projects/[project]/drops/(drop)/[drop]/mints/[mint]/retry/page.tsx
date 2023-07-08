'use client';
import RetryMint from '../../../../../RetryMint';

interface ShutdownPageProps {
  params: { drop: string; project: string; mint: string };
}

export default function ShutdownPage({ params: { drop, project, mint } }: ShutdownPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <RetryMint drop={drop} project={project} mint={mint} />
    </div>
  );
}
