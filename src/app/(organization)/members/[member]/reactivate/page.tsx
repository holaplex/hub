'use client';

import React from 'react';
import ReactivateMember from '../../ReactivateMember';

interface ReactivateMemberPageProps {
  params: { member: string };
}

export default function ReactivateMemberPage({ params: { member } }: ReactivateMemberPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <ReactivateMember member={member} />
    </div>
  );
}
