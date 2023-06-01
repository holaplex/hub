'use client';

import React from 'react';
import DeactivateMember from '../../DeactivateMember';

interface DeactivateMemberPageProps {
  params: { member: string };
}

export default function DeactivateMemberPage({ params: { member } }: DeactivateMemberPageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <DeactivateMember member={member} />
    </div>
  );
}
