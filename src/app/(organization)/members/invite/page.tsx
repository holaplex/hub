'use client';

import InviteMember from '../InviteMember';

interface InviteMemberForm {
  email: string;
}

export default function MemberInvitePage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <InviteMember />
    </div>
  );
}
