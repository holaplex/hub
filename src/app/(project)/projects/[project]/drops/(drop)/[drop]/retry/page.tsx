'use client';
import RetryDrop from '../../../RetryDrop';

interface RetryDropPageProps {
  params: { drop: string; project: string };
}

export default function RetryDropPage({ params: { drop, project } }: RetryDropPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <RetryDrop drop={drop} project={project} />
    </div>
  );
}
