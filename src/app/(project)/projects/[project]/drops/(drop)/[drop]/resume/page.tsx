'use client';
import ResumeDrop from '../../../ResumeDrop';

interface ResumePageProps {
  params: { drop: string; project: string };
}

export default function ReusmePage({ params: { drop, project } }: ResumePageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <ResumeDrop drop={drop} project={project} />
    </div>
  );
}
